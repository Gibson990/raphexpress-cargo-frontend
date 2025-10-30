import { Shield } from 'lucide-react';
import Card from '../components/common/Card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Privacy Policy</h1>
          <p className="text-neutral-600">Last updated: October 23, 2025</p>
        </div>

        <Card variant="elevated" padding="lg" className="prose prose-neutral max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            At Raphexpress Cargo, we collect information that you provide directly to us, including:
          </p>
          <ul>
            <li>Personal information (name, email, phone number)</li>
            <li>Shipping information (addresses, package details)</li>
            <li>Payment information (processed securely through third-party providers)</li>
            <li>Account credentials</li>
            <li>Communication preferences</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and deliver your shipments</li>
            <li>Communicate with you about your shipments</li>
            <li>Provide customer support</li>
            <li>Improve our services</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We may share your information with:
          </p>
          <ul>
            <li>Shipping carriers and logistics partners</li>
            <li>Payment processors</li>
            <li>Customs authorities (for international shipments)</li>
            <li>Service providers who assist our operations</li>
            <li>Law enforcement when required by law</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Export your data</li>
            <li>Withdraw consent</li>
          </ul>

          <h2>6. Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can control cookies through your browser settings.
          </p>

          <h2>7. International Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us at:
          </p>
          <ul>
            <li>Email: privacy@raphexpress.com</li>
            <li>Phone: +1 (234) 567-890</li>
            <li>Address: Dubai, UAE</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
