import { CheckCircle2, MapPin, Package, Ship, DollarSign } from 'lucide-react';
import type { AddressData, PackageData, ShippingData, OrderType } from '../../hooks/useOrderForm';

interface StepReviewSubmitProps {
  orderType: OrderType;
  fromAddress: AddressData;
  toAddress: AddressData;
  packageDetails: PackageData;
  shippingOptions: ShippingData;
  cbm: string;
}

const StepReviewSubmit = ({
  orderType,
  fromAddress,
  toAddress,
  packageDetails,
  shippingOptions,
  cbm,
}: StepReviewSubmitProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">Review & Submit</h2>
      </div>

      <div className="space-y-4">
        {/* Shipment Type */}
        <div className="p-6 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-xl border-2 border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <Ship className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-neutral-900">Shipment Type</h3>
          </div>
          <p className="text-neutral-700 capitalize">
            {orderType} - {orderType === 'international' ? shippingOptions.shippingMethod.toUpperCase() : 'Ground'} Freight
          </p>
        </div>

        {/* From Address */}
        <div className="p-6 bg-neutral-50 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="h-5 w-5 text-orange-600" />
            <h3 className="font-bold text-neutral-900">From Address</h3>
          </div>
          <div className="space-y-1 text-sm">
            <p className="font-medium text-neutral-900">{fromAddress.name}</p>
            <p className="text-neutral-700">{fromAddress.email}</p>
            <p className="text-neutral-700">{fromAddress.phone1}</p>
            <p className="text-neutral-600">
              {fromAddress.address}{fromAddress.apt && `, ${fromAddress.apt}`}
            </p>
            <p className="text-neutral-600">
              {fromAddress.city}, {fromAddress.state}, {fromAddress.country}
            </p>
          </div>
        </div>

        {/* To Address */}
        <div className="p-6 bg-neutral-50 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="h-5 w-5 text-blue-600" />
            <h3 className="font-bold text-neutral-900">To Address</h3>
          </div>
          <div className="space-y-1 text-sm">
            <p className="font-medium text-neutral-900">{toAddress.name}</p>
            <p className="text-neutral-700">{toAddress.email}</p>
            <p className="text-neutral-700">{toAddress.phone1}</p>
            <p className="text-neutral-600">
              {toAddress.address}{toAddress.apt && `, ${toAddress.apt}`}
            </p>
            <p className="text-neutral-600">
              {toAddress.city}, {toAddress.state}, {toAddress.country}
            </p>
          </div>
        </div>

        {/* Package Details */}
        <div className="p-6 bg-neutral-50 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <Package className="h-5 w-5 text-purple-600" />
            <h3 className="font-bold text-neutral-900">Package Details</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-neutral-600">Goods Type:</span>
              <p className="font-medium text-neutral-900">{packageDetails.goodsType}</p>
            </div>
            <div>
              <span className="text-neutral-600">Weight:</span>
              <p className="font-medium text-neutral-900">{packageDetails.weight} kg</p>
            </div>
            <div>
              <span className="text-neutral-600">Dimensions:</span>
              <p className="font-medium text-neutral-900">
                {packageDetails.length} × {packageDetails.width} × {packageDetails.height} {packageDetails.dimensionUnit}
              </p>
            </div>
            <div>
              <span className="text-neutral-600">CBM:</span>
              <p className="font-medium text-neutral-900">{cbm} m³</p>
            </div>
            <div>
              <span className="text-neutral-600">Quantity:</span>
              <p className="font-medium text-neutral-900">{packageDetails.quantity} package(s)</p>
            </div>
          </div>
        </div>

        {/* Shipping Options */}
        <div className="p-6 bg-neutral-50 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <DollarSign className="h-5 w-5 text-green-600" />
            <h3 className="font-bold text-neutral-900">Shipping Options</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-neutral-600">Goods Value:</span>
              <p className="font-medium text-neutral-900">${shippingOptions.goodsValue} USD</p>
            </div>
            {shippingOptions.isFullContainer && (
              <div>
                <span className="text-neutral-600">Container:</span>
                <p className="font-medium text-neutral-900">{shippingOptions.containerType}</p>
              </div>
            )}
            <div>
              <span className="text-neutral-600">Customs Clearance:</span>
              <p className="font-medium text-neutral-900">{shippingOptions.customsClearance ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <span className="text-neutral-600">Insurance:</span>
              <p className="font-medium text-neutral-900">{shippingOptions.insurance ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <span className="font-medium">Note:</span> Please review all information carefully before submitting. 
          You'll be able to track your shipment once the order is confirmed.
        </p>
      </div>
    </div>
  );
};

export default StepReviewSubmit;
