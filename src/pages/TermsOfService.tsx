import { FileText, CheckCircle2, Package, Shield, CreditCard, AlertCircle, Scale } from 'lucide-react';
import Card from '../components/common/Card';

const TermsOfService = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Acceptance of Terms',
      content: 'By accessing and using Raphexpress Cargo services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
    },
    {
      icon: Package,
      title: 'Service Description',
      content: 'Raphexpress Cargo provides international and domestic shipping, freight forwarding, and logistics services. We act as an intermediary between shippers and carriers to ensure your packages reach their destination safely and efficiently.',
    },
    {
      icon: Shield,
      title: 'User Accounts',
      content: 'To use our services, you must meet the following requirements:',
      items: [
        'Be at least 18 years old or have parental consent',
        'Provide accurate and complete information',
        'Maintain the security of your account credentials',
        'Notify us immediately of any unauthorized use',
        'Accept responsibility for all activities under your account',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-600 via-orange-700 to-red-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <FileText className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-white/90 mb-2">Legal terms governing our services</p>
          <p className="text-sm text-white/70">Last updated: October 23, 2025</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <Card variant="elevated" padding="lg" className="mb-8 bg-white">
          <p className="text-lg text-neutral-700 leading-relaxed">
            These Terms of Service govern your use of Raphexpress Cargo's website and services. Please read these terms carefully before using our platform.
          </p>
        </Card>

        {/* Main Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} variant="elevated" padding="lg" className="hover:shadow-xl transition-shadow bg-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                      {index + 1}. {section.title}
                    </h2>
                    <p className="text-neutral-700 mb-4">{section.content}</p>
                    {section.items && (
                      <ul className="space-y-2">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-neutral-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Shipping Terms */}
        <Card variant="elevated" padding="lg" className="mt-6 bg-white">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Shipping Terms & Prohibited Items</h2>
              <p className="text-neutral-700 mb-4">You agree not to ship the following items:</p>
              <ul className="space-y-2">
                {[
                  'Illegal substances or contraband',
                  'Hazardous materials without proper documentation',
                  'Items prohibited by destination country',
                  'Weapons or explosives',
                  'Perishable goods without proper packaging',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-4 border-t border-neutral-200">
            <p className="text-sm text-neutral-600">
              <strong>Note:</strong> You are responsible for proper packaging of your shipments. We are not liable for damage resulting from inadequate packaging or customs and duties charges.
            </p>
          </div>
        </Card>

        {/* Financial Terms */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card variant="elevated" padding="lg" className="bg-white">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-2">5. Pricing & Payment</h3>
                <p className="text-sm text-neutral-700">
                  All prices are quoted in USD. Payment is due at time of service. We accept major credit cards and wire transfers.
                </p>
              </div>
            </div>
          </Card>

          <Card variant="elevated" padding="lg" className="bg-white">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Scale className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-2">6. Liability</h3>
                <p className="text-sm text-neutral-700">
                  Our liability is limited to the declared value of the shipment, up to a maximum of $100 per package unless additional insurance is purchased.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Important Notice */}
        <Card variant="bordered" padding="lg" className="mt-6 border-orange-200 bg-orange-50">
          <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            Important Information
          </h3>
          <ul className="space-y-2 text-sm text-neutral-700">
            <li>• Transit times are estimates and not guaranteed</li>
            <li>• Claims for loss or damage must be filed within 30 days</li>
            <li>• Cancellations before pickup receive full refund</li>
            <li>• We may modify these terms at any time</li>
          </ul>
        </Card>

        {/* Contact */}
        <Card variant="elevated" padding="lg" className="mt-6 bg-white border-t-4 border-t-orange-600">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Questions About These Terms?</h2>
          <p className="text-neutral-700 mb-4">
            If you have any questions about our Terms of Service, please don't hesitate to contact our legal team.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold text-neutral-900 mb-1">Email</p>
              <p className="text-orange-600">legal@raphexpress.com</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900 mb-1">Phone</p>
              <p className="text-neutral-700">+1 (234) 567-890</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900 mb-1">Address</p>
              <p className="text-neutral-700">Dubai, UAE</p>
            </div>
          </div>
        </Card>

        {/* Governing Law */}
        <div className="mt-6 p-4 bg-neutral-100 rounded-lg text-center text-sm text-neutral-600">
          <p>
            These terms are governed by the laws of the United Arab Emirates. 
            Any disputes shall be resolved in the courts of Dubai.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
