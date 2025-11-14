import { useNavigate } from 'react-router-dom';
import { CheckCircle2, X, Zap, Clock, Shield, MapPin, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { ROUTES } from '../utils/constants';

const ServiceComparison = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'express',
      name: 'Express',
      subtitle: 'Fastest Delivery',
      price: 'Premium',
      color: 'from-blue-500 to-blue-600',
      icon: Zap,
      badge: null,
      description: 'For urgent shipments requiring fastest delivery',
    },
    {
      id: 'standard',
      name: 'Standard',
      subtitle: 'Best Value',
      price: 'Moderate',
      color: 'from-primary to-orange-dark',
      icon: Clock,
      badge: 'Most Popular',
      description: 'Perfect balance of speed and cost',
    },
    {
      id: 'economy',
      name: 'Economy',
      subtitle: 'Budget Friendly',
      price: 'Affordable',
      color: 'from-green-500 to-green-600',
      icon: MapPin,
      badge: null,
      description: 'Best rates for non-urgent shipments',
    },
  ];

  const features = [
    {
      name: 'Transit Time',
      express: '1-2 Business Days',
      standard: '3-5 Business Days',
      economy: '7-10 Business Days',
      icon: Clock,
    },
    {
      name: 'Real-time Tracking',
      express: true,
      standard: true,
      economy: true,
      icon: MapPin,
    },
    {
      name: 'Insurance Coverage',
      express: true,
      standard: true,
      economy: false,
      icon: Shield,
    },
    {
      name: 'Priority Handling',
      express: true,
      standard: false,
      economy: false,
      icon: Zap,
    },
    {
      name: 'Customs Clearance',
      express: true,
      standard: true,
      economy: true,
      icon: MapPin,
    },
    {
      name: 'SMS Notifications',
      express: true,
      standard: true,
      economy: true,
      icon: MapPin,
    },
    {
      name: 'Email Notifications',
      express: true,
      standard: true,
      economy: true,
      icon: MapPin,
    },
    {
      name: 'Proof of Delivery',
      express: true,
      standard: true,
      economy: false,
      icon: CheckCircle2,
    },
    {
      name: 'Special Handling',
      express: true,
      standard: true,
      economy: false,
      icon: Zap,
    },
    {
      name: 'Signature Required',
      express: true,
      standard: true,
      economy: true,
      icon: MapPin,
    },
  ];

  const handleSelectService = (serviceId: string) => {
    navigate(ROUTES.CREATE_SHIPMENT, {
      state: {
        prefilledData: {
          selectedService: serviceId,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium mb-6">
            <Zap className="h-4 w-4" />
            <span>Service Comparison</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Choose Your Perfect Service
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Compare our three shipping options and select the one that fits your needs and budget
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service) => {
            const Icon = service.icon;
            const isStandard = service.id === 'standard';
            
            return (
              <div
                key={service.id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  isStandard
                    ? 'md:scale-105 shadow-2xl border-2 border-primary'
                    : 'shadow-lg border border-neutral-200 hover:shadow-xl'
                }`}
              >
                {/* Badge */}
                {service.badge && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-2 font-bold text-sm">
                    {service.badge}
                  </div>
                )}

                <div className={`bg-gradient-to-br ${service.color} text-white p-8 ${service.badge ? 'pt-16' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{service.name}</h3>
                      <p className="text-white/80 text-sm">{service.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm mb-6">{service.description}</p>
                  <div className="bg-white/20 rounded-lg p-4 mb-6">
                    <p className="text-white/70 text-sm mb-1">Starting from</p>
                    <p className="text-3xl font-bold text-white">{service.price}</p>
                  </div>
                  <Button
                    variant={isStandard ? 'secondary' : 'outline'}
                    size="lg"
                    className={`w-full ${!isStandard ? 'border-white text-white hover:bg-white hover:text-neutral-900' : ''}`}
                    onClick={() => handleSelectService(service.id)}
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                  >
                    Select {service.name}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Comparison Table */}
        <Card variant="elevated" padding="lg">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-neutral-200">
                  <th className="text-left py-4 px-4 font-bold text-neutral-900">Feature</th>
                  <th className="text-center py-4 px-4 font-bold text-blue-600">Express</th>
                  <th className="text-center py-4 px-4 font-bold text-primary">Standard</th>
                  <th className="text-center py-4 px-4 font-bold text-green-600">Economy</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={index}
                    className={`border-b border-neutral-100 ${index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}`}
                  >
                    <td className="py-4 px-4 font-semibold text-neutral-900">{feature.name}</td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.express === 'boolean' ? (
                        feature.express ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-neutral-700 font-medium">{feature.express}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.standard === 'boolean' ? (
                        feature.standard ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-neutral-700 font-medium">{feature.standard}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.economy === 'boolean' ? (
                        feature.economy ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-neutral-700 font-medium">{feature.economy}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: 'Can I change my service after booking?',
                a: 'Yes, you can upgrade or downgrade your service up to 24 hours before pickup.',
              },
              {
                q: 'What if my shipment is delayed?',
                a: 'We offer compensation for delays on Express and Standard services. Economy shipments have flexible delivery windows.',
              },
              {
                q: 'Is insurance included?',
                a: 'Express and Standard include basic insurance. Economy requires optional insurance purchase.',
              },
              {
                q: 'How do I track my shipment?',
                a: 'All services include real-time tracking via our website or mobile app with SMS/email notifications.',
              },
              {
                q: 'What are the weight limits?',
                a: 'Express: up to 300kg, Standard: up to 500kg, Economy: up to 1000kg per shipment.',
              },
              {
                q: 'Do you handle customs clearance?',
                a: 'Yes, all services include customs clearance assistance for international shipments.',
              },
            ].map((item, index) => (
              <Card key={index} variant="bordered" padding="md">
                <h3 className="font-bold text-neutral-900 mb-2">{item.q}</h3>
                <p className="text-neutral-600 text-sm">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary to-orange-dark text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ship?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Choose a service above and create your first shipment. Get instant quotes and book in minutes.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate(ROUTES.CREATE_SHIPMENT)}
            rightIcon={<ArrowRight className="h-5 w-5" />}
          >
            Create Shipment Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceComparison;
