import { useState } from 'react';
import { Printer, Loader } from 'lucide-react';
import Button from './Button';
import { generateShippingLabel } from '../../utils/labelGenerator';
import type { ShipmentLabel } from '../../utils/labelGenerator';
import toast from 'react-hot-toast';

interface PrintLabelButtonProps {
  shipmentId: string;
  trackingNumber: string;
  senderName: string;
  senderAddress: string;
  senderCity: string;
  senderCountry: string;
  senderPhone: string;
  receiverName: string;
  receiverAddress: string;
  receiverCity: string;
  receiverCountry: string;
  receiverPhone: string;
  weight: number;
  serviceType: 'express' | 'standard' | 'economy';
  createdDate: string;
  estimatedDelivery: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
}

const PrintLabelButton = ({
  trackingNumber,
  senderName,
  senderAddress,
  senderCity,
  senderCountry,
  senderPhone,
  receiverName,
  receiverAddress,
  receiverCity,
  receiverCountry,
  receiverPhone,
  weight,
  serviceType,
  createdDate,
  estimatedDelivery,
  size = 'md',
  variant = 'outline',
  className = '',
}: PrintLabelButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePrintLabel = async () => {
    try {
      setIsLoading(true);

      const labelData: ShipmentLabel = {
        trackingNumber,
        senderName,
        senderAddress,
        senderCity,
        senderCountry,
        senderPhone,
        receiverName,
        receiverAddress,
        receiverCity,
        receiverCountry,
        receiverPhone,
        weight,
        serviceType,
        createdDate,
        estimatedDelivery,
      };

      await generateShippingLabel(labelData);
      toast.success('Label downloaded successfully!');
    } catch (error) {
      console.error('Error generating label:', error);
      toast.error('Failed to generate label');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePrintLabel}
      disabled={isLoading}
      size={size}
      variant={variant}
      className={className}
      leftIcon={isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Printer className="h-4 w-4" />}
    >
      {isLoading ? 'Generating...' : 'Print Label'}
    </Button>
  );
};

export default PrintLabelButton;
