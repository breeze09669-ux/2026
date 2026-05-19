import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { MapPin, Clock, ChevronRight, BookOpen, Heart as HeartIcon, Map } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ErrorState';
import { MapComponent } from '@/components/MapComponent';
import { useLanguage } from '@/contexts/LanguageContext';
import { queryClient } from '@/lib/queryClient';
import type { Facility } from '@shared/schema';

export default function Facilities() {
  const { t, language } = useLanguage();
  const [showMap, setShowMap] = useState(false);
  
  const { data: facilities, isLoading, isError } = useQuery<Facility[]>({
    queryKey: ['/api/facilities'],
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bookstore':
        return <BookOpen className="h-8 w-8 text-primary" />;
      case 'health_center':
        return <HeartIcon className="h-8 w-8 text-red-500" />;
      default:
        return <BookOpen className="h-8 w-8 text-primary" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'bookstore':
        return t.bookstore;
      case 'health_center':
        return t.healthCenter;
      default:
        return type;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'bookstore':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'health_center':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">{t.facilities}</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="p-0">
                <Skeleton className="h-64 w-full rounded-t-lg" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-4 h-20 w-full" />
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
        <h1 className="mb-8 text-3xl font-bold">{t.facilities}</h1>
        <ErrorState onRetry={() => queryClient.invalidateQueries({ queryKey: ['/api/facilities'] })} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold" data-testid="text-page-title">
          {t.facilities}
        </h1>
        <Button
          variant={showMap ? 'default' : 'outline'}
          onClick={() => setShowMap(!showMap)}
          data-testid="button-toggle-map"
          className="gap-2 w-fit"
        >
          <Map className="h-4 w-4" />
          {t.viewOnMap}
        </Button>
      </div>

      {showMap && facilities && facilities.length > 0 && (
        <div className="mb-8">
          <MapComponent 
            locations={facilities.map(f => ({
              id: f.id,
              name: language === 'en' ? f.nameEn : f.name,
              latitude: parseFloat(f.mapLat),
              longitude: parseFloat(f.mapLng),
            }))}
          />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {facilities?.map((facility) => (
          <Card 
            key={facility.id} 
            className="overflow-hidden hover-elevate transition-all"
            data-testid={`card-facility-${facility.id}`}
          >
            <CardHeader className="p-0">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={facility.imageUrl}
                  alt={language === 'en' ? facility.nameEn : facility.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="mb-4 flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    {getTypeIcon(facility.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" data-testid={`text-facility-name-${facility.id}`}>
                      {language === 'en' ? facility.nameEn : facility.name}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className={`mt-1 ${getTypeBadgeColor(facility.type)}`}
                      data-testid={`badge-type-${facility.id}`}
                    >
                      {getTypeLabel(facility.type)}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <p className="mb-4 text-sm text-muted-foreground">
                {language === 'en' ? facility.descriptionEn : facility.description}
              </p>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>{language === 'en' ? facility.locationEn : facility.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span>{facility.hours}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-6 pt-0">
              <Link href={`/facility/${facility.id}`} className="w-full">
                <Button 
                  className="w-full gap-2"
                  data-testid={`button-view-guide-${facility.id}`}
                >
                  {t.viewGuide}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {!facilities || facilities.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">{t.loading}</p>
        </div>
      )}
    </div>
  );
}
