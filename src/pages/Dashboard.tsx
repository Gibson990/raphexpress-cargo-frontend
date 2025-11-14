import { Package, TrendingUp, Clock, CheckCircle2, PlusCircle, Search, Download, Eye } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import PrintLabelButton from '../components/common/PrintLabelButton';
import { useNavigate } from 'react-router-dom';
import { ROUTES, SHIPMENT_STATUS_LABELS } from '../utils/constants';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Active Shipments',
      value: '12',
      change: '+3 from last month',
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'In Transit',
      value: '8',
      change: '2 arriving today',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Pending Pickup',
      value: '4',
      change: 'Scheduled this week',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    {
      title: 'Delivered',
      value: '156',
      change: '+12 this month',
      icon: CheckCircle2,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
  ];

  const recentShipments = [
    {
      id: 'RPHX123456789',
      destination: 'Dubai, UAE',
      status: 'in_transit',
      eta: '2025-10-28',
      mode: 'Sea Freight',
      progress: 65,
    },
    {
      id: 'RPHX987654321',
      destination: 'Singapore',
      status: 'customs',
      eta: '2025-10-25',
      mode: 'Air Freight',
      progress: 80,
    },
    {
      id: 'RPHX456789123',
      destination: 'London, UK',
      status: 'picked',
      eta: '2025-11-02',
      mode: 'Air Freight',
      progress: 25,
    },
    {
      id: 'RPHX789123456',
      destination: 'New York, USA',
      status: 'out_for_delivery',
      eta: '2025-10-24',
      mode: 'Express',
      progress: 95,
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      picked: 'bg-blue-100 text-blue-800',
      in_transit: 'bg-purple-100 text-purple-800',
      customs: 'bg-orange-100 text-orange-800',
      out_for_delivery: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-neutral-600">
              Here's what's happening with your shipments today
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              leftIcon={<Search className="h-4 w-4" />}
              onClick={() => navigate(ROUTES.TRACK, { state: { useDashboard: true } })}
            >
              Track Shipment
            </Button>
            <Button
              variant="primary"
              leftIcon={<PlusCircle className="h-4 w-4" />}
              onClick={() => navigate(ROUTES.CREATE_SHIPMENT)}
            >
              Create Shipment
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                variant="elevated"
                padding="lg"
                className="hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-neutral-600 mb-1">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-neutral-900 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-neutral-500">{stat.change}</p>
              </Card>
            );
          })}
        </div>

        {/* Recent Shipments */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900">
              Recent Shipments
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(ROUTES.MY_SHIPMENTS)}
            >
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentShipments.map((shipment) => (
              <div
                key={shipment.id}
                className="p-4 rounded-xl border border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Shipment Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-neutral-900 font-mono">
                        {shipment.id}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          shipment.status
                        )}`}
                      >
                        {SHIPMENT_STATUS_LABELS[shipment.status as keyof typeof SHIPMENT_STATUS_LABELS]}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                      <span>📍 {shipment.destination}</span>
                      <span>•</span>
                      <span>✈️ {shipment.mode}</span>
                      <span>•</span>
                      <span>📅 ETA: {new Date(shipment.eta).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <div className="flex items-center justify-between text-xs text-neutral-600 mb-1">
                        <span>Progress</span>
                        <span className="font-medium">{shipment.progress}%</span>
                      </div>
                      <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-orange transition-all duration-500"
                          style={{ width: `${shipment.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Eye className="h-4 w-4" />}
                        onClick={() => navigate(`${ROUTES.TRACK}/${shipment.id}`, { state: { useDashboard: true } })}
                      >
                        Track
                      </Button>
                      <PrintLabelButton
                        shipmentId={shipment.id}
                        trackingNumber={shipment.id}
                        senderName="John Doe"
                        senderAddress="123 Main St"
                        senderCity={shipment.destination.split(',')[0]}
                        senderCountry={shipment.destination.split(',')[1]?.trim() || 'UAE'}
                        senderPhone="+1234567890"
                        receiverName="Jane Smith"
                        receiverAddress="456 Oak Ave"
                        receiverCity={shipment.destination.split(',')[0]}
                        receiverCountry={shipment.destination.split(',')[1]?.trim() || 'UAE'}
                        receiverPhone="+9876543210"
                        weight={100}
                        serviceType={shipment.mode === 'Express' ? 'express' : shipment.mode === 'Air Freight' ? 'standard' : 'economy'}
                        createdDate={new Date(shipment.eta).toLocaleDateString()}
                        estimatedDelivery={new Date(shipment.eta).toLocaleDateString()}
                        size="sm"
                        variant="ghost"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card
            variant="bordered"
            padding="lg"
            className="hover:border-primary hover:shadow-md transition-all cursor-pointer group"
            onClick={() => navigate(ROUTES.AVAILABILITY)}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                Check Availability
              </h3>
              <p className="text-sm text-neutral-600">
                View available flights and ships
              </p>
            </div>
          </Card>

          <Card
            variant="bordered"
            padding="lg"
            className="hover:border-primary hover:shadow-md transition-all cursor-pointer group"
            onClick={() => navigate(ROUTES.BILLING)}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                Download Invoices
              </h3>
              <p className="text-sm text-neutral-600">
                Access your billing history
              </p>
            </div>
          </Card>

          <Card
            variant="bordered"
            padding="lg"
            className="hover:border-primary hover:shadow-md transition-all cursor-pointer group"
            onClick={() => navigate(ROUTES.SUPPORT)}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                Get Support
              </h3>
              <p className="text-sm text-neutral-600">
                Chat with our support team
              </p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
