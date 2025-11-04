import { Shield, CheckCircle2, FileCheck, Globe, Lock, Award, AlertCircle } from 'lucide-react';
import Card from '../components/common/Card';

const Compliance = () => {
  const certifications = [
    {
      icon: Shield,
      title: 'ISO 9001:2015',
      description: 'Quality Management System',
      status: 'Certified',
    },
    {
      icon: Lock,
      title: 'ISO 27001',
      description: 'Information Security Management',
      status: 'Certified',
    },
    {
      icon: Globe,
      title: 'IATA Certified',
      description: 'International Air Transport Association',
      status: 'Certified',
    },
    {
      icon: Award,
      title: 'AEO Certified',
      description: 'Authorized Economic Operator',
      status: 'Certified',
    },
  ];

  const complianceAreas = [
    {
      title: 'Data Protection',
      items: [
        'GDPR (General Data Protection Regulation) compliant',
        'CCPA (California Consumer Privacy Act) compliant',
        'Regular data protection impact assessments',
        'Secure data encryption and storage',
      ],
    },
    {
      title: 'Customs & Trade',
      items: [
        'Compliance with international customs regulations',
        'Adherence to export control laws',
        'Sanctions screening and compliance',
        'Proper documentation and declarations',
      ],
    },
    {
      title: 'Safety & Security',
      items: [
        'TSA security protocols for air cargo',
        'ISPS Code compliance for maritime security',
        'Hazardous materials (DG) handling certification',
        'Regular security audits and assessments',
      ],
    },
    {
      title: 'Environmental',
      items: [
        'Carbon footprint monitoring and reporting',
        'Sustainable packaging initiatives',
        'ISO 14001 Environmental Management',
        'Green logistics practices',
      ],
    },
  ];

  const regulations = [
    { region: 'European Union', regulation: 'GDPR, EU Customs Code, EORI' },
    { region: 'United States', regulation: 'TSA, CBP, FDA, FMC' },
    { region: 'United Kingdom', regulation: 'UK GDPR, HMRC, Border Force' },
    { region: 'Middle East', regulation: 'Dubai Customs, GCC Trade Agreement' },
    { region: 'Asia Pacific', regulation: 'WCO Framework, ASEAN Customs' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-12 w-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Compliance & Certifications</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl">
            We maintain the highest standards of compliance across all regulatory frameworks to ensure safe, secure, and legal shipping services globally.
          </p>
          <p className="text-sm text-white/70 mt-4">
            Last Updated: November 4, 2025
          </p>
        </div>
      </div>

      {/* Certifications */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Our Certifications
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Recognized and certified by leading international bodies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <Card key={index} variant="elevated" padding="lg" className="text-center hover:scale-105 transition-transform bg-white">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="inline-flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full text-xs font-medium text-green-700 mb-3">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{cert.status}</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-neutral-600">{cert.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Areas */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Compliance Framework
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Comprehensive adherence to global standards and regulations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {complianceAreas.map((area, index) => (
              <Card key={index} variant="bordered" padding="lg" className="hover:border-green-500 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <FileCheck className="h-6 w-6 text-green-600" />
                  {area.title}
                </h3>
                <ul className="space-y-3">
                  {area.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Regulations */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Regional Compliance
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We comply with specific regulations in every region we operate
            </p>
          </div>

          <Card variant="elevated" padding="none" className="overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                      Region
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                      Compliance Standards
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {regulations.map((reg, index) => (
                    <tr key={index} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-neutral-900">{reg.region}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-700">
                        {reg.regulation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Security & Risk Management
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our comprehensive security framework ensures the safety and integrity of your shipments at every stage of the journey.
              </p>
              <div className="space-y-4">
                {[
                  '24/7 security monitoring and surveillance',
                  'Secure facilities with access control',
                  'Background-checked personnel',
                  'Chain of custody documentation',
                  'Insurance coverage for all shipments',
                  'Incident response and recovery plans',
                ].map((measure, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-neutral-700">{measure}</p>
                  </div>
                ))}
              </div>
            </div>

            <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Data Security</h3>
                    <p className="text-sm text-neutral-700">
                      End-to-end encryption, secure data centers, and regular security audits to protect your information.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Physical Security</h3>
                    <p className="text-sm text-neutral-700">
                      Secure warehouses, tamper-evident packaging, and GPS tracking for all shipments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Risk Mitigation</h3>
                    <p className="text-sm text-neutral-700">
                      Proactive risk assessment, contingency planning, and comprehensive insurance coverage.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Audit & Reporting */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card variant="elevated" padding="lg" className="bg-white">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Audits & Continuous Improvement
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                We are committed to maintaining and improving our compliance standards through:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">Internal Audits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">Quarterly compliance reviews</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">Process optimization assessments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">Staff training and certification</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">External Audits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">Annual ISO certification audits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">Third-party security assessments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">Regulatory body inspections</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Compliance Questions?
          </h2>
          <p className="text-neutral-700 mb-6">
            For questions about our compliance policies or to request documentation, please contact our compliance team.
          </p>
          <div className="space-y-2 text-neutral-700">
            <p><strong>Email:</strong> compliance@raphexpress.com</p>
            <p><strong>Phone:</strong> +971-4-XXX-XXXX</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Compliance;
