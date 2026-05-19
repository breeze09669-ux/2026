import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { MapPin, Clock, ArrowLeft, Heart, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { DietaryIcons } from '@/components/DietaryIcons';
import { MapComponent } from '@/components/MapComponent';
import { useLanguage } from '@/contexts/LanguageContext';
import { addFavorite, removeFavorite, isFavorite } from '@/lib/favorites';
import { apiRequest } from '@/lib/queryClient';
import { useState, useEffect } from 'react';
import type { Restaurant, Menu } from '@shared/schema';

// Sub-restaurants in the Cafeteria
const cafeteriaSubRestaurants = [
  {
    id: 'mankwon',
    name: '만권화밥',
    nameEn: 'Mankwon Hwabap',
    description: '덮밥과 찌개',
    descriptionEn: 'Rice Bowls & Stews',
    prefix: '만권화밥 -',
    logo: '/attached_assets/mankwon_logo.png',
  },
  {
    id: 'choigodang',
    name: '최고당돈까스',
    nameEn: 'Choigodang Tonkatsu',
    description: '돈까스와 라멘',
    descriptionEn: 'Tonkatsu & Ramen',
    prefix: '최고당돈까스 -',
    logo: 'https://choigodang.co.kr/2018/img/logo.png',
  },
  {
    id: 'phoaini',
    name: '포아이니',
    nameEn: 'Phoaini Vietnamese',
    description: '쌀국수와 짜조',
    descriptionEn: 'Pho & Spring Rolls',
    prefix: '포아이니 -',
    logo: '/attached_assets/phoini_logo.png',
  },
  {
    id: 'kaang',
    name: '크앙분식',
    nameEn: 'K-Ang Bunsik',
    description: '떡볶이, 순대, 튀김',
    descriptionEn: 'Tteokbokki & Fried Items',
    prefix: '크앙분식 -',
    logo: '/attached_assets/kaang_logo.png',
  },
];

// Sub-restaurants in Phoenix Shop
const phoenixShopSubRestaurants = [
  {
    id: 'newyorkburger',
    name: '뉴욕버거',
    nameEn: 'New York Burger',
    description: '프리미엄 수제버거',
    descriptionEn: 'Premium Handmade Burgers',
    prefix: '뉴욕버거 -',
    logo: '/attached_assets/copyImage_1764642001968.jpg',
  },
  {
    id: 'carbone',
    name: '까르보네',
    nameEn: 'Carbone',
    description: '이탈리안 파스타',
    descriptionEn: 'Italian Pasta',
    prefix: '까르보네 -',
    logo: '/attached_assets/image_1764651225968.png',
  },
  {
    id: 'kimbapcheonkook',
    name: '김밥천국',
    nameEn: 'Kimbap Cheonkook',
    description: '한식 김밥과 국',
    descriptionEn: 'Korean Kimbap & Soup',
    prefix: '김밥천국 -',
    logo: '/attached_assets/1763524224600_1764642155873.jpg',
  },
];

export default function RestaurantDetail() {
  const [, params] = useRoute('/restaurant/:id');
  const { t, language } = useLanguage();
  const [favoritesMap, setFavoritesMap] = useState<Record<string, boolean>>({});
  const [selectedSubRestaurant, setSelectedSubRestaurant] = useState<string | null>(null);
  const [showDirections, setShowDirections] = useState(false);
  const queryClient = useQueryClient();

  const { data: restaurant, isLoading: restaurantLoading } = useQuery<Restaurant>({
    queryKey: ['/api/restaurants', params?.id],
  });

  const { data: menus, isLoading: menusLoading } = useQuery<Menu[]>({
    queryKey: ['/api/menus', params?.id],
  });

  // Like mutation with cache invalidation
  const likeMutation = useMutation({
    mutationFn: async (menuId: string) => {
      const res = await apiRequest('POST', `/api/menus/${menuId}/like`);
      return res.json() as Promise<Menu>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/menus', params?.id] });
      queryClient.invalidateQueries({ queryKey: ['/api/all-menus'] });
    },
  });

  // Unlike mutation with cache invalidation
  const unlikeMutation = useMutation({
    mutationFn: async (menuId: string) => {
      const res = await apiRequest('POST', `/api/menus/${menuId}/unlike`);
      return res.json() as Promise<Menu>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/menus', params?.id] });
      queryClient.invalidateQueries({ queryKey: ['/api/all-menus'] });
    },
  });

  // For cafeteria and phoenix shop, filter menus by selected sub-restaurant
  const isKioskRestaurant = restaurant?.id === 'r2' || restaurant?.id === 'r3';
  const isCafeteria = restaurant?.id === 'r2';
  const isPhoenixShop = restaurant?.id === 'r3';
  const filteredMenus = selectedSubRestaurant && isKioskRestaurant
    ? menus?.filter(menu => menu.name.includes(selectedSubRestaurant))
    : menus;
  
  const subRestaurants = isCafeteria ? cafeteriaSubRestaurants : isPhoenixShop ? phoenixShopSubRestaurants : [];

  useEffect(() => {
    if (filteredMenus) {
      const map: Record<string, boolean> = {};
      filteredMenus.forEach(menu => {
        map[menu.id] = isFavorite(menu.id);
      });
      setFavoritesMap(map);
    }
  }, [filteredMenus]);

  useEffect(() => {
    const handleFavoritesChange = () => {
      if (filteredMenus) {
        const map: Record<string, boolean> = {};
        filteredMenus.forEach(menu => {
          map[menu.id] = isFavorite(menu.id);
        });
        setFavoritesMap(map);
      }
    };

    window.addEventListener('favorites-changed', handleFavoritesChange);
    return () => window.removeEventListener('favorites-changed', handleFavoritesChange);
  }, [filteredMenus]);

  const handleFavoriteToggle = (menuId: string) => {
    if (!params?.id) return;
    
    if (favoritesMap[menuId]) {
      removeFavorite(menuId);
      unlikeMutation.mutate(menuId);
    } else {
      addFavorite(menuId, params.id);
      likeMutation.mutate(menuId);
    }
  };

  const isStudentCafeteria = restaurant?.category === 'student_cafeteria';
  
  if (restaurantLoading || menusLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="mb-8 h-10 w-48" />
        <Skeleton className="mb-4 h-64 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">{t.error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/restaurants">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2"
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backToHome}
        </Button>
      </Link>

      {/* Restaurant Header */}
      <div className="mb-8">
        <div className="aspect-[21/9] w-full overflow-hidden rounded-lg">
          <img
            src={restaurant.imageUrl}
            alt={language === 'en' ? restaurant.nameEn : restaurant.name}
            className="h-full w-full object-cover"
            data-testid="img-restaurant-header"
          />
        </div>
        
        <div className="mt-6">
          <h1 className="mb-4 text-3xl font-bold" data-testid="text-restaurant-name">
            {language === 'en' ? restaurant.nameEn : restaurant.name}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{language === 'en' ? restaurant.locationEn : restaurant.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{restaurant.hours}</span>
            </div>
          </div>
          <Button
            variant="default"
            className="gap-2"
            onClick={() => setShowDirections(!showDirections)}
            data-testid="button-directions"
          >
            <Navigation className="h-4 w-4" />
            {showDirections ? t.closeMap : t.directions}
          </Button>
        </div>
      </div>

      {/* 길찾기 지도 */}
      {showDirections && restaurant.mapLat && restaurant.mapLng && (
        <div className="mb-8">
          <MapComponent
            locations={[{
              id: restaurant.id,
              name: language === 'en' ? restaurant.nameEn : restaurant.name,
              latitude: parseFloat(restaurant.mapLat),
              longitude: parseFloat(restaurant.mapLng),
              markerColor: restaurant.category === 'cafe' ? 'blue' : 'red',
              type: 'restaurant'
            }]}
            showDirectionsTo={{
              lat: parseFloat(restaurant.mapLat),
              lng: parseFloat(restaurant.mapLng),
              name: language === 'en' ? restaurant.nameEn : restaurant.name
            }}
          />
        </div>
      )}

      {/* Kiosk System Sub-restaurants Section (for Cafeteria and Phoenix Shop) */}
      {isKioskRestaurant && !selectedSubRestaurant ? (
        <div>
          <h2 className="mb-6 text-2xl font-bold">{t.selectRestaurant}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {subRestaurants.map((subRest) => (
              <Card 
                key={subRest.id}
                className="overflow-hidden hover-elevate cursor-pointer transition-all"
                onClick={() => setSelectedSubRestaurant(subRest.prefix)}
                data-testid={`card-subrestaurant-${subRest.id}`}
              >
                <CardHeader className="p-0">
                  <div className="aspect-square w-full overflow-hidden bg-gray-50 flex items-center justify-center">
                    {subRest.logo && (
                      <img
                        src={subRest.logo}
                        alt={language === 'en' ? subRest.nameEn : subRest.name}
                        className="h-full w-full object-contain p-4"
                        data-testid={`img-logo-${subRest.id}`}
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="mb-2 text-xl font-bold">
                      {language === 'en' ? subRest.nameEn : subRest.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? subRest.descriptionEn : subRest.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : null}

      {/* Menu Section */}
      {isKioskRestaurant && selectedSubRestaurant ? (
        <div>
          <Button
            variant="ghost"
            className="mb-6 gap-2"
            onClick={() => setSelectedSubRestaurant(null)}
            data-testid="button-back-to-restaurants"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backToRestaurants}
          </Button>
          
          <h2 className="mb-6 text-2xl font-bold">{t.menu}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMenus?.map((menu) => (
              <Card 
                key={menu.id} 
                className="overflow-hidden hover-elevate transition-all"
                data-testid={`card-menu-${menu.id}`}
              >
                {menu.imageUrl && restaurant?.category !== 'cafe' && (
                  <CardHeader className="p-0">
                    <div className="aspect-square w-full overflow-hidden">
                      <img
                        src={menu.imageUrl}
                        alt={language === 'en' ? menu.nameEn : menu.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CardHeader>
                )}
                
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold">
                      {language === 'en' ? menu.nameEn : menu.name}
                    </h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button
                        variant={favoritesMap[menu.id] ? "default" : "outline"}
                        size="icon"
                        onClick={() => handleFavoriteToggle(menu.id)}
                        data-testid={`button-favorite-${menu.id}`}
                      >
                        <Heart 
                          className={`h-4 w-4 ${favoritesMap[menu.id] ? 'fill-current' : ''}`} 
                        />
                      </Button>
                      <span className="text-sm text-muted-foreground min-w-[20px]" data-testid={`text-likecount-${menu.id}`}>
                        {menu.likeCount ?? 0}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <Badge variant="secondary" className="text-base font-semibold">
                      ₩{menu.price.toLocaleString()}
                    </Badge>
                  </div>
                  
                  <DietaryIcons
                    hasPork={menu.hasPork}
                    isSpicy={menu.isSpicy}
                    isVegetarian={menu.isVegetarian}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : null}

      {/* Regular Student Cafeteria */}
      {isStudentCafeteria ? (
        <div>
          <h2 className="mb-6 text-2xl font-bold">
            {language === 'ko' && '전체 메뉴'}
            {language === 'en' && 'All Menu'}
            {language === 'uz' && 'Barcha menyu'}
            {language === 'vi' && 'Tất cả thực đơn'}
            {language === 'zh' && '全部菜单'}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {menus?.map((menu) => (
              <Card 
                key={menu.id} 
                className="overflow-hidden hover-elevate transition-all"
                data-testid={`card-menu-${menu.id}`}
              >
                {menu.imageUrl && (
                  <CardHeader className="p-0">
                    <div className="aspect-square w-full overflow-hidden">
                      <img
                        src={menu.imageUrl}
                        alt={language === 'en' ? menu.nameEn : menu.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CardHeader>
                )}
                
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold">
                      {language === 'en' ? menu.nameEn : menu.name}
                    </h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button
                        variant={favoritesMap[menu.id] ? "default" : "outline"}
                        size="icon"
                        onClick={() => handleFavoriteToggle(menu.id)}
                        data-testid={`button-favorite-${menu.id}`}
                      >
                        <Heart 
                          className={`h-4 w-4 ${favoritesMap[menu.id] ? 'fill-current' : ''}`} 
                        />
                      </Button>
                      <span className="text-sm text-muted-foreground min-w-[20px]" data-testid={`text-likecount-${menu.id}`}>
                        {menu.likeCount ?? 0}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <Badge variant="secondary" className="text-base font-semibold">
                      ₩{menu.price.toLocaleString()}
                    </Badge>
                  </div>
                  
                  <DietaryIcons
                    hasPork={menu.hasPork}
                    isSpicy={menu.isSpicy}
                    isVegetarian={menu.isVegetarian}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : null}

      {/* Other Restaurants */}
      {!isKioskRestaurant && !isStudentCafeteria ? (
        <div>
          <h2 className="mb-6 text-2xl font-bold">{t.allMenus}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {menus?.map((menu) => (
            <Card 
              key={menu.id} 
              className="overflow-hidden hover-elevate transition-all"
              data-testid={`card-menu-${menu.id}`}
            >
              {menu.imageUrl && restaurant?.category !== 'cafe' && (
                <CardHeader className="p-0">
                  <div className="aspect-square w-full overflow-hidden">
                    <img
                      src={menu.imageUrl}
                      alt={language === 'en' ? menu.nameEn : menu.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardHeader>
              )}
              
              <CardContent className="p-4">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold">
                    {language === 'en' ? menu.nameEn : menu.name}
                  </h3>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      variant={favoritesMap[menu.id] ? "default" : "outline"}
                      size="icon"
                      onClick={() => handleFavoriteToggle(menu.id)}
                      data-testid={`button-favorite-${menu.id}`}
                    >
                      <Heart 
                        className={`h-4 w-4 ${favoritesMap[menu.id] ? 'fill-current' : ''}`} 
                      />
                    </Button>
                    <span className="text-sm text-muted-foreground min-w-[20px]" data-testid={`text-likecount-${menu.id}`}>
                      {menu.likeCount ?? 0}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <Badge variant="secondary" className="text-base font-semibold">
                    ₩{menu.price.toLocaleString()}
                  </Badge>
                </div>
                
                <DietaryIcons
                  hasPork={menu.hasPork}
                  isSpicy={menu.isSpicy}
                  isVegetarian={menu.isVegetarian}
                />
              </CardContent>
            </Card>
          ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
