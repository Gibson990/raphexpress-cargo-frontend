import { Users, Target, Award, Globe } from 'lucide-react';
import Card from '../components/common/Card';

const About = () => {
  const stats = [
    { icon: Globe, label: 'Countries Served', value: '200+' },
    { icon: Users, label: 'Happy Customers', value: '50,000+' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: Target, label: 'Deliveries/Month', value: '100,000+' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary to-orange-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About Raphexpress Cargo</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            To the last mile of the earth - Making global logistics accessible, digital, and developer-friendly
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} variant="elevated" padding="lg" className="text-center">
              <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-neutral-900 mb-2">{stat.value}</div>
              <div className="text-neutral-600">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Story</h2>
            <p className="text-neutral-600 mb-4">
              Founded in 2010, Raphexpress Cargo has grown from a small local courier service to a global logistics powerhouse. Our mission has always been simple: make shipping accessible to everyone, everywhere.
            </p>
            <p className="text-neutral-600 mb-4">
              We believe that distance should never be a barrier to commerce. Whether you're a small business shipping your first international order or an enterprise managing complex supply chains, we're here to help.
            </p>
            <p className="text-neutral-600">
              Today, we serve over 200 countries, handle 100,000+ shipments monthly, and continue to innovate with technology-first solutions like our developer API and real-time tracking.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Values</h2>
            <div className="space-y-4">
              <Card variant="bordered" padding="md">
                <h3 className="font-bold text-neutral-900 mb-2">🚀 Innovation</h3>
                <p className="text-sm text-neutral-600">
                  We embrace technology to make shipping faster, easier, and more transparent.
                </p>
              </Card>
              <Card variant="bordered" padding="md">
                <h3 className="font-bold text-neutral-900 mb-2">🤝 Reliability</h3>
                <p className="text-sm text-neutral-600">
                  Your trust is our priority. We deliver on our promises, every time.
                </p>
              </Card>
              <Card variant="bordered" padding="md">
                <h3 className="font-bold text-neutral-900 mb-2">🌍 Accessibility</h3>
                <p className="text-sm text-neutral-600">
                  Global shipping should be available to everyone, not just large corporations.
                </p>
              </Card>
              <Card variant="bordered" padding="md">
                <h3 className="font-bold text-neutral-900 mb-2">💚 Sustainability</h3>
                <p className="text-sm text-neutral-600">
                  We're committed to reducing our environmental impact through efficient routing and green practices.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
