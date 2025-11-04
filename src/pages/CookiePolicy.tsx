import { Cookie, CheckCircle2, Shield, Settings as SettingsIcon } from 'lucide-react';
import Card from '../components/common/Card';

const CookiePolicy = () => {
  const cookieTypes = [
    {
      type: 'Essential Cookies',
      icon: Shield,
      description: 'Required for the website to function properly',
      examples: 'Authentication, security, load balancing',
      canDisable: false,
    },
    {
      type: 'Performance Cookies',
      icon: CheckCircle2,
      description: 'Help us understand how visitors interact with our website',
      examples: 'Google Analytics, page views, bounce rate',
      canDisable: true,
    },
    {
      type: 'Functional Cookies',
      icon: SettingsIcon,
      description: 'Enable enhanced functionality and personalization',
      examples: 'Language preferences, region settings',
      canDisable: true,
    },
    {
      type: 'Marketing Cookies',
      icon: Cookie,
      description: 'Track visitors across websites to display relevant ads',
      examples: 'Facebook Pixel, Google Ads, retargeting',
      canDisable: true,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary to-orange-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Cookie className="h-12 w-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Cookie Policy</h1>
          </div>
          <p className="text-xl text-white/90">
            Learn about how we use cookies and similar technologies
          </p>
          <p className="text-sm text-white/70 mt-4">
            Last Updated: November 4, 2025
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <Card variant="elevated" padding="lg" className="bg-white">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              What Are Cookies?
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our services.
              </p>
              <p>
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies can be "Persistent" or "Session" Cookies.
              </p>
            </div>
          </Card>
        </section>

        {/* Cookie Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Types of Cookies We Use
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {cookieTypes.map((cookie, index) => {
              const Icon = cookie.icon;
              return (
                <Card key={index} variant="bordered" padding="lg" className="hover:border-primary hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-neutral-900 mb-1">
                        {cookie.type}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        cookie.canDisable 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {cookie.canDisable ? 'Optional' : 'Required'}
                      </span>
                    </div>
                  </div>
                  <p className="text-neutral-700 mb-3">
                    {cookie.description}
                  </p>
                  <div className="text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg">
                    <strong>Examples:</strong> {cookie.examples}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* How We Use Cookies */}
        <section className="mb-12">
          <Card variant="elevated" padding="lg" className="bg-white">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              How We Use Cookies
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Authentication & Security',
                  description: 'To log you in and keep your account secure',
                },
                {
                  title: 'Preferences',
                  description: 'To remember your settings like language, currency, and region',
                },
                {
                  title: 'Analytics',
                  description: 'To understand how you use our website and improve our services',
                },
                {
                  title: 'Performance',
                  description: 'To optimize page loading and ensure smooth functionality',
                },
                {
                  title: 'Marketing',
                  description: 'To show you relevant advertisements and measure campaign effectiveness',
                },
              ].map((usage, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">
                      {usage.title}
                    </h3>
                    <p className="text-neutral-700">{usage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Third-Party Cookies */}
        <section className="mb-12">
          <Card variant="elevated" padding="lg" className="bg-white">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Third-Party Cookies
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                We work with third-party service providers who may also set cookies on your device. These include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Google Analytics - For website analytics and insights</li>
                <li>Payment Processors - For secure payment processing</li>
                <li>Customer Support Tools - For live chat and support tickets</li>
                <li>Social Media Platforms - For social sharing features</li>
              </ul>
              <p>
                These third parties have their own privacy policies and cookie policies. We recommend reviewing their policies to understand how they use cookies.
              </p>
            </div>
          </Card>
        </section>

        {/* Managing Cookies */}
        <section className="mb-12">
          <Card variant="white" padding="lg" className="bg-blue-50 border-blue-200">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Managing Your Cookie Preferences
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences in several ways:
              </p>
              
              <div className="bg-white p-4 rounded-lg space-y-3">
                <h3 className="font-semibold text-neutral-900">Browser Settings</h3>
                <p>
                  Most web browsers allow you to control cookies through their settings. You can set your browser to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Block all cookies</li>
                  <li>Accept cookies only from trusted sites</li>
                  <li>Delete cookies when you close your browser</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-neutral-900 mb-2">Cookie Banner</h3>
                <p>
                  When you first visit our website, you'll see a cookie consent banner where you can accept or customize your cookie preferences.
                </p>
              </div>

              <p className="text-sm">
                <strong>Note:</strong> If you choose to block or delete cookies, some parts of our website may not function properly, and you may not be able to access certain features.
              </p>
            </div>
          </Card>
        </section>

        {/* Updates */}
        <section>
          <Card variant="elevated" padding="lg" className="bg-white">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Updates to This Policy
            </h2>
            <p className="text-neutral-700 mb-4">
              We may update our Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. We will notify you of any material changes by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li>Posting the new Cookie Policy on this page</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending you an email notification (for significant changes)</li>
            </ul>
          </Card>
        </section>

        {/* Contact */}
        <section className="mt-12">
          <Card variant="bordered" padding="lg" className="bg-gradient-to-br from-primary/5 to-orange-dark/5 border-primary/20">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">
              Questions About Cookies?
            </h2>
            <p className="text-neutral-700 mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="space-y-2 text-neutral-700">
              <p><strong>Email:</strong> privacy@raphexpress.com</p>
              <p><strong>Address:</strong> Dubai, UAE</p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
