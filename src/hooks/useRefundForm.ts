import { useState } from 'react';
import type { ShipmentSummary } from '../components/orders/OrderSelector';

export interface RefundData {
  selectedOrder: ShipmentSummary | null;
  reason: string;
  evidenceUrl: string; // optional link
  evidenceFiles: File[]; // device photos/images
  method: 'original' | 'wallet' | 'bank';
  bankAccountName: string;
  bankAccountNumber: string;
  bankIfscOrSwift: string;
}

export interface RefundErrors { [k: string]: string }

const initial: RefundData = {
  selectedOrder: null,
  reason: '',
  evidenceUrl: '',
  evidenceFiles: [],
  method: 'original',
  bankAccountName: '',
  bankAccountNumber: '',
  bankIfscOrSwift: '',
};

export const useRefundForm = () => {
  const [data, setData] = useState<RefundData>(initial);
  const [errors, setErrors] = useState<RefundErrors>({});

  const setSelectedOrder = (o: ShipmentSummary) => setData((d) => ({ ...d, selectedOrder: o }));
  const setReason = (reason: string) => setData((d) => ({ ...d, reason }));
  const setEvidenceUrl = (evidenceUrl: string) => setData((d) => ({ ...d, evidenceUrl }));
  const addEvidenceFiles = (files: FileList | File[]) => {
    const list = Array.from(files as any as File[]);
    setData((d) => ({ ...d, evidenceFiles: [...d.evidenceFiles, ...list] }));
  };
  const removeEvidenceFile = (index: number) => {
    setData((d) => ({ ...d, evidenceFiles: d.evidenceFiles.filter((_, i) => i !== index) }));
  };
  const setMethod = (method: 'original' | 'wallet' | 'bank') => setData((d) => ({ ...d, method }));
  const setBank = (name: string, number: string, code: string) => setData((d) => ({ ...d, bankAccountName: name, bankAccountNumber: number, bankIfscOrSwift: code }));

  const validateStep = (step: number) => {
    const e: RefundErrors = {};
    if (step === 1) {
      if (!data.selectedOrder) e.selectedOrder = 'Please select an order';
    } else if (step === 2) {
      if (!data.reason.trim()) e.reason = 'Reason is required';
    } else if (step === 3) {
      if (data.method === 'bank') {
        if (!data.bankAccountName.trim()) e.bankAccountName = 'Account name required';
        if (!data.bankAccountNumber.trim()) e.bankAccountNumber = 'Account number required';
        if (!data.bankIfscOrSwift.trim()) e.bankIfscOrSwift = 'IFSC/SWIFT required';
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return {
    data,
    setSelectedOrder,
    setReason,
    setEvidenceUrl,
    addEvidenceFiles,
    removeEvidenceFile,
    setMethod,
    setBank,
    errors,
    setErrors,
    validateStep,
  };
};
