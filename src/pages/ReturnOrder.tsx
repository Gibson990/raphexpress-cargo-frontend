import { RotateCcw, Package, AlertCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const ReturnOrder = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Return Order</h1>
          <p className="text-neutral-600">Request a return for your delivered shipment</p>
        </div>

        {/* Coming Soon Notice */}
        <Card variant="elevated" padding="lg">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <RotateCcw className="h-10 w-10 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">Return Order Feature</h2>
            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
              This feature is currently under development. Soon you'll be able to request returns for your delivered shipments.
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
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg">Easy Returns</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Select your delivered order and request a return with just a few clicks. We'll arrange pickup from your location.
            </p>
          </Card>

          <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <RotateCcw className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg">Track Returns</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Monitor your return shipment status in real-time. Get notified at every step of the return process.
            </p>
          </Card>
        </div>

        {/* Temporary Action */}
        <Card variant="bordered" padding="lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-neutral-900 mb-1">Need to Return an Order?</h3>
              <p className="text-sm text-neutral-600">Contact our support team for assistance</p>
            </div>
            <Button variant="outline" onClick={() => window.location.href = 'mailto:support@raphexpress.com'}>
              Contact Support
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReturnOrder;
