import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Building2, CheckCircle2, ArrowLeft } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { ROUTES } from '../utils/constants';
import toast from 'react-hot-toast';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;
  
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  // If no order data, redirect back
  if (!orderData) {
    setTimeout(() => navigate(ROUTES.CREATE_SHIPMENT), 100);
    return null;
  }

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay securely with your card',
      color: 'blue',
    },
    {
      id: 'mpesa',
      name: 'M-Pesa',
      icon: Wallet,
      description: 'Mobile money payment',
      color: 'green',
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building2,
      description: 'Direct bank transfer',
      color: 'purple',
    },
  ];

  const handlePayment = () => {
    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Payment successful! Order created.');
      navigate(ROUTES.MY_SHIPMENTS);
    }, 2500);
  };

  // Calculate estimated price (placeholder calculation)
  const estimatedPrice = orderData.orderType === 'international' 
    ? parseFloat(orderData.shippingOptions.goodsValue || '0') * 0.15
    : parseFloat(orderData.shippingOptions.goodsValue || '0') * 0.05;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-neutral-600 hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Order Details
          </button>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Payment</h1>
          <p className="text-neutral-600">Select your preferred payment method</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="md:col-span-2 space-y-6">
            <Card variant="elevated" padding="lg">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Select Payment Method</h2>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;
                  
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? `border-${method.color}-500 bg-${method.color}-50`
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                          isSelected ? `bg-${method.color}-100` : 'bg-neutral-100'
                        }`}>
                          <Icon className={`h-7 w-7 ${
                            isSelected ? `text-${method.color}-600` : 'text-neutral-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-neutral-900">{method.name}</h3>
                          <p className="text-sm text-neutral-600">{method.description}</p>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className={`h-6 w-6 text-${method.color}-600`} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Payment Button */}
            <Button
              variant="primary"
              onClick={handlePayment}
              isLoading={isProcessing}
              disabled={!selectedMethod}
              className="w-full"
            >
              {isProcessing ? 'Processing Payment...' : 'Complete Payment'}
            </Button>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card variant="elevated" padding="lg" className="sticky top-8">
              <h3 className="font-bold text-lg text-neutral-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Shipment Type:</span>
                  <span className="font-medium text-neutral-900 capitalize">{orderData.orderType}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Goods Value:</span>
                  <span className="font-medium text-neutral-900">
                    ${orderData.shippingOptions.goodsValue}
                  </span>
                </div>

                {orderData.orderType === 'international' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Shipping Method:</span>
                      <span className="font-medium text-neutral-900 uppercase">
                        {orderData.shippingOptions.shippingMethod}
                      </span>
                    </div>
                    
                    {orderData.shippingOptions.customsClearance && (
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Customs Clearance:</span>
                        <span className="font-medium text-green-600">✓ Included</span>
                      </div>
                    )}
                    
                    {orderData.shippingOptions.insurance && (
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Insurance:</span>
                        <span className="font-medium text-green-600">✓ Included</span>
                      </div>
                    )}
                  </>
                )}

                <div className="pt-3 mt-3 border-t border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-neutral-900">Estimated Total:</span>
                    <span className="text-2xl font-bold text-primary">
                      ${estimatedPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2">
                    Final price will be calculated after review
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Payment;
