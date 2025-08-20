import { Loader2 } from 'lucide-react';

interface LoadingMoreProps {
  isLoading: boolean;
  hasMore: boolean;
}

export const LoadingMore = ({ isLoading, hasMore }: LoadingMoreProps) => {
  if (!isLoading) return null;

  return (
    <div className="flex justify-center items-center py-8">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading more news...</span>
      </div>
    </div>
  );
};
