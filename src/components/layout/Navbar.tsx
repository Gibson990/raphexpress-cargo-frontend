import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Package, User, LogIn } from 'lucide-react';
import Button from '../common/Button';
import { ROUTES } from '../../utils/constants';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = false; // TODO: Replace with actual auth state

  const navLinks = [
    { name: 'Track Shipment', path: ROUTES.TRACK },
    { name: 'Availability', path: ROUTES.AVAILABILITY },
    { name: 'Support', path: ROUTES.SUPPORT },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-primary to-orange-dark p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-orange-dark bg-clip-text text-transparent">
              Raphexpress
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-neutral-700 hover:text-primary font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<User className="h-4 w-4" />}
                  onClick={() => window.location.href = ROUTES.DASHBOARD}
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = ROUTES.LOGIN}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<LogIn className="h-4 w-4" />}
                  onClick={() => window.location.href = ROUTES.SIGNUP}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-neutral-700" />
            ) : (
              <Menu className="h-6 w-6 text-neutral-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white animate-slide-down">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-primary rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-neutral-200 space-y-2">
              {isAuthenticated ? (
                <Button
                  variant="primary"
                  className="w-full"
                  leftIcon={<User className="h-4 w-4" />}
                  onClick={() => {
                    window.location.href = ROUTES.DASHBOARD;
                    setIsMenuOpen(false);
                  }}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      window.location.href = ROUTES.LOGIN;
                      setIsMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                      window.location.href = ROUTES.SIGNUP;
                      setIsMenuOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
