import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, MapPin, Home, Briefcase, Star } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import toast from 'react-hot-toast';

export interface SavedAddress {
  id: string;
  label: 'home' | 'office' | 'warehouse' | 'other';
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

interface AddressBookProps {
  onSelectAddress?: (address: SavedAddress) => void;
  showSelectMode?: boolean;
}

const AddressBook = ({ onSelectAddress, showSelectMode = false }: AddressBookProps) => {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SavedAddress>>({
    label: 'other',
    isDefault: false,
  });

  // Load addresses from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedAddresses');
    if (saved) {
      try {
        setAddresses(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading addresses:', error);
      }
    }
  }, []);

  // Save addresses to localStorage
  const saveAddresses = (newAddresses: SavedAddress[]) => {
    localStorage.setItem('savedAddresses', JSON.stringify(newAddresses));
    setAddresses(newAddresses);
  };

  const handleAddAddress = () => {
    if (!formData.name || !formData.address || !formData.city || !formData.country) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingId) {
      // Update existing
      const updated = addresses.map(addr =>
        addr.id === editingId
          ? { ...addr, ...formData, id: editingId } as SavedAddress
          : addr
      );
      saveAddresses(updated);
      toast.success('Address updated successfully');
    } else {
      // Add new
      const newAddress: SavedAddress = {
        id: Date.now().toString(),
        name: formData.name || '',
        label: formData.label as 'home' | 'office' | 'warehouse' | 'other',
        address: formData.address || '',
        city: formData.city || '',
        state: formData.state || '',
        country: formData.country || '',
        zipCode: formData.zipCode || '',
        phone: formData.phone || '',
        isDefault: formData.isDefault || false,
      };
      saveAddresses([...addresses, newAddress]);
      toast.success('Address added successfully');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ label: 'other', isDefault: false });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (address: SavedAddress) => {
    setFormData(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      const updated = addresses.filter(addr => addr.id !== id);
      saveAddresses(updated);
      toast.success('Address deleted');
    }
  };

  const handleSetDefault = (id: string) => {
    const updated = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    }));
    saveAddresses(updated);
    toast.success('Default address updated');
  };

  const getLabelIcon = (label: string) => {
    switch (label) {
      case 'home':
        return Home;
      case 'office':
        return Briefcase;
      case 'warehouse':
        return MapPin;
      default:
        return MapPin;
    }
  };

  const getLabelColor = (label: string) => {
    switch (label) {
      case 'home':
        return 'from-blue-500 to-blue-600';
      case 'office':
        return 'from-purple-500 to-purple-600';
      case 'warehouse':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-neutral-900">Saved Addresses</h3>
          <p className="text-sm text-neutral-600">Manage your frequently used addresses</p>
        </div>
        {!showForm && (
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setShowForm(true)}
          >
            Add Address
          </Button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card variant="elevated" padding="lg">
          <h4 className="text-lg font-bold text-neutral-900 mb-4">
            {editingId ? 'Edit Address' : 'Add New Address'}
          </h4>

          <div className="space-y-4">
            {/* Label */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Label
              </label>
              <select
                value={formData.label}
                onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value as any }))}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="home">Home</option>
                <option value="office">Office</option>
                <option value="warehouse">Warehouse</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Name/Contact Person *
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., John Doe"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="e.g., +1-800-123-4567"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="e.g., 123 Main Street"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* City, State, Country */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="City"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="State"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  value={formData.country || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  placeholder="Country"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* ZIP Code */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                ZIP/Postal Code
              </label>
              <input
                type="text"
                value={formData.zipCode || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                placeholder="e.g., 12345"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Set as Default */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="default"
                checked={formData.isDefault || false}
                onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
                className="w-4 h-4 rounded"
              />
              <label htmlFor="default" className="text-sm font-medium text-neutral-700">
                Set as default address
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="md"
                className="flex-1"
                onClick={resetForm}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                className="flex-1"
                onClick={handleAddAddress}
              >
                {editingId ? 'Update Address' : 'Add Address'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Addresses List */}
      {addresses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map(address => {
            const Icon = getLabelIcon(address.label);
            const color = getLabelColor(address.label);

            return (
              <Card key={address.id} variant="bordered" padding="md" className="relative">
                {address.isDefault && (
                  <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    Default
                  </div>
                )}

                <div className="flex items-start gap-3 mb-3">
                  <div className={`bg-gradient-to-br ${color} p-2 rounded-lg flex-shrink-0`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-neutral-900 capitalize">{address.label}</h4>
                    <p className="text-sm text-neutral-600">{address.name}</p>
                  </div>
                </div>

                <div className="space-y-1 mb-4 text-sm text-neutral-700">
                  <p>{address.address}</p>
                  <p>
                    {address.city}
                    {address.state && `, ${address.state}`}
                  </p>
                  <p>{address.country}</p>
                  {address.zipCode && <p>{address.zipCode}</p>}
                  {address.phone && <p className="text-neutral-600">📞 {address.phone}</p>}
                </div>

                <div className="flex gap-2">
                  {!address.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => handleSetDefault(address.id)}
                      leftIcon={<Star className="h-3 w-3" />}
                    >
                      Set Default
                    </Button>
                  )}
                  {showSelectMode && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => onSelectAddress?.(address)}
                    >
                      Select
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-xs"
                    leftIcon={<Edit2 className="h-3 w-3" />}
                    onClick={() => handleEdit(address)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-xs text-red-600 hover:text-red-700"
                    leftIcon={<Trash2 className="h-3 w-3" />}
                    onClick={() => handleDelete(address.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card variant="bordered" padding="lg" className="text-center">
          <MapPin className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-600 mb-4">No saved addresses yet</p>
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setShowForm(true)}
          >
            Add Your First Address
          </Button>
        </Card>
      )}
    </div>
  );
};

export default AddressBook;
