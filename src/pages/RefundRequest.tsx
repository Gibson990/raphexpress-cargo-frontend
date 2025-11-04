import { DollarSign, CreditCard, AlertCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const RefundRequest = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Refund Request</h1>
          <p className="text-neutral-600">Request a refund for eligible orders</p>
        </div>

        {/* Coming Soon Notice */}
        <Card variant="elevated" padding="lg">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <DollarSign className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">Refund Request Feature</h2>
            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
              This feature is currently under development. Soon you'll be able to request refunds for eligible orders directly from your dashboard.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
              <AlertCircle className="h-4 w-4" />
              <span>Expected: Coming Soon</span>
            </div>
          </div>
        </Card>

        {/* Feature Preview */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg">Quick Refunds</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Submit refund requests for cancelled or problematic orders. Process refunds quickly and transparently.
            </p>
          </Card>

          <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg">Multiple Methods</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Receive refunds via your original payment method or choose an alternative refund method.
            </p>
          </Card>
        </div>

        {/* Refund Policy */}
        <Card variant="bordered" padding="lg">
          <h3 className="font-bold text-neutral-900 mb-4">Refund Policy</h3>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Refunds are processed within 5-7 business days</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Cancelled orders before pickup are eligible for full refund</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Partial refunds may apply for damaged or lost items</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Refund amount will be credited to your original payment method</span>
            </li>
          </ul>
        </Card>

        {/* Temporary Action */}
        <Card variant="bordered" padding="lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-neutral-900 mb-1">Need a Refund?</h3>
              <p className="text-sm text-neutral-600">Contact our billing team for refund assistance</p>
            </div>
            <Button variant="outline" onClick={() => window.location.href = 'mailto:billing@raphexpress.com'}>
              Contact Billing
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RefundRequest;
