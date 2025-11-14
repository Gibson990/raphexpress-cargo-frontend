import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RotateCcw, Package, MapPin, Ship, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import ProgressSteps from '../components/orders/ProgressSteps';
import OrderSelector, { type ShipmentSummary } from '../components/orders/OrderSelector';
import { useReturnForm } from '../hooks/useReturnForm';
import { ROUTES } from '../utils/constants';
import toast from 'react-hot-toast';

const ReturnOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [showErrors, setShowErrors] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const steps = [
    { number: 1, title: 'Select Order', icon: Package },
    { number: 2, title: 'Reason & Items', icon: RotateCcw },
    { number: 3, title: 'Pickup Details', icon: MapPin },
    { number: 4, title: 'Return Method', icon: Ship },
    { number: 5, title: 'Review & Submit', icon: CheckCircle2 },
  ];

  const shipments: ShipmentSummary[] = useMemo(
    () => [
      { id: 'RPHX123456789', origin: 'Mumbai, India', destination: 'Dubai, UAE', status: 'delivered', mode: 'Air Freight', createdDate: '2025-10-20', eta: '2025-10-28' },
      { id: 'RPHX987654321', origin: 'Delhi, India', destination: 'Singapore', status: 'delivered', mode: 'Sea Freight', createdDate: '2025-10-18', eta: '2025-10-25' },
    ],
    []
  );

  const form = useReturnForm();

  useEffect(() => {
    const pre = (location.state as any)?.selectedOrder as ShipmentSummary | undefined;
    if (pre) {
      form.setSelectedOrder(pre);
    }
  }, [location.state]);

  const handleNext = () => {
    setShowErrors(true);
    if (form.validateStep(currentStep)) {
      setCurrentStep((s) => s + 1);
      setShowErrors(false);
      form.setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error('Please fill in required fields');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      setShowErrors(false);
      form.setErrors({});
    }
  };

  const handleSubmit = () => {
    toast.success('Return request submitted');
    navigate(ROUTES.MY_SHIPMENTS);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Return Order</h1>
          <p className="text-neutral-600">Select your order and complete the return steps</p>
        </div>

        <ProgressSteps steps={steps} currentStep={currentStep} />

        <Card variant="elevated" padding="lg">
          {currentStep === 1 && (
            <OrderSelector shipments={shipments} onSelect={(s) => form.setSelectedOrder(s)} />
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Return Reason *</label>
                <select
                  value={selectedReason}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedReason(val);
                    if (val === 'Other') {
                      setOtherReason('');
                      form.setItems({ ...form.data.items, reason: '' });
                    } else {
                      form.setItems({ ...form.data.items, reason: val });
                    }
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="" disabled>Select a reason</option>
                  <option>Damaged item</option>
                  <option>Wrong item</option>
                  <option>Not as described</option>
                  <option>Other</option>
                </select>
                {selectedReason === '' && showErrors && form.errors.reason && (
                  <p className="text-sm text-red-600 mt-1">{form.errors.reason}</p>
                )}
              </div>
              {selectedReason === 'Other' && (
                <Input
                  label="Please specify"
                  placeholder="Type your reason"
                  value={otherReason}
                  onChange={(e) => { setOtherReason(e.target.value); form.setItems({ ...form.data.items, reason: e.target.value ? `Other: ${e.target.value}` : '' }); }}
                  required
                  error={showErrors && !form.data.items.reason ? 'This field is required' : undefined}
                />
              )}
              <Input
                label="Notes"
                placeholder="Additional details (optional)"
                value={form.data.items.notes}
                onChange={(e) => form.setItems({ ...form.data.items, notes: e.target.value })}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <Input
                label="Pickup Address"
                placeholder="Enter pickup address"
                value={form.data.pickup.address}
                onChange={(e) => form.setPickup({ ...form.data.pickup, address: e.target.value })}
                required
                error={showErrors ? form.errors.address : undefined}
              />
              <div className="grid md:grid-cols-2 gap-3">
                <Input
                  label="Pickup Date"
                  type="date"
                  value={form.data.pickup.date}
                  onChange={(e) => form.setPickup({ ...form.data.pickup, date: e.target.value })}
                  required
                  error={showErrors ? form.errors.date : undefined}
                />
                <Input
                  label="Time Slot"
                  placeholder="e.g., 10:00 - 12:00"
                  value={form.data.pickup.timeSlot}
                  onChange={(e) => form.setPickup({ ...form.data.pickup, timeSlot: e.target.value })}
                  required
                  error={showErrors ? form.errors.timeSlot : undefined}
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-neutral-700 mb-3">Return Method *</label>
              <div className="grid grid-cols-2 gap-3">
                {(['ground', 'express'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => form.setShippingMethod(m)}
                    className={`p-5 rounded-xl border-2 transition-all ${
                      form.data.shippingMethod === m ? 'border-primary bg-primary/10' : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="font-bold text-lg mb-1">{m === 'ground' ? 'Ground' : 'Express'}</div>
                    <div className="text-sm text-neutral-600">{m === 'ground' ? '2-5 days' : '1-2 days'}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-3">
              <div className="p-4 bg-neutral-50 rounded-lg">
                <div className="font-medium text-neutral-900 mb-1">Order</div>
                <div className="text-sm text-neutral-700 font-mono">{form.data.selectedOrder?.id}</div>
                <div className="text-sm text-neutral-700">{form.data.selectedOrder?.origin} → {form.data.selectedOrder?.destination}</div>
                <div className="mt-2 text-xs text-neutral-600 flex flex-wrap gap-3 items-center">
                  <span className={`px-2 py-1 rounded-full font-medium ${form.data.selectedOrder?.status ? 'bg-green-100 text-green-800' : ''}`}>{form.data.selectedOrder?.status?.replace(/_/g,' ')}</span>
                  <span>{form.data.selectedOrder?.mode}</span>
                  {form.data.selectedOrder?.createdDate && <span>Created {new Date(form.data.selectedOrder.createdDate).toLocaleDateString()}</span>}
                  {form.data.selectedOrder?.eta && <span>ETA {new Date(form.data.selectedOrder.eta).toLocaleDateString()}</span>}
                  {form.data.selectedOrder?.weight && <span>Weight: {form.data.selectedOrder.weight}</span>}
                  {form.data.selectedOrder?.value && <span>Value: {form.data.selectedOrder.value}</span>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="font-medium text-neutral-900 mb-1">Reason</div>
                  <div className="text-sm text-neutral-700">{form.data.items.reason || '-'}</div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="font-medium text-neutral-900 mb-1">Pickup</div>
                  <div className="text-sm text-neutral-700">{form.data.pickup.address || '-'} • {form.data.pickup.date || '-'} • {form.data.pickup.timeSlot || '-'}</div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="font-medium text-neutral-900 mb-1">Method</div>
                  <div className="text-sm text-neutral-700">{form.data.shippingMethod === 'ground' ? 'Ground' : 'Express'}</div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
              Back
            </Button>
            <div className="flex gap-3">
              {currentStep < 5 ? (
                <Button variant="primary" onClick={handleNext}>Continue</Button>
              ) : (
                <Button variant="primary" onClick={handleSubmit}>Submit Return</Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReturnOrder;
