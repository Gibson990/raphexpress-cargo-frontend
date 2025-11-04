import { Ship, Plane } from 'lucide-react';
import Input from '../common/Input';
import type { ShippingData, ValidationErrors, OrderType } from '../../hooks/useOrderForm';

interface StepShippingMethodProps {
  data: ShippingData;
  onChange: (data: ShippingData) => void;
  errors: ValidationErrors;
  showErrors: boolean;
  orderType: OrderType;
}

const StepShippingMethod = ({ data, onChange, errors, showErrors, orderType }: StepShippingMethodProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
          <Ship className="h-6 w-6 text-cyan-600" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">Shipping Method & Options</h2>
      </div>

      {/* Shipping Method Selection - Only for International */}
      {orderType === 'international' && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Shipping Method <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => onChange({ ...data, shippingMethod: 'sea' })}
              className={`p-6 rounded-xl border-2 transition-all ${
                data.shippingMethod === 'sea'
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <Ship className="h-10 w-10 mx-auto mb-3 text-cyan-600" />
              <div className="font-bold text-lg mb-1">Sea Freight</div>
              <div className="text-sm text-neutral-600 mb-2">15-30 days delivery</div>
              <div className="text-xs text-neutral-500">Best for large shipments</div>
            </button>

            <button
              type="button"
              onClick={() => onChange({ ...data, shippingMethod: 'air' })}
              className={`p-6 rounded-xl border-2 transition-all ${
                data.shippingMethod === 'air'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <Plane className="h-10 w-10 mx-auto mb-3 text-blue-600" />
              <div className="font-bold text-lg mb-1">Air Freight</div>
              <div className="text-sm text-neutral-600 mb-2">3-7 days delivery</div>
              <div className="text-xs text-neutral-500">Fast and reliable</div>
            </button>
          </div>
        </div>
      )}

      {/* Full Container Option - Only for Sea Freight */}
      {orderType === 'international' && data.shippingMethod === 'sea' && (
        <div>
          <label className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
            <input
              type="checkbox"
              checked={data.isFullContainer}
              onChange={(e) => onChange({ ...data, isFullContainer: e.target.checked })}
              className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
            />
            <div className="flex-1">
              <span className="font-medium text-neutral-900">Full Container Load (FCL)</span>
              <p className="text-sm text-neutral-600 mt-1">
                Check this if you want to book an entire container
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Container Type Selection */}
      {data.isFullContainer && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Container Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            {(['20ft Container', '40ft Container', '45ft Container'] as const).map((container) => (
              <button
                key={container}
                type="button"
                onClick={() => onChange({ ...data, containerType: container })}
                className={`p-4 rounded-lg border-2 text-sm font-medium transition-all ${
                  data.containerType === container
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {container}
              </button>
            ))}
          </div>
          {showErrors && errors.containerType && (
            <p className="text-sm text-red-600 mt-1">{errors.containerType}</p>
          )}
        </div>
      )}

      {/* Goods Value */}
      <Input
        label="Goods Value (USD)"
        type="number"
        placeholder="Enter total value of goods"
        value={data.goodsValue}
        onChange={(e) => onChange({ ...data, goodsValue: e.target.value })}
        required
        error={showErrors ? errors.goodsValue : undefined}
      />

      {/* Additional Options - Only for International */}
      {orderType === 'international' && (
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
            <input
              type="checkbox"
              checked={data.customsClearance}
              onChange={(e) => onChange({ ...data, customsClearance: e.target.checked })}
              className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
            />
            <div className="flex-1">
              <span className="font-medium text-neutral-900">Customs Clearance Assistance</span>
              <p className="text-sm text-neutral-600 mt-1">
                We'll help with customs documentation and clearance
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
            <input
              type="checkbox"
              checked={data.insurance}
              onChange={(e) => onChange({ ...data, insurance: e.target.checked })}
              className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
            />
            <div className="flex-1">
              <span className="font-medium text-neutral-900">Cargo Insurance</span>
              <p className="text-sm text-neutral-600 mt-1">
                Protect your shipment against damage or loss
              </p>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};

export default StepShippingMethod;
