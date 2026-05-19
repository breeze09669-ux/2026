import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { MapPin, Clock, ChevronRight, Map, Users, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ErrorState';
import { MapComponent } from '@/components/MapComponent';
import { useLanguage } from '@/contexts/LanguageContext';
import { queryClient } from '@/lib/queryClient';
import type { Menu, Restaurant } from '@shared/schema';

type RestaurantFilter = 'all' | 'restaurant' | 'cafe' | 'all-diet' | 'halal' | 'no-pork' | 'vegan';

const DIET_FILTERS = new Set<RestaurantFilter>(['all-diet', 'halal', 'no-pork', 'vegan']);
const PORK_KEYWORDS = ['pork', 'tonkatsu', 'tonkotsu', 'katsudon', 'spam', 'sausage', 'pepperoni', '돼지', '돈까스', '돈카츠', '돈코츠', '가츠동', '삼겹', '제육', '스팸', '소세지', '소시지', '페페로니'];
const NON_VEGAN_KEYWORDS = [
  ...PORK_KEYWORDS,
  'beef',
  'chicken',
  'shrimp',
  'tuna',
  'clam',
  'seafood',
  'cheese',
  'cream',
  'mayo',
  'egg',
  'milk',
  'butter',
  'roe',
  '소고기',
  '차돌',
  '불고기',
  '육개장',
  '설렁탕',
  '치킨',
  '닭',
  '새우',
  '참치',
  '바지락',
  '해물',
  '치즈',
  '크림',
  '마요',
  '계란',
  '우유',
  '버터',
  '알밥',
];
const VEGAN_KEYWORDS = ['vegan', 'vegetarian', 'plain rice', 'sweet potato', 'aglio', 'tomato sauce', '비건', '채식', '공기밥', '고구마', '감자튀김', '갈릭프라이즈', '알리오', '토마로'];

const menuText = (menu: Menu) => `${menu.name} ${menu.nameEn}`.toLowerCase();
const includesAny = (text: string, keywords: string[]) => keywords.some(keyword => text.includes(keyword.toLowerCase()));
const menuHasPork = (menu: Menu) => menu.hasPork || includesAny(menuText(menu), PORK_KEYWORDS);
const menuIsNoPork = (menu: Menu) => !menuHasPork(menu);
const menuIsVegan = (menu: Menu) => {
  const text = menuText(menu);
  return menu.isVegetarian || (includesAny(text, VEGAN_KEYWORDS) && !includesAny(text, NON_VEGAN_KEYWORDS));
};

// HunSec
const menuMatchesDietFilter = (menu: Menu, filter: RestaurantFilter) => {
  switch (filter) {
    case 'all-diet':
      return true;
    case 'halal':
    case 'no-pork':
      return menuIsNoPork(menu);
    case 'vegan':
      return menuIsVegan(menu);
    default:
      return false;
  }
};

export default function Restaurants() {
  const { t, language } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<RestaurantFilter>('all');
  const [showMap, setShowMap] = useState(false);
  
  const { data: restaurants, isLoading, isError } = useQuery<Restaurant[]>({
    queryKey: ['/api/restaurants'],
  });
  const { data: allMenus } = useQuery<Menu[]>({
    queryKey: ['/api/all-menus'],
  });

  const filteredRestaurants = restaurants?.filter(r => {
    if (selectedFilter === 'all') return true;
    if (DIET_FILTERS.has(selectedFilter)) {
      return allMenus?.some(menu => menu.restaurantId === r.id && menuMatchesDietFilter(menu, selectedFilter)) ?? false;
    }
    return r.category === selectedFilter;
  });

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'student_cafeteria':
        return t.studentCafeteria;
      case 'cafe':
        return t.cafe;
      case 'restaurant':
        return t.restaurant;
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'student_cafeteria':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cafe':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'restaurant':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return '';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return t.open;
      case 'closed':
        return t.closed;
      case 'busy':
        return t.busy;
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'closed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'busy':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return '';
    }
  };

  const getCrowdingLabel = (level: number) => {
    switch (level) {
      case 1:
        return t.empty;
      case 2:
        return t.slightlyCrowded;
      case 3:
        return t.moderate;
      case 4:
        return t.quite;
      case 5:
        return t.veryCrowded;
      default:
        return t.moderate;
    }
  };

  const getCrowdingColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 2:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 3:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 4:
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 5:
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">{t.restaurants}</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader className="p-0">
                <Skeleton className="h-48 w-full rounded-t-lg" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">{t.restaurants}</h1>
        <ErrorState onRetry={() => queryClient.invalidateQueries({ queryKey: ['/api/restaurants'] })} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold" data-testid="text-page-title">
          {t.restaurants}
        </h1>
        <div className="flex flex-col items-start gap-2">
          <div className="flex justify-start gap-2 flex-wrap">
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('all')}
              data-testid="button-filter-all"
            >
              {t.showAll}
            </Button>
            <Button
              variant={selectedFilter === 'restaurant' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('restaurant')}
              data-testid="button-filter-restaurant"
            >
              {t.restaurant}
            </Button>
            <Button
              variant={selectedFilter === 'cafe' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('cafe')}
              data-testid="button-filter-cafe"
            >
              {t.cafe}
            </Button>
          </div>
          <div className="flex justify-start gap-2 flex-wrap">
            <Button
              variant={selectedFilter === 'all-diet' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('all-diet')}
              data-testid="button-filter-all-diet"
            >
              {t.allDiet}
            </Button>
            <Button
              variant={selectedFilter === 'halal' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('halal')}
              data-testid="button-filter-halal"
            >
              {t.halal}
            </Button>
            <Button
              variant={selectedFilter === 'no-pork' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('no-pork')}
              data-testid="button-filter-no-pork"
            >
              {t.noPork}
            </Button>
            <Button
              variant={selectedFilter === 'vegan' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('vegan')}
              data-testid="button-filter-vegan"
            >
              {t.vegan}
            </Button>
          </div>
          <div className="flex justify-start gap-2 flex-wrap">
            <Button
              variant={showMap ? 'default' : 'outline'}
              onClick={() => setShowMap(!showMap)}
              data-testid="button-toggle-map"
              className="gap-2"
            >
              <Map className="h-4 w-4" />
              {t.viewOnMap}
            </Button>
          </div>
        </div>
      </div>

      {showMap && filteredRestaurants && filteredRestaurants.length > 0 && (
        <div className="mb-8">
          <MapComponent 
            locations={filteredRestaurants.map(r => ({
              id: r.id,
              name: language === 'en' ? r.nameEn : r.name,
              latitude: parseFloat(r.mapLat),
              longitude: parseFloat(r.mapLng),
            }))}
          />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRestaurants?.map((restaurant) => (
          <Card 
            key={restaurant.id} 
            className="overflow-hidden hover-elevate transition-all"
            data-testid={`card-restaurant-${restaurant.id}`}
          >
            <CardHeader className="p-0">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={restaurant.imageUrl}
                  alt={language === 'en' ? restaurant.nameEn : restaurant.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold flex-1" data-testid={`text-restaurant-name-${restaurant.id}`}>
                  {language === 'en' ? restaurant.nameEn : restaurant.name}
                </h3>
                <Badge 
                  variant="secondary" 
                  className={getCategoryColor(restaurant.category)}
                  data-testid={`badge-category-${restaurant.id}`}
                >
                  {getCategoryLabel(restaurant.category)}
                </Badge>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                <Badge 
                  className={getStatusColor((restaurant as any).status || 'open')}
                  variant="secondary"
                  data-testid={`badge-status-${restaurant.id}`}
                >
                  {getStatusLabel((restaurant as any).status || 'open')}
                </Badge>
                <Badge 
                  className={getCrowdingColor((restaurant as any).crowdingLevel || 2)}
                  variant="secondary"
                  data-testid={`badge-crowding-${restaurant.id}`}
                >
                  <Users className="h-3 w-3 mr-1" />
                  {getCrowdingLabel((restaurant as any).crowdingLevel || 2)}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>{language === 'en' ? restaurant.locationEn : restaurant.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span>{restaurant.hours}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0">
              <Link href={`/restaurant/${restaurant.id}`} className="w-full">
                <Button 
                  className="w-full gap-2"
                  data-testid={`button-view-menu-${restaurant.id}`}
                >
                  {t.viewMenu}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {!filteredRestaurants || filteredRestaurants.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">{t.loading}</p>
        </div>
      )}
    </div>
  );
}
