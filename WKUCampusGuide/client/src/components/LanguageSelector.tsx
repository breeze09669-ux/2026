import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { languageNames, languageFlags, type Language } from '@/lib/i18n';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const languages: Language[] = ['ko', 'en', 'uz', 'vi', 'zh'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost"
          data-testid="button-language-selector"
          className="gap-2 hover-elevate active-elevate-2"
        >
          <Languages className="h-5 w-5" />
          <span className="hidden sm:inline text-sm">언어</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            data-testid={`menu-item-language-${lang}`}
            className={language === lang ? 'bg-accent' : ''}
          >
            <span className="mr-2 text-lg">{languageFlags[lang]}</span>
            <span className="font-medium">{languageNames[lang]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
