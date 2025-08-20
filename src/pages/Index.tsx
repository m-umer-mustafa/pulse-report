import { ThemeProvider } from '@/contexts/ThemeContext';
import { NewsLayout } from '@/components/NewsLayout';

const Index = () => {
  return (
    <ThemeProvider>
      <NewsLayout />
    </ThemeProvider>
  );
};

export default Index;
