import { useState } from 'react';
import { Calculator, Plane, Ship, Truck, Package, MapPin, DollarSign, Info } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { ROUTES } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const ShippingCalculator = () => {
  const navigate = useNavigate();
  const [shipmentType, setShipmentType] = useState<'local' | 'international'>('international');
  const [shippingMode, setShippingMode] = useState<'air' | 'sea' | 'land'>('air');
  const [customsClearance, setCustomsClearance] = useState<'yes' | 'no'>('yes');
  
  const [formData, setFormData] = useState({
    // Common
    origin: '',
    destination: '',
    goodsType: '',
    
    // Air
    weight: '',
    
    // Sea
    containerSize: '20ft' as '20ft' | '40ft' | '40ft-hc' | '45ft-hc',
    
    // Land
    length: '',
    width: '',
    height: '',
    landWeight: '',
  });

  const [calculatedPrice, setCalculatedPrice] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Pricing logic
  const containerPrices: Record<string, number> = {
    '20ft': 1500,
    '40ft': 2500,
    '40ft-hc': 2800,
    '45ft-hc': 3200,
  };

  const airRatePerKg = 8.5; // Base rate
  const seaRatePerCBM = 45; // Base rate for sea
  const landRatePerCBM = 25; // Base rate for land

  // Tax rates by region (simplified)
  const taxRates: Record<string, number> = {
    'UAE': 5, // VAT
    'India': 18, // GST
    'USA': 7, // Sales Tax
    'UK': 20, // VAT
    'Singapore': 8, // GST
    'default': 10,
  };

  const customsClearanceFee = 250; // Fixed customs fee

  const calculatePrice = () => {
    setIsCalculating(true);

    setTimeout(() => {
      let basePrice = 0;
      let details: any = {};

      // Calculate based on mode
      if (shippingMode === 'air') {
        const weight = parseFloat(formData.weight) || 0;
        basePrice = weight * airRatePerKg;
        details.weight = weight;
        details.ratePerKg = airRatePerKg;
      } else if (shippingMode === 'sea') {
        basePrice = containerPrices[formData.containerSize] || containerPrices['20ft'];
        details.containerSize = formData.containerSize;
        details.containerPrice = basePrice;
      } else if (shippingMode === 'land') {
        const length = parseFloat(formData.length) || 0;
        const width = parseFloat(formData.width) || 0;
        const height = parseFloat(formData.height) || 0;
        const cbm = (length * width * height) / 1000000; // Convert cm³ to m³
        basePrice = cbm * landRatePerCBM;
        details.dimensions = `${length}x${width}x${height} cm`;
        details.cbm = cbm.toFixed(2);
        details.ratePerCBM = landRatePerCBM;
      }

      let taxes = 0;
      let customs = 0;

      if (shipmentType === 'international') {
        // Get tax rate based on destination
        const region = formData.destination.split(',')[0]?.trim() || 'default';
        const taxRate = taxRates[region] || taxRates['default'];
        taxes = (basePrice * taxRate) / 100;

        if (customsClearance === 'yes') {
          customs = customsClearanceFee;
        }
      }

      const total = basePrice + taxes + customs;

      setCalculatedPrice({
        basePrice: basePrice.toFixed(2),
        taxes: taxes.toFixed(2),
        taxRate: shipmentType === 'international' ? (taxRates[formData.destination.split(',')[0]?.trim()] || taxRates['default']) : 0,
        customs: customs.toFixed(2),
        total: total.toFixed(2),
        details,
        shipmentType,
        shippingMode,
        customsClearance,
      });

      setIsCalculating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium mb-6">
            <Calculator className="h-4 w-4" />
            <span>Shipping Calculator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Calculate Shipping Cost
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Get instant quotes for Air, Sea, and Land freight with accurate pricing
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipment Type */}
            <Card variant="elevated" padding="lg">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Shipment Type</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShipmentType('local')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    shipmentType === 'local'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <Truck className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-semibold">Local</div>
                  <div className="text-xs text-neutral-600">Domestic shipping</div>
                </button>
                <button
                  onClick={() => setShipmentType('international')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    shipmentType === 'international'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <Package className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-semibold">International</div>
                  <div className="text-xs text-neutral-600">Cross-border</div>
                </button>
              </div>
            </Card>

            {/* Shipping Mode */}
            <Card variant="elevated" padding="lg">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Shipping Mode</h3>
              <div className={`grid ${shipmentType === 'local' ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
                <button
                  onClick={() => setShippingMode('air')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    shippingMode === 'air'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <Plane className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-semibold text-sm">Air Freight</div>
                </button>
                
                {/* Sea Freight only for International */}
                {shipmentType === 'international' && (
                  <button
                    onClick={() => setShippingMode('sea')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      shippingMode === 'sea'
                        ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <Ship className="h-6 w-6 mx-auto mb-2" />
                    <div className="font-semibold text-sm">Sea Freight</div>
                  </button>
                )}
                
                <button
                  onClick={() => setShippingMode('land')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    shippingMode === 'land'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <Truck className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-semibold text-sm">Land Freight</div>
                </button>
              </div>
              
              {shipmentType === 'local' && (
                <p className="text-sm text-neutral-600 mt-3">
                  ℹ️ Sea freight is only available for international shipments
                </p>
              )}
            </Card>

            {/* Location Details */}
            <Card variant="elevated" padding="lg">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Location Details</h3>
              <div className="space-y-4">
                <Input
                  label="Origin"
                  placeholder="e.g., Mumbai, India"
                  leftIcon={<MapPin className="h-5 w-5" />}
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  required
                />
                <Input
                  label="Destination"
                  placeholder="e.g., Dubai, UAE"
                  leftIcon={<MapPin className="h-5 w-5" />}
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  required
                />
                <Input
                  label="Goods Type"
                  placeholder="e.g., Electronics, Textiles, Machinery"
                  leftIcon={<Package className="h-5 w-5" />}
                  value={formData.goodsType}
                  onChange={(e) => setFormData({ ...formData, goodsType: e.target.value })}
                  required
                />
              </div>
            </Card>

            {/* Mode-Specific Details */}
            <Card variant="elevated" padding="lg">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                {shippingMode === 'air' && 'Air Freight Details'}
                {shippingMode === 'sea' && 'Sea Freight Details'}
                {shippingMode === 'land' && 'Land Freight Details'}
              </h3>

              {shippingMode === 'air' && (
                <div className="space-y-4">
                  <Input
                    label="Weight (kg)"
                    type="number"
                    placeholder="e.g., 100"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    helperText={`Rate: $${airRatePerKg}/kg`}
                    required
                  />
                </div>
              )}

              {shippingMode === 'sea' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Container Size <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setFormData({ ...formData, containerSize: '20ft' })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.containerSize === '20ft'
                            ? 'border-cyan-500 bg-cyan-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="font-semibold">20ft Standard</div>
                        <div className="text-xs text-neutral-600 mb-1">33 CBM • 28,000 kg</div>
                        <div className="text-sm font-bold text-cyan-700">${containerPrices['20ft']}</div>
                      </button>
                      <button
                        onClick={() => setFormData({ ...formData, containerSize: '40ft' })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.containerSize === '40ft'
                            ? 'border-cyan-500 bg-cyan-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="font-semibold">40ft Standard</div>
                        <div className="text-xs text-neutral-600 mb-1">67 CBM • 28,500 kg</div>
                        <div className="text-sm font-bold text-cyan-700">${containerPrices['40ft']}</div>
                      </button>
                      <button
                        onClick={() => setFormData({ ...formData, containerSize: '40ft-hc' })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.containerSize === '40ft-hc'
                            ? 'border-cyan-500 bg-cyan-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="font-semibold">40ft High Cube</div>
                        <div className="text-xs text-neutral-600 mb-1">76 CBM • 28,600 kg</div>
                        <div className="text-sm font-bold text-cyan-700">${containerPrices['40ft-hc']}</div>
                      </button>
                      <button
                        onClick={() => setFormData({ ...formData, containerSize: '45ft-hc' })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.containerSize === '45ft-hc'
                            ? 'border-cyan-500 bg-cyan-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="font-semibold">45ft High Cube</div>
                        <div className="text-xs text-neutral-600 mb-1">86 CBM • 29,000 kg</div>
                        <div className="text-sm font-bold text-cyan-700">${containerPrices['45ft-hc']}</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {shippingMode === 'land' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      label="Length (cm)"
                      type="number"
                      placeholder="100"
                      value={formData.length}
                      onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                      required
                    />
                    <Input
                      label="Width (cm)"
                      type="number"
                      placeholder="80"
                      value={formData.width}
                      onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                      required
                    />
                    <Input
                      label="Height (cm)"
                      type="number"
                      placeholder="60"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      required
                    />
                  </div>
                  <Input
                    label="Weight (kg)"
                    type="number"
                    placeholder="e.g., 500"
                    value={formData.landWeight}
                    onChange={(e) => setFormData({ ...formData, landWeight: e.target.value })}
                    helperText={`Rate: $${landRatePerCBM}/CBM`}
                    required
                  />
                </div>
              )}
            </Card>

            {/* Customs Clearance (International Only) */}
            {shipmentType === 'international' && (
              <Card variant="elevated" padding="lg">
                <h3 className="text-lg font-bold text-neutral-900 mb-3">Customs Clearance Assistance</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Do you need help clearing your goods at the port and paying customs taxes/duties?
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setCustomsClearance('yes')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      customsClearance === 'yes'
                        ? 'border-primary bg-primary/5'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="font-bold mb-1">Yes, Help Me</div>
                    <div className="text-xs text-neutral-600 mb-2">
                      We'll clear your goods and handle customs taxes
                    </div>
                    <div className="text-sm font-semibold text-primary">Service Fee: +${customsClearanceFee}</div>
                  </button>
                  <button
                    onClick={() => setCustomsClearance('no')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      customsClearance === 'no'
                        ? 'border-primary bg-primary/5'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="font-bold mb-1">No, I'll Handle It</div>
                    <div className="text-xs text-neutral-600 mb-2">
                      I'll clear the goods and pay taxes myself
                    </div>
                    <div className="text-sm font-semibold text-green-600">No Fee</div>
                  </button>
                </div>
              </Card>
            )}

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={calculatePrice}
              isLoading={isCalculating}
              leftIcon={<Calculator className="h-5 w-5" />}
            >
              Calculate Price
            </Button>
          </div>

          {/* Price Breakdown */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card variant="elevated" padding="lg">
                <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Price Breakdown
                </h3>

                {!calculatedPrice ? (
                  <div className="text-center py-12">
                    <Calculator className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-600">
                      Fill in the details and click calculate to see the price
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Details */}
                    {calculatedPrice.details && (
                      <div className="p-4 bg-neutral-50 rounded-lg space-y-2 text-sm">
                        {calculatedPrice.shippingMode === 'air' && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-neutral-600">Weight:</span>
                              <span className="font-medium">{calculatedPrice.details.weight} kg</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-600">Rate:</span>
                              <span className="font-medium">${calculatedPrice.details.ratePerKg}/kg</span>
                            </div>
                          </>
                        )}
                        {calculatedPrice.shippingMode === 'sea' && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-neutral-600">Container:</span>
                              <span className="font-medium">{calculatedPrice.details.containerSize}</span>
                            </div>
                          </>
                        )}
                        {calculatedPrice.shippingMode === 'land' && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-neutral-600">Dimensions:</span>
                              <span className="font-medium">{calculatedPrice.details.dimensions}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-600">Volume:</span>
                              <span className="font-medium">{calculatedPrice.details.cbm} CBM</span>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* Base Price */}
                    <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                      <span className="text-neutral-700">Base Price</span>
                      <span className="font-semibold text-lg">${calculatedPrice.basePrice}</span>
                    </div>

                    {/* Taxes (International) */}
                    {calculatedPrice.shipmentType === 'international' && (
                      <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                        <span className="text-neutral-700">
                          Taxes ({calculatedPrice.taxRate}%)
                        </span>
                        <span className="font-semibold">${calculatedPrice.taxes}</span>
                      </div>
                    )}

                    {/* Customs */}
                    {calculatedPrice.shipmentType === 'international' && calculatedPrice.customsClearance === 'yes' && (
                      <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                        <span className="text-neutral-700">Customs Clearance</span>
                        <span className="font-semibold">${calculatedPrice.customs}</span>
                      </div>
                    )}

                    {/* Total */}
                    <div className="flex justify-between items-center py-4 bg-primary/10 rounded-lg px-4">
                      <span className="text-lg font-bold text-neutral-900">Total Amount</span>
                      <span className="text-2xl font-bold text-primary">${calculatedPrice.total}</span>
                    </div>

                    {/* Info */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-900">
                          <p className="font-medium mb-1">Price Includes:</p>
                          <ul className="space-y-1 text-blue-800">
                            <li>• Freight charges</li>
                            {calculatedPrice.shipmentType === 'international' && (
                              <>
                                <li>• Applicable taxes</li>
                                {calculatedPrice.customsClearance === 'yes' && <li>• Customs clearance</li>}
                              </>
                            )}
                            <li>• Documentation</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 pt-4">
                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={() => navigate(ROUTES.CREATE_SHIPMENT)}
                      >
                        Create Shipment
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setCalculatedPrice(null)}
                      >
                        Calculate Again
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingCalculator;
