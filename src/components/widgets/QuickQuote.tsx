import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, ArrowRight, Zap } from 'lucide-react';
import Button from '../common/Button';
import { ROUTES } from '../../utils/constants';

interface QuoteResult {
  express: { price: number; days: string };
  standard: { price: number; days: string };
  economy: { price: number; days: string };
}

const QuickQuote = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    weight: '',
  });

  const [suggestions, setSuggestions] = useState<{ from: string[]; to: string[] }>({
    from: [],
    to: [],
  });

  // Get unique cities from constants
  const allCities = useMemo(() => {
    const cities = new Set<string>();
    // Add some common cities
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
    ];
    commonCities.forEach(c => cities.add(c));
    return Array.from(cities).sort();
  }, []);

  const handleCityInput = (field: 'from' | 'to', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');

    if (value.length > 0) {
      const filtered = allCities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(prev => ({ ...prev, [field]: filtered }));
    } else {
      setSuggestions(prev => ({ ...prev, [field]: [] }));
    }
  };

  const handleSelectCity = (field: 'from' | 'to', city: string) => {
    setFormData(prev => ({ ...prev, [field]: city }));
    setSuggestions(prev => ({ ...prev, [field]: [] }));
  };

  const calculateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.from.trim()) {
      setError('Please select origin city');
      return;
    }
    if (!formData.to.trim()) {
      setError('Please select destination city');
      return;
    }
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      setError('Please enter valid weight');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      
      // Base rates per kg
      const expressRate = 12;
      const standardRate = 8.5;
      const economyRate = 5;

      // Calculate prices with some variation based on route
      const routeMultiplier = formData.from === formData.to ? 0.5 : 1;
      
      const expressPrice = Math.round(weight * expressRate * routeMultiplier);
      const standardPrice = Math.round(weight * standardRate * routeMultiplier);
      const economyPrice = Math.round(weight * economyRate * routeMultiplier);

      setResult({
        express: { price: expressPrice, days: '1-2' },
        standard: { price: standardPrice, days: '3-5' },
        economy: { price: economyPrice, days: '7-10' },
      });

      setShowResult(true);
      setIsLoading(false);
    }, 800);
  };

  const handleBookService = (service: 'express' | 'standard' | 'economy') => {
    navigate(ROUTES.CREATE_SHIPMENT, {
      state: {
        prefilledData: {
          origin: formData.from,
          destination: formData.to,
          weight: formData.weight,
          shippingMode: service === 'express' ? 'air' : service === 'standard' ? 'air' : 'sea',
          selectedService: service,
        },
      },
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-orange-dark text-white p-6 md:p-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-6 w-6" />
            <h2 className="text-2xl md:text-3xl font-bold">Quick Quote</h2>
          </div>
          <p className="text-white/90">Get instant shipping rates in seconds</p>
        </div>

        {!showResult ? (
          <form onSubmit={calculateQuote} className="p-6 md:p-8 space-y-6">
            {/* From City */}
            <div className="relative">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                From
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select origin city..."
                  value={formData.from}
                  onChange={(e) => handleCityInput('from', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {suggestions.from.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-10">
                    {suggestions.from.map((city, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectCity('from', city)}
                        className="w-full text-left px-4 py-2 hover:bg-primary/10 text-neutral-700 transition-colors"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* To City */}
            <div className="relative">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                To
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select destination city..."
                  value={formData.to}
                  onChange={(e) => handleCityInput('to', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {suggestions.to.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-10">
                    {suggestions.to.map((city, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectCity('to', city)}
                        className="w-full text-left px-4 py-2 hover:bg-primary/10 text-neutral-700 transition-colors"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Weight
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0"
                  min="0.1"
                  max="30000"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, weight: e.target.value }));
                    setError('');
                  }}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">
                  kg
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Calculate Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
              rightIcon={isLoading ? <Loader className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
            >
              {isLoading ? 'Calculating...' : 'Get Quote'}
            </Button>
          </form>
        ) : result ? (
          <div className="p-6 md:p-8 space-y-6">
            {/* Quote Summary */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-neutral-600 mb-1">Shipping from</p>
              <p className="font-semibold text-neutral-900">
                {formData.from} → {formData.to} ({formData.weight} kg)
              </p>
            </div>

            {/* Service Options */}
            <div className="space-y-3">
              {/* Express */}
              <div className="border border-neutral-200 rounded-lg p-4 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer" onClick={() => handleBookService('express')}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-neutral-900">Express</h3>
                    <p className="text-sm text-neutral-600">{result.express.days} business days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">${result.express.price}</p>
                    <p className="text-xs text-neutral-500">Fastest option</p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookService('express');
                  }}
                >
                  Book Express
                </Button>
              </div>

              {/* Standard (Recommended) */}
              <div className="border-2 border-primary rounded-lg p-4 bg-primary/5 relative">
                <div className="absolute -top-3 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                  Most Popular
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-neutral-900">Standard</h3>
                    <p className="text-sm text-neutral-600">{result.standard.days} business days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">${result.standard.price}</p>
                    <p className="text-xs text-neutral-500">Best value</p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => handleBookService('standard')}
                >
                  Book Standard
                </Button>
              </div>

              {/* Economy */}
              <div className="border border-neutral-200 rounded-lg p-4 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer" onClick={() => handleBookService('economy')}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-neutral-900">Economy</h3>
                    <p className="text-sm text-neutral-600">{result.economy.days} business days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">${result.economy.price}</p>
                    <p className="text-xs text-neutral-500">Budget friendly</p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookService('economy');
                  }}
                >
                  Book Economy
                </Button>
              </div>
            </div>

            {/* Back Button */}
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => {
                setShowResult(false);
                setResult(null);
              }}
            >
              Back to Quote
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default QuickQuote;
