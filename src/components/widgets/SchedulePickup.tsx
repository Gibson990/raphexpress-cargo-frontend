import { useState } from 'react';
import { Calendar, Clock, MapPin, FileText, CheckCircle2, Loader } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import toast from 'react-hot-toast';

interface PickupSchedule {
  date: string;
  timeSlot: '9-12' | '12-15' | '15-18';
  address: string;
  instructions: string;
}

interface SchedulePickupProps {
  onSchedule?: (schedule: PickupSchedule) => void;
  shipmentId?: string;
  defaultAddress?: string;
}

const SchedulePickup = ({ onSchedule, shipmentId, defaultAddress = '' }: SchedulePickupProps) => {
  const [step, setStep] = useState<'date' | 'time' | 'address' | 'confirm'>('date');
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<PickupSchedule>({
    date: '',
    timeSlot: '9-12',
    address: defaultAddress,
    instructions: '',
  });

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Get maximum date (30 days from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  const timeSlots = [
    { value: '9-12' as const, label: '9:00 AM - 12:00 PM', icon: '🌅' },
    { value: '12-15' as const, label: '12:00 PM - 3:00 PM', icon: '☀️' },
    { value: '15-18' as const, label: '3:00 PM - 6:00 PM', icon: '🌆' },
  ];

  const handleDateSelect = (date: string) => {
    setSchedule(prev => ({ ...prev, date }));
    setStep('time');
  };

  const handleTimeSelect = (timeSlot: '9-12' | '12-15' | '15-18') => {
    setSchedule(prev => ({ ...prev, timeSlot }));
    setStep('address');
  };

  const handleAddressChange = (address: string) => {
    setSchedule(prev => ({ ...prev, address }));
  };

  const handleInstructionsChange = (instructions: string) => {
    setSchedule(prev => ({ ...prev, instructions }));
  };

  const handleConfirm = async () => {
    // Validation
    if (!schedule.date) {
      toast.error('Please select a date');
      return;
    }
    if (!schedule.address.trim()) {
      toast.error('Please enter pickup address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store in localStorage for now (will be moved to backend)
      const pickups = JSON.parse(localStorage.getItem('pickups') || '[]');
      pickups.push({
        ...schedule,
        shipmentId,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('pickups', JSON.stringify(pickups));

      if (onSchedule) {
        onSchedule(schedule);
      }

      toast.success('Pickup scheduled successfully!');
      setStep('confirm');

      // Reset after 2 seconds
      setTimeout(() => {
        setSchedule({
          date: '',
          timeSlot: '9-12',
          address: defaultAddress,
          instructions: '',
        });
        setStep('date');
      }, 2000);
    } catch (error) {
      toast.error('Failed to schedule pickup');
    } finally {
      setIsLoading(false);
    }
  };

  // Date Selection Step
  if (step === 'date') {
    return (
      <Card variant="elevated" padding="lg">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-bold text-neutral-900">Select Pickup Date</h3>
        </div>

        <div className="space-y-4">
          <input
            type="date"
            min={getMinDate()}
            max={getMaxDate()}
            value={schedule.date}
            onChange={(e) => handleDateSelect(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              📅 Pickup available from tomorrow onwards. Select a date within the next 30 days.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!schedule.date}
            onClick={() => setStep('time')}
          >
            Continue to Time Selection
          </Button>
        </div>
      </Card>
    );
  }

  // Time Slot Selection Step
  if (step === 'time') {
    return (
      <Card variant="elevated" padding="lg">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-bold text-neutral-900">Select Time Slot</h3>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-neutral-600 mb-4">
            📅 {new Date(schedule.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-3">
            {timeSlots.map(slot => (
              <button
                key={slot.value}
                onClick={() => handleTimeSelect(slot.value)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  schedule.timeSlot === slot.value
                    ? 'border-primary bg-primary/5'
                    : 'border-neutral-200 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{slot.icon}</span>
                    <div>
                      <p className="font-semibold text-neutral-900">{slot.label}</p>
                      <p className="text-xs text-neutral-500">3-hour window</p>
                    </div>
                  </div>
                  {schedule.timeSlot === slot.value && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setStep('date')}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => setStep('address')}
            >
              Continue to Address
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Address & Instructions Step
  if (step === 'address') {
    return (
      <Card variant="elevated" padding="lg">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-bold text-neutral-900">Pickup Address & Instructions</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Pickup Address
            </label>
            <textarea
              value={schedule.address}
              onChange={(e) => handleAddressChange(e.target.value)}
              placeholder="Enter complete pickup address..."
              rows={3}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              value={schedule.instructions}
              onChange={(e) => handleInstructionsChange(e.target.value)}
              placeholder="e.g., Gate code, building access, contact person, etc."
              rows={3}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              ⏰ Our driver will arrive during the selected time window. Please ensure someone is available to hand over the shipment.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setStep('time')}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              disabled={!schedule.address.trim()}
              onClick={() => setStep('confirm')}
            >
              Review & Confirm
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Confirmation Step
  if (step === 'confirm') {
    return (
      <Card variant="elevated" padding="lg">
        <div className="text-center space-y-6">
          {isLoading ? (
            <>
              <Loader className="h-12 w-12 text-primary mx-auto animate-spin" />
              <h3 className="text-xl font-bold text-neutral-900">Scheduling Pickup...</h3>
            </>
          ) : (
            <>
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">Pickup Scheduled!</h3>
                <p className="text-neutral-600">Your pickup has been successfully scheduled.</p>
              </div>

              <div className="bg-neutral-50 rounded-lg p-6 text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Date:</span>
                  <span className="font-semibold text-neutral-900">
                    {new Date(schedule.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Time:</span>
                  <span className="font-semibold text-neutral-900">
                    {timeSlots.find(s => s.value === schedule.timeSlot)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Address:</span>
                  <span className="font-semibold text-neutral-900 text-right max-w-xs">
                    {schedule.address}
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleConfirm}
              >
                Confirm & Schedule
              </Button>
            </>
          )}
        </div>
      </Card>
    );
  }

  return null;
};

export default SchedulePickup;
