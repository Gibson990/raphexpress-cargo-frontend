import { Ship, Truck } from 'lucide-react';
import Card from '../common/Card';

interface OrderTypeSelectorProps {
  onSelectType: (type: 'international' | 'local') => void;
}

const OrderTypeSelector = ({ onSelectType }: OrderTypeSelectorProps) => {
  return (
    <Card variant="elevated" padding="lg">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Select Shipment Type</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* International */}
        <button
          onClick={() => onSelectType('international')}
          className="p-8 rounded-xl border-2 border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all group"
        >
          <div className="w-20 h-20 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
            <Ship className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="font-bold text-xl mb-2">International Shipping</h3>
          <p className="text-sm text-neutral-600 mb-3">Cross-border shipping via air or sea freight</p>
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
            <span>•</span>
            <span>5 Steps</span>
            <span>•</span>
            <span>Customs</span>
            <span>•</span>
            <span>Tax Calculation</span>
          </div>
        </button>

        {/* Local */}
        <button
          onClick={() => onSelectType('local')}
          className="p-8 rounded-xl border-2 border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all group"
        >
          <div className="w-20 h-20 bg-green-100 group-hover:bg-green-200 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
            <Truck className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="font-bold text-xl mb-2">Local Delivery</h3>
          <p className="text-sm text-neutral-600 mb-3">Fast domestic shipping within your country</p>
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
            <span>•</span>
            <span>5 Steps</span>
            <span>•</span>
            <span>Same/Next Day</span>
            <span>•</span>
            <span>No Customs</span>
          </div>
        </button>
      </div>
    </Card>
  );
};

export default OrderTypeSelector;
