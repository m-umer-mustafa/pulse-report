import { useState, useEffect } from 'react';
import { NewsArticle } from '@/types/news';
import { newsService } from '@/services/newsApi';
import { NewsCard } from '@/components/NewsCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Navigation } from '@/components/Navigation';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Globe, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export const NewsLayout = () => {
  const [nationalNews, setNationalNews] = useState<NewsArticle[]>([]);
  const [internationalNews, setInternationalNews] = useState<NewsArticle[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [page, setPage] = useState(1); 
  const [natPage, setNatPage] = useState(1); 
  const [hasMoreIntl, setHasMoreIntl] = useState(true);
  const [hasMoreNat, setHasMoreNat] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchInitialNews();
  }, []);

  const fetchInitialNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const [internationalResponse, pakistanResponse] = await Promise.all([
        newsService.fetchTopHeadlines('us', 1, 9),
        newsService.fetchPakistanNews(1, 6),
      ]);

      

      setInternationalNews(internationalResponse.articles);
      setNationalNews(pakistanResponse.articles);

      setPage(1);
      setNatPage(1);

      setHasMoreIntl(internationalResponse.articles.length > 0);
      setHasMoreNat(pakistanResponse.articles.length > 0);

      toast({
        title: 'News loaded successfully',
        description: 'Latest headlines are now available.',
      });
    } catch (err) {
      setError('Failed to load news articles');
      toast({
        title: 'Error loading news',
        description: 'Please check your connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMoreInternational = async () => {
    if (!hasMoreIntl || isSearchMode) return;
    const nextPage = page + 1;
    const response = await newsService.fetchTopHeadlines('us', nextPage, 9);
    if (response.articles.length === 0) {
      setHasMoreIntl(false);
      return;
    }
    setInternationalNews((prev) => [...prev, ...response.articles]);
    setPage(nextPage);
  };

  const loadMoreNational = async () => {
    if (!hasMoreNat || isSearchMode) return;
    const nextPage = natPage + 1;
    const response = await newsService.fetchPakistanNews(nextPage, 6);
    if (response.articles.length === 0) {
      setHasMoreNat(false);
      return;
    }
    setNationalNews((prev) => [...prev, ...response.articles]);
    setNatPage(nextPage);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setIsSearchMode(false);
      setSearchQuery('');
      return;
    }

    try {
      setLoading(true);
      setSearchQuery(query);
      setIsSearchMode(true);

      const searchResponse = await newsService.searchNews({
        query,
        category: activeCategory === 'all' ? '' : activeCategory,
      });

      setFilteredNews(searchResponse.articles);

      toast({
        title: 'Search completed',
        description: `Found ${searchResponse.articles.length} articles for "${query}"`,
      });
    } catch (err) {
      toast({
        title: 'Search failed',
        description: 'Please try again with different keywords.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (category: string) => {
    setActiveCategory(category);

    if (category === 'all') {
      setIsSearchMode(false);
      setSearchQuery('');
      return;
    }

    try {
      setLoading(true);
      let categoryResponse;

      if (category === 'latest') {
        categoryResponse = await newsService.fetchTopHeadlines('us');
        categoryResponse.articles.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
      } else {
        categoryResponse = await newsService.fetchNewsByCategory(category);
      }

      setFilteredNews(categoryResponse.articles);
      setIsSearchMode(true);

      const categoryLabel =
        category === 'latest'
          ? 'Latest News'
          : category === 'trending'
          ? 'Most Watched News'
          : `${category} news`;

      toast({
        title: 'Category filtered',
        description: `Showing ${categoryLabel}`,
      });
    } catch (err) {
      toast({
        title: 'Filter failed',
        description: 'Unable to filter by category.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (error && !nationalNews.length && !internationalNews.length) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          activeCategory={activeCategory}
        />
        <ErrorMessage message={error} onRetry={fetchInitialNews} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        activeCategory={activeCategory}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            Pulse Report
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted source for the latest national and international
            headlines
          </p>
        </section>

        {/* Search Results or Category Filter Results */}
        {isSearchMode && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : activeCategory === 'latest'
                  ? 'Latest News'
                  : activeCategory === 'trending'
                  ? 'Most Watched News'
                  : `${activeCategory.charAt(0).toUpperCase() +
                      activeCategory.slice(1)} News`}
              </h2>
              <Badge variant="outline" className="text-sm">
                {filteredNews.length} articles
              </Badge>
            </div>

            {loading ? (
              <LoadingSkeleton count={6} />
            ) : filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((article, index) => (
                  <NewsCard
                    key={`${article.url}-${index}`}
                    article={article}
                    className="animate-scale-in"
                    style={
                      { animationDelay: `${index * 0.1}s` } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No articles found. Try different keywords or category.
                </p>
              </div>
            )}
          </section>
        )}

        {/* National and International News (Default View) */}
        {!isSearchMode && (
          <>
            {/* National News Section */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-display font-bold text-foreground">
                    Pakistan National News
                  </h2>
                </div>
                <Badge
                  variant="outline"
                  className="text-sm bg-primary/10 text-primary border-primary/20"
                >
                  Latest Headlines
                </Badge>
              </div>

              {loading && nationalNews.length === 0 ? (
                <LoadingSkeleton count={6} />
              ) : nationalNews.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nationalNews.map((article, index) => (
                      <NewsCard
                        key={`national-${article.url}-${index}`}
                        article={article}
                        className="animate-scale-in"
                        style={
                          { animationDelay: `${index * 0.1}s` } as React.CSSProperties
                        }
                      />
                    ))}
                  </div>
                  {hasMoreNat && (
                    <div className="flex justify-center mt-6">
                      <Button onClick={loadMoreNational}>Load More Local News</Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Unable to load national news at this time.
                  </p>
                </div>
              )}
              {!hasMoreNat && (
                <p className="text-center py-4 text-muted-foreground">
                  No more national news
                </p>
              )}
            </section>

            <Separator className="my-12" />

            {/* International News Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <Globe className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-display font-bold text-foreground">
                    International News
                  </h2>
                </div>
                <Badge
                  variant="outline"
                  className="text-sm bg-primary/10 text-primary border-primary/20"
                >
                  Global Headlines
                </Badge>
              </div>

              {loading && internationalNews.length === 0 ? (
                <LoadingSkeleton count={9} />
              ) : internationalNews.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {internationalNews.map((article, index) => (
                      <NewsCard
                        key={`international-${article.url}-${index}`}
                        article={article}
                        className="animate-scale-in"
                        style={
                          { animationDelay: `${index * 0.1}s` } as React.CSSProperties
                        }
                      />
                    ))}
                  </div>
                  {hasMoreIntl && (
                    <div className="flex justify-center mt-6">
                      <Button onClick={loadMoreInternational}>
                        Load More International News
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Unable to load international news at this time.
                  </p>
                </div>
              )}
              {!hasMoreIntl && (
                <p className="text-center py-4 text-muted-foreground">
                  No more international news
                </p>
              )}
            </section>
          </>
        )}
      </main>

      <footer className="bg-muted/30 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2025 Pulse Report. Bringing you the latest news from
              Pakistan and around the world.
            </p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
};
