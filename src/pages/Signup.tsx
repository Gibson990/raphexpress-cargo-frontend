import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, Building2, UserCircle, Code } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import { ROUTES } from '../utils/constants';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'individual' | 'business' | 'developer'>('individual');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    website: '',
    apiUsage: '',
    agreeToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Account created successfully!');
      navigate(ROUTES.DASHBOARD);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Link to={ROUTES.HOME} className="inline-flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-br from-primary to-orange-dark p-2 rounded-lg">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-neutral-600">
            Join thousands of businesses shipping globally
          </p>
        </div>

        <Card variant="elevated" padding="lg" className="animate-slide-up">
          {/* User Type Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Account Type
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setUserType('individual')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  userType === 'individual'
                    ? 'border-primary bg-primary/5'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <UserCircle className={`h-8 w-8 mx-auto mb-2 ${
                  userType === 'individual' ? 'text-primary' : 'text-neutral-400'
                }`} />
                <div className="font-semibold text-neutral-900">Individual</div>
                <div className="text-sm text-neutral-600">Personal shipping</div>
              </button>

              <button
                type="button"
                onClick={() => setUserType('business')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  userType === 'business'
                    ? 'border-primary bg-primary/5'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <Building2 className={`h-8 w-8 mx-auto mb-2 ${
                  userType === 'business' ? 'text-primary' : 'text-neutral-400'
                }`} />
                <div className="font-semibold text-neutral-900">Business</div>
                <div className="text-sm text-neutral-600">For companies</div>
              </button>

              <button
                type="button"
                onClick={() => setUserType('developer')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  userType === 'developer'
                    ? 'border-primary bg-primary/5'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <Code className={`h-8 w-8 mx-auto mb-2 ${
                  userType === 'developer' ? 'text-primary' : 'text-neutral-400'
                }`} />
                <div className="font-semibold text-neutral-900">Developer</div>
                <div className="text-sm text-neutral-600">API integration</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  leftIcon={<User className="h-5 w-5" />}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    leftIcon={<Mail className="h-5 w-5" />}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (234) 567-890"
                    leftIcon={<Phone className="h-5 w-5" />}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* Business/Developer Information */}
            {(userType === 'business' || userType === 'developer') && (
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-4">
                  {userType === 'business' ? 'Company Information' : 'Developer Information'}
                </h3>
                <div className="space-y-4">
                  <Input
                    label={userType === 'business' ? 'Company Name' : 'Company/Project Name'}
                    type="text"
                    placeholder={userType === 'business' ? 'Acme Inc.' : 'Your Company or Project'}
                    leftIcon={<Building2 className="h-5 w-5" />}
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            )}

            {userType === 'developer' && (
              <div className="space-y-4">
                <Input
                  label="Website URL (Optional)"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  leftIcon={<Code className="h-5 w-5" />}
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Expected API Usage <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.apiUsage}
                    onChange={(e) => setFormData({ ...formData, apiUsage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select usage</option>
                    <option value="low">Low (under 1,000 requests/month)</option>
                    <option value="medium">Medium (1,000 - 10,000 requests/month)</option>
                    <option value="high">High (10,000 - 100,000 requests/month)</option>
                    <option value="enterprise">Enterprise (100,000+ requests/month)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Security */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">Security</h3>
              <div className="space-y-4">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  leftIcon={<Lock className="h-5 w-5" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-neutral-400 hover:text-neutral-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  }
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />

                <Input
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  leftIcon={<Lock className="h-5 w-5" />}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeToTerms: e.target.checked })
                }
                className="mt-1 w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
                required
              />
              <label htmlFor="terms" className="text-sm text-neutral-700">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:text-primary-600 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:text-primary-600 font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              Already have an account?{' '}
              <Link
                to={ROUTES.LOGIN}
                className="text-primary hover:text-primary-600 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>

        <div className="mt-6 text-center text-sm text-neutral-600">
          <p>© 2025 Raphexpress Cargo. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
