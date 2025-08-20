import { NewsResponse, SearchFilters } from '@/types/news';

const GUARDIAN_API_BASE = 'https://content.guardianapis.com';
const NEWS_API_BASE = 'https://newsapi.org/v2';

export const newsService = {
  async fetchTopHeadlines(country: string = 'us', page: number = 1, pageSize: number = 9): Promise<NewsResponse> {
    try {
      // Using Guardian API for reliable free access
      const response = await fetch(
        `${GUARDIAN_API_BASE}/search?section=world&page=${page}&page-size=${pageSize}&show-fields=thumbnail,trailText&api-key=test`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      
      const articles = data.response.results.map((item: any) => ({
        title: item.webTitle,
        description: item.fields?.trailText || item.webTitle,
        url: item.webUrl,
        urlToImage: item.fields?.thumbnail || '/placeholder.svg',
        publishedAt: item.webPublicationDate,
        author: 'Guardian Staff',
        source: {
          name: 'The Guardian'
        },
        category: item.sectionName
      }));
      
      return {
        status: 'ok',
        totalResults: data.response.total,
        articles
      };
    } catch (error) {
      console.error('Error fetching news:', error);
      // Return mock data as fallback
      return {
        status: 'ok',
        totalResults: 3,
        articles: [
          {
            title: "Pakistan's Economic Recovery Shows Promising Signs",
            description: "Recent data indicates positive trends in Pakistan's economic indicators, with improved exports and industrial growth.",
            url: "#",
            urlToImage: "/placeholder.svg",
            publishedAt: new Date().toISOString(),
            author: "News Reporter",
            source: { name: "Pakistan Today" },
            category: "Business"
          },
          {
            title: "Karachi Development Project Launches New Phase",
            description: "Major infrastructure development initiative begins construction of modern transport system in Pakistan's largest city.",
            url: "#",
            urlToImage: "/placeholder.svg",
            publishedAt: new Date(Date.now() - 3600000).toISOString(),
            author: "City Reporter",
            source: { name: "Dawn News" },
            category: "Local"
          },
          {
            title: "Pakistani Technology Startup Wins International Award",
            description: "Innovative fintech solution from Lahore-based company receives recognition at global technology summit.",
            url: "#",
            urlToImage: "/placeholder.svg",
            publishedAt: new Date(Date.now() - 7200000).toISOString(),
            author: "Tech Correspondent",
            source: { name: "The News" },
            category: "Technology"
          }
        ]
      };
    }
  },

  async fetchPakistanNews(page: number = 1, pageSize: number = 6): Promise<NewsResponse> {
    try {
      // Fetch Pakistani news using search query
      const response = await fetch(
        `${GUARDIAN_API_BASE}/search?q=Pakistan&page=${page}&page-size=${pageSize}&show-fields=thumbnail,trailText&api-key=test`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch Pakistan news');
      }
      
      const data = await response.json();
      const articles = data.response.results.map((item: any) => ({
        title: item.webTitle,
        description: item.fields?.trailText || item.webTitle,
        url: item.webUrl,
        urlToImage: item.fields?.thumbnail || '/placeholder.svg',
        publishedAt: item.webPublicationDate,
        author: 'Guardian Staff',
        source: { name: 'The Guardian' },
        category: item.sectionName
      }));

      return {
        status: 'ok',
        totalResults: data.response.total,
        articles
      };
    } catch (error) {
      console.error('Error fetching Pakistan news:', error);
      // Return fallback Pakistan news
      return {
        status: 'ok',
        totalResults: 3,
        articles: [
          {
            title: "Pakistan's Economic Recovery Shows Promising Signs",
            description: "Recent data indicates positive trends in Pakistan's economic indicators, with improved exports and industrial growth.",
            url: "#",
            urlToImage: "/placeholder.svg",
            publishedAt: new Date().toISOString(),
            author: "News Reporter",
            source: { name: "Pakistan Today" },
            category: "Business"
          },
          {
            title: "Karachi Development Project Launches New Phase",
            description: "Major infrastructure development initiative begins construction of modern transport system in Pakistan's largest city.",
            url: "#",
            urlToImage: "/placeholder.svg",
            publishedAt: new Date(Date.now() - 3600000).toISOString(),
            author: "City Reporter",
            source: { name: "Dawn News" },
            category: "Local"
          },
          {
            title: "Pakistani Technology Startup Wins International Award",
            description: "Innovative fintech solution from Lahore-based company receives recognition at global technology summit.",
            url: "#",
            urlToImage: "/placeholder.svg",
            publishedAt: new Date(Date.now() - 7200000).toISOString(),
            author: "Tech Correspondent",
            source: { name: "The News" },
            category: "Technology"
          }
        ]
      };
    }
  },

  async fetchNewsByCategory(category: string, page: number = 1, pageSize: number = 9): Promise<NewsResponse> {
    try {
      const response = await fetch(
        `${GUARDIAN_API_BASE}/search?section=${category}&page=${page}&page-size=${pageSize}&show-fields=thumbnail,trailText&api-key=test`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch category news');
      }
      
      const data = await response.json();
      
      const articles = data.response.results.map((item: any) => ({
        title: item.webTitle,
        description: item.fields?.trailText || item.webTitle,
        url: item.webUrl,
        urlToImage: item.fields?.thumbnail || '/placeholder.svg',
        publishedAt: item.webPublicationDate,
        author: 'Guardian Staff',
        source: {
          name: 'The Guardian'
        },
        category: item.sectionName
      }));
      
      return {
        status: 'ok',
        totalResults: data.response.total,
        articles
      };
    } catch (error) {
      console.error('Error fetching category news:', error);
      return this.fetchPakistanNews();
    }
  },

  async searchNews(filters: SearchFilters): Promise<NewsResponse> {
    try {
      const queryParams = new URLSearchParams({
        q: filters.query,
        'page-size': '20',
        'show-fields': 'thumbnail,trailText',
        'api-key': 'test'
      });
      
      const response = await fetch(
        `${GUARDIAN_API_BASE}/search?${queryParams}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to search news');
      }
      
      const data = await response.json();
      
      const articles = data.response.results.map((item: any) => ({
        title: item.webTitle,
        description: item.fields?.trailText || item.webTitle,
        url: item.webUrl,
        urlToImage: item.fields?.thumbnail || '/placeholder.svg',
        publishedAt: item.webPublicationDate,
        author: 'Guardian Staff',
        source: {
          name: 'The Guardian'
        },
        category: item.sectionName
      }));
      
      return {
        status: 'ok',
        totalResults: data.response.total,
        articles
      };
    } catch (error) {
      console.error('Error searching news:', error);
      return this.fetchTopHeadlines();
    }
  }
};