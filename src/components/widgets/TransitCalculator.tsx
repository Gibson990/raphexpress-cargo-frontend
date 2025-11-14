import { useState, useMemo } from 'react';
import { Clock, Calendar, Zap, TrendingDown } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

interface TransitData {
  service: 'express' | 'standard' | 'economy';
  days: number;
  hours: number;
  cutoffTime: string;
  estimatedDelivery: string;
  businessDays: number;
  weekendHandling: string;
}

const TransitCalculator = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [serviceType, setServiceType] = useState<'express' | 'standard' | 'economy'>('standard');
  const [result, setResult] = useState<TransitData | null>(null);

  const commonCities = [
    'Dubai, UAE',
    'Mumbai, India',
    'New York, USA',
    'London, UK',
    'Singapore',
    'Hong Kong',
    'Shanghai, China',
    'Bangkok, Thailand',
    'Sydney, Australia',
    'Toronto, Canada',
    'Tokyo, Japan',
    'Paris, France',
    'Berlin, Germany',
    'Amsterdam, Netherlands',
    'Istanbul, Turkey',
  ];

  const [suggestions, setSuggestions] = useState<{ origin: string[]; destination: string[] }>({
    origin: [],
    destination: [],
  });

  const handleCityInput = (field: 'origin' | 'destination', value: string) => {
    if (field === 'origin') {
      setOrigin(value);
    } else {
      setDestination(value);
    }

    if (value.length > 0) {
      const filtered = commonCities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(prev => ({ ...prev, [field]: filtered }));
    } else {
      setSuggestions(prev => ({ ...prev, [field]: [] }));
    }
  };

  const handleSelectCity = (field: 'origin' | 'destination', city: string) => {
    if (field === 'origin') {
      setOrigin(city);
    } else {
      setDestination(city);
    }
    setSuggestions(prev => ({ ...prev, [field]: [] }));
  };

  const calculateTransitTime = () => {
    if (!origin || !destination) return;

    // Simulate transit time calculation based on route and service
    const isSameCity = origin === destination;
    const isInternational = !isSameCity;

    let baseTransitDays = 0;
    let cutoffTime = '2:00 PM';

    if (serviceType === 'express') {
      baseTransitDays = isSameCity ? 0.5 : isInternational ? 2 : 1;
      cutoffTime = '11:00 AM';
    } else if (serviceType === 'standard') {
      baseTransitDays = isSameCity ? 1 : isInternational ? 5 : 2;
      cutoffTime = '2:00 PM';
    } else {
      baseTransitDays = isSameCity ? 2 : isInternational ? 10 : 4;
      cutoffTime = '4:00 PM';
    }

    // Calculate estimated delivery date
    const today = new Date();
    const deliveryDate = new Date(today);
    
    // Add business days
    let daysToAdd = Math.ceil(baseTransitDays);
    let businessDaysAdded = 0;

    while (businessDaysAdded < daysToAdd) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      const dayOfWeek = deliveryDate.getDay();
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDaysAdded++;
      }
    }

    const hours = Math.round((baseTransitDays % 1) * 24);

    setResult({
      service: serviceType,
      days: Math.floor(baseTransitDays),
      hours,
      cutoffTime,
      estimatedDelivery: deliveryDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      businessDays: Math.ceil(baseTransitDays),
      weekendHandling: 'Weekends excluded from transit time',
    });
  };

  const serviceDetails = useMemo(() => {
    return {
      express: {
        icon: Zap,
        color: 'from-blue-500 to-blue-600',
        description: 'Fastest delivery option',
        features: ['Priority handling', 'Cutoff 11:00 AM', 'Weekend delivery available'],
      },
      standard: {
        icon: Clock,
        color: 'from-primary to-orange-dark',
        description: 'Best balance of speed and cost',
        features: ['Standard handling', 'Cutoff 2:00 PM', 'Business days only'],
      },
      economy: {
        icon: TrendingDown,
        color: 'from-green-500 to-green-600',
        description: 'Most affordable option',
        features: ['Economy handling', 'Cutoff 4:00 PM', 'Business days only'],
      },
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Calculator Form */}
      <Card variant="elevated" padding="lg">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Transit Time Calculator</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Origin */}
          <div className="relative">
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              From
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select origin city..."
                value={origin}
                onChange={(e) => handleCityInput('origin', e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {suggestions.origin.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-10">
                  {suggestions.origin.map((city, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectCity('origin', city)}
                      className="w-full text-left px-4 py-2 hover:bg-primary/10 text-neutral-700 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Destination */}
          <div className="relative">
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              To
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select destination city..."
                value={destination}
                onChange={(e) => handleCityInput('destination', e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {suggestions.destination.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-10">
                  {suggestions.destination.map((city, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectCity('destination', city)}
                      className="w-full text-left px-4 py-2 hover:bg-primary/10 text-neutral-700 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Service Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Service Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['express', 'standard', 'economy'] as const).map(service => {
              const details = serviceDetails[service];
              const Icon = details.icon;
              return (
                <button
                  key={service}
                  onClick={() => setServiceType(service)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    serviceType === service
                      ? 'border-primary bg-primary/5'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-2 mx-auto" />
                  <p className="font-semibold text-sm text-neutral-900 capitalize">{service}</p>
                  <p className="text-xs text-neutral-600">{details.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!origin || !destination}
          onClick={calculateTransitTime}
        >
          Calculate Transit Time
        </Button>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Main Result Card */}
          <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-primary/5 to-orange/5 border-2 border-primary">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-neutral-600 mb-2">Estimated Delivery</p>
                <p className="text-3xl font-bold text-primary mb-4">{result.estimatedDelivery}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>{result.businessDays} business days</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Cutoff time: {result.cutoffTime}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-neutral-900 mb-4">Route Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-neutral-600">From</p>
                    <p className="font-semibold text-neutral-900">{origin}</p>
                  </div>
                  <div>
                    <p className="text-neutral-600">To</p>
                    <p className="font-semibold text-neutral-900">{destination}</p>
                  </div>
                  <div>
                    <p className="text-neutral-600">Service</p>
                    <p className="font-semibold text-neutral-900 capitalize">{result.service}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Service Details */}
          <div className="grid md:grid-cols-3 gap-6">
            {(['express', 'standard', 'economy'] as const).map(service => {
              const details = serviceDetails[service];
              const Icon = details.icon;
              const isSelected = service === result.service;

              return (
                <Card
                  key={service}
                  variant={isSelected ? 'elevated' : 'bordered'}
                  padding="md"
                  className={isSelected ? 'ring-2 ring-primary' : ''}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`bg-gradient-to-br ${details.color} p-2 rounded-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-bold text-neutral-900 capitalize">{service}</h3>
                    {isSelected && <span className="ml-auto text-xs bg-primary text-white px-2 py-1 rounded">Selected</span>}
                  </div>
                  <p className="text-sm text-neutral-600 mb-3">{details.description}</p>
                  <ul className="space-y-2">
                    {details.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-neutral-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-3">📋 Important Notes</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Transit times are estimates based on current conditions</li>
              <li>• {result.weekendHandling}</li>
              <li>• International shipments may require customs clearance (additional 1-3 days)</li>
              <li>• Cutoff times are in your local timezone</li>
              <li>• For urgent shipments, Express service guarantees fastest delivery</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransitCalculator;
