import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plane,
  Ship,
  Truck,
  Globe,
  MapPin,
  FileCheck,
  Code,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Package,
} from 'lucide-react';
import Button from '../components/common/Button';
import QuickQuote from '../components/widgets/QuickQuote';
import { ROUTES, IMAGES, FEATURES } from '../utils/constants';

const Home = () => {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      navigate(`${ROUTES.TRACK}/${trackingId}`);
    }
  };

  const iconMap: Record<string, any> = {
    Globe,
    MapPin,
    FileCheck,
    Plane,
    Code,
    CreditCard,
  };

  const stats = [
    { value: '200+', label: 'Countries Served' },
    { value: '1M+', label: 'Shipments Delivered' },
    { value: '99.9%', label: 'On-Time Delivery' },
    { value: '24/7', label: 'Customer Support' },
  ];

  const shippingModes = [
    {
      icon: Plane,
      title: 'Air Freight',
      description: 'Fast international or urgent deliveries',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Ship,
      title: 'Sea Freight',
      description: 'Affordable bulk and long-distance shipping',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      icon: Truck,
      title: 'Express Delivery',
      description: 'Same-day or next-day local delivery',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Create Shipment',
      description: 'Enter package details and select your preferred shipping mode',
    },
    {
      step: '02',
      title: 'Choose Schedule',
      description: 'Pick from available flights or ships based on your timeline',
    },
    {
      step: '03',
      title: 'Track & Deliver',
      description: 'Monitor your shipment in real-time until it reaches destination',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-orange to-orange-dark text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <Package className="h-4 w-4" />
                <span>To the last mile of the earth</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Ship Anywhere,
                <br />
                <span className="text-orange-light">Track Everywhere</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-lg">
                Next-generation logistics platform for local and international deliveries. 
                Smart, transparent, and flexible shipping options.
              </p>

              {/* Track Shipment Form */}
              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Enter tracking ID..."
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Track Now
                </Button>
              </form>

              <div className="flex flex-wrap gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate(ROUTES.CREATE_SHIPMENT)}
                >
                  Create Shipment
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => navigate(ROUTES.AVAILABILITY)}
                >
                  View Availability
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden md:block animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={IMAGES.CARGO_PLANE}
                  alt="Cargo Plane"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white text-neutral-900 p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">99.9%</p>
                    <p className="text-sm text-neutral-600">On-Time Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Quote Section */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Get Instant Quote
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Enter your shipment details and get pricing for Express, Standard, and Economy options
            </p>
          </div>
          <QuickQuote />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-neutral-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Modes Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Choose Your Shipping Mode
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Flexible delivery options tailored to your timeline and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {shippingModes.map((mode, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-br ${mode.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <mode.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {mode.title}
                </h3>
                <p className="text-neutral-600 mb-6">{mode.description}</p>
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose Raphexpress?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Powerful features designed to make shipping simple and efficient
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              return (
                <div
                  key={index}
                  className="flex gap-4 p-6 rounded-xl hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Ship your goods in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-soft h-full">
                  <div className="text-6xl font-bold text-primary/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-orange-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ship Globally?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of businesses and individuals who trust Raphexpress for their shipping needs
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
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate(ROUTES.SUPPORT)}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
