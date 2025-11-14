import jsPDF from 'jspdf';

export interface ShipmentLabel {
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
  barcode?: string;
}

export const generateShippingLabel = async (data: ShipmentLabel): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  const contentWidth = pageWidth - margin * 2;

  let yPosition = margin;

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('SHIPPING LABEL', margin, yPosition);
  yPosition += 12;

  // Tracking Number (Large)
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`Tracking: ${data.trackingNumber}`, margin, yPosition);
  yPosition += 10;

  // Service Type Badge
  const serviceColors: Record<string, [number, number, number]> = {
    express: [59, 130, 246], // Blue
    standard: [249, 115, 22], // Orange
    economy: [34, 197, 94], // Green
  };

  const color = serviceColors[data.serviceType] || serviceColors.standard;
  doc.setFillColor(color[0], color[1], color[2]);
  doc.rect(margin, yPosition - 5, 50, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(data.serviceType.toUpperCase(), margin + 2, yPosition);
  doc.setTextColor(0, 0, 0);
  yPosition += 10;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 5;

  // From Section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('FROM:', margin, yPosition);
  yPosition += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(data.senderName, margin, yPosition);
  yPosition += 5;
  doc.text(data.senderAddress, margin, yPosition);
  yPosition += 5;
  doc.text(`${data.senderCity}, ${data.senderCountry}`, margin, yPosition);
  yPosition += 5;
  doc.text(`Phone: ${data.senderPhone}`, margin, yPosition);
  yPosition += 8;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 5;

  // To Section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('TO:', margin, yPosition);
  yPosition += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(data.receiverName, margin, yPosition);
  yPosition += 5;
  doc.text(data.receiverAddress, margin, yPosition);
  yPosition += 5;
  doc.text(`${data.receiverCity}, ${data.receiverCountry}`, margin, yPosition);
  yPosition += 5;
  doc.text(`Phone: ${data.receiverPhone}`, margin, yPosition);
  yPosition += 8;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 5;

  // Shipment Details
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('SHIPMENT DETAILS', margin, yPosition);
  yPosition += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  
  doc.text(`Weight: ${data.weight} kg`, margin, yPosition);
  doc.text(`Created: ${data.createdDate}`, pageWidth / 2, yPosition);
  yPosition += 5;
  
  doc.text(`Service: ${data.serviceType.charAt(0).toUpperCase() + data.serviceType.slice(1)}`, margin, yPosition);
  doc.text(`Est. Delivery: ${data.estimatedDelivery}`, pageWidth / 2, yPosition);
  yPosition += 8;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 5;

  // Footer / Terms
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  const footerText = 'This is an official Raphexpress shipping label. Please ensure all details are correct before shipping. For support, visit raphexpress.com or call +1-800-RAPHEXPRESS';
  doc.text(footerText, margin, pageHeight - 15, { maxWidth: contentWidth, align: 'left' });

  // Save the PDF
  doc.save(`shipping-label-${data.trackingNumber}.pdf`);
};

// Generate a simple barcode representation (text-based)
export const generateBarcode = (text: string): string => {
  // This is a simple representation - in production, use a barcode library
  return text.split('').map(() => '*').join('');
};
