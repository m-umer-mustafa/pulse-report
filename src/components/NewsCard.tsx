import { NewsArticle } from '@/types/news';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NewsCardProps {
  article: NewsArticle;
  className?: string;
  style?: React.CSSProperties;
}

export const NewsCard = ({ article, className, style }: NewsCardProps) => {
  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/placeholder.svg';
  };

  return (
    <Card 
      className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-news-card hover:bg-news-card-hover border-border flex flex-col h-full ${className}`}
      style={style}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={article.urlToImage || '/placeholder.svg'}
          alt={article.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />
        {article.category && (
          <Badge 
            className="absolute top-3 left-3 bg-news-category text-white font-medium px-2 py-1"
          >
            {article.category}
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="text-lg font-semibold leading-tight line-clamp-2 text-card-foreground group-hover:text-primary transition-colors duration-300">
          {article.title}
        </CardTitle>
        <CardDescription className="text-sm text-news-date line-clamp-3 mt-2">
          {article.description}
        </CardDescription>
      </CardHeader>
      
      <div className="flex-grow"></div>
      
      <CardContent className="pt-0 mt-auto">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-2">
            {article.author && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span className="truncate max-w-20">{article.author}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
          <span className="font-medium text-news-category">
            {article.source.name}
          </span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
          onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
        >
          Read More
          <ExternalLink className="w-3 h-3 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};