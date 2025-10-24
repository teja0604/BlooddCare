import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-6 text-center">
      <div className="space-y-6 max-w-md">
        <div className="space-y-3">
          <h1 className="text-8xl font-bold text-red-600">404</h1>
          <h2 className="text-2xl font-semibold text-red-800">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-gradient-to-r from-red-500 to-red-700 text-white hover:opacity-90">
            <a href="/">Return Home</a>
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-red-600 text-red-600 hover:bg-red-50"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
