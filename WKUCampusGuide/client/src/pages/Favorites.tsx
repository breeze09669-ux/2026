import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Heart, UtensilsCrossed } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DietaryIcons } from '@/components/DietaryIcons';
import { useLanguage } from '@/contexts/LanguageContext';
import { getFavorites, removeFavorite } from '@/lib/favorites';
import { apiRequest } from '@/lib/queryClient';
import { useState, useEffect } from 'react';
import type { Menu, Restaurant } from '@shared/schema';

export default function Favorites() {
  const { t, language } = useLanguage();
  const [favorites, setFavorites] = useState(getFavorites());
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleFavoritesChange = () => {
      setFavorites(getFavorites());
    };

    window.addEventListener('favorites-changed', handleFavoritesChange);
    return () => window.removeEventListener('favorites-changed', handleFavoritesChange);
  }, []);

  const favoriteMenuIds = favorites.map(f => f.menuId);

  const { data: allMenus } = useQuery<Menu[]>({
    queryKey: ['/api/all-menus'],
  });

  const { data: restaurants } = useQuery<Restaurant[]>({
    queryKey: ['/api/restaurants'],
  });

  const favoriteMenus = allMenus?.filter(menu => favoriteMenuIds.includes(menu.id)) || [];

  const getRestaurantName = (restaurantId: string) => {
    const restaurant = restaurants?.find(r => r.id === restaurantId);
    if (!restaurant) return '';
    return language === 'en' ? restaurant.nameEn : restaurant.name;
  };

  // Unlike mutation
  const unlikeMutation = useMutation({
    mutationFn: async (menuId: string) => {
      const res = await apiRequest('POST', `/api/menus/${menuId}/unlike`);
      return res.json() as Promise<Menu>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/all-menus'] });
    },
  });

  const handleRemoveFavorite = (menuId: string) => {
    removeFavorite(menuId);
    unlikeMutation.mutate(menuId);
    setFavorites(getFavorites());
  };

  if (favoriteMenus.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold" data-testid="text-page-title">
          {t.myFavorites}
        </h1>
        
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">{t.noFavoritesYet}</h2>
          <p className="mb-6 text-muted-foreground">{t.exploreFoods}</p>
          <Link href="/restaurants">
            <Button className="gap-2" data-testid="button-explore-restaurants">
              <UtensilsCrossed className="h-4 w-4" />
              {t.searchRestaurant}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold" data-testid="text-page-title">
        {t.myFavorites}
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favoriteMenus.map((menu) => {
          const favorite = favorites.find(f => f.menuId === menu.id);
          const restaurantName = favorite ? getRestaurantName(favorite.restaurantId) : '';
          const restaurantId = favorite?.restaurantId || '';

          return (
            <Link key={menu.id} href={`/restaurant/${restaurantId}`}>
              <Card 
                className="overflow-hidden hover-elevate transition-all cursor-pointer"
                data-testid={`card-favorite-${menu.id}`}
              >
                <CardHeader className="p-0">
                  <div className="aspect-square w-full overflow-hidden">
                    <img
                      src={menu.imageUrl}
                      alt={language === 'en' ? menu.nameEn : menu.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="mb-2">
                    <p className="text-xs text-muted-foreground">{restaurantName}</p>
                  </div>
                  
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold">
                      {language === 'en' ? menu.nameEn : menu.name}
                    </h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button
                        variant="default"
                        size="icon"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveFavorite(menu.id);
                        }}
                        data-testid={`button-remove-favorite-${menu.id}`}
                      >
                        <Heart className="h-4 w-4 fill-current" />
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
            </Link>
          );
        })}
      </div>
    </div>
  );
}
