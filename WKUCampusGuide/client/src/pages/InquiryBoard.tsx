import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Send, AlertCircle, MessageCircle, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { queryClient, apiRequest } from '@/lib/queryClient';
import type { Inquiry, InsertInquiry, Reply } from '@shared/schema';

function InquiryReplies({ inquiryId }: { inquiryId: string }) {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [showReplies, setShowReplies] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const { data: replies, isLoading } = useQuery<Reply[]>({
    queryKey: ['/api/inquiries', inquiryId, 'replies'],
    enabled: showReplies,
  });

  const createReplyMutation = useMutation({
    mutationFn: async (reply: { content: string; isAdmin: boolean; createdAt: string }) => {
      return apiRequest('POST', `/api/inquiries/${inquiryId}/replies`, reply);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inquiries', inquiryId, 'replies'] });
      setReplyContent('');
      toast({
        title: t.reply,
        description: language === 'ko' ? '답변이 등록되었습니다' : language === 'en' ? 'Your reply has been posted' : language === 'uz' ? 'Javobingiz yuborildi' : language === 'vi' ? 'Phản hồi của bạn đã được gửi' : '您的回复已发布',
      });
    },
    onError: () => {
      toast({
        title: t.error,
        description: language === 'ko' ? '등록에 실패했습니다' : 'Failed to post reply',
        variant: 'destructive',
      });
    },
  });

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) {
      toast({
        title: language === 'ko' ? '알림' : 'Notice',
        description: language === 'ko' ? '답변 내용을 입력해주세요' : 'Please enter your reply',
        variant: 'destructive',
      });
      return;
    }
    createReplyMutation.mutate({
      content: replyContent,
      isAdmin: false,
      createdAt: new Date().toISOString(),
    });
  };

  const getReplyContent = (reply: Reply) => {
    if (language === 'ko' && reply.contentKo) return reply.contentKo;
    if (language === 'en' && reply.contentEn) return reply.contentEn;
    if (language === 'uz' && reply.contentUz) return reply.contentUz;
    if (language === 'vi' && reply.contentVi) return reply.contentVi;
    if (language === 'zh' && reply.contentZh) return reply.contentZh;
    return reply.content;
  };

  return (
    <div className="mt-4 border-t pt-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowReplies(!showReplies)}
        className="gap-2"
        data-testid={`button-toggle-replies-${inquiryId}`}
      >
        <MessageCircle className="h-4 w-4" />
        {showReplies ? t.hideReplies : t.viewReplies}
        {showReplies ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        {replies && replies.length > 0 && (
          <Badge variant="secondary" className="ml-1">
            {replies.length}
          </Badge>
        )}
      </Button>

      {showReplies && (
        <div className="mt-4 space-y-4">
          {isLoading ? (
            <div className="text-center text-sm text-muted-foreground py-4">
              {t.loading}
            </div>
          ) : replies && replies.length > 0 ? (
            <div className="space-y-3">
              {replies.map((reply) => (
                <div
                  key={reply.id}
                  className={`rounded-lg p-3 ${
                    reply.isAdmin
                      ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                      : 'bg-muted/50'
                  }`}
                  data-testid={`reply-${reply.id}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {reply.isAdmin && (
                      <Badge variant="default" className="gap-1 bg-blue-600">
                        <Shield className="h-3 w-3" />
                        {t.adminReply}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(reply.createdAt).toLocaleString(
                        language === 'ko' ? 'ko-KR' : language === 'en' ? 'en-US' : 'default'
                      )}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap" data-testid={`text-reply-content-${reply.id}`}>
                    {getReplyContent(reply)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-sm text-muted-foreground py-4">
              {t.noReplies}
            </div>
          )}

          <form onSubmit={handleSubmitReply} className="flex gap-2">
            <Input
              placeholder={t.replyPlaceholder}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="flex-1"
              data-testid={`input-reply-${inquiryId}`}
            />
            <Button
              type="submit"
              size="sm"
              disabled={createReplyMutation.isPending}
              data-testid={`button-submit-reply-${inquiryId}`}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function InquiryBoard() {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'question' | 'request'>('question');
  const [selectedTab, setSelectedTab] = useState<'all' | 'question' | 'request'>('all');

  const { data: inquiries, isLoading } = useQuery<Inquiry[]>({
    queryKey: ['/api/inquiries'],
  });

  const createMutation = useMutation({
    mutationFn: async (inquiry: InsertInquiry) => {
      return apiRequest('POST', '/api/inquiries', inquiry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inquiries'] });
      setTitle('');
      setContent('');
      setType('question');
      toast({
        title: language === 'ko' ? '등록되었습니다' : language === 'en' ? 'Posted' : language === 'uz' ? 'Yuborildi' : language === 'vi' ? 'Đã gửi' : '已发布',
        description: language === 'ko' ? '감사합니다!' : language === 'en' ? 'Thank you!' : language === 'uz' ? 'Rahmat!' : language === 'vi' ? 'Cảm ơn bạn!' : '谢谢！',
      });
    },
    onError: () => {
      toast({
        title: language === 'ko' ? '오류' : 'Error',
        description: language === 'ko' ? '등록에 실패했습니다' : 'Failed to post',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast({
        title: language === 'ko' ? '알림' : 'Notice',
        description: language === 'ko' ? '제목과 내용을 입력해주세요' : 'Please fill in title and content',
        variant: 'destructive',
      });
      return;
    }
    createMutation.mutate({
      title,
      content,
      type,
      createdAt: new Date().toISOString(),
    } as InsertInquiry);
  };

  const filteredInquiries = inquiries?.filter((inquiry) => {
    if (selectedTab === 'all') return true;
    return (inquiry as any).type === selectedTab;
  }) || [];

  const getTypeLabel = (inquiryType: string) => {
    if (inquiryType === 'question') return t.question;
    if (inquiryType === 'request') return t.request;
    return inquiryType;
  };

  const getTypeColor = (inquiryType: string) => {
    if (inquiryType === 'question') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (inquiryType === 'request') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    return '';
  };

  const getInquiryTitle = (inquiry: Inquiry) => {
    if (language === 'ko' && inquiry.titleKo) return inquiry.titleKo;
    if (language === 'en' && inquiry.titleEn) return inquiry.titleEn;
    if (language === 'uz' && inquiry.titleUz) return inquiry.titleUz;
    if (language === 'vi' && inquiry.titleVi) return inquiry.titleVi;
    if (language === 'zh' && inquiry.titleZh) return inquiry.titleZh;
    return inquiry.title;
  };

  const getInquiryContent = (inquiry: Inquiry) => {
    if (language === 'ko' && inquiry.contentKo) return inquiry.contentKo;
    if (language === 'en' && inquiry.contentEn) return inquiry.contentEn;
    if (language === 'uz' && inquiry.contentUz) return inquiry.contentUz;
    if (language === 'vi' && inquiry.contentVi) return inquiry.contentVi;
    if (language === 'zh' && inquiry.contentZh) return inquiry.contentZh;
    return inquiry.content;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold" data-testid="text-inquiry-title">
        {t.inquiryBoard}
      </h1>

      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">
                {t.askQuestion}
              </h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t.inquiryType}
                  </label>
                  <Select value={type} onValueChange={(value: any) => setType(value)}>
                    <SelectTrigger data-testid="select-inquiry-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="question">{t.question}</SelectItem>
                      <SelectItem value="request">{t.request}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t.questionTitle}
                  </label>
                  <Input
                    placeholder={t.titlePlaceholder}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    data-testid="input-inquiry-title"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t.questionContent}
                  </label>
                  <Textarea
                    placeholder={t.contentPlaceholder}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="resize-none"
                    rows={5}
                    data-testid="textarea-inquiry-content"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="gap-2"
                  data-testid="button-submit-inquiry"
                >
                  <Send className="h-4 w-4" />
                  {createMutation.isPending ? (language === 'ko' ? '등록중...' : 'Posting...') : t.submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex gap-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  {language === 'ko' ? '안내' : language === 'en' ? 'Notice' : language === 'uz' ? 'Eʼlon' : language === 'vi' ? 'Thông báo' : '公告'}
                </h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {language === 'ko' ? '캠퍼스 식당, 시설에 관한 질문이나 요청을 자유롭게 올려주세요.' : language === 'en' ? 'Feel free to ask questions or make requests about campus dining and facilities.' : language === 'uz' ? 'Kampus xorij ovqatlanish va tilshunoq haqida savol yoki so\'rovni bering.' : language === 'vi' ? 'Tự do đặt câu hỏi hoặc yêu cầu về ẩm thực và tiện ích của khuôn viên.' : '请随时提出关于校园餐饮和设施的问题或请求。'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTab === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedTab('all')}
            data-testid="button-filter-all"
            size="sm"
          >
            {language === 'ko' ? '전체' : language === 'en' ? 'All' : language === 'uz' ? 'Hammasi' : language === 'vi' ? 'Tất cả' : '全部'}
          </Button>
          <Button
            variant={selectedTab === 'question' ? 'default' : 'outline'}
            onClick={() => setSelectedTab('question')}
            data-testid="button-filter-questions"
            size="sm"
          >
            {t.questions}
          </Button>
          <Button
            variant={selectedTab === 'request' ? 'default' : 'outline'}
            onClick={() => setSelectedTab('request')}
            data-testid="button-filter-requests"
            size="sm"
          >
            {t.requests}
          </Button>
        </div>

        <h2 className="text-2xl font-bold">
          {selectedTab === 'all' && (language === 'ko' ? '모든 문의' : language === 'en' ? 'All Posts' : language === 'uz' ? 'Barcha Savollar' : language === 'vi' ? 'Tất cả Bài đăng' : '所有帖子')}
          {selectedTab === 'question' && (language === 'ko' ? '질문' : language === 'en' ? 'Questions' : language === 'uz' ? 'Savollar' : language === 'vi' ? 'Câu hỏi' : '问题')}
          {selectedTab === 'request' && (language === 'ko' ? '요청' : language === 'en' ? 'Requests' : language === 'uz' ? 'So\'rovlar' : language === 'vi' ? 'Yêu cầu' : '请求')}
        </h2>

        {isLoading ? (
          <div className="text-center text-muted-foreground">
            {t.loading}
          </div>
        ) : filteredInquiries && filteredInquiries.length > 0 ? (
          filteredInquiries.map((inquiry) => (
            <Card key={inquiry.id} className="hover-elevate transition-all" data-testid={`card-inquiry-${inquiry.id}`}>
              <CardHeader>
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold flex-1" data-testid={`text-inquiry-title-${inquiry.id}`}>
                      {getInquiryTitle(inquiry)}
                    </h3>
                    <Badge 
                      className={getTypeColor((inquiry as any).type || 'question')}
                      variant="secondary"
                      data-testid={`badge-type-${inquiry.id}`}
                    >
                      {getTypeLabel((inquiry as any).type || 'question')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground" data-testid={`text-inquiry-date-${inquiry.id}`}>
                    {new Date(inquiry.createdAt).toLocaleString(language === 'ko' ? 'ko-KR' : language === 'en' ? 'en-US' : 'default')}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm" data-testid={`text-inquiry-content-${inquiry.id}`}>
                  {getInquiryContent(inquiry)}
                </p>
                <InquiryReplies inquiryId={inquiry.id} />
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              {selectedTab === 'all' && (language === 'ko' ? '아직 문의가 없습니다.' : language === 'en' ? 'No posts yet.' : language === 'uz' ? 'Hali savol yo\'q.' : language === 'vi' ? 'Chưa có bài đăng nào.' : '还没有帖子。')}
              {selectedTab === 'question' && (language === 'ko' ? '아직 질문이 없습니다.' : language === 'en' ? 'No questions yet.' : language === 'uz' ? 'Hali savol yo\'q.' : language === 'vi' ? 'Chưa có câu hỏi nào.' : '还没有问题。')}
              {selectedTab === 'request' && (language === 'ko' ? '아직 요청이 없습니다.' : language === 'en' ? 'No requests yet.' : language === 'uz' ? 'Hali so\'rovlar yo\'q.' : language === 'vi' ? 'Chưa có yêu cầu nào.' : '还没有请求。')}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
