import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Contact Us</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card variant="elevated" padding="lg" className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-neutral-900 mb-2">Email Us</h3>
            <p className="text-neutral-600 text-sm mb-2">support@raphexpress.com</p>
            <p className="text-neutral-500 text-xs">We'll respond within 24 hours</p>
          </Card>

          <Card variant="elevated" padding="lg" className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-neutral-900 mb-2">Call Us</h3>
            <p className="text-neutral-600 text-sm mb-2">+1 (234) 567-890</p>
            <p className="text-neutral-500 text-xs">Mon-Fri, 9AM-6PM</p>
          </Card>

          <Card variant="elevated" padding="lg" className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-neutral-900 mb-2">Visit Us</h3>
            <p className="text-neutral-600 text-sm mb-2">Dubai, UAE</p>
            <p className="text-neutral-500 text-xs">By appointment only</p>
          </Card>
        </div>

        <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Your Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Your Email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <Input
              label="Subject"
              placeholder="How can we help?"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Message
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Tell us more about your inquiry..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Send Message
            </Button>
          </form>
        </Card>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-neutral-600">
            <Clock className="h-5 w-5" />
            <span>Business Hours: Monday - Friday, 9:00 AM - 6:00 PM (GST)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
