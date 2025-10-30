import { useState } from 'react';
import { Building2, Users, TrendingUp, Globe, CheckCircle2, ArrowRight, Mail, Phone, MapPin, User } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import { IMAGES } from '../utils/constants';
import toast from 'react-hot-toast';

const JoinUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    experience: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success('Application submitted! We\'ll contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        location: '',
        experience: '',
        message: '',
      });
    }, 1500);
  };

  const benefits = [
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Access to our worldwide logistics network spanning 200+ countries',
    },
    {
      icon: TrendingUp,
      title: 'Revenue Growth',
      description: 'Proven business model with attractive commission structure',
    },
    {
      icon: Users,
      title: 'Training & Support',
      description: 'Comprehensive training and ongoing operational support',
    },
    {
      icon: Building2,
      title: 'Brand Recognition',
      description: 'Leverage our established brand and reputation in the market',
    },
  ];

  const requirements = [
    'Minimum 2 years experience in logistics or related field',
    'Financial capability to invest in franchise setup',
    'Dedicated office space and warehouse facilities',
    'Team of minimum 5 qualified staff members',
    'Strong local market knowledge and connections',
    'Commitment to Raphexpress quality standards',
  ];

  const process = [
    {
      step: '01',
      title: 'Submit Application',
      description: 'Fill out the franchise application form with your details',
    },
    {
      step: '02',
      title: 'Initial Review',
      description: 'Our team reviews your application and conducts background check',
    },
    {
      step: '03',
      title: 'Meeting & Discussion',
      description: 'Virtual or in-person meeting to discuss partnership details',
    },
    {
      step: '04',
      title: 'Agreement & Setup',
      description: 'Sign franchise agreement and begin setup process',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-orange to-orange-dark text-white overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 className="h-4 w-4" />
              <span>Franchise Opportunity</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Become a Raphexpress
              <br />
              <span className="text-orange-light">Franchise Partner</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8">
              Join our global logistics network and build a profitable business with our proven franchise model
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Apply Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Join a winning team and leverage our expertise, technology, and global network
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  variant="elevated"
                  padding="lg"
                  className="text-center hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Franchise Requirements
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                We're looking for passionate entrepreneurs who meet our partnership criteria
              </p>

              <div className="space-y-4">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-neutral-700">{req}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src={IMAGES.WAREHOUSE}
                alt="Warehouse"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">50+</p>
                    <p className="text-sm text-neutral-600">Active Partners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Application Process
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Simple 4-step process to become a franchise partner
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <Card variant="elevated" padding="lg" className="h-full">
                  <div className="text-6xl font-bold text-primary/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600">{item.description}</p>
                </Card>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Apply for Franchise
            </h2>
            <p className="text-lg text-neutral-600">
              Fill out the form below and our team will get back to you within 48 hours
            </p>
          </div>

          <Card variant="elevated" padding="lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  leftIcon={<User className="h-5 w-5" />}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  leftIcon={<Mail className="h-5 w-5" />}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (234) 567-890"
                  leftIcon={<Phone className="h-5 w-5" />}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />

                <Input
                  label="Company Name"
                  type="text"
                  placeholder="Your Company Ltd."
                  leftIcon={<Building2 className="h-5 w-5" />}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Location/City"
                  type="text"
                  placeholder="Mumbai, India"
                  leftIcon={<MapPin className="h-5 w-5" />}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="2-5">2-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your business background and why you want to join Raphexpress..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Submit Application
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-orange-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our growing network of successful franchise partners worldwide
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Schedule a Call
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinUs;
