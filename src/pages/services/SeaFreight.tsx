import { useNavigate } from 'react-router-dom';
import { Ship, DollarSign, Package as PackageIcon, Shield, CheckCircle2, Package, Globe, Anchor } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { ROUTES, IMAGES } from '../../utils/constants';

const SeaFreight = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: DollarSign,
      title: 'Cost-Effective',
      description: 'Most economical option for bulk shipments and heavy cargo',
    },
    {
      icon: PackageIcon,
      title: 'Large Capacity',
      description: 'Handle shipments of any size with full container or LCL options',
    },
    {
      icon: Globe,
      title: 'Global Routes',
      description: 'Extensive network covering all major ports worldwide',
    },
    {
      icon: Shield,
      title: 'Reliable Service',
      description: 'Proven track record with industry-leading safety standards',
    },
  ];

  const benefits = [
    'FCL & LCL shipping options',
    'Port-to-port and door-to-door service',
    'Custom container solutions',
    'Temperature-controlled containers',
    'Comprehensive cargo insurance',
    'Professional documentation handling',
  ];

  const stats = [
    { value: '15-30', label: 'Days Transit', unit: 'days' },
    { value: '200+', label: 'Ports', unit: '' },
    { value: '40%', label: 'Cost Savings', unit: '%' },
    { value: '24/7', label: 'Tracking', unit: '' },
  ];

  const containerTypes = [
    {
      type: '20ft Standard',
      capacity: '33 CBM',
      weight: '28,000 kg',
      best: 'Small to medium shipments',
    },
    {
      type: '40ft Standard',
      capacity: '67 CBM',
      weight: '26,500 kg',
      best: 'Large shipments',
    },
    {
      type: '40ft High Cube',
      capacity: '76 CBM',
      weight: '26,500 kg',
      best: 'Oversized cargo',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-600 via-cyan-700 to-cyan-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <Ship className="h-4 w-4" />
                <span>Ocean Cargo</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Sea Freight
                <br />
                <span className="text-cyan-200">Economical & Eco-Friendly</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90">
                Cost-effective ocean freight solutions for bulk shipments. Perfect for businesses looking to optimize shipping costs without compromising reliability.
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
                  className="border-white text-white hover:bg-white hover:text-cyan-600"
                  onClick={() => navigate(ROUTES.CALCULATOR)}
                >
                  Calculate Cost
                </Button>
              </div>
            </div>

            <div className="relative hidden md:block">
              <img
                src={IMAGES.CARGO_SHIP}
                alt="Sea Freight"
                className="rounded-2xl shadow-2xl"
                loading="eager"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-neutral-900 p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-cyan-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">40% Less</p>
                    <p className="text-sm text-neutral-600">Cost vs Air</p>
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
                <p className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">
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
              Why Choose Sea Freight?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The most economical way to ship large volumes internationally
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
                  <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-cyan-600" />
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

      {/* Container Types */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Container Options
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Choose the right container size for your shipment needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {containerTypes.map((container, index) => (
              <Card key={index} variant="bordered" padding="lg" className="hover:border-cyan-500 hover:shadow-lg transition-all">
                <div className="text-center mb-4">
                  <Anchor className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {container.type}
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Capacity:</span>
                    <span className="font-semibold text-neutral-900">{container.capacity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Max Weight:</span>
                    <span className="font-semibold text-neutral-900">{container.weight}</span>
                  </div>
                  <div className="pt-3 border-t border-neutral-200">
                    <p className="text-sm text-neutral-600">
                      <strong>Best for:</strong> {container.best}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={IMAGES.WAREHOUSE}
                alt="Sea Freight Warehouse"
                className="rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Complete Sea Freight Solutions
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                From single pallets to full containers, we provide flexible ocean freight services tailored to your business needs.
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
                  Book Sea Freight
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-cyan-600 to-cyan-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ship by Sea?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get competitive rates for your ocean freight shipments
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
              className="border-white text-white hover:bg-white hover:text-cyan-600"
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

export default SeaFreight;
