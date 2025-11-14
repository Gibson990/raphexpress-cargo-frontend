import { useEffect, useMemo, useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import { Search } from 'lucide-react';

export interface ShipmentSummary {
  id: string;
  origin: string;
  destination: string;
  status: string;
  mode: string;
  createdDate: string;
  eta?: string;
  weight?: string;
  value?: string;
}

interface OrderSelectorProps {
  shipments?: ShipmentSummary[];
  onSelect: (shipment: ShipmentSummary) => void;
  loading?: boolean;
}

const statusColor = (status: string) => {
  const map: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    picked: 'bg-blue-100 text-blue-800',
    in_transit: 'bg-purple-100 text-purple-800',
    customs: 'bg-orange-100 text-orange-800',
    out_for_delivery: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
  };
  return map[status] || 'bg-neutral-100 text-neutral-700';
};

const OrderSelector = ({ shipments = [], onSelect, loading = false }: OrderSelectorProps) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | string>('all');
  const [sort, setSort] = useState<'new' | 'old'>('new');
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [preset, setPreset] = useState<string>('All');

  // Load last used filters
  useEffect(() => {
    try {
      const raw = localStorage.getItem('orderSelector:last');
      if (raw) {
        const last = JSON.parse(raw);
        setStatus(last.status ?? 'all');
        setSort(last.sort ?? 'new');
        setView(last.view ?? 'list');
        setPreset('Last Used');
      }
    } catch {}
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem('orderSelector:last', JSON.stringify({ status, sort, view }));
    } catch {}
  }, [status, sort, view]);

  const statuses = useMemo(() => {
    const set = new Set<string>();
    shipments.forEach((s) => set.add(s.status));
    return ['all', ...Array.from(set)];
  }, [shipments]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let list = shipments.filter((s) =>
      s.id.toLowerCase().includes(q) ||
      s.destination.toLowerCase().includes(q) ||
      s.origin.toLowerCase().includes(q)
    );
    if (status !== 'all') list = list.filter((s) => s.status === status);
    list.sort((a, b) =>
      sort === 'new'
        ? new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        : new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
    );
    return list;
  }, [query, status, sort, shipments]);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by tracking ID, origin or destination..."
        leftIcon={<Search className="h-5 w-5" />}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {statuses.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatus(st as any)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                status === st ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-neutral-600">Presets:</span>
          <select
            value={preset}
            onChange={(e) => {
              const p = e.target.value;
              setPreset(p);
              if (p === 'All') {
                setStatus('all'); setSort('new'); setView('list');
              } else if (p === 'Delivered') {
                setStatus('delivered');
              } else if (p === 'In Transit') {
                setStatus('in_transit');
              } else if (p === 'Customs') {
                setStatus('customs');
              } else if (p === 'Last Used') {
                try {
                  const raw = localStorage.getItem('orderSelector:last');
                  if (raw) {
                    const last = JSON.parse(raw);
                    setStatus(last.status ?? 'all');
                    setSort(last.sort ?? 'new');
                    setView(last.view ?? 'list');
                  }
                } catch {}
              }
            }}
            className="px-3 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option>All</option>
            <option>Delivered</option>
            <option>In Transit</option>
            <option>Customs</option>
            <option>Last Used</option>
          </select>
          <span className="text-neutral-600">Sort:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="px-3 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="new">Newest first</option>
            <option value="old">Oldest first</option>
          </select>
          <div className="h-6 w-px bg-neutral-200" />
          <div className="inline-flex rounded-lg overflow-hidden border border-neutral-200">
            <button
              type="button"
              className={`px-3 py-1.5 text-sm ${view==='list' ? 'bg-primary text-white' : 'bg-white text-neutral-700'}`}
              onClick={() => setView('list')}
            >
              List
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 text-sm ${view==='grid' ? 'bg-primary text-white' : 'bg-white text-neutral-700'}`}
              onClick={() => setView('grid')}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        view === 'list' ? (
          <Card variant="elevated" padding="none">
            <div className="animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`h-14 ${i>0 ? 'border-t border-neutral-200' : ''}`}>
                  <div className="h-full bg-neutral-100" />
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} variant="elevated" padding="lg">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 w-1/2 bg-neutral-200 rounded" />
                  <div className="h-3 w-2/3 bg-neutral-200 rounded" />
                  <div className="h-3 w-1/3 bg-neutral-200 rounded" />
                </div>
              </Card>
            ))}
          </div>
        )
      ) : filtered.length === 0 ? (
        <Card variant="elevated" padding="lg">
          <p className="text-neutral-600">No matching shipments</p>
        </Card>
      ) : view === 'list' ? (
        <Card variant="elevated" padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Tracking ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Route</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Mode</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Created</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-neutral-900">{s.id}</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">{s.origin} → {s.destination}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(s.status)}`}>{s.status.replace(/_/g, ' ')}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700">{s.mode}</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">{new Date(s.createdDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <Button variant="primary" size="sm" onClick={() => onSelect(s)}>Select</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((s) => (
            <Card key={s.id} variant="elevated" padding="lg" className="hover:border-primary cursor-pointer" onClick={() => onSelect(s)}>
              <div className="flex items-start justify-between mb-2">
                <div className="font-mono font-semibold text-neutral-900">{s.id}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(s.status)}`}>{s.status.replace(/_/g, ' ')}</span>
              </div>
              <div className="text-sm text-neutral-700 mb-1">{s.origin} → {s.destination}</div>
              <div className="text-xs text-neutral-500 mb-3">{s.mode} • Created {new Date(s.createdDate).toLocaleDateString()}{s.eta ? ` • ETA ${new Date(s.eta).toLocaleDateString()}` : ''}</div>
              {(s.weight || s.value) && (
                <div className="text-xs text-neutral-600 mb-3 flex gap-4">
                  {s.weight && <span>Weight: {s.weight}</span>}
                  {s.value && <span>Value: {s.value}</span>}
                </div>
              )}
              <div className="flex justify-end">
                <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); onSelect(s); }}>Select</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderSelector;
