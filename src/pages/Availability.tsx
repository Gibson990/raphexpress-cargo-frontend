import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plane, Ship, MapPin, Clock, DollarSign, Package, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import DashboardLayout from '../components/layout/DashboardLayout';
import { ROUTES } from '../utils/constants';
import toast from 'react-hot-toast';

const Availability = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedMode, setSelectedMode] = useState<'all' | 'air' | 'sea'>('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleBookNow = (schedule: any) => {
    toast.success(`Booking ${schedule.carrier}! Redirecting...`);
    setTimeout(() => {
      navigate(ROUTES.CREATE_SHIPMENT, {
        state: {
          mode: schedule.mode,
          origin: schedule.route.split(' → ')[0],
          destination: schedule.route.split(' → ')[1],
          date: schedule.departure.split(' ')[0],
        }
      });
    }, 1000);
  };

  const schedules = [
    {
      id: 1,
      mode: 'air',
      carrier: 'Raphexpress Air Cargo',
      route: 'Mumbai (BOM) → Dubai (DXB)',
      departure: '2025-10-24 14:30',
      arrival: '2025-10-24 18:45',
      duration: '4h 15m',
      capacity: 'Available',
      price: 89.99,
      availableSlots: 45,
    },
    {
      id: 2,
      mode: 'air',
      carrier: 'Raphexpress Express',
      route: 'Mumbai (BOM) → Singapore (SIN)',
      departure: '2025-10-24 22:00',
      arrival: '2025-10-25 06:30',
      duration: '5h 30m',
      capacity: 'Limited',
      price: 125.00,
      availableSlots: 12,
    },
    {
      id: 3,
      mode: 'sea',
      carrier: 'Raphexpress Ocean Line',
      route: 'Mumbai Port → Dubai Port',
      departure: '2025-10-25 08:00',
      arrival: '2025-11-08 16:00',
      duration: '14 days',
      capacity: 'Available',
      price: 45.99,
      availableSlots: 200,
    },
    {
      id: 4,
      mode: 'air',
      carrier: 'Raphexpress Air',
      route: 'Delhi (DEL) → London (LHR)',
      departure: '2025-10-24 23:45',
      arrival: '2025-10-25 05:30',
      duration: '8h 45m',
      capacity: 'Available',
      price: 159.99,
      availableSlots: 67,
    },
    {
      id: 5,
      mode: 'sea',
      carrier: 'Raphexpress Shipping',
      route: 'Chennai Port → Singapore Port',
      departure: '2025-10-26 10:00',
      arrival: '2025-11-05 14:00',
      duration: '10 days',
      capacity: 'Available',
      price: 38.50,
      availableSlots: 150,
    },
    {
      id: 6,
      mode: 'air',
      carrier: 'Raphexpress Cargo',
      route: 'Bangalore (BLR) → New York (JFK)',
      departure: '2025-10-25 01:15',
      arrival: '2025-10-25 14:30',
      duration: '16h 15m',
      capacity: 'Limited',
      price: 199.99,
      availableSlots: 8,
    },
  ];

  const filteredSchedules = schedules.filter(schedule => {
    const matchesMode = selectedMode === 'all' || schedule.mode === selectedMode;
    const matchesOrigin = !origin || schedule.route.toLowerCase().includes(origin.toLowerCase());
    const matchesDestination = !destination || schedule.route.toLowerCase().includes(destination.toLowerCase());
    return matchesMode && matchesOrigin && matchesDestination;
  });

  const getCapacityColor = (capacity: string) => {
    switch (capacity) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Limited':
        return 'bg-yellow-100 text-yellow-800';
      case 'Full':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Flight & Ship Availability
          </h1>
          <p className="text-neutral-600">
            Browse available cargo flights and ships for your shipments
          </p>
        </div>

        {/* Filters */}
        <Card variant="elevated" padding="lg">
          <div className="space-y-6">
            {/* Mode Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Shipping Mode
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedMode('all')}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
                    selectedMode === 'all'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <Package className="h-5 w-5 mx-auto mb-1" />
                  <div className="font-medium">All Modes</div>
                </button>
                <button
                  onClick={() => setSelectedMode('air')}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
                    selectedMode === 'air'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <Plane className="h-5 w-5 mx-auto mb-1" />
                  <div className="font-medium">Air Freight</div>
                </button>
                <button
                  onClick={() => setSelectedMode('sea')}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
                    selectedMode === 'sea'
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <Ship className="h-5 w-5 mx-auto mb-1" />
                  <div className="font-medium">Sea Freight</div>
                </button>
              </div>
            </div>

            {/* Location & Date Filters */}
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                label="Origin"
                type="text"
                placeholder="e.g., Mumbai, Delhi"
                leftIcon={<MapPin className="h-5 w-5" />}
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
              <Input
                label="Destination"
                type="text"
                placeholder="e.g., Dubai, Singapore"
                leftIcon={<MapPin className="h-5 w-5" />}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <Input
                label="Departure Date"
                type="date"
                leftIcon={<Calendar className="h-5 w-5" />}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* View Toggle & Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-neutral-600">
            Found <strong className="text-neutral-900">{filteredSchedules.length}</strong> available schedules
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-md transition-all ${
                  viewMode === 'calendar'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Calendar className="h-4 w-4 inline mr-2" />
                Calendar
              </button>
            </div>
            <Button variant="ghost" size="sm" leftIcon={<Filter className="h-4 w-4" />}>
              More Filters
            </Button>
          </div>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <Card variant="elevated" padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                  leftIcon={<ChevronLeft className="h-4 w-4" />}
                >
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                  rightIcon={<ChevronRight className="h-4 w-4" />}
                >
                  Next
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-semibold text-neutral-700 py-2">
                  {day}
                </div>
              ))}
              
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i - 5);
                const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                const schedulesOnDate = filteredSchedules.filter(s => 
                  new Date(s.departure).toDateString() === date.toDateString()
                );

                return (
                  <div
                    key={i}
                    className={`min-h-24 p-2 border rounded-lg ${
                      isCurrentMonth ? 'bg-white border-neutral-200' : 'bg-neutral-50 border-neutral-100'
                    } ${schedulesOnDate.length > 0 ? 'cursor-pointer hover:border-primary' : ''}`}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      isCurrentMonth ? 'text-neutral-900' : 'text-neutral-400'
                    }`}>
                      {date.getDate()}
                    </div>
                    {schedulesOnDate.length > 0 && (
                      <div className="space-y-1">
                        {schedulesOnDate.slice(0, 2).map((schedule) => (
                          <div
                            key={schedule.id}
                            className={`text-xs p-1 rounded ${
                              schedule.mode === 'air' ? 'bg-blue-100 text-blue-800' : 'bg-cyan-100 text-cyan-800'
                            }`}
                          >
                            {schedule.mode === 'air' ? '✈️' : '🚢'} {schedule.carrier.split(' ')[0]}
                          </div>
                        ))}
                        {schedulesOnDate.length > 2 && (
                          <div className="text-xs text-neutral-600">
                            +{schedulesOnDate.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* List View - Schedule Cards */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredSchedules.length === 0 ? (
              <Card variant="bordered" padding="lg" className="text-center py-12">
                <Search className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  No schedules found
                </h3>
                <p className="text-neutral-600">
                  Try adjusting your filters or search criteria
                </p>
              </Card>
            ) : (
            filteredSchedules.map((schedule) => (
              <Card
                key={schedule.id}
                variant="elevated"
                padding="lg"
                className="hover:shadow-hard transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Mode Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${
                    schedule.mode === 'air' ? 'bg-blue-100' : 'bg-cyan-100'
                  }`}>
                    {schedule.mode === 'air' ? (
                      <Plane className={`h-8 w-8 ${schedule.mode === 'air' ? 'text-blue-600' : 'text-cyan-600'}`} />
                    ) : (
                      <Ship className="h-8 w-8 text-cyan-600" />
                    )}
                  </div>

                  {/* Schedule Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900 mb-1">
                          {schedule.carrier}
                        </h3>
                        <p className="text-neutral-600 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {schedule.route}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCapacityColor(schedule.capacity)}`}>
                        {schedule.capacity}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">Departure</p>
                        <p className="font-semibold text-neutral-900">
                          {new Date(schedule.departure).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">Arrival</p>
                        <p className="font-semibold text-neutral-900">
                          {new Date(schedule.arrival).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">Duration</p>
                        <p className="font-semibold text-neutral-900 flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {schedule.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">Available Slots</p>
                        <p className="font-semibold text-neutral-900">
                          {schedule.availableSlots} slots
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex-shrink-0 text-right space-y-3">
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Starting from</p>
                      <p className="text-3xl font-bold text-primary flex items-center justify-end gap-1">
                        <DollarSign className="h-6 w-6" />
                        {schedule.price}
                      </p>
                      <p className="text-xs text-neutral-500">per kg</p>
                    </div>
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => handleBookNow(schedule)}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
          </div>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card variant="bordered" padding="lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Plane className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Air Freight Benefits</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Fast delivery (3-7 days)</li>
                  <li>• Ideal for urgent shipments</li>
                  <li>• Regular daily flights</li>
                  <li>• Real-time tracking</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card variant="bordered" padding="lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Ship className="h-6 w-6 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Sea Freight Benefits</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Most economical option</li>
                  <li>• Best for bulk shipments</li>
                  <li>• Large capacity available</li>
                  <li>• Environmentally friendly</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Availability;
