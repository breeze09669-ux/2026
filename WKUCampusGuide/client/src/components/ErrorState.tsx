import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface ErrorStateProps {
  onRetry?: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  const { t, language } = useLanguage();

  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <Card className="max-w-md">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">{t.error}</h3>
          <p className="mb-6 text-sm text-muted-foreground">
            {language === 'ko' && '데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.'}
            {language === 'en' && 'There was a problem loading the data. Please try again.'}
            {language === 'uz' && 'Ma\'lumotlarni yuklashda muammo yuz berdi. Qayta urinib ko\'ring.'}
            {language === 'vi' && 'Đã xảy ra sự cố khi tải dữ liệu. Vui lòng thử lại.'}
            {language === 'zh' && '加载数据时出现问题。请重试。'}
          </p>
          {onRetry && (
            <Button onClick={onRetry} className="gap-2" data-testid="button-retry">
              <RefreshCw className="h-4 w-4" />
              {language === 'ko' && '다시 시도'}
              {language === 'en' && 'Try Again'}
              {language === 'uz' && 'Qayta urinish'}
              {language === 'vi' && 'Thử lại'}
              {language === 'zh' && '重试'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
