import { useNavigate } from 'react-router-dom';
import { Home, Search, Package, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';
import { ROUTES } from '../utils/constants';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-[180px] md:text-[240px] font-bold text-neutral-200 leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="h-24 w-24 md:h-32 md:w-32 text-primary animate-bounce" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-neutral-600 mb-8 max-w-md mx-auto">
          The page you're looking for seems to have been shipped to another location. Let's get you back on track!
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Home className="h-5 w-5" />}
            onClick={() => navigate(ROUTES.HOME)}
          >
            Go Home
          </Button>
          <Button
            variant="outline"
            size="lg"
            leftIcon={<Search className="h-5 w-5" />}
            onClick={() => navigate(ROUTES.TRACK)}
          >
            Track Shipment
          </Button>
          <Button
            variant="ghost"
            size="lg"
            leftIcon={<ArrowLeft className="h-5 w-5" />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-600 mb-4">Quick Links</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <button
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="text-primary hover:text-primary-600 font-medium transition-colors"
            >
              Dashboard
            </button>
            <span className="text-neutral-300">•</span>
            <button
              onClick={() => navigate(ROUTES.CREATE_SHIPMENT)}
              className="text-primary hover:text-primary-600 font-medium transition-colors"
            >
              Create Shipment
            </button>
            <span className="text-neutral-300">•</span>
            <button
              onClick={() => navigate(ROUTES.SUPPORT)}
              className="text-primary hover:text-primary-600 font-medium transition-colors"
            >
              Support
            </button>
            <span className="text-neutral-300">•</span>
            <button
              onClick={() => navigate(ROUTES.AVAILABILITY)}
              className="text-primary hover:text-primary-600 font-medium transition-colors"
            >
              Availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
