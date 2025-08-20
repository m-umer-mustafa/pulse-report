import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ 
  message = "Unable to load news articles. Please check your connection and try again.", 
  onRetry 
}: ErrorMessageProps) => {
  return (
    <div className="flex justify-center items-center min-h-[400px] p-4">
      <Card className="max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-destructive/10 rounded-full">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-xl font-semibold text-foreground">
            Something went wrong
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {message}
          </CardDescription>
        </CardHeader>
        {onRetry && (
          <CardContent>
            <Button 
              onClick={onRetry}
              className="w-full bg-primary hover:bg-primary-hover"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
};