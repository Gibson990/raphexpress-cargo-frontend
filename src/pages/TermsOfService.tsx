import { FileText } from 'lucide-react';
import Card from '../components/common/Card';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Terms of Service</h1>
          <p className="text-neutral-600">Last updated: October 23, 2025</p>
        </div>

        <Card variant="elevated" padding="lg" className="prose prose-neutral max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Raphexpress Cargo services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2>2. Service Description</h2>
          <p>
            Raphexpress Cargo provides international and domestic shipping, freight forwarding, and logistics services. We act as an intermediary between shippers and carriers.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            To use our services, you must:
          </p>
          <ul>
            <li>Be at least 18 years old</li>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Notify us immediately of any unauthorized use</li>
          </ul>

          <h2>4. Shipping Terms</h2>
          <h3>4.1 Prohibited Items</h3>
          <p>You agree not to ship:</p>
          <ul>
            <li>Illegal substances or contraband</li>
            <li>Hazardous materials without proper documentation</li>
            <li>Items prohibited by destination country</li>
            <li>Weapons or explosives</li>
            <li>Perishable goods without proper packaging</li>
          </ul>

          <h3>4.2 Packaging</h3>
          <p>
            You are responsible for proper packaging of your shipments. We are not liable for damage resulting from inadequate packaging.
          </p>

          <h3>4.3 Customs and Duties</h3>
          <p>
            You are responsible for all customs duties, taxes, and fees. We offer customs clearance assistance as an optional service.
          </p>

          <h2>5. Pricing and Payment</h2>
          <p>
            Prices are quoted in USD and may vary based on weight, dimensions, destination, and service level. Payment is due at the time of booking unless credit terms have been arranged.
          </p>

          <h2>6. Delivery</h2>
          <p>
            Transit times are estimates and not guaranteed. We are not liable for delays caused by customs, weather, or other factors beyond our control.
          </p>

          <h2>7. Liability and Insurance</h2>
          <p>
            Our liability is limited to the declared value of the shipment, up to a maximum of $100 per shipment unless additional insurance is purchased. We are not liable for consequential damages.
          </p>

          <h2>8. Claims</h2>
          <p>
            Claims for loss or damage must be filed within 30 days of delivery or expected delivery date. Claims require proof of value and damage.
          </p>

          <h2>9. Cancellation and Refunds</h2>
          <p>
            Cancellations made before pickup are eligible for a full refund. After pickup, cancellation fees may apply. Refunds are processed within 7-10 business days.
          </p>

          <h2>10. Intellectual Property</h2>
          <p>
            All content on our website, including logos, text, and images, is the property of Raphexpress Cargo and protected by copyright laws.
          </p>

          <h2>11. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account for violation of these terms, fraudulent activity, or any other reason at our discretion.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These terms are governed by the laws of the United Arab Emirates. Any disputes shall be resolved in the courts of Dubai.
          </p>

          <h2>13. Changes to Terms</h2>
          <p>
            We may modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
          </p>

          <h2>14. Contact Information</h2>
          <p>
            For questions about these terms, contact us at:
          </p>
          <ul>
            <li>Email: legal@raphexpress.com</li>
            <li>Phone: +1 (234) 567-890</li>
            <li>Address: Dubai, UAE</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
