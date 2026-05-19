import { Link } from 'wouter';
import { UtensilsCrossed, Building2, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapComponent } from '@/components/MapComponent';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import campusHeroImage from '@assets/다운로드-136_1764127294179.jpeg';
import type { Restaurant, Facility } from '@shared/schema';

export default function Home() {
  const { t, language } = useLanguage();
  const [showMapDialog, setShowMapDialog] = useState(false);
  
  const { data: restaurants } = useQuery<Restaurant[]>({
    queryKey: ['/api/restaurants'],
    enabled: showMapDialog,
  });
  
  const { data: facilities } = useQuery<Facility[]>({
    queryKey: ['/api/facilities'],
    enabled: showMapDialog,
  });

  const allLocations = [
    ...(restaurants?.map(r => ({
      id: r.id,
      name: language === 'en' ? r.nameEn : r.name,
      latitude: parseFloat(r.mapLat),
      longitude: parseFloat(r.mapLng),
      markerColor: r.category === 'cafe' ? 'blue' : r.category === 'restaurant' ? 'red' : undefined,
      type: 'restaurant' as const,
    })) || []),
    ...(facilities?.map(f => ({
      id: f.id,
      name: language === 'en' ? f.nameEn : f.name,
      latitude: parseFloat(f.mapLat),
      longitude: parseFloat(f.mapLng),
      markerColor: 'yellow',
      type: 'facility' as const,
    })) || []),
  ];

  const handleLocationClick = (location: any) => {
    if (location.type === 'restaurant') {
      window.location.href = `/restaurant/${location.id}`;
    } else if (location.type === 'facility') {
      window.location.href = `/facility/${location.id}`;
    }
    setShowMapDialog(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={campusHeroImage}
            alt="원광대학교 캠퍼스"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl" data-testid="text-hero-title">
            {t.heroTitle}
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-white/90 sm:text-xl" data-testid="text-hero-subtitle">
            {t.heroSubtitle}
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/restaurants">
              <Button 
                size="lg" 
                className="gap-2 text-lg px-8 backdrop-blur-sm bg-primary/90 hover:bg-primary"
                data-testid="button-search-restaurant"
              >
                <UtensilsCrossed className="h-5 w-5" />
                {t.searchRestaurant}
              </Button>
            </Link>
            <Link href="/facilities">
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 text-lg px-8 backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
                data-testid="button-search-facility"
              >
                <Building2 className="h-5 w-5" />
                {t.searchFacility}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-center">
          <Card 
            className="hover-elevate transition-all cursor-pointer w-full md:w-1/2 lg:w-1/3"
            onClick={() => setShowMapDialog(true)}
            data-testid="card-location-map"
          >
            <CardContent className="flex flex-col items-center p-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{t.location}</h3>
              <p className="text-sm text-muted-foreground">{t.mapDescription}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Campus Map Dialog */}
      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogContent className="max-w-5xl min-h-[600px] flex flex-col" data-testid="dialog-campus-map">
          <DialogHeader>
            <DialogTitle>{t.campusLocations}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <MapComponent locations={allLocations} onLocationClick={handleLocationClick} />
          </div>
          
          {/* Marker Legend */}
          <div className="border-t pt-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm">{t.redRestaurants}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-sm">{t.blueCafes}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm">{t.yellowFacilities}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                <span className="text-sm">{t.purpleMainGate}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <span className="text-sm">{t.orangeSouthGate}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm">{t.greenMyLocation}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
