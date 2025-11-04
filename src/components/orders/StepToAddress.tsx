import { MapPin } from 'lucide-react';
import Input from '../common/Input';
import type { AddressData, ValidationErrors, OrderType } from '../../hooks/useOrderForm';

interface StepToAddressProps {
  data: AddressData;
  onChange: (data: AddressData) => void;
  errors: ValidationErrors;
  showErrors: boolean;
  orderType: OrderType;
}

const StepToAddress = ({ data, onChange, errors, showErrors, orderType }: StepToAddressProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <MapPin className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">To Address</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Name"
          placeholder="Enter receiver name"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          required
          error={showErrors ? errors.toName : undefined}
        />
        <Input
          label="Phone 1"
          type="tel"
          placeholder="+1 234 567 890"
          value={data.phone1}
          onChange={(e) => onChange({ ...data, phone1: e.target.value })}
          required
          error={showErrors ? errors.toPhone1 : undefined}
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
          placeholder="receiver@example.com"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          required
          error={showErrors ? errors.toEmail : undefined}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Input
          label="Country"
          placeholder="Select country"
          value={data.country}
          onChange={(e) => onChange({ ...data, country: e.target.value })}
          required
          error={showErrors ? errors.toCountry : undefined}
        />
        <Input
          label="State"
          placeholder="Select state"
          value={data.state}
          onChange={(e) => onChange({ ...data, state: e.target.value })}
          required
          error={showErrors ? errors.toState : undefined}
        />
        <Input
          label="City"
          placeholder="Enter city"
          value={data.city}
          onChange={(e) => onChange({ ...data, city: e.target.value })}
          required
          error={showErrors ? errors.toCity : undefined}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Address"
          placeholder="Street address"
          value={data.address}
          onChange={(e) => onChange({ ...data, address: e.target.value })}
          required
          error={showErrors ? errors.toAddress : undefined}
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

export default StepToAddress;
