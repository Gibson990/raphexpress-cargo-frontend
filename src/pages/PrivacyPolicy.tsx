import { Shield, Lock, Eye, Users, FileText, Globe, CheckCircle2 } from 'lucide-react';
import Card from '../components/common/Card';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: 'At Raphexpress Cargo, we collect information that you provide directly to us',
      items: [
        'Personal information (name, email, phone number)',
        'Shipping information (addresses, package details)',
        'Payment information (processed securely through third-party providers)',
        'Account credentials',
        'Communication preferences',
      ],
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: 'We use the information we collect to provide and improve our services',
      items: [
        'Process and deliver your shipments',
        'Communicate with you about your shipments',
        'Provide customer support',
        'Improve our services',
        'Send you marketing communications (with your consent)',
        'Comply with legal obligations',
      ],
    },
    {
      icon: Users,
      title: 'Information Sharing',
      content: 'We may share your information with trusted partners to deliver our services',
      items: [
        'Shipping carriers and logistics partners',
        'Payment processors',
        'Customs authorities (for international shipments)',
        'Service providers who assist our operations',
        'Law enforcement when required by law',
      ],
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is encrypted both in transit and at rest.',
      items: [],
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-white/90 mb-2">Your privacy is important to us</p>
          <p className="text-sm text-white/70">Last updated: October 23, 2025</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <Card variant="elevated" padding="lg" className="mb-8 bg-white">
          <p className="text-lg text-neutral-700 leading-relaxed">
            At Raphexpress Cargo, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website or use our services and tell you about your privacy rights.
          </p>
        </Card>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} variant="elevated" padding="lg" className="hover:shadow-xl transition-shadow bg-white">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                      {index + 1}. {section.title}
                    </h2>
                    <p className="text-neutral-700 mb-4">{section.content}</p>
                    {section.items.length > 0 && (
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

        {/* Your Rights */}
        <Card variant="elevated" padding="lg" className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Your Rights</h2>
              <p className="text-neutral-700 mb-4">Under data protection law, you have rights including:</p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'Access your personal information',
                  'Correct inaccurate information',
                  'Request deletion of your information',
                  'Object to processing',
                  'Export your data',
                  'Withdraw consent',
                ].map((right, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{right}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card variant="bordered" padding="lg" className="hover:border-blue-500 transition-colors">
            <h3 className="font-bold text-neutral-900 mb-2">International Transfers</h3>
            <p className="text-sm text-neutral-700">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place.
            </p>
          </Card>

          <Card variant="bordered" padding="lg" className="hover:border-blue-500 transition-colors">
            <h3 className="font-bold text-neutral-900 mb-2">Children's Privacy</h3>
            <p className="text-sm text-neutral-700">
              Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.
            </p>
          </Card>
        </div>

        {/* Contact */}
        <Card variant="elevated" padding="lg" className="mt-6 bg-white border-t-4 border-t-blue-600">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Contact Us</h2>
          <p className="text-neutral-700 mb-4">
            If you have questions about this privacy policy or want to exercise your rights, please contact us:
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold text-neutral-900 mb-1">Email</p>
              <p className="text-blue-600">privacy@raphexpress.com</p>
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
      </div>
    </div>
  );
};

export default PrivacyPolicy;
