import { Download, CreditCard, DollarSign, Calendar } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Billing = () => {
  const invoices = [
    { id: 'INV-2025-001', date: '2025-10-20', amount: 1250.00, status: 'paid', shipmentId: 'RPHX123456789' },
    { id: 'INV-2025-002', date: '2025-10-18', amount: 850.50, status: 'paid', shipmentId: 'RPHX987654321' },
    { id: 'INV-2025-003', date: '2025-10-15', amount: 2100.75, status: 'pending', shipmentId: 'RPHX456789123' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Billing & Invoices</h1>
          <p className="text-neutral-600">Manage your payments and download invoices</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Total Spent</p>
                <p className="text-2xl font-bold text-neutral-900">$4,201.25</p>
              </div>
            </div>
          </Card>

          <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Paid Invoices</p>
                <p className="text-2xl font-bold text-neutral-900">2</p>
              </div>
            </div>
          </Card>

          <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Pending</p>
                <p className="text-2xl font-bold text-neutral-900">1</p>
              </div>
            </div>
          </Card>
        </div>

        <Card variant="elevated" padding="lg">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Recent Invoices</h2>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl hover:border-primary transition-colors">
                <div className="flex-1">
                  <div className="font-semibold text-neutral-900">{invoice.id}</div>
                  <div className="text-sm text-neutral-600">Shipment: {invoice.shipmentId}</div>
                  <div className="text-sm text-neutral-500">{new Date(invoice.date).toLocaleDateString()}</div>
                </div>
                <div className="text-right mr-6">
                  <div className="text-lg font-bold text-neutral-900">${invoice.amount.toFixed(2)}</div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </div>
                <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
                  Download
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
