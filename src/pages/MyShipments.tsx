import { useState } from 'react';
import { Search, Filter, Download, Eye, Package, Calendar, MapPin } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useNavigate } from 'react-router-dom';
import { ROUTES, SHIPMENT_STATUS_LABELS } from '../utils/constants';

const MyShipments = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const shipments = [
    {
      id: 'RPHX123456789',
      destination: 'Dubai, UAE',
      origin: 'Mumbai, India',
      status: 'in_transit',
      mode: 'Sea Freight',
      createdDate: '2025-10-20',
      eta: '2025-10-28',
      weight: '250 kg',
      value: '$5,000',
    },
    {
      id: 'RPHX987654321',
      destination: 'Singapore',
      origin: 'Delhi, India',
      status: 'customs',
      mode: 'Air Freight',
      createdDate: '2025-10-18',
      eta: '2025-10-25',
      weight: '100 kg',
      value: '$3,500',
    },
    {
      id: 'RPHX456789123',
      destination: 'London, UK',
      origin: 'Bangalore, India',
      status: 'picked',
      mode: 'Air Freight',
      createdDate: '2025-10-22',
      eta: '2025-11-02',
      weight: '75 kg',
      value: '$2,800',
    },
    {
      id: 'RPHX789123456',
      destination: 'New York, USA',
      origin: 'Chennai, India',
      status: 'out_for_delivery',
      mode: 'Express',
      createdDate: '2025-10-15',
      eta: '2025-10-24',
      weight: '50 kg',
      value: '$4,200',
    },
    {
      id: 'RPHX321654987',
      destination: 'Sydney, Australia',
      origin: 'Mumbai, India',
      status: 'delivered',
      mode: 'Sea Freight',
      createdDate: '2025-09-25',
      eta: '2025-10-15',
      weight: '500 kg',
      value: '$8,500',
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Shipments', count: shipments.length },
    { value: 'pending', label: 'Pending', count: 0 },
    { value: 'picked', label: 'Picked Up', count: 1 },
    { value: 'in_transit', label: 'In Transit', count: 1 },
    { value: 'customs', label: 'Customs', count: 1 },
    { value: 'out_for_delivery', label: 'Out for Delivery', count: 1 },
    { value: 'delivered', label: 'Delivered', count: 1 },
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

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              My Shipments
            </h1>
            <p className="text-neutral-600">
              Track and manage all your shipments
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Package className="h-4 w-4" />}
            onClick={() => navigate(ROUTES.CREATE_SHIPMENT)}
          >
            Create Shipment
          </Button>
        </div>

        {/* Filters */}
        <Card variant="elevated" padding="lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by tracking ID or destination..."
                leftIcon={<Search className="h-5 w-5" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
              More Filters
            </Button>
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  statusFilter === option.value
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </Card>

        {/* Shipments Table */}
        <Card variant="elevated" padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-neutral-900">
                    Tracking ID
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-neutral-900">
                    Route
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-neutral-900">
                    Status
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-neutral-900 hidden sm:table-cell">
                    Mode
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-neutral-900 hidden md:table-cell">
                    ETA
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-neutral-900 hidden lg:table-cell">
                    Details
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-right font-semibold text-neutral-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredShipments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 md:px-6 py-12 text-center">
                      <Package className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                      <p className="text-neutral-600">No shipments found</p>
                    </td>
                  </tr>
                ) : (
                  filteredShipments.map((shipment) => (
                    <tr key={shipment.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-4 md:px-6 py-3 md:py-4 align-top">
                        <div className="font-mono font-semibold text-neutral-900">
                          {shipment.id}
                        </div>
                        <div className="text-xs md:text-sm text-neutral-500 flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(shipment.createdDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-neutral-900">{shipment.origin}</div>
                            <div className="text-neutral-500">→ {shipment.destination}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                          {SHIPMENT_STATUS_LABELS[shipment.status as keyof typeof SHIPMENT_STATUS_LABELS]}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 hidden sm:table-cell">
                        <div className="text-neutral-900">{shipment.mode}</div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 hidden md:table-cell">
                        <div className="text-neutral-900">
                          {new Date(shipment.eta).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 hidden lg:table-cell">
                        <div className="text-neutral-600">
                          <div>{shipment.weight}</div>
                          <div className="text-neutral-500">{shipment.value}</div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<Eye className="h-4 w-4" />}
                            onClick={() => navigate(`${ROUTES.TRACK}/${shipment.id}`, { state: { useDashboard: true } })}
                          >
                            Track
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<Download className="h-4 w-4" />}
                          >
                            Label
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(ROUTES.RETURN_ORDER, { state: { selectedOrder: shipment } })}
                          >
                            Return
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(ROUTES.REFUND_REQUEST, { state: { selectedOrder: shipment } })}
                          >
                            Refund
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="bordered" padding="lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Total Shipments</p>
                <p className="text-2xl font-bold text-neutral-900">{shipments.length}</p>
              </div>
            </div>
          </Card>

          <Card variant="bordered" padding="lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">In Transit</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {shipments.filter(s => s.status === 'in_transit').length}
                </p>
              </div>
            </div>
          </Card>

          <Card variant="bordered" padding="lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Delivered</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {shipments.filter(s => s.status === 'delivered').length}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyShipments;
