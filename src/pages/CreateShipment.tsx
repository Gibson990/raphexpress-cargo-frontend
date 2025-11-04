import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, Ship, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { ROUTES } from '../utils/constants';
import toast from 'react-hot-toast';
import { useOrderForm, type OrderType } from '../hooks/useOrderForm';
import OrderTypeSelector from '../components/orders/OrderTypeSelector';
import ProgressSteps from '../components/orders/ProgressSteps';
import StepFromAddress from '../components/orders/StepFromAddress';
import StepToAddress from '../components/orders/StepToAddress';
import StepPackageDetails from '../components/orders/StepPackageDetails';
import StepShippingMethod from '../components/orders/StepShippingMethod';
import StepReviewSubmit from '../components/orders/StepReviewSubmit';

const CreateShipment = () => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState<OrderType | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Steps configuration
  const steps = [
    { number: 1, title: 'From Address', icon: MapPin },
    { number: 2, title: 'To Address', icon: MapPin },
    { number: 3, title: 'Package Details', icon: Package },
    { number: 4, title: 'Shipping Method', icon: Ship },
    { number: 5, title: 'Review & Submit', icon: CheckCircle2 },
  ];

  // Initialize form hook only when orderType is selected
  const formHook = orderType ? useOrderForm(orderType) : null;

  const handleNext = () => {
    if (!formHook) return;

    setShowErrors(true);
    const isValid = formHook.validateStep(currentStep);

    if (isValid) {
      setCurrentStep(currentStep + 1);
      setShowErrors(false);
      formHook.setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowErrors(false);
      formHook?.setErrors({});
    }
  };

  const handleSubmit = () => {
    if (!formHook) return;

    setIsSubmitting(true);
    const orderData = formHook.getOrderData();
    console.log('Order Data:', orderData);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(`${orderType?.charAt(0).toUpperCase()}${orderType?.slice(1)} shipment created successfully!`);
      navigate(ROUTES.MY_SHIPMENTS);
    }, 2000);
  };

  const handleOrderTypeSelect = (type: 'international' | 'local') => {
    setOrderType(type);
    setCurrentStep(1);
  };

  const handleChangeOrderType = () => {
    if (window.confirm('Are you sure you want to change the shipment type? All progress will be lost.')) {
      setOrderType(null);
      setCurrentStep(1);
      setShowErrors(false);
    }
  };

  // Render step content
  const renderStepContent = () => {
    if (!formHook || !orderType) return null;

    switch (currentStep) {
      case 1:
        return (
          <StepFromAddress
            data={formHook.fromAddress}
            onChange={formHook.setFromAddress}
            errors={formHook.errors}
            showErrors={showErrors}
            orderType={orderType}
          />
        );
      case 2:
        return (
          <StepToAddress
            data={formHook.toAddress}
            onChange={formHook.setToAddress}
            errors={formHook.errors}
            showErrors={showErrors}
            orderType={orderType}
          />
        );
      case 3:
        return (
          <StepPackageDetails
            data={formHook.packageDetails}
            onChange={formHook.setPackageDetails}
            errors={formHook.errors}
            showErrors={showErrors}
            cbm={formHook.cbm}
          />
        );
      case 4:
        return (
          <StepShippingMethod
            data={formHook.shippingOptions}
            onChange={formHook.setShippingOptions}
            errors={formHook.errors}
            showErrors={showErrors}
            orderType={orderType}
          />
        );
      case 5:
        return (
          <StepReviewSubmit
            orderType={orderType}
            fromAddress={formHook.fromAddress}
            toAddress={formHook.toAddress}
            packageDetails={formHook.packageDetails}
            shippingOptions={formHook.shippingOptions}
            cbm={formHook.cbm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            {orderType ? `Create ${orderType.charAt(0).toUpperCase() + orderType.slice(1)} Shipment` : 'Create New Shipment'}
          </h1>
          <p className="text-neutral-600">
            {orderType ? 'Fill in the details to create your shipment' : 'Select international or local delivery'}
          </p>
        </div>

        {/* Order Type Selection */}
        {!orderType ? (
          <OrderTypeSelector onSelectType={handleOrderTypeSelect} />
        ) : (
          <>
            {/* Progress Steps */}
            <ProgressSteps steps={steps} currentStep={currentStep} />

            {/* Form Content */}
            <Card variant="elevated" padding="lg">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  leftIcon={<ArrowLeft className="h-4 w-4" />}
                >
                  Back
                </Button>

                <div className="flex gap-3">
                  {currentStep < 5 ? (
                    <Button
                      variant="primary"
                      onClick={handleNext}
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      isLoading={isSubmitting}
                      rightIcon={<CheckCircle2 className="h-4 w-4" />}
                    >
                      Create {orderType.charAt(0).toUpperCase() + orderType.slice(1)} Shipment
                    </Button>
                  )}
                </div>
              </div>

              {/* Change Order Type Button */}
              <div className="mt-6 pt-4 border-t border-neutral-200">
                <button
                  onClick={handleChangeOrderType}
                  className="text-sm text-neutral-600 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Change Shipment Type
                </button>
              </div>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreateShipment;
