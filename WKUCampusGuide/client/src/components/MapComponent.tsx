import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Navigation, Footprints, Bus, AlertCircle, Clock, Route, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  markerColor?: string;
  type?: 'restaurant' | 'facility';
}

interface MapComponentProps {
  locations: Location[];
  onLocationClick?: (location: Location) => void;
  showDirectionsTo?: { lat: number; lng: number; name: string } | null;
}

interface RouteInfo {
  distance: string;
  duration: string;
}

// 원광대학교 정문 좌표
const MAIN_GATE_LOCATION = {
  lat: 35.9678,
  lng: 126.9545,
  name: '원광대학교 정문'
};

// 원광대학교 남문 좌표
const SOUTH_GATE_LOCATION = {
  lat: 35.9635,
  lng: 126.9573,
  name: '원광대학교 남문'
};

declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        Marker: any;
        LatLngBounds: any;
        LatLng: any;
        DirectionsService: any;
        DirectionsRenderer: any;
        TravelMode: any;
        DirectionsStatus: any;
      };
    };
  }
}

export function MapComponent({ locations, onLocationClick, showDirectionsTo }: MapComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const directionsRendererRef = useRef<any>(null);
  const mainGateMarkerRef = useRef<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [travelMode, setTravelMode] = useState<'WALKING' | 'TRANSIT'>('WALKING');
  const [startingPoint, setStartingPoint] = useState<'mainGate' | 'southGate' | 'myLocation'>('mainGate');
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const { t } = useLanguage();

  // 실제 출발 위치 계산
  const getOriginLocation = () => {
    if (startingPoint === 'mainGate') {
      return MAIN_GATE_LOCATION;
    }
    if (startingPoint === 'southGate') {
      return SOUTH_GATE_LOCATION;
    }
    return userLocation;
  };

  // Geolocation 사용자 위치 파악
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationStatus('success');
        },
        () => {
          console.log('Unable to get user location');
          setLocationStatus('error');
        }
      );
    } else {
      setLocationStatus('error');
    }
  }, []);

  useEffect(() => {
    const initMap = () => {
      if (!window.google?.maps?.Map) {
        setTimeout(initMap, 100);
        return;
      }

      if (!containerRef.current) return;

      try {
        // 학생회관 중심
        const centerLocation = {
          lat: 35.9694,
          lng: 126.9573
        };

        // 지도 생성
        mapRef.current = new window.google.maps.Map(containerRef.current, {
          zoom: 16,
          center: centerLocation,
          mapTypeControl: true,
          fullscreenControl: true,
          zoomControl: true,
          streetViewControl: true,
        });

        // DirectionsRenderer 초기화
        directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: travelMode === 'WALKING' ? '#22c55e' : '#3b82f6',
            strokeWeight: 5,
          }
        });
        directionsRendererRef.current.setMap(mapRef.current);

        // 모든 위치를 포함하는 경계 계산
        const bounds = new window.google.maps.LatLngBounds();
        
        // 정문 마커 추가 (보라색)
        mainGateMarkerRef.current = new window.google.maps.Marker({
          position: MAIN_GATE_LOCATION,
          map: mapRef.current,
          title: MAIN_GATE_LOCATION.name,
          icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
        });
        bounds.extend(new window.google.maps.LatLng(MAIN_GATE_LOCATION.lat, MAIN_GATE_LOCATION.lng));

        // 남문 마커 추가 (주황색)
        new window.google.maps.Marker({
          position: SOUTH_GATE_LOCATION,
          map: mapRef.current,
          title: SOUTH_GATE_LOCATION.name,
          icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
        });
        bounds.extend(new window.google.maps.LatLng(SOUTH_GATE_LOCATION.lat, SOUTH_GATE_LOCATION.lng));

        // 사용자 위치 마커 추가 (초록색)
        if (userLocation) {
          new window.google.maps.Marker({
            position: userLocation,
            map: mapRef.current,
            title: t.myLocation,
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          });
          bounds.extend(new window.google.maps.LatLng(userLocation.lat, userLocation.lng));
        }
        
        // 마커 추가
        locations.forEach(location => {
          const position = {
            lat: location.latitude,
            lng: location.longitude
          };

          // 마커 색상 설정
          let icon;
          if (location.markerColor === 'blue') {
            icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
          } else if (location.markerColor === 'red') {
            icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
          } else if (location.markerColor === 'yellow') {
            icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
          }
          
          const marker = new window.google.maps.Marker({
            position: position,
            map: mapRef.current,
            title: location.name,
            icon: icon
          });

          // 마커 클릭 이벤트
          marker.addListener('click', () => {
            if (onLocationClick) {
              onLocationClick(location);
            }
          });
          
          bounds.extend(new window.google.maps.LatLng(location.latitude, location.longitude));
        });

        // 모든 마커가 화면에 보이도록 지도 맞춤
        if (locations.length > 0) {
          mapRef.current.fitBounds(bounds);
        }

        console.log('Map initialized with', locations.length, 'markers');
      } catch (error) {
        console.error('Map error:', error);
      }
    };

    initMap();
  }, [locations, onLocationClick, userLocation, t]);

  // 길찾기 기능
  useEffect(() => {
    const originLocation = getOriginLocation();
    
    if (!showDirectionsTo || !originLocation || !mapRef.current || !window.google?.maps?.DirectionsService) {
      return;
    }

    setIsLoadingRoute(true);
    setRouteError(null);
    setRouteInfo(null);

    // DirectionsRenderer 재초기화 (색상 변경)
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
    }
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: travelMode === 'WALKING' ? '#22c55e' : '#3b82f6',
        strokeWeight: 5,
      }
    });
    directionsRendererRef.current.setMap(mapRef.current);

    const directionsService = new window.google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin: { lat: originLocation.lat, lng: originLocation.lng },
        destination: showDirectionsTo,
        travelMode: window.google.maps.TravelMode[travelMode],
      },
      (response: any, status: any) => {
        setIsLoadingRoute(false);
        
        if (status === 'OK') {
          directionsRendererRef.current.setDirections(response);
          
          // 경로 정보 추출
          const route = response.routes[0];
          if (route && route.legs && route.legs[0]) {
            const leg = route.legs[0];
            setRouteInfo({
              distance: leg.distance.text,
              duration: leg.duration.text,
            });
          }
          setRouteError(null);
        } else {
          console.error('Directions request failed:', status);
          setRouteError(t.routeNotFound);
          setRouteInfo(null);
        }
      }
    );
  }, [showDirectionsTo, userLocation, travelMode, startingPoint, t]);

  return (
    <div className="flex flex-col gap-3">
      {/* 출발지 선택 및 이동 수단 선택 버튼 */}
      {showDirectionsTo && (
        <div className="space-y-2">
          {/* 출발지 선택 */}
          <div className="flex flex-wrap gap-2" data-testid="starting-point-selector">
            <span className="text-sm text-muted-foreground flex items-center mr-2">{t.startingPoint}:</span>
            <Button
              variant={startingPoint === 'mainGate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStartingPoint('mainGate')}
              className="gap-2"
              data-testid="button-from-main-gate"
            >
              <Building2 className="w-4 h-4" />
              {t.fromMainGate}
            </Button>
            <Button
              variant={startingPoint === 'southGate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStartingPoint('southGate')}
              className="gap-2"
              data-testid="button-from-south-gate"
            >
              <Building2 className="w-4 h-4" />
              {t.fromSouthGate}
            </Button>
            <Button
              variant={startingPoint === 'myLocation' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStartingPoint('myLocation')}
              className="gap-2"
              disabled={locationStatus !== 'success'}
              data-testid="button-from-my-location"
            >
              <MapPin className="w-4 h-4" />
              {t.fromMyLocation}
            </Button>
          </div>

          {/* 이동 수단 선택 */}
          <div className="flex gap-2" data-testid="travel-mode-selector">
            <Button
              variant={travelMode === 'WALKING' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTravelMode('WALKING')}
              className="gap-2"
              data-testid="button-walking"
            >
              <Footprints className="w-4 h-4" />
              {t.walking}
            </Button>
            <Button
              variant={travelMode === 'TRANSIT' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTravelMode('TRANSIT')}
              className="gap-2"
              data-testid="button-transit"
            >
              <Bus className="w-4 h-4" />
              {t.transit}
            </Button>
          </div>
        </div>
      )}

      {/* 지도 */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '500px',
          minHeight: '500px',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          backgroundColor: '#e5e5e5'
        }}
        data-testid="map-component"
      />

      {/* 경로 정보 또는 오류 표시 */}
      {showDirectionsTo && (
        <div className="space-y-3">
          {isLoadingRoute && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-card border">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">{t.loading}</span>
            </div>
          )}

          {routeError && !isLoadingRoute && (
            <div 
              className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
              data-testid="route-error"
            >
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{routeError}</p>
            </div>
          )}

          {routeInfo && !isLoadingRoute && !routeError && (
            <div 
              className="flex items-center gap-4 p-3 rounded-lg bg-card border"
              data-testid="route-info"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                travelMode === 'WALKING' 
                  ? 'bg-green-100 dark:bg-green-900/30' 
                  : 'bg-blue-100 dark:bg-blue-900/30'
              }`}>
                {travelMode === 'WALKING' 
                  ? <Footprints className="w-5 h-5 text-green-600 dark:text-green-400" />
                  : <Bus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                }
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{t.routeInfo}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <Route className="w-4 h-4" />
                    <span>{t.distance}: {routeInfo.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{t.duration}: {routeInfo.duration}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {startingPoint === 'mainGate' ? t.fromMainGate : startingPoint === 'southGate' ? t.fromSouthGate : t.fromMyLocation}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* 현재 위치 정보 패널 */}
      <div 
        className="flex items-center gap-3 p-3 rounded-lg bg-card border"
        data-testid="current-location-info"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30">
          <Navigation className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="font-medium text-foreground">{t.myLocation}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {locationStatus === 'loading' 
              ? t.gettingLocation
              : locationStatus === 'success'
                ? t.currentLocationInfo
                : t.locationNotAvailable
            }
          </p>
          {locationStatus === 'success' && userLocation && (
            <p className="text-xs text-muted-foreground mt-1">
              {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
            </p>
          )}
        </div>
        {locationStatus === 'success' && (
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
        )}
      </div>
    </div>
  );
}
