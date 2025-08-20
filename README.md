# Pakistan Pulse News

A modern, responsive news aggregator web application that delivers the latest Pakistan national news and international headlines. Built with React, TypeScript, and modern web technologies.

## 🚀 Features

- **Real-time News Updates**: Fetches latest news from The Guardian API
- **Pakistan Focus**: Dedicated section for Pakistan-specific news
- **Category Filtering**: Browse news by categories (Business, Technology, Sports, etc.)
- **Search Functionality**: Search for specific news topics
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes for comfortable reading
- **Infinite Scroll**: Seamless browsing experience with lazy loading
- **Loading States**: Skeleton screens and loading indicators for better UX
- **Error Handling**: Graceful fallbacks with mock data when API fails

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety and better development experience
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern, accessible component library

### State Management & Data
- **TanStack Query (React Query)** - Server state management and caching
- **React Context API** - Theme management

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing

## 📁 Project Structure

```
pakistan-pulse-news/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── NewsCard.tsx   # Individual news article card
│   │   ├── NewsLayout.tsx # Main news layout container
│   │   ├── Navigation.tsx # Top navigation bar
│   │   └── Loading*.tsx   # Loading states
│   ├── contexts/          # React contexts
│   │   └── ThemeContext.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── useInfiniteScroll.ts
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Main news page
│   │   └── NotFound.tsx   # 404 page
│   ├── services/          # API services
│   │   └── newsApi.ts     # News API integration
│   ├── types/             # TypeScript type definitions
│   │   └── news.ts        # News-related types
│   └── lib/               # Utility functions
│       └── utils.ts       # Helper functions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pakistan-pulse-news
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` in your web browser.

## 🏗️ Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## 🌐 API Integration

The application uses **The Guardian Open Platform API** to fetch news articles. The API integration includes:

- **Top Headlines**: Latest news from around the world
- **Pakistan News**: Dedicated endpoint for Pakistan-specific news
- **Category News**: Filter news by categories like business, technology, sports
- **Search**: Full-text search across news articles

### API Configuration
The API endpoints are configured in `src/services/newsApi.ts` with fallback to mock data when the API is unavailable.

## 🎨 Design & UI

- **Modern Design**: Clean, professional news layout
- **Responsive Grid**: Masonry-style layout for news cards
- **Typography**: Inter font for body text, Playfair Display for headlines
- **Color Scheme**: Professional blue/gray theme with dark mode support
- **Interactive Elements**: Hover effects, smooth transitions, loading skeletons

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Multi-column grid layout
- **Tablet**: 2-column grid layout
- **Mobile**: Single column with touch-friendly navigation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Muhammad Omer Mustafa**

## 🙏 Acknowledgments

- [The Guardian](https://www.theguardian.com/) for providing the news API
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Vite](https://vitejs.dev/) for the fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
