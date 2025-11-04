import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, Plane, Ship, Truck, CheckCircle2, ArrowRight, ArrowLeft, RotateCcw, RefreshCw } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { ROUTES } from '../utils/constants';
import toast from 'react-hot-toast';

type OrderType = 'international' | 'local' | 'return' | 'refund' | null;

const CreateShipment = () => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState<OrderType>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Shipping mode (for international/local)
    shippingMode: 'air' as 'air' | 'sea' | 'land',
    
    // Step 2: Origin
    senderName: '',
    senderPhone: '',
    senderEmail: '',
    originAddress: '',
    originCity: '',
    originCountry: '',
    originZip: '',
    
    // Step 3: Destination
    receiverName: '',
    receiverPhone: '',
    receiverEmail: '',
    destAddress: '',
    destCity: '',
    destCountry: '',
    destZip: '',
    
    // Step 4: Package Details
    goodsType: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    containerSize: '20ft' as '20ft' | '40ft' | '40ft-hc' | '45ft-hc',
    declaredValue: '',
    
    // Step 5: Additional
    customsClearance: 'yes' as 'yes' | 'no',
    insurance: false,
    pickupDate: '',
    specialInstructions: '',
  });

  const steps = [
    { number: 1, title: 'Shipment Type', icon: Package },
    { number: 2, title: 'Origin Details', icon: MapPin },
    { number: 3, title: 'Destination', icon: MapPin },
    { number: 4, title: 'Package Info', icon: Package },
    { number: 5, title: 'Review & Submit', icon: CheckCircle2 },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Shipment created successfully!');
      navigate(ROUTES.MY_SHIPMENTS);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            {orderType ? `Create ${orderType.charAt(0).toUpperCase() + orderType.slice(1)} Order` : 'Create New Order'}
          </h1>
          <p className="text-neutral-600">
            {orderType ? 'Fill in the details to create your order' : 'Select the type of order you want to create'}
          </p>
        </div>

        {/* Order Type Selection - Show first if not selected */}
        {!orderType ? (
          <Card variant="elevated" padding="lg">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Select Order Type</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* International Order */}
              <button
                onClick={() => {
                  setOrderType('international');
                  setCurrentStep(1);
                }}
                className="p-6 rounded-xl border-2 border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                  <Ship className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">International</h3>
                <p className="text-sm text-neutral-600 mb-3">Cross-border shipping via air or sea</p>
                <div className="text-xs text-neutral-500">5 steps • Customs • Tax</div>
              </button>

              {/* Local Order */}
              <button
                onClick={() => {
                  setOrderType('local');
                  setCurrentStep(1);
                }}
                className="p-6 rounded-xl border-2 border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="w-16 h-16 bg-green-100 group-hover:bg-green-200 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                  <Truck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Local Delivery</h3>
                <p className="text-sm text-neutral-600 mb-3">Domestic shipping within country</p>
                <div className="text-xs text-neutral-500">5 steps • Fast delivery</div>
              </button>

              {/* Return Order */}
              <button
                onClick={() => {
                  setOrderType('return');
                  setCurrentStep(1);
                }}
                className="p-6 rounded-xl border-2 border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="w-16 h-16 bg-orange-100 group-hover:bg-orange-200 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                  <RotateCcw className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Return Order</h3>
                <p className="text-sm text-neutral-600 mb-3">Return an existing shipment</p>
                <div className="text-xs text-neutral-500">2 steps • Select order first</div>
              </button>

              {/* Refund Order */}
              <button
                onClick={() => {
                  setOrderType('refund');
                  setCurrentStep(1);
                }}
                className="p-6 rounded-xl border-2 border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="w-16 h-16 bg-red-100 group-hover:bg-red-200 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                  <RefreshCw className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Refund Request</h3>
                <p className="text-sm text-neutral-600 mb-3">Request refund for an order</p>
                <div className="text-xs text-neutral-500">2 steps • Select order first</div>
              </button>
            </div>
          </Card>
        ) : (
          <>

        {/* Progress Steps */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-primary text-white'
                        : 'bg-neutral-200 text-neutral-500'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </div>
                    <p className={`text-sm font-medium mt-2 text-center ${
                      isActive ? 'text-primary' : 'text-neutral-600'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-neutral-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Step Content */}
        <Card variant="elevated" padding="lg">
          {/* Step 1: Shipment Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-neutral-900">Select Shipment Type</h2>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Shipment Category
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFormData({ ...formData, shipmentType: 'local' })}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      formData.shipmentType === 'local'
                        ? 'border-primary bg-primary/5'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <Truck className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <div className="font-bold text-lg mb-1">Local Shipping</div>
                    <div className="text-sm text-neutral-600">Domestic delivery within country</div>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, shipmentType: 'international' })}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      formData.shipmentType === 'international'
                        ? 'border-primary bg-primary/5'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <Package className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <div className="font-bold text-lg mb-1">International</div>
                    <div className="text-sm text-neutral-600">Cross-border shipping</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Shipping Mode
                </label>
                <div className={`grid ${formData.shipmentType === 'local' ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
                  <button
                    onClick={() => setFormData({ ...formData, shippingMode: 'air' })}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      formData.shippingMode === 'air'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <Plane className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                    <div className="font-bold mb-1">Air Freight</div>
                    <div className="text-xs text-neutral-600">
                      {formData.shipmentType === 'local' ? '1-3 days' : '3-7 days'}
                    </div>
                  </button>
                  
                  {/* Sea Freight only for International */}
                  {formData.shipmentType === 'international' && (
                    <button
                      onClick={() => setFormData({ ...formData, shippingMode: 'sea' })}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        formData.shippingMode === 'sea'
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <Ship className="h-8 w-8 mx-auto mb-3 text-cyan-600" />
                      <div className="font-bold mb-1">Sea Freight</div>
                      <div className="text-xs text-neutral-600">15-30 days</div>
                    </button>
                  )}
                  
                  <button
                    onClick={() => setFormData({ ...formData, shippingMode: 'land' })}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      formData.shippingMode === 'land'
                        ? 'border-green-500 bg-green-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <Truck className="h-8 w-8 mx-auto mb-3 text-green-600" />
                    <div className="font-bold mb-1">Land Freight</div>
                    <div className="text-xs text-neutral-600">
                      {formData.shipmentType === 'local' ? '2-5 days' : '5-10 days'}
                    </div>
                  </button>
                </div>
                
                {formData.shipmentType === 'local' && (
                  <p className="text-sm text-neutral-600 mt-3">
                    ℹ️ Sea freight is only available for international shipments
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Origin Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-neutral-900">Origin Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Sender Name"
                  placeholder="John Doe"
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 234 567 890"
                  value={formData.senderPhone}
                  onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                  required
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="sender@example.com"
                value={formData.senderEmail}
                onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                required
              />

              <Input
                label="Address"
                placeholder="Street address"
                value={formData.originAddress}
                onChange={(e) => setFormData({ ...formData, originAddress: e.target.value })}
                required
              />

              <div className="grid md:grid-cols-3 gap-6">
                <Input
                  label="City"
                  placeholder="Mumbai"
                  value={formData.originCity}
                  onChange={(e) => setFormData({ ...formData, originCity: e.target.value })}
                  required
                />
                {formData.shipmentType === 'international' && (
                  <Input
                    label="Country"
                    placeholder="India"
                    value={formData.originCountry}
                    onChange={(e) => setFormData({ ...formData, originCountry: e.target.value })}
                    required
                  />
                )}
                <Input
                  label="ZIP/Postal Code"
                  placeholder="400001"
                  value={formData.originZip}
                  onChange={(e) => setFormData({ ...formData, originZip: e.target.value })}
                  required
                />
              </div>
            </div>
          )}

          {/* Step 3: Destination Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-neutral-900">Destination Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Receiver Name"
                  placeholder="Jane Smith"
                  value={formData.receiverName}
                  onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+971 50 123 4567"
                  value={formData.receiverPhone}
                  onChange={(e) => setFormData({ ...formData, receiverPhone: e.target.value })}
                  required
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="receiver@example.com"
                value={formData.receiverEmail}
                onChange={(e) => setFormData({ ...formData, receiverEmail: e.target.value })}
                required
              />

              <Input
                label="Address"
                placeholder="Street address"
                value={formData.destAddress}
                onChange={(e) => setFormData({ ...formData, destAddress: e.target.value })}
                required
              />

              <div className="grid md:grid-cols-3 gap-6">
                <Input
                  label="City"
                  placeholder="Dubai"
                  value={formData.destCity}
                  onChange={(e) => setFormData({ ...formData, destCity: e.target.value })}
                  required
                />
                {formData.shipmentType === 'international' && (
                  <Input
                    label="Country"
                    placeholder="UAE"
                    value={formData.destCountry}
                    onChange={(e) => setFormData({ ...formData, destCountry: e.target.value })}
                    required
                  />
                )}
                <Input
                  label="ZIP/Postal Code"
                  placeholder="00000"
                  value={formData.destZip}
                  onChange={(e) => setFormData({ ...formData, destZip: e.target.value })}
                  required
                />
              </div>
            </div>
          )}

          {/* Step 4: Package Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-neutral-900">Package Information</h2>
              
              <Input
                label="Goods Type"
                placeholder="e.g., Electronics, Textiles, Machinery"
                value={formData.goodsType}
                onChange={(e) => setFormData({ ...formData, goodsType: e.target.value })}
                required
              />

              {formData.shippingMode === 'sea' ? (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Container Size
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setFormData({ ...formData, containerSize: '20ft' })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.containerSize === '20ft'
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="font-bold">20ft Standard</div>
                      <div className="text-xs text-neutral-600">33 CBM • 28,000 kg</div>
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, containerSize: '40ft' })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.containerSize === '40ft'
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="font-bold">40ft Standard</div>
                      <div className="text-xs text-neutral-600">67 CBM • 28,500 kg</div>
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, containerSize: '40ft-hc' })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.containerSize === '40ft-hc'
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="font-bold">40ft High Cube</div>
                      <div className="text-xs text-neutral-600">76 CBM • 28,600 kg</div>
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, containerSize: '45ft-hc' })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.containerSize === '45ft-hc'
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="font-bold">45ft High Cube</div>
                      <div className="text-xs text-neutral-600">86 CBM • 29,000 kg</div>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Input
                    label="Weight (kg)"
                    type="number"
                    placeholder="100"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    required
                  />

                  {formData.shippingMode === 'land' && (
                    <div className="grid grid-cols-3 gap-4">
                      <Input
                        label="Length (cm)"
                        type="number"
                        placeholder="100"
                        value={formData.length}
                        onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                        required
                      />
                      <Input
                        label="Width (cm)"
                        type="number"
                        placeholder="80"
                        value={formData.width}
                        onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                        required
                      />
                      <Input
                        label="Height (cm)"
                        type="number"
                        placeholder="60"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        required
                      />
                    </div>
                  )}
                </>
              )}

              <Input
                label="Declared Goods Value (USD)"
                type="number"
                placeholder="1000"
                value={formData.declaredValue}
                onChange={(e) => setFormData({ ...formData, declaredValue: e.target.value })}
                helperText={formData.shipmentType === 'international' ? "Used to calculate import taxes/duties (%) based on destination country" : "For insurance and documentation purposes"}
                required
              />

              {formData.shipmentType === 'international' && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-neutral-700">
                    Customs Clearance Assistance
                  </label>
                  <p className="text-sm text-neutral-600 mb-3">
                    Do you need help clearing your goods at the port and paying customs taxes/duties?
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setFormData({ ...formData, customsClearance: 'yes' })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.customsClearance === 'yes'
                          ? 'border-primary bg-primary/5'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="font-bold mb-1">Yes, Help Me</div>
                      <div className="text-xs text-neutral-600 mb-2">
                        We'll clear your goods at the port and handle all customs taxes
                      </div>
                      <div className="text-sm font-semibold text-primary">Service Fee: +$250</div>
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, customsClearance: 'no' })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.customsClearance === 'no'
                          ? 'border-primary bg-primary/5'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="font-bold mb-1">No, I'll Handle It</div>
                      <div className="text-xs text-neutral-600 mb-2">
                        I'll clear the goods and pay customs taxes myself
                      </div>
                      <div className="text-sm font-semibold text-green-600">No Fee</div>
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="insurance"
                  checked={formData.insurance}
                  onChange={(e) => setFormData({ ...formData, insurance: e.target.checked })}
                  className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
                />
                <label htmlFor="insurance" className="text-sm text-neutral-700">
                  Add insurance coverage (Recommended)
                </label>
              </div>

              <Input
                label="Preferred Pickup Date"
                type="date"
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Any special handling instructions..."
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-neutral-900">Review & Submit</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <h3 className="font-bold text-neutral-900 mb-3">Shipment Type</h3>
                  <p className="text-neutral-700 capitalize">{formData.shipmentType} - {formData.shippingMode} Freight</p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg">
                  <h3 className="font-bold text-neutral-900 mb-3">Origin</h3>
                  <p className="text-neutral-700">{formData.senderName}</p>
                  <p className="text-neutral-600 text-sm">{formData.originAddress}, {formData.originCity}</p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg">
                  <h3 className="font-bold text-neutral-900 mb-3">Destination</h3>
                  <p className="text-neutral-700">{formData.receiverName}</p>
                  <p className="text-neutral-600 text-sm">{formData.destAddress}, {formData.destCity}</p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg">
                  <h3 className="font-bold text-neutral-900 mb-3">Package Details</h3>
                  <p className="text-neutral-700">Goods: {formData.goodsType}</p>
                  {formData.shippingMode === 'sea' ? (
                    <p className="text-neutral-600 text-sm">Container: {formData.containerSize}</p>
                  ) : (
                    <p className="text-neutral-600 text-sm">Weight: {formData.weight} kg</p>
                  )}
                  <p className="text-neutral-600 text-sm">Declared Value: ${formData.declaredValue}</p>
                </div>

                {formData.shipmentType === 'international' && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-bold text-neutral-900 mb-2">Additional Services</h3>
                    <p className="text-neutral-700 text-sm">
                      Customs Clearance: {formData.customsClearance === 'yes' ? 'Included (+$250)' : 'Not included'}
                    </p>
                    <p className="text-neutral-700 text-sm">
                      Insurance: {formData.insurance ? 'Yes' : 'No'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Change Order Type Button */}
          <div className="mt-6 pt-4 border-t border-neutral-200">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to change the order type? All progress will be lost.')) {
                  setOrderType(null);
                  setCurrentStep(1);
                }}
              }}
              className="text-sm text-neutral-600 hover:text-primary transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Change Order Type
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Back
            </Button>

            {currentStep < 5 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                leftIcon={<CheckCircle2 className="h-4 w-4" />}
              >
                Create {orderType?.charAt(0).toUpperCase() + orderType?.slice(1)} Order
              </Button>
            )}
          </div>
        </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreateShipment;
