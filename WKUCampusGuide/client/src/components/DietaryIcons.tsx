import { Beef, Flame, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/LanguageContext';

interface DietaryIconsProps {
  hasPork?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function DietaryIcons({ hasPork, isSpicy, isVegetarian, size = 'md' }: DietaryIconsProps) {
  const { t } = useLanguage();
  
  const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5';
  const badgeSize = size === 'sm' ? 'text-xs px-2 py-0.5' : '';

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {hasPork && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant="destructive" 
              className={`gap-1 ${badgeSize}`}
              data-testid="badge-pork"
            >
              <Beef className={iconSize} />
              <span className="text-xs">{t.containsPork}</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t.containsPork}</p>
          </TooltipContent>
        </Tooltip>
      )}
      
      {isSpicy && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant="secondary" 
              className={`gap-1 bg-orange-100 text-orange-800 border-orange-200 ${badgeSize}`}
              data-testid="badge-spicy"
            >
              <Flame className={iconSize} />
              <span className="text-xs">{t.spicy}</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t.spicy}</p>
          </TooltipContent>
        </Tooltip>
      )}
      
      {isVegetarian && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant="secondary" 
              className={`gap-1 bg-green-100 text-green-800 border-green-200 ${badgeSize}`}
              data-testid="badge-vegetarian"
            >
              <Leaf className={iconSize} />
              <span className="text-xs">{t.vegetarian}</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t.vegetarian}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
