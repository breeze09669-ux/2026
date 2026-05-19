import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { MapPin, Clock, ArrowLeft, BookOpen, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { MapComponent } from '@/components/MapComponent';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import type { Facility, Guide } from '@shared/schema';

export default function FacilityDetail() {
  const [, params] = useRoute('/facility/:id');
  const { t, language } = useLanguage();
  const [showDirections, setShowDirections] = useState(false);

  const { data: facility, isLoading: facilityLoading } = useQuery<Facility>({
    queryKey: ['/api/facilities', params?.id],
  });

  const { data: guides, isLoading: guidesLoading } = useQuery<Guide[]>({
    queryKey: ['/api/guides', params?.id],
  });

  if (facilityLoading || guidesLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="mb-8 h-10 w-48" />
        <Skeleton className="mb-4 h-64 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">{t.error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/facilities">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2"
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backToHome}
        </Button>
      </Link>

      {/* Facility Header */}
      <div className="mb-8">
        <div className="aspect-[21/9] w-full overflow-hidden rounded-lg">
          <img
            src={facility.imageUrl}
            alt={language === 'en' ? facility.nameEn : facility.name}
            className="h-full w-full object-cover"
            data-testid="img-facility-header"
          />
        </div>
        
        <div className="mt-6">
          <h1 className="mb-4 text-3xl font-bold" data-testid="text-facility-name">
            {language === 'en' ? facility.nameEn : facility.name}
          </h1>
          
          <p className="mb-4 text-lg text-muted-foreground">
            {language === 'en' ? facility.descriptionEn : facility.description}
          </p>
          
          <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{language === 'en' ? facility.locationEn : facility.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{facility.hours}</span>
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
      {showDirections && facility.mapLat && facility.mapLng && (
        <div className="mb-8">
          <MapComponent
            locations={[{
              id: facility.id,
              name: language === 'en' ? facility.nameEn : facility.name,
              latitude: parseFloat(facility.mapLat),
              longitude: parseFloat(facility.mapLng),
              markerColor: 'yellow',
              type: 'facility'
            }]}
            showDirectionsTo={{
              lat: parseFloat(facility.mapLat),
              lng: parseFloat(facility.mapLng),
              name: language === 'en' ? facility.nameEn : facility.name
            }}
          />
        </div>
      )}

      {/* Guides Section */}
      {guides && guides.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{t.howToUse}</h2>
          
          {guides.map((guide) => {
            const getGuideContent = () => {
              switch(language) {
                case 'en':
                  return JSON.parse(guide.contentEn);
                case 'uz':
                  return JSON.parse((guide as any).contentUz || guide.contentEn);
                case 'vi':
                  return JSON.parse((guide as any).contentVi || guide.contentEn);
                case 'zh':
                  return JSON.parse((guide as any).contentZh || guide.contentEn);
                default:
                  return JSON.parse(guide.content);
              }
            };
            
            const getGuideTitle = () => {
              switch(language) {
                case 'en':
                  return guide.titleEn;
                case 'uz':
                  return (guide as any).titleUz || guide.titleEn;
                case 'vi':
                  return (guide as any).titleVi || guide.titleEn;
                case 'zh':
                  return (guide as any).titleZh || guide.titleEn;
                default:
                  return guide.title;
              }
            };

            const steps = getGuideContent();
            
            return (
              <Card key={guide.id} data-testid={`card-guide-${guide.id}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      {getGuideTitle()}
                    </h3>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {steps.map((step: string | { type: string; text?: string; url?: string; alt?: string }, index: number) => {
                      // Handle legacy string format
                      if (typeof step === 'string') {
                        return (
                          <div key={index} className="flex gap-4">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="text-base leading-relaxed">{step}</p>
                              {index < steps.length - 1 && (
                                <Separator className="mt-4" />
                              )}
                            </div>
                          </div>
                        );
                      }

                      // Handle new object format (text or image)
                      if (step.type === 'text') {
                        return (
                          <div key={index} className="flex gap-4">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                              •
                            </div>
                            <div className="flex-1">
                              <p className="text-base leading-relaxed">{step.text}</p>
                            </div>
                          </div>
                        );
                      }

                      if (step.type === 'image') {
                        // 공제급여 신청서 이미지인 경우 확대해서 표시
                        const isApplicationForm = step.url?.includes('20251030_100231_1764128645441');
                        
                        return (
                          <div key={index} className="my-6 rounded-lg overflow-hidden border border-border">
                            {isApplicationForm ? (
                              <div className="relative w-full" style={{ height: '500px' }}>
                                <img
                                  src={step.url}
                                  alt={step.alt}
                                  className="absolute w-full h-auto"
                                  style={{
                                    transform: 'scale(1.8)',
                                    transformOrigin: 'center 35%',
                                    top: '0',
                                    left: '0',
                                  }}
                                  data-testid={`img-guide-${guide.id}-${index}`}
                                />
                              </div>
                            ) : (
                              <img
                                src={step.url}
                                alt={step.alt}
                                className="w-full h-auto object-contain"
                                data-testid={`img-guide-${guide.id}-${index}`}
                              />
                            )}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
