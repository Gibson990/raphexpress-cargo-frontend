import { Package } from 'lucide-react';
import Input from '../common/Input';
import type { PackageData, ValidationErrors } from '../../hooks/useOrderForm';

interface StepPackageDetailsProps {
  data: PackageData;
  onChange: (data: PackageData) => void;
  errors: ValidationErrors;
  showErrors: boolean;
  cbm: string;
}

const GOODS_TYPES = [
  'Electronics',
  'Clothing',
  'Food Products',
  'Furniture',
  'Documents',
  'Machinery',
  'Personal Effects',
  'Other',
];

const StepPackageDetails = ({ data, onChange, errors, showErrors, cbm }: StepPackageDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <Package className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">Package Details</h2>
      </div>

      {/* Goods Type */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Goods Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {GOODS_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange({ ...data, goodsType: type })}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                data.goodsType === type
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        {showErrors && errors.goodsType && (
          <p className="text-sm text-red-600 mt-1">{errors.goodsType}</p>
        )}
      </div>

      {data.goodsType === 'Other' && (
        <Input
          label="Describe Goods"
          placeholder="Please describe the goods"
          value={data.otherGoodsDescription}
          onChange={(e) => onChange({ ...data, otherGoodsDescription: e.target.value })}
          required
          error={showErrors ? errors.otherGoods : undefined}
        />
      )}

      {/* Weight and Quantity */}
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Weight (kg)"
          type="number"
          placeholder="Enter weight in kilograms"
          value={data.weight}
          onChange={(e) => onChange({ ...data, weight: e.target.value })}
          required
          error={showErrors ? errors.weight : undefined}
        />
        <Input
          label="Quantity"
          type="number"
          placeholder="Number of packages"
          value={data.quantity}
          onChange={(e) => onChange({ ...data, quantity: e.target.value })}
          required
          error={showErrors ? errors.quantity : undefined}
        />
      </div>

      {/* Dimensions */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Dimensions <span className="text-red-500">*</span>
        </label>
        
        {/* Unit Selection */}
        <div className="flex gap-3 mb-4">
          {(['mm', 'cm', 'm'] as const).map((unit) => (
            <button
              key={unit}
              type="button"
              onClick={() => onChange({ ...data, dimensionUnit: unit })}
              className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                data.dimensionUnit === unit
                  ? 'border-primary bg-primary text-white'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {unit.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input
            label={`Length (${data.dimensionUnit})`}
            type="number"
            placeholder="Length"
            value={data.length}
            onChange={(e) => onChange({ ...data, length: e.target.value })}
            required
            error={showErrors ? errors.length : undefined}
          />
          <Input
            label={`Width (${data.dimensionUnit})`}
            type="number"
            placeholder="Width"
            value={data.width}
            onChange={(e) => onChange({ ...data, width: e.target.value })}
            required
            error={showErrors ? errors.width : undefined}
          />
          <Input
            label={`Height (${data.dimensionUnit})`}
            type="number"
            placeholder="Height"
            value={data.height}
            onChange={(e) => onChange({ ...data, height: e.target.value })}
            required
            error={showErrors ? errors.height : undefined}
          />
        </div>
      </div>

      {/* CBM Display */}
      {data.length && data.width && data.height && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">Calculated CBM:</span>
            <span className="text-lg font-bold text-blue-700">{cbm} m³</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepPackageDetails;
