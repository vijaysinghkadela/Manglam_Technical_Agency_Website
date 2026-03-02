import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import MotionWrapper from '@/components/ui/MotionWrapper';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <MotionWrapper>
        <div className="text-center max-w-md">
          <div className="text-8xl font-heading font-extrabold gradient-text mb-4">404</div>
          <h1 className="text-2xl font-heading font-bold text-text-primary mb-3">Page Not Found</h1>
          <p className="text-sm text-text-muted mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/">
              <Button icon={<Home className="w-4 h-4" />}>Back to Home</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" icon={<ArrowLeft className="w-4 h-4" />}>Contact Support</Button>
            </Link>
          </div>
        </div>
      </MotionWrapper>
    </div>
  );
}
