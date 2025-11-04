import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, Search, Tag } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { ROUTES, IMAGES } from '../utils/constants';

const Blog = () => {
  const navigate = useNavigate();

  const featuredPost = {
    title: 'The Future of Global Logistics: Trends to Watch in 2025',
    excerpt: 'Discover how AI, automation, and sustainability are reshaping the logistics industry and what it means for your business.',
    author: 'Michael Chen',
    date: 'November 1, 2025',
    readTime: '8 min read',
    image: IMAGES.LOGISTICS,
    category: 'Industry Insights',
  };

  const blogPosts = [
    {
      title: 'How to Optimize Your International Shipping Costs',
      excerpt: 'Learn practical strategies to reduce shipping expenses while maintaining service quality.',
      author: 'Sarah Johnson',
      date: 'October 28, 2025',
      readTime: '5 min read',
      image: IMAGES.CARGO_SHIP,
      category: 'Tips & Guides',
    },
    {
      title: 'Understanding Customs Regulations: A Complete Guide',
      excerpt: 'Navigate the complexities of international customs with our comprehensive guide.',
      author: 'David Lee',
      date: 'October 25, 2025',
      readTime: '10 min read',
      image: IMAGES.CUSTOMS,
      category: 'Compliance',
    },
    {
      title: 'Air Freight vs Sea Freight: Making the Right Choice',
      excerpt: 'Compare the pros and cons of different shipping methods to find the best fit for your needs.',
      author: 'Emma Rodriguez',
      date: 'October 22, 2025',
      readTime: '6 min read',
      image: IMAGES.CARGO_PLANE,
      category: 'Shipping Options',
    },
    {
      title: 'E-commerce Integration Best Practices',
      excerpt: 'Seamlessly connect your online store with our shipping platform for automated fulfillment.',
      author: 'Alex Thompson',
      date: 'October 20, 2025',
      readTime: '7 min read',
      image: IMAGES.PACKAGE,
      category: 'Technology',
    },
    {
      title: 'Sustainable Shipping: Our Green Initiatives',
      excerpt: 'How Raphexpress is reducing carbon footprint and promoting eco-friendly logistics.',
      author: 'Lisa Wang',
      date: 'October 18, 2025',
      readTime: '5 min read',
      image: IMAGES.GLOBE,
      category: 'Sustainability',
    },
    {
      title: 'Real-Time Tracking: Enhancing Customer Experience',
      excerpt: 'The importance of shipment visibility and how it builds trust with your customers.',
      author: 'Mark Stevens',
      date: 'October 15, 2025',
      readTime: '4 min read',
      image: IMAGES.TRACKING,
      category: 'Customer Success',
    },
  ];

  const categories = [
    'All Posts',
    'Industry Insights',
    'Tips & Guides',
    'Technology',
    'Compliance',
    'Sustainability',
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-orange-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Raphexpress Blog
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Insights, guides, and updates from the world of global logistics
            </p>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3 overflow-x-auto">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  index === 0
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Featured Article</h2>
          <Card
            variant="elevated"
            padding="none"
            className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer bg-white"
            onClick={() => navigate(ROUTES.CONTACT)}
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                    {featuredPost.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-lg text-neutral-600 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-neutral-600 mb-6">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Read More
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                variant="elevated"
                padding="none"
                className="overflow-hidden hover:scale-105 transition-transform cursor-pointer bg-white"
                onClick={() => navigate(ROUTES.CONTACT)}
              >
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-neutral-900 text-xs font-medium rounded-full flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                    <button className="text-primary hover:text-primary-600 font-medium text-sm flex items-center gap-1 transition-colors">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-orange-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to our newsletter for the latest insights and updates
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button variant="secondary" size="lg" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-white/70 mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Join thousands of businesses shipping with Raphexpress
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(ROUTES.SIGNUP)}
            >
              Start Shipping
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(ROUTES.CONTACT)}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
