import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Clock, DollarSign, Users, TrendingUp, Heart, Zap, Search } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { ROUTES } from '../utils/constants';

const Careers = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance for you and your family',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear career paths and professional development programs',
    },
    {
      icon: Zap,
      title: 'Work-Life Balance',
      description: 'Flexible hours and remote work options',
    },
    {
      icon: DollarSign,
      title: 'Competitive Pay',
      description: 'Industry-leading salaries and performance bonuses',
    },
  ];

  const openPositions = [
    {
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Dubai, UAE',
      type: 'Full-time',
      description: 'Build and scale our logistics platform serving millions of shipments',
    },
    {
      title: 'Operations Manager',
      department: 'Operations',
      location: 'Dubai, UAE',
      type: 'Full-time',
      description: 'Manage day-to-day operations and optimize delivery processes',
    },
    {
      title: 'Customer Success Specialist',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help customers succeed with our platform and provide exceptional support',
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Dubai, UAE / Remote',
      type: 'Full-time',
      description: 'Design beautiful and intuitive user experiences for our shipping platform',
    },
    {
      title: 'Sales Executive',
      department: 'Sales',
      location: 'Dubai, UAE',
      type: 'Full-time',
      description: 'Drive business growth by acquiring and managing enterprise clients',
    },
    {
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Remote',
      type: 'Full-time',
      description: 'Turn data into insights that drive business decisions',
    },
  ];

  const stats = [
    { value: '500+', label: 'Team Members' },
    { value: '20+', label: 'Countries' },
    { value: '4.8/5', label: 'Employee Rating' },
    { value: '95%', label: 'Retention Rate' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Briefcase className="h-4 w-4" />
              <span>Join Our Team</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Build the Future of
              <br />
              <span className="text-purple-200">Global Logistics</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8">
              Join a team of passionate innovators transforming how the world ships goods. We're looking for talented individuals to help us connect businesses globally.
            </p>

            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Search className="h-5 w-5" />}
              onClick={() => {
                document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Open Positions
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-neutral-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Join Raphexpress?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We invest in our people because they're our greatest asset
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
                  className="text-center hover:scale-105 transition-transform bg-white"
                >
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-purple-600" />
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

      {/* Open Positions */}
      <section id="positions" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Find your next opportunity and make an impact
            </p>
          </div>

          <div className="space-y-4">
            {openPositions.map((position, index) => (
              <Card
                key={index}
                variant="bordered"
                padding="lg"
                className="hover:border-purple-500 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-1">
                          {position.title}
                        </h3>
                        <p className="text-purple-600 font-medium mb-2">
                          {position.department}
                        </p>
                        <p className="text-neutral-700 mb-3">
                          {position.description}
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm text-neutral-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{position.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{position.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => navigate(ROUTES.CONTACT)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-neutral-600 mb-4">
              Don't see a perfect fit?
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(ROUTES.CONTACT)}
            >
              Send Us Your Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Our Culture & Values
              </h2>
              <p className="text-lg text-neutral-600 mb-6">
                We're building more than a company – we're building a culture where innovation thrives and people grow.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Innovation First', description: 'We encourage creative thinking and bold ideas' },
                  { title: 'Customer Obsessed', description: 'Every decision starts with the customer' },
                  { title: 'Team Collaboration', description: 'We win together, learn together, grow together' },
                  { title: 'Continuous Learning', description: 'Invest in your growth with training and development' },
                ].map((value, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <Users className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {value.title}
                      </h3>
                      <p className="text-neutral-700">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-purple-50 to-indigo-50">
              <div className="space-y-6">
                <blockquote className="text-lg italic text-neutral-700">
                  "Joining Raphexpress was the best career decision I've made. The team is amazing, the work is challenging, and the impact is real."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Sarah Johnson</p>
                    <p className="text-sm text-neutral-600">Senior Software Engineer</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's build the future of logistics together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Positions
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600"
              onClick={() => navigate(ROUTES.CONTACT)}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
