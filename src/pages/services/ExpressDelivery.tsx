import { useNavigate } from 'react-router-dom';
import { Truck, Zap, Clock, MapPin, CheckCircle2, Package, Shield, Target } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { ROUTES, IMAGES } from '../../utils/constants';

const ExpressDelivery = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: 'Same-Day Delivery',
      description: 'Ultra-fast delivery for urgent shipments within the same city',
    },
    {
      icon: Clock,
      title: 'Next-Day Service',
      description: 'Guaranteed next-day delivery for domestic and selected international routes',
    },
    {
      icon: MapPin,
      title: 'Door-to-Door',
      description: 'Complete pickup and delivery service with real-time tracking',
    },
    {
      icon: Shield,
      title: 'Premium Care',
      description: 'Priority handling with enhanced security and insurance',
    },
  ];

  const benefits = [
    'Same-day and next-day options',
    'Priority processing and customs',
    'Dedicated express network',
    'Real-time GPS tracking',
    'Signature on delivery',
    'Premium packaging available',
  ];

  const stats = [
    { value: '0-2', label: 'Days Delivery', unit: 'days' },
    { value: '99%', label: 'On-Time Rate', unit: '%' },
    { value: '2hr', label: 'Pickup Time', unit: '' },
    { value: '24/7', label: 'Support', unit: '' },
  ];

  const serviceTypes = [
    {
      name: 'Express Same-Day',
      time: '4-8 hours',
      description: 'Urgent deliveries within the same city',
      icon: Zap,
      color: 'from-red-500 to-red-600',
    },
    {
      name: 'Express Next-Day',
      time: '12-24 hours',
      description: 'Next business day delivery nationwide',
      icon: Target,
      color: 'from-orange-500 to-orange-600',
    },
    {
      name: 'Express International',
      time: '1-3 days',
      description: 'Fast international shipping to major cities',
      icon: Package,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-red-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <Truck className="h-4 w-4" />
                <span>Express Service</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Express Delivery
                <br />
                <span className="text-orange-200">Speed When You Need It</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90">
                Time-critical delivery solutions for urgent shipments. From same-day to next-day delivery, we ensure your packages arrive on time, every time.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate(ROUTES.CREATE_SHIPMENT)}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                  onClick={() => navigate(ROUTES.CALCULATOR)}
                >
                  Calculate Cost
                </Button>
              </div>
            </div>

            <div className="relative hidden md:block">
              <img
                src={IMAGES.DELIVERY_TRUCK}
                alt="Express Delivery"
                className="rounded-2xl shadow-2xl"
                loading="eager"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-neutral-900 p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Zap className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">Same Day</p>
                    <p className="text-sm text-neutral-600">Available Now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-neutral-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Choose Your Speed
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Flexible express delivery options to match your urgency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {serviceTypes.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  variant="elevated"
                  padding="lg"
                  className="text-center hover:scale-105 transition-transform"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-2xl font-bold text-orange-600 mb-3">
                    {service.time}
                  </p>
                  <p className="text-neutral-600">{service.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose Express Delivery?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Premium features for time-sensitive shipments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  variant="bordered"
                  padding="lg"
                  className="hover:border-orange-500 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Premium Express Services
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                When every minute counts, trust our express delivery service to get your packages there fast and safely.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-neutral-700">{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Package className="h-5 w-5" />}
                  onClick={() => navigate(ROUTES.CREATE_SHIPMENT)}
                >
                  Book Express Delivery
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src={IMAGES.PACKAGE}
                alt="Express Delivery Service"
                className="rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need It Fast? Ship Express!
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get instant quotes for same-day and next-day delivery
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate(ROUTES.SIGNUP)}
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-orange-600"
              onClick={() => navigate(ROUTES.CONTACT)}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExpressDelivery;
