import { MapPin } from 'lucide-react';
import Input from '../common/Input';
import type { AddressData, ValidationErrors, OrderType } from '../../hooks/useOrderForm';

interface StepFromAddressProps {
  data: AddressData;
  onChange: (data: AddressData) => void;
  errors: ValidationErrors;
  showErrors: boolean;
  orderType: OrderType;
}

const StepFromAddress = ({ data, onChange, errors, showErrors, orderType }: StepFromAddressProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
          <MapPin className="h-6 w-6 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">From Address</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Name"
          placeholder="Enter sender name"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          required
          error={showErrors ? errors.fromName : undefined}
        />
        <Input
          label="Phone 1"
          type="tel"
          placeholder="+1 234 567 890"
          value={data.phone1}
          onChange={(e) => onChange({ ...data, phone1: e.target.value })}
          required
          error={showErrors ? errors.fromPhone1 : undefined}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Phone 2"
            type="tel"
            placeholder="+1 234 567 890 (Optional)"
            value={data.phone2}
            onChange={(e) => onChange({ ...data, phone2: e.target.value })}
          />
          <p className="text-xs text-neutral-500 mt-1">Optional</p>
        </div>
        <Input
          label="Email"
          type="email"
          placeholder="sender@example.com"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          required
          error={showErrors ? errors.fromEmail : undefined}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Input
          label="Country"
          placeholder="Select country"
          value={data.country}
          onChange={(e) => onChange({ ...data, country: e.target.value })}
          required
          error={showErrors ? errors.fromCountry : undefined}
        />
        <Input
          label="State"
          placeholder="Select state"
          value={data.state}
          onChange={(e) => onChange({ ...data, state: e.target.value })}
          required
          error={showErrors ? errors.fromState : undefined}
        />
        <Input
          label="City"
          placeholder="Enter city"
          value={data.city}
          onChange={(e) => onChange({ ...data, city: e.target.value })}
          required
          error={showErrors ? errors.fromCity : undefined}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Address"
          placeholder="Street address"
          value={data.address}
          onChange={(e) => onChange({ ...data, address: e.target.value })}
          required
          error={showErrors ? errors.fromAddress : undefined}
        />
        <div>
          <Input
            label="Apt/Suite"
            placeholder="Apartment or suite number (Optional)"
            value={data.apt}
            onChange={(e) => onChange({ ...data, apt: e.target.value })}
          />
          <p className="text-xs text-neutral-500 mt-1">Optional</p>
        </div>
      </div>

      {orderType === 'international' && (
        <div>
          <Input
            label="Tax ID"
            placeholder="Tax identification number (Optional)"
            value={data.taxId}
            onChange={(e) => onChange({ ...data, taxId: e.target.value })}
          />
          <p className="text-xs text-neutral-500 mt-1">Optional - Required for customs clearance</p>
        </div>
      )}
    </div>
  );
};

export default StepFromAddress;
