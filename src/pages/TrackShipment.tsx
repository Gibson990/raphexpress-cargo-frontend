import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Package, MapPin, Clock, CheckCircle2, Truck, Plane, Ship, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import { SHIPMENT_STATUS, SHIPMENT_STATUS_LABELS, IMAGES } from '../utils/constants';

const TrackShipment = () => {
  const { id } = useParams();
  const [trackingId, setTrackingId] = useState(id || '');
  const [isTracking, setIsTracking] = useState(false);
  const [shipmentData, setShipmentData] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setIsTracking(true);

    // Simulate API call
    setTimeout(() => {
      setShipmentData({
        id: trackingId,
        status: 'in_transit',
        origin: 'Mumbai, India',
        destination: 'Dubai, UAE',
        estimatedDelivery: '2025-10-28',
        currentLocation: 'Abu Dhabi Port',
        mode: 'sea',
        weight: '250 kg',
        timeline: [
          {
            status: 'picked',
            label: 'Picked Up',
            location: 'Mumbai Warehouse',
            date: '2025-10-20 10:30 AM',
            completed: true,
          },
          {
            status: 'in_transit',
            label: 'In Transit',
            location: 'Abu Dhabi Port',
            date: '2025-10-23 02:15 PM',
            completed: true,
          },
          {
            status: 'customs',
            label: 'Customs Clearance',
            location: 'Dubai Customs',
            date: 'Pending',
            completed: false,
          },
          {
            status: 'out_for_delivery',
            label: 'Out for Delivery',
            location: 'Dubai',
            date: 'Pending',
            completed: false,
          },
          {
            status: 'delivered',
            label: 'Delivered',
            location: 'Dubai, UAE',
            date: 'Pending',
            completed: false,
          },
        ],
      });
      setIsTracking(false);
    }, 1000);
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'air':
        return <Plane className="h-5 w-5" />;
      case 'sea':
        return <Ship className="h-5 w-5" />;
      default:
        return <Truck className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-orange-dark rounded-2xl mb-4">
            <Package className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-3">
            Track Your Shipment
          </h1>
          <p className="text-lg text-neutral-600">
            Enter your tracking ID to get real-time updates
          </p>
        </div>

        {/* Search Form */}
        <Card variant="elevated" padding="lg" className="mb-8 animate-slide-up">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter tracking ID (e.g., RPHX123456789)"
                leftIcon={<Search className="h-5 w-5" />}
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="text-lg"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isTracking}
              className="sm:w-auto"
            >
              Track Shipment
            </Button>
          </form>
        </Card>

        {/* Shipment Details */}
        {shipmentData && (
          <div className="space-y-6 animate-fade-in">
            {/* Status Overview */}
            <Card variant="elevated" padding="lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-neutral-600">Tracking ID</span>
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-1">
                    {shipmentData.id}
                  </h2>
                  <div className="flex items-center gap-2 text-neutral-600">
                    {getModeIcon(shipmentData.mode)}
                    <span className="capitalize">{shipmentData.mode} Freight</span>
                    <span className="text-neutral-400">•</span>
                    <span>{shipmentData.weight}</span>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    {SHIPMENT_STATUS_LABELS[shipmentData.status as keyof typeof SHIPMENT_STATUS_LABELS]}
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      Est. Delivery: {new Date(shipmentData.estimatedDelivery).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-neutral-200">
                <div>
                  <div className="flex items-center gap-2 text-neutral-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">Origin</span>
                  </div>
                  <p className="text-lg font-semibold text-neutral-900">
                    {shipmentData.origin}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-neutral-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">Destination</span>
                  </div>
                  <p className="text-lg font-semibold text-neutral-900">
                    {shipmentData.destination}
                  </p>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card variant="elevated" padding="lg">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">
                Shipment Timeline
              </h3>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-neutral-200" />

                <div className="space-y-8">
                  {shipmentData.timeline.map((event: any, index: number) => (
                    <div key={index} className="relative flex gap-6">
                      {/* Timeline Dot */}
                      <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        event.completed
                          ? 'bg-primary text-white'
                          : 'bg-neutral-200 text-neutral-400'
                      }`}>
                        {event.completed ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-white" />
                        )}
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 pb-8">
                        <div className="bg-neutral-50 rounded-xl p-4 hover:bg-neutral-100 transition-colors">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h4 className={`font-semibold ${
                              event.completed ? 'text-neutral-900' : 'text-neutral-500'
                            }`}>
                              {event.label}
                            </h4>
                            <span className={`text-sm ${
                              event.completed ? 'text-neutral-600' : 'text-neutral-400'
                            }`}>
                              {event.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-600">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Map Placeholder */}
            <Card variant="elevated" padding="none" className="overflow-hidden">
              <div className="relative h-96 bg-gradient-to-br from-blue-50 to-cyan-50">
                <img
                  src={IMAGES.GLOBE}
                  alt="Tracking Map"
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      Live Tracking Map
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      Interactive map coming soon
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-neutral-600">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      Current Location: {shipmentData.currentLocation}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Help Section */}
            <Card variant="bordered" padding="lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-neutral-900 mb-2">
                    Need Help?
                  </h4>
                  <p className="text-neutral-600 mb-4">
                    If you have any questions about your shipment, our support team is here to help.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm">
                      Contact Support
                    </Button>
                    <Button variant="ghost" size="sm">
                      View FAQs
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!shipmentData && !isTracking && (
          <Card variant="bordered" padding="lg" className="text-center animate-fade-in">
            <div className="max-w-md mx-auto py-12">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Enter a tracking ID to get started
              </h3>
              <p className="text-neutral-600 mb-6">
                Track your shipment in real-time and get detailed updates on its journey
              </p>
              <div className="flex flex-wrap gap-2 justify-center text-sm text-neutral-500">
                <span>Example IDs:</span>
                <button
                  onClick={() => setTrackingId('RPHX123456789')}
                  className="text-primary hover:text-primary-600 font-medium"
                >
                  RPHX123456789
                </button>
                <span>•</span>
                <button
                  onClick={() => setTrackingId('RPHX987654321')}
                  className="text-primary hover:text-primary-600 font-medium"
                >
                  RPHX987654321
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrackShipment;
