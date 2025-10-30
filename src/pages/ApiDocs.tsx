import { useState } from 'react';
import { Code, Copy, Check, Plane, Ship, Package, Shield, Zap, Globe } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const ApiDocs = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const features = [
    {
      icon: Zap,
      title: 'Real-time Rates',
      description: 'Get instant shipping rates for Air and Sea freight',
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Ship to 200+ countries with our API',
    },
    {
      icon: Shield,
      title: 'Customs Support',
      description: 'Automated customs clearance options',
    },
  ];

  const shippingExample = `// Example: Get Shipping Rates
const response = await fetch('https://api.raphexpress.com/v1/rates', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    origin: {
      country: 'IN',
      city: 'Mumbai',
      zipCode: '400001'
    },
    destination: {
      country: 'AE',
      city: 'Dubai',
      zipCode: '00000'
    },
    package: {
      weight: 10, // kg
      length: 30, // cm
      width: 20,
      height: 15
    },
    shippingModes: ['air', 'sea'], // Get rates for both
    customsClearance: 'need_assistance' // or 'have_clearance'
  })
});

const data = await response.json();
// Response:
{
  "rates": [
    {
      "mode": "air",
      "carrier": "Raphexpress Air",
      "price": 89.99,
      "currency": "USD",
      "estimatedDays": "3-5",
      "customsFee": 25.00,
      "totalPrice": 114.99
    },
    {
      "mode": "sea",
      "carrier": "Raphexpress Sea",
      "price": 45.99,
      "currency": "USD",
      "estimatedDays": "15-20",
      "customsFee": 25.00,
      "totalPrice": 70.99
    }
  ]
}`;

  const checkoutExample = `// E-commerce Checkout Integration
// Step 1: Display shipping options at checkout
function ShippingOptions({ cartItems, destination }) {
  const [rates, setRates] = useState([]);
  const [selectedMode, setSelectedMode] = useState(null);
  const [customsClearance, setCustomsClearance] = useState('need_assistance');

  useEffect(() => {
    fetchShippingRates();
  }, [destination, customsClearance]);

  const fetchShippingRates = async () => {
    const response = await fetch('https://api.raphexpress.com/v1/rates', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        origin: YOUR_WAREHOUSE_ADDRESS,
        destination: destination,
        package: calculatePackageDimensions(cartItems),
        shippingModes: ['air', 'sea', 'express'],
        customsClearance: customsClearance
      })
    });
    
    const data = await response.json();
    setRates(data.rates);
  };

  return (
    <div className="shipping-options">
      {/* Customs Clearance Selection */}
      <div className="customs-selection">
        <h3>Customs Clearance</h3>
        <label>
          <input 
            type="radio" 
            value="have_clearance"
            checked={customsClearance === 'have_clearance'}
            onChange={(e) => setCustomsClearance(e.target.value)}
          />
          I have customs clearance
        </label>
        <label>
          <input 
            type="radio" 
            value="need_assistance"
            checked={customsClearance === 'need_assistance'}
            onChange={(e) => setCustomsClearance(e.target.value)}
          />
          Need customs assistance (+$25)
        </label>
      </div>

      {/* Shipping Mode Selection */}
      <div className="shipping-modes">
        {rates.map((rate) => (
          <div 
            key={rate.mode}
            className={\`shipping-option \${selectedMode === rate.mode ? 'selected' : ''}\`}
            onClick={() => setSelectedMode(rate.mode)}
          >
            <div className="mode-icon">
              {rate.mode === 'air' && '✈️'}
              {rate.mode === 'sea' && '🚢'}
              {rate.mode === 'express' && '🚚'}
            </div>
            <div className="mode-details">
              <h4>{rate.carrier}</h4>
              <p>{rate.estimatedDays} days</p>
            </div>
            <div className="mode-price">
              <strong>\${rate.totalPrice}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`;

  const createShipmentExample = `// Step 2: Create Shipment After Order
const createShipment = async (order) => {
  const response = await fetch('https://api.raphexpress.com/v1/create-shipment', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      orderId: order.id,
      shippingMode: order.selectedShippingMode, // 'air' or 'sea'
      customsClearance: order.customsClearance, // 'have_clearance' or 'need_assistance'
      origin: {
        name: 'Your Warehouse',
        address: '123 Warehouse St',
        city: 'Mumbai',
        country: 'IN',
        zipCode: '400001',
        phone: '+91 1234567890'
      },
      destination: {
        name: order.customer.name,
        address: order.shippingAddress.street,
        city: order.shippingAddress.city,
        country: order.shippingAddress.country,
        zipCode: order.shippingAddress.zipCode,
        phone: order.customer.phone,
        email: order.customer.email
      },
      package: {
        weight: order.totalWeight,
        length: order.packageDimensions.length,
        width: order.packageDimensions.width,
        height: order.packageDimensions.height,
        description: 'E-commerce order items',
        declaredValue: order.totalValue
      },
      insurance: order.includeInsurance,
      notificationEmail: order.customer.email,
      webhookUrl: 'https://your-store.com/webhooks/shipment-updates'
    })
  });

  const shipment = await response.json();
  
  // Response includes:
  // - trackingId: 'RPHX123456789'
  // - labelUrl: 'https://...'
  // - estimatedDelivery: '2025-11-05'
  // - totalCost: 114.99
  
  return shipment;
};`;

  const webhookExample = `// Step 3: Receive Real-time Updates via Webhook
// Setup webhook endpoint in your backend
app.post('/webhooks/shipment-updates', (req, res) => {
  const { trackingId, status, location, timestamp } = req.body;
  
  // Update order status in your database
  updateOrderShipmentStatus(trackingId, {
    status: status, // 'picked', 'in_transit', 'customs', 'out_for_delivery', 'delivered'
    location: location,
    updatedAt: timestamp
  });
  
  // Send notification to customer
  sendCustomerNotification(trackingId, status);
  
  res.status(200).send('OK');
});

// Webhook payload example:
{
  "trackingId": "RPHX123456789",
  "status": "in_transit",
  "location": "Dubai Port",
  "timestamp": "2025-10-23T10:30:00Z",
  "estimatedDelivery": "2025-10-28",
  "events": [
    {
      "status": "picked",
      "location": "Mumbai Warehouse",
      "timestamp": "2025-10-20T09:00:00Z"
    },
    {
      "status": "in_transit",
      "location": "Dubai Port",
      "timestamp": "2025-10-23T10:30:00Z"
    }
  ]
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium mb-6">
            <Code className="h-4 w-4" />
            <span>API Documentation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            E-commerce Shipping API
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Integrate Raphexpress shipping directly into your e-commerce checkout. Give your customers freedom to choose Air or Sea freight with customs clearance options.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} variant="elevated" padding="lg" className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Quick Start */}
        <Card variant="elevated" padding="lg" className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Quick Start</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Get API Key</h3>
                <p className="text-neutral-600">Sign up for a business account and generate your API key from the dashboard</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Integrate at Checkout</h3>
                <p className="text-neutral-600">Add shipping options to your checkout page using our API</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Create Shipments</h3>
                <p className="text-neutral-600">Automatically create shipments when orders are placed</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Code Examples */}
        <div className="space-y-8">
          {/* Get Shipping Rates */}
          <Card variant="elevated" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-neutral-900">1. Get Shipping Rates</h2>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={copiedCode === 'rates' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                onClick={() => copyToClipboard(shippingExample, 'rates')}
              >
                {copiedCode === 'rates' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="bg-neutral-900 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono">
                <code>{shippingExample}</code>
              </pre>
            </div>
          </Card>

          {/* Checkout Integration */}
          <Card variant="elevated" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-neutral-900">2. Checkout Integration (React Example)</h2>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={copiedCode === 'checkout' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                onClick={() => copyToClipboard(checkoutExample, 'checkout')}
              >
                {copiedCode === 'checkout' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="bg-neutral-900 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono">
                <code>{checkoutExample}</code>
              </pre>
            </div>
          </Card>

          {/* Create Shipment */}
          <Card variant="elevated" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-neutral-900">3. Create Shipment</h2>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={copiedCode === 'create' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                onClick={() => copyToClipboard(createShipmentExample, 'create')}
              >
                {copiedCode === 'create' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="bg-neutral-900 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono">
                <code>{createShipmentExample}</code>
              </pre>
            </div>
          </Card>

          {/* Webhooks */}
          <Card variant="elevated" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-neutral-900">4. Webhook Integration</h2>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={copiedCode === 'webhook' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                onClick={() => copyToClipboard(webhookExample, 'webhook')}
              >
                {copiedCode === 'webhook' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="bg-neutral-900 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono">
                <code>{webhookExample}</code>
              </pre>
            </div>
          </Card>
        </div>

        {/* Shipping Options */}
        <Card variant="elevated" padding="lg" className="mt-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Shipping Options</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 border-2 border-blue-200 rounded-xl bg-blue-50">
              <div className="flex items-center gap-3 mb-3">
                <Plane className="h-6 w-6 text-blue-600" />
                <h3 className="font-bold text-neutral-900">Air Freight</h3>
              </div>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li>• Fast delivery (3-7 days)</li>
                <li>• Higher cost</li>
                <li>• Best for urgent shipments</li>
                <li>• Weight-based pricing</li>
              </ul>
            </div>

            <div className="p-4 border-2 border-cyan-200 rounded-xl bg-cyan-50">
              <div className="flex items-center gap-3 mb-3">
                <Ship className="h-6 w-6 text-cyan-600" />
                <h3 className="font-bold text-neutral-900">Sea Freight</h3>
              </div>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li>• Economical (15-30 days)</li>
                <li>• Lower cost</li>
                <li>• Best for bulk shipments</li>
                <li>• Volume-based pricing</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-orange-50 border-2 border-orange-200 rounded-xl">
            <h3 className="font-bold text-neutral-900 mb-3">Customs Clearance Options</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-neutral-900">I have clearance:</strong>
                <p className="text-neutral-700">Customer handles customs independently (no additional fee)</p>
              </div>
              <div>
                <strong className="text-neutral-900">Need assistance:</strong>
                <p className="text-neutral-700">Raphexpress handles customs clearance (+$25 fee)</p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <Card variant="bordered" padding="lg" className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Ready to Integrate?</h2>
          <p className="text-neutral-600 mb-6">
            Get your API key and start shipping globally today
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" size="lg">
              Get API Key
            </Button>
            <Button variant="outline" size="lg">
              View Full Documentation
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ApiDocs;
