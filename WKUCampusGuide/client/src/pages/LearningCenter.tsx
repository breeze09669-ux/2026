import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Volume2, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import restaurantVideoUrl from '@assets/___202511111658_jvgt4_1764742442192.mp4';

interface PhraseItem {
  korean: string;
  english: string;
  pronunciation: string;
  category: string;
}

interface TranscriptLine {
  timestamp: string;
  korean: string;
  english: string;
  speaker?: string;
}

const VIDEO_TRANSCRIPT: TranscriptLine[] = [
  {
    timestamp: '0:00',
    korean: '교내 식당에서는 키오스크로 주문하고 번호 나오면 음식을 받아가면 돼.',
    english: 'At the campus cafeteria, you order at the kiosk and pick up your food when your number is called.',
    speaker: '직원',
  },
  {
    timestamp: '0:08',
    korean: '다 먹고 나면 어떻게 해야 돼?',
    english: 'What should I do after I finish eating?',
    speaker: '외국인 학생',
  },
  {
    timestamp: '0:12',
    korean: '퇴식구에 식판이랑 쓰레기랑 구분해서 반납하면 돼.',
    english: 'Return your tray at the return station and separate the trash.',
    speaker: '직원',
  },
  {
    timestamp: '0:18',
    korean: '아하, 그럼 팁은 어디에 줘?',
    english: 'Ah, so where do I leave a tip?',
    speaker: '외국인 학생',
  },
  {
    timestamp: '0:22',
    korean: '한국에서는 팁을 따로 주지 않아! 그냥 맛있게 먹고 가면 돼.',
    english: "In Korea, we don't give tips! Just enjoy your meal and go.",
    speaker: '직원',
  },
];

const PHRASES: PhraseItem[] = [
  {
    korean: '여기서 뭘 먹을 수 있어요?',
    english: 'What can I eat here?',
    pronunciation: 'yeo-gi-seo mwo-reul meok-eul su it-eo-yo?',
    category: 'restaurant',
  },
  {
    korean: '메뉴 좀 주세요.',
    english: 'Can I have the menu, please?',
    pronunciation: 'me-nu jom ju-se-yo.',
    category: 'restaurant',
  },
  {
    korean: '이건 뭐예요?',
    english: 'What is this?',
    pronunciation: 'i-geon mwo-ye-yo?',
    category: 'restaurant',
  },
  {
    korean: '돼지고기 없어요.',
    english: 'No pork, please.',
    pronunciation: 'dwae-ji-go-gi eop-seo-yo.',
    category: 'restaurant',
  },
  {
    korean: '매운맛으로 주세요.',
    english: 'Make it spicy, please.',
    pronunciation: 'mae-un-mas-eu-ro ju-se-yo.',
    category: 'restaurant',
  },
  {
    korean: '물 좀 주세요.',
    english: 'Can I have some water, please?',
    pronunciation: 'mul jom ju-se-yo.',
    category: 'restaurant',
  },
  {
    korean: '도서관은 어디예요?',
    english: 'Where is the library?',
    pronunciation: 'do-seo-gwan-eun eo-di-ye-yo?',
    category: 'directions',
  },
  {
    korean: '서점은 어디예요?',
    english: 'Where is the bookstore?',
    pronunciation: 'seo-jeom-eun eo-di-ye-yo?',
    category: 'directions',
  },
  {
    korean: '화장실은 어디예요?',
    english: 'Where is the restroom?',
    pronunciation: 'hwa-jang-sil-eun eo-di-ye-yo?',
    category: 'directions',
  },
  {
    korean: '학생식당은 어디예요?',
    english: 'Where is the student cafeteria?',
    pronunciation: 'hak-saeng-sik-dang-eun eo-di-ye-yo?',
    category: 'directions',
  },
  {
    korean: '감사합니다.',
    english: 'Thank you.',
    pronunciation: 'gam-sa-ham-ni-da.',
    category: 'common',
  },
  {
    korean: '안녕하세요.',
    english: 'Hello.',
    pronunciation: 'an-nyeong-ha-se-yo.',
    category: 'common',
  },
];

export default function LearningCenter() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('video');

  const getTranslation = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      ko: {
        learningCenter: '학습 센터',
        listeningAndSpeaking: '듣기 & 말하기',
        orderingTutorial: '식당 주문 방법',
        koreanPhrases: '한국어 표현',
        phrases: '표현',
        english: '영어',
        pronunciation: '발음',
        restaurant: '식당',
        directions: '길 찾기',
        common: '기본 인사',
        watchVideo: '영상 보기',
        restaurantOrdering: '식당에서 주문하는 방법 (비디오)',
        backToHome: '홈으로',
        transcript: '자막 (대본)',
        staff: '직원',
        internationalStudent: '외국인 학생',
      },
      en: {
        learningCenter: 'Learning Center',
        listeningAndSpeaking: 'Listening & Speaking',
        orderingTutorial: 'Restaurant Ordering Tutorial',
        koreanPhrases: 'Korean Phrases',
        phrases: 'Phrases',
        english: 'English',
        pronunciation: 'Pronunciation',
        restaurant: 'Restaurant',
        directions: 'Directions',
        common: 'Common',
        watchVideo: 'Watch Video',
        restaurantOrdering: 'How to Order at a Restaurant (Video)',
        backToHome: 'Back to Home',
        transcript: 'Transcript',
        staff: 'Staff',
        internationalStudent: 'International Student',
      },
      uz: {
        learningCenter: 'O\'rganish Markazi',
        listeningAndSpeaking: 'Eshitish & Gaplash',
        orderingTutorial: 'Restoranda Buyurtma Qilish',
        koreanPhrases: 'Koreys Iboralar',
        phrases: 'Iboralar',
        english: 'Inglizcha',
        pronunciation: 'Talaffuz',
        restaurant: 'Restoran',
        directions: 'Yo\'nalishlar',
        common: 'Umumiy',
        watchVideo: 'Videoni Ko\'ring',
        restaurantOrdering: 'Restoranda Buyurtma Qilish (Video)',
        backToHome: 'Bosh Sahifaga',
        transcript: 'Matn',
        staff: 'Xodim',
        internationalStudent: 'Xorijiy Talaba',
      },
      vi: {
        learningCenter: 'Trung tâm Học tập',
        listeningAndSpeaking: 'Nghe & Nói',
        orderingTutorial: 'Hướng dẫn Đặt hàng',
        koreanPhrases: 'Cụm từ Tiếng Hàn',
        phrases: 'Cụm từ',
        english: 'Tiếng Anh',
        pronunciation: 'Phát âm',
        restaurant: 'Nhà hàng',
        directions: 'Hướng dẫn',
        common: 'Thông dụng',
        watchVideo: 'Xem Video',
        restaurantOrdering: 'Cách Đặt hàng tại Nhà hàng (Video)',
        backToHome: 'Về Trang chủ',
        transcript: 'Phụ đề',
        staff: 'Nhân viên',
        internationalStudent: 'Du học sinh',
      },
      zh: {
        learningCenter: '学习中心',
        listeningAndSpeaking: '听力和口语',
        orderingTutorial: '餐厅订购教程',
        koreanPhrases: '韩语短语',
        phrases: '短语',
        english: '英语',
        pronunciation: '发音',
        restaurant: '餐厅',
        directions: '方向',
        common: '常见',
        watchVideo: '观看视频',
        restaurantOrdering: '如何在餐厅订购（视频）',
        backToHome: '返回首页',
        transcript: '字幕',
        staff: '工作人员',
        internationalStudent: '留学生',
      },
    };
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const getCategoryLabel = (category: string): string => {
    return getTranslation(category === 'restaurant' ? 'restaurant' : category === 'directions' ? 'directions' : 'common');
  };

  const phrasesByCategory = {
    restaurant: PHRASES.filter(p => p.category === 'restaurant'),
    directions: PHRASES.filter(p => p.category === 'directions'),
    common: PHRASES.filter(p => p.category === 'common'),
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold" data-testid="text-learning-center-title">
              {getTranslation('learningCenter')}
            </h1>
            <p className="mt-2 text-muted-foreground">{getTranslation('listeningAndSpeaking')}</p>
          </div>
          <Link href="/">
            <Button variant="ghost" size="icon" data-testid="button-back-home">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2" data-testid="tabs-learning">
            <TabsTrigger value="video" data-testid="tab-video">
              <PlayCircle className="mr-2 h-4 w-4" />
              {getTranslation('watchVideo')}
            </TabsTrigger>
            <TabsTrigger value="phrases" data-testid="tab-phrases">
              <Volume2 className="mr-2 h-4 w-4" />
              {getTranslation('phrases')}
            </TabsTrigger>
          </TabsList>

          {/* Video Tab */}
          <TabsContent value="video" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{getTranslation('restaurantOrdering')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center rounded-lg bg-black/5 p-8">
                  <video
                    src={restaurantVideoUrl}
                    controls
                    className="max-h-96 w-full rounded-lg"
                    data-testid="video-restaurant-ordering"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Transcript Section */}
            <Card>
              <CardHeader>
                <CardTitle>{getTranslation('transcript')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {VIDEO_TRANSCRIPT.map((line, idx) => {
                    const getSpeakerLabel = (speaker?: string) => {
                      if (!speaker) return '';
                      if (speaker === '직원') return getTranslation('staff');
                      if (speaker === '외국인 학생') return getTranslation('internationalStudent');
                      return speaker;
                    };

                    const getSpeakerColor = (speaker?: string) => {
                      if (speaker === '직원') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
                      if (speaker === '외국인 학생') return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
                      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
                    };

                    return (
                      <div
                        key={idx}
                        className="rounded-lg border p-4"
                        data-testid={`transcript-line-${idx}`}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <span className="text-sm font-mono text-muted-foreground">
                            {line.timestamp}
                          </span>
                          {line.speaker && (
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getSpeakerColor(line.speaker)}`}>
                              {getSpeakerLabel(line.speaker)}
                            </span>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg font-medium">{line.korean}</p>
                          <p className="text-muted-foreground">{line.english}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Phrases Tab */}
          <TabsContent value="phrases" className="space-y-6">
            {Object.entries(phrasesByCategory).map(([category, phrases]) => (
              <div key={category}>
                <h2 className="mb-4 text-2xl font-semibold">{getCategoryLabel(category)}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {phrases.map((phrase, idx) => (
                    <Card key={idx} className="hover-elevate transition-all" data-testid={`card-phrase-${category}-${idx}`}>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground">한국어</p>
                            <p className="text-lg font-medium">{phrase.korean}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground">{getTranslation('english')}</p>
                            <p className="text-base">{phrase.english}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground">{getTranslation('pronunciation')}</p>
                            <p className="font-mono text-sm italic text-accent">{phrase.pronunciation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
