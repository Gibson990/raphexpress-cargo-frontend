import { useState } from 'react';
import type { ShipmentSummary } from '../components/orders/OrderSelector';

export interface ReturnItems {
  reason: string;
  notes: string;
}

export interface PickupDetails {
  address: string;
  date: string; // ISO
  timeSlot: string;
}

export interface ReturnFormData {
  selectedOrder: ShipmentSummary | null;
  items: ReturnItems;
  pickup: PickupDetails;
  shippingMethod: 'ground' | 'express';
}

export interface ReturnErrors {
  [k: string]: string;
}

const initialData: ReturnFormData = {
  selectedOrder: null,
  items: { reason: '', notes: '' },
  pickup: { address: '', date: '', timeSlot: '' },
  shippingMethod: 'ground',
};

export const useReturnForm = () => {
  const [data, setData] = useState<ReturnFormData>(initialData);
  const [errors, setErrors] = useState<ReturnErrors>({});

  const setSelectedOrder = (order: ShipmentSummary) => setData((d) => ({ ...d, selectedOrder: order }));
  const setItems = (items: ReturnItems) => setData((d) => ({ ...d, items }));
  const setPickup = (pickup: PickupDetails) => setData((d) => ({ ...d, pickup }));
  const setShippingMethod = (m: 'ground' | 'express') => setData((d) => ({ ...d, shippingMethod: m }));

  const validateStep = (step: number) => {
    const e: ReturnErrors = {};
    if (step === 1) {
      if (!data.selectedOrder) e.selectedOrder = 'Please select an order to return';
    } else if (step === 2) {
      if (!data.items.reason.trim()) e.reason = 'Reason is required';
    } else if (step === 3) {
      if (!data.pickup.address.trim()) e.address = 'Pickup address is required';
      if (!data.pickup.date) e.date = 'Pickup date is required';
      if (!data.pickup.timeSlot) e.timeSlot = 'Time slot is required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return { data, setSelectedOrder, setItems, setPickup, setShippingMethod, errors, setErrors, validateStep };
};
