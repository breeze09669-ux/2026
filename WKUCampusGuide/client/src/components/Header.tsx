import { Link } from 'wouter';
import { Heart, Home, Building2, UtensilsCrossed, HelpCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/">
          <Button 
            variant="ghost" 
            className="gap-2 text-lg font-semibold hover-elevate active-elevate-2"
            data-testid="link-home"
          >
            <Building2 className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline">{t.heroTitle}</span>
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/">
            <Button 
              variant="ghost" 
              data-testid="button-nav-home"
              className="gap-2 hover-elevate active-elevate-2"
            >
              <Home className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">{t.home}</span>
            </Button>
          </Link>
          <Link href="/restaurants">
            <Button 
              variant="ghost" 
              data-testid="button-nav-restaurants"
              className="gap-2 hover-elevate active-elevate-2"
            >
              <UtensilsCrossed className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">{t.restaurants}</span>
            </Button>
          </Link>
          <Link href="/learning">
            <Button 
              variant="ghost" 
              data-testid="button-nav-learning"
              className="gap-2 hover-elevate active-elevate-2"
            >
              <BookOpen className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">{t.learningCenter}</span>
            </Button>
          </Link>
          <Link href="/favorites">
            <Button 
              variant="ghost" 
              data-testid="button-nav-favorites"
              className="gap-2 hover-elevate active-elevate-2"
            >
              <Heart className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">{t.favorites}</span>
            </Button>
          </Link>
          <Link href="/inquiries">
            <Button 
              variant="ghost" 
              data-testid="button-nav-inquiries"
              className="gap-2 hover-elevate active-elevate-2"
            >
              <HelpCircle className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">{t.inquiryBoard}</span>
            </Button>
          </Link>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
