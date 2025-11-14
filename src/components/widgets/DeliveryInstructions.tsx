import { useState } from 'react';
import { FileText, Home, Phone, Users, Package, MapPin } from 'lucide-react';
import Card from '../common/Card';

export interface DeliveryInstruction {
  type: 'leave_at_door' | 'signature_required' | 'call_before' | 'neighbor' | 'hold_at_facility' | 'custom';
  enabled: boolean;
  specialInstructions?: string;
}

interface DeliveryInstructionsProps {
  value?: DeliveryInstruction[];
  onChange?: (instructions: DeliveryInstruction[]) => void;
}

const DeliveryInstructions = ({ value = [], onChange }: DeliveryInstructionsProps) => {
  const [instructions, setInstructions] = useState<DeliveryInstruction[]>(
    value.length > 0
      ? value
      : [
          { type: 'leave_at_door', enabled: false },
          { type: 'signature_required', enabled: false },
          { type: 'call_before', enabled: false },
          { type: 'neighbor', enabled: false },
          { type: 'hold_at_facility', enabled: false },
          { type: 'custom', enabled: false, specialInstructions: '' },
        ]
  );

  const [specialInstructions, setSpecialInstructions] = useState('');

  const instructionOptions = [
    {
      type: 'leave_at_door' as const,
      icon: Home,
      title: 'Leave at Door',
      description: 'Driver will leave package at your door',
      color: 'from-blue-500 to-blue-600',
    },
    {
      type: 'signature_required' as const,
      icon: FileText,
      title: 'Signature Required',
      description: 'Recipient must sign for the package',
      color: 'from-purple-500 to-purple-600',
    },
    {
      type: 'call_before' as const,
      icon: Phone,
      title: 'Call Before Delivery',
      description: 'Driver will call before arriving',
      color: 'from-green-500 to-green-600',
    },
    {
      type: 'neighbor' as const,
      icon: Users,
      title: 'Deliver to Neighbor',
      description: 'Leave with a trusted neighbor',
      color: 'from-orange-500 to-orange-600',
    },
    {
      type: 'hold_at_facility' as const,
      icon: Package,
      title: 'Hold at Facility',
      description: 'Hold at nearest facility for pickup',
      color: 'from-red-500 to-red-600',
    },
  ];

  const handleToggle = (type: string) => {
    const updated = instructions.map(inst =>
      inst.type === type ? { ...inst, enabled: !inst.enabled } : inst
    );
    setInstructions(updated);
    if (onChange) {
      onChange(updated);
    }
  };

  const handleSpecialInstructionsChange = (text: string) => {
    setSpecialInstructions(text);
    const updated = instructions.map(inst =>
      inst.type === 'custom'
        ? { ...inst, enabled: text.length > 0, specialInstructions: text }
        : inst
    );
    setInstructions(updated);
    if (onChange) {
      onChange(updated);
    }
  };

  const selectedCount = instructions.filter(i => i.enabled).length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-900 mb-2">Delivery Instructions</h3>
        <p className="text-sm text-neutral-600">
          Choose how you'd like your package to be delivered
        </p>
      </div>

      {/* Quick Selection Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {instructionOptions.map(option => {
          const Icon = option.icon;
          const isSelected = instructions.find(i => i.type === option.type)?.enabled;

          return (
            <button
              key={option.type}
              onClick={() => handleToggle(option.type)}
              className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }`}
            >
              <div className={`bg-gradient-to-br ${option.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h4 className="font-semibold text-neutral-900 text-sm mb-1">{option.title}</h4>
              <p className="text-xs text-neutral-600">{option.description}</p>
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Special Instructions */}
      <Card variant="bordered" padding="md">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-primary" />
          <h4 className="font-bold text-neutral-900">Special Instructions</h4>
        </div>
        <textarea
          value={specialInstructions}
          onChange={(e) => handleSpecialInstructionsChange(e.target.value)}
          placeholder="Add any special delivery instructions (e.g., gate code, building access, contact person, preferred location, etc.)"
          rows={4}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
        <p className="text-xs text-neutral-500 mt-2">
          {specialInstructions.length}/500 characters
        </p>
      </Card>

      {/* Selected Instructions Summary */}
      {selectedCount > 0 && (
        <Card variant="elevated" padding="md" className="bg-green-50 border-green-200">
          <h4 className="font-bold text-green-900 mb-3">✓ Selected Instructions ({selectedCount})</h4>
          <ul className="space-y-2">
            {instructions
              .filter(i => i.enabled)
              .map(inst => {
                const option = instructionOptions.find(o => o.type === inst.type);
                return (
                  <li key={inst.type} className="flex items-center gap-2 text-sm text-green-800">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                    {option?.title || 'Special Instructions'}
                  </li>
                );
              })}
          </ul>
        </Card>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Multiple instructions can be selected. The driver will follow all enabled instructions in order of priority.
        </p>
      </div>

      {/* Conflicting Instructions Warning */}
      {instructions.find(i => i.type === 'signature_required')?.enabled &&
        instructions.find(i => i.type === 'leave_at_door')?.enabled && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>⚠️ Note:</strong> You've selected both "Signature Required" and "Leave at Door". Signature will take priority.
            </p>
          </div>
        )}
    </div>
  );
};

export default DeliveryInstructions;
