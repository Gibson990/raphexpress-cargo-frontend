import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DollarSign, CreditCard, CheckCircle2, Package } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import ProgressSteps from '../components/orders/ProgressSteps';
import OrderSelector, { type ShipmentSummary } from '../components/orders/OrderSelector';
import { useRefundForm } from '../hooks/useRefundForm';
import { ROUTES } from '../utils/constants';
import toast from 'react-hot-toast';

const RefundRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [showErrors, setShowErrors] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const steps = [
    { number: 1, title: 'Select Order', icon: Package },
    { number: 2, title: 'Reason & Evidence', icon: DollarSign },
    { number: 3, title: 'Refund Method', icon: CreditCard },
    { number: 4, title: 'Review', icon: CheckCircle2 },
    { number: 5, title: 'Submit', icon: CheckCircle2 },
  ];

  const shipments: ShipmentSummary[] = useMemo(
    () => [
      { id: 'RPHX123456789', origin: 'Mumbai, India', destination: 'Dubai, UAE', status: 'delivered', mode: 'Air Freight', createdDate: '2025-10-20', eta: '2025-10-28' },
      { id: 'RPHX987654321', origin: 'Delhi, India', destination: 'Singapore', status: 'delivered', mode: 'Sea Freight', createdDate: '2025-10-18', eta: '2025-10-25' },
    ],
    []
  );

  const form = useRefundForm();

  useEffect(() => {
    const pre = (location.state as any)?.selectedOrder as ShipmentSummary | undefined;
    if (pre) form.setSelectedOrder(pre);
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
    toast.success('Refund request submitted');
    navigate(ROUTES.MY_SHIPMENTS);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Refund Request</h1>
          <p className="text-neutral-600">Select your order and request a refund</p>
        </div>

        <ProgressSteps steps={steps} currentStep={currentStep} />

        <Card variant="elevated" padding="lg">
          {currentStep === 1 && (
            <OrderSelector shipments={shipments} onSelect={(s) => form.setSelectedOrder(s)} />
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Refund Reason *</label>
                <select
                  value={selectedReason}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedReason(val);
                    if (val === 'Other') {
                      setOtherReason('');
                      form.setReason('');
                    } else {
                      form.setReason(val);
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
                  onChange={(e) => { setOtherReason(e.target.value); form.setReason(e.target.value ? `Other: ${e.target.value}` : ''); }}
                  required
                  error={showErrors && !form.data.reason ? 'This field is required' : undefined}
                />
              )}
              <Input
                label="Evidence URL"
                placeholder="Link to photos/videos (optional)"
                value={form.data.evidenceUrl}
                onChange={(e) => form.setEvidenceUrl(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Attach Photos (from device)</label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    if (e.dataTransfer.files && e.dataTransfer.files.length) {
                      form.addEvidenceFiles(e.dataTransfer.files);
                    }
                  }}
                  className={`mb-3 rounded-lg border-2 border-dashed ${dragActive ? 'border-primary bg-primary/5' : 'border-neutral-200'} p-3 text-sm text-neutral-600 text-center`}
                >
                  Drag and drop images here, or select from device
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) form.addEvidenceFiles(e.target.files);
                  }}
                  className="block w-full text-sm text-neutral-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200"
                />
                {form.data.evidenceFiles.length > 0 && (
                  <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {form.data.evidenceFiles.map((f, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={URL.createObjectURL(f)}
                          alt={f.name}
                          className="w-full h-24 object-cover rounded border border-neutral-200"
                        />
                        <button
                          type="button"
                          onClick={() => form.removeEvidenceFile(idx)}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs hidden group-hover:flex items-center justify-center"
                          aria-label="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-neutral-700 mb-3">Refund Method *</label>
              <div className="grid md:grid-cols-3 gap-3">
                {([
                  { id: 'original', label: 'Original Method' },
                  { id: 'wallet', label: 'Wallet/Credit' },
                  { id: 'bank', label: 'Bank Transfer' },
                ] as const).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => form.setMethod(m.id)}
                    className={`p-4 rounded-lg border-2 text-sm font-medium transition-all ${
                      form.data.method === m.id ? 'border-primary bg-primary/10 text-primary' : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {form.data.method === 'bank' && (
                <div className="grid md:grid-cols-3 gap-3">
                  <Input
                    label="Account Holder Name"
                    value={form.data.bankAccountName}
                    onChange={(e) => form.setBank(e.target.value, form.data.bankAccountNumber, form.data.bankIfscOrSwift)}
                    required
                    error={showErrors ? form.errors.bankAccountName : undefined}
                  />
                  <Input
                    label="Account Number"
                    value={form.data.bankAccountNumber}
                    onChange={(e) => form.setBank(form.data.bankAccountName, e.target.value, form.data.bankIfscOrSwift)}
                    required
                    error={showErrors ? form.errors.bankAccountNumber : undefined}
                  />
                  <Input
                    label="IFSC/SWIFT Code"
                    value={form.data.bankIfscOrSwift}
                    onChange={(e) => form.setBank(form.data.bankAccountName, form.data.bankAccountNumber, e.target.value)}
                    required
                    error={showErrors ? form.errors.bankIfscOrSwift : undefined}
                  />
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
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
                  <div className="text-sm text-neutral-700">{form.data.reason || '-'}</div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="font-medium text-neutral-900 mb-1">Refund Method</div>
                  <div className="text-sm text-neutral-700">{
                    form.data.method === 'original' ? 'Original Payment Method' : form.data.method === 'wallet' ? 'Wallet/Credit' : 'Bank Transfer'
                  }</div>
                </div>
              </div>
              {form.data.evidenceFiles.length > 0 && (
                <div>
                  <div className="font-medium text-neutral-900 mb-2">Attached Photos</div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {form.data.evidenceFiles.map((f, idx) => (
                      <img key={idx} src={URL.createObjectURL(f)} alt={f.name} className="w-full h-24 object-cover rounded border border-neutral-200" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-3">
              <p className="text-sm text-neutral-600">By submitting, you confirm the information is accurate and agree to the refund policy.</p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>Back</Button>
            <div className="flex gap-3">
              {currentStep < 5 ? (
                <Button variant="primary" onClick={handleNext}>Continue</Button>
              ) : (
                <Button variant="primary" onClick={handleSubmit}>Submit Refund</Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RefundRequest;
