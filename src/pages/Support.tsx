import { useState } from 'react';
import { MessageCircle, Mail, Phone, Clock, Search, ChevronDown, ChevronUp, Send } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const faqs = [
    {
      question: 'How do I track my shipment?',
      answer: 'You can track your shipment by entering your tracking ID on our Track Shipment page. You\'ll receive real-time updates via email and SMS as your package moves through our network.',
    },
    {
      question: 'What are the shipping modes available?',
      answer: 'We offer three shipping modes: Air Freight (3-7 days, fast delivery), Sea Freight (15-30 days, economical), and Express Delivery (1-3 days, premium service). Choose based on your urgency and budget.',
    },
    {
      question: 'Do you handle customs clearance?',
      answer: 'Yes! We offer two options: 1) "I have clearance" - you handle customs independently (no fee), or 2) "Need assistance" - we handle all customs paperwork and clearance for a $25 fee.',
    },
    {
      question: 'How is shipping cost calculated?',
      answer: 'Shipping cost depends on: package weight and dimensions, origin and destination, shipping mode (Air/Sea), customs clearance option, and insurance (optional). Get instant quotes using our rate calculator.',
    },
    {
      question: 'Can I schedule a specific pickup time?',
      answer: 'Yes! When creating a shipment, you can view available pickup slots and choose your preferred date and time. We offer flexible scheduling to match your convenience.',
    },
    {
      question: 'What items are prohibited from shipping?',
      answer: 'Prohibited items include: hazardous materials, explosives, illegal substances, perishable goods (without proper packaging), and items restricted by destination country laws. Contact us for specific item queries.',
    },
    {
      question: 'How do I integrate Raphexpress API with my e-commerce store?',
      answer: 'Visit our API Documentation page for complete integration guides. We provide REST APIs for rate calculation, shipment creation, and tracking. SDKs available for popular platforms like Shopify, WooCommerce, and Magento.',
    },
    {
      question: 'What if my package is delayed or lost?',
      answer: 'We have a 99.9% on-time delivery rate. If your package is delayed, contact our support team immediately. All shipments can be insured, and we provide full compensation for lost or damaged packages (terms apply).',
    },
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: 'Start Chat',
      available: 'Available 24/7',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@raphexpress.com',
      action: 'Send Email',
      available: 'Response within 2 hours',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: '+1 (234) 567-890',
      action: 'Call Now',
      available: 'Mon-Fri, 9AM-6PM',
      color: 'from-green-500 to-green-600',
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      toast.success('Message sent! We\'ll respond shortly.');
      setMessage('');
    }, 1000);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium mb-6">
            <MessageCircle className="h-4 w-4" />
            <span>Support Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            How Can We Help You?
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Get instant answers or connect with our support team
          </p>
        </div>

        {/* Search */}
        <Card variant="elevated" padding="lg" className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search for help... (e.g., 'How to track shipment')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-primary focus:outline-none text-lg"
            />
          </div>
        </Card>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card
                key={index}
                variant="elevated"
                padding="lg"
                className="text-center hover:scale-105 transition-transform cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-neutral-600 mb-1">{method.description}</p>
                <p className="text-sm text-neutral-500 mb-4 flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" />
                  {method.available}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  {method.action}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Live Chat Widget */}
        <Card variant="elevated" padding="none" className="mb-12 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-orange-dark p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <h3 className="text-xl font-bold">Live Chat Support</h3>
            </div>
            <p className="text-white/90">Our team is online and ready to help</p>
          </div>
          
          <div className="p-6 bg-neutral-50 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {/* Bot Message */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm">
                    <p className="text-neutral-900">
                      👋 Hello! I'm here to help. What can I assist you with today?
                    </p>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1 ml-2">Just now</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 ml-11">
                <button className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm hover:border-primary hover:text-primary transition-colors">
                  Track my shipment
                </button>
                <button className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm hover:border-primary hover:text-primary transition-colors">
                  Shipping rates
                </button>
                <button className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm hover:border-primary hover:text-primary transition-colors">
                  API integration
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-neutral-200">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none"
              />
              <Button
                variant="primary"
                onClick={handleSendMessage}
                isLoading={isSending}
                leftIcon={<Send className="h-4 w-4" />}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card variant="elevated" padding="lg">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions
          </h2>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-neutral-200 rounded-xl overflow-hidden hover:border-primary transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-50 transition-colors"
                  >
                    <h3 className="font-semibold text-neutral-900 pr-4">
                      {faq.question}
                    </h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-neutral-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-neutral-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="px-4 pb-4 text-neutral-700 animate-slide-down">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Still Need Help */}
        <Card variant="bordered" padding="lg" className="mt-8 text-center">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            Still Need Help?
          </h3>
          <p className="text-neutral-600 mb-6">
            Can't find what you're looking for? Our support team is here 24/7
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" leftIcon={<MessageCircle className="h-4 w-4" />}>
              Start Live Chat
            </Button>
            <Button variant="outline" leftIcon={<Mail className="h-4 w-4" />}>
              Email Us
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Support;
