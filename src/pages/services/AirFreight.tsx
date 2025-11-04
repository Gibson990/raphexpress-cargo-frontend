import { useNavigate } from 'react-router-dom';
import { Plane, Clock, Globe, Shield, CheckCircle2, Package, TrendingUp, Zap } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { ROUTES, IMAGES } from '../../utils/constants';

const AirFreight = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: 'Express Delivery',
      description: 'Fast shipping with 3-7 days delivery to over 200+ countries worldwide',
    },
    {
      icon: Shield,
      title: 'Secure Handling',
      description: 'Temperature-controlled cargo holds and professional handling for all shipments',
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Direct access to major airports and extensive partner network',
    },
    {
      icon: TrendingUp,
      title: 'Real-time Tracking',
      description: 'Track your air cargo in real-time with live flight updates',
    },
  ];

  const benefits = [
    'Priority customs clearance',
    'Door-to-door delivery options',
    'Dedicated account manager',
    'Flexible pickup schedules',
    'Insurance coverage available',
    'Hazmat certified handling',
  ];

  const stats = [
    { value: '3-7', label: 'Days Delivery', unit: 'days' },
    { value: '150+', label: 'Countries', unit: '' },
    { value: '99.9%', label: 'On-Time', unit: '%' },
    { value: '24/7', label: 'Support', unit: '' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <Plane className="h-4 w-4" />
                <span>Express Air Cargo</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Air Freight
                <br />
                <span className="text-blue-200">Fast & Reliable</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90">
                Ship your cargo globally with speed and precision. Our air freight service ensures your goods reach their destination quickly and safely.
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
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  onClick={() => navigate(ROUTES.CALCULATOR)}
                >
                  Calculate Cost
                </Button>
              </div>
            </div>

            <div className="relative hidden md:block">
              <img
                src={IMAGES.CARGO_PLANE}
                alt="Air Freight"
                className="rounded-2xl shadow-2xl"
                loading="eager"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-neutral-900 p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">3-7 Days</p>
                    <p className="text-sm text-neutral-600">Average Delivery</p>
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
                <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-neutral-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose Air Freight?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Fast, secure, and efficient air cargo solutions for businesses of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  variant="elevated"
                  padding="lg"
                  className="text-center hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Comprehensive Air Freight Services
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                From time-sensitive documents to large cargo shipments, we handle it all with care and precision.
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
                  Book Air Freight
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src={IMAGES.LOGISTICS}
                alt="Air Freight Logistics"
                className="rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ship by Air?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get instant quotes and book your air freight shipment today
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
              className="border-white text-white hover:bg-white hover:text-blue-600"
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

export default AirFreight;
