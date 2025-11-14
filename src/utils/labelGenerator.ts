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
  const margin = 8;
  const contentWidth = pageWidth - margin * 2;

  let yPosition = margin;

  // OUTER BORDER - Professional industrial standard
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.8);
  doc.rect(margin, margin, contentWidth, pageHeight - margin * 2);

  // Inner decorative border
  doc.setLineWidth(0.3);
  doc.setDrawColor(100, 100, 100);
  doc.rect(margin + 1, margin + 1, contentWidth - 2, pageHeight - margin * 2 - 2);

  yPosition += 3;

  // HEADER SECTION - Company branding
  doc.setFillColor(249, 115, 22); // Primary orange
  doc.rect(margin + 1, yPosition, contentWidth - 2, 12, 'F');
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('RAPHEXPRESS', margin + 5, yPosition + 8);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('INTERNATIONAL SHIPPING LABEL', pageWidth - margin - 5, yPosition + 8, { align: 'right' });
  
  yPosition += 15;

  // TRACKING NUMBER - Large and prominent
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.rect(margin + 1, yPosition, contentWidth - 2, 10);
  
  doc.setFontSize(16);
  doc.setFont('courier', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`TRACKING #: ${data.trackingNumber}`, margin + 3, yPosition + 6.5);
  
  yPosition += 12;

  // SERVICE TYPE BADGE
  const serviceColors: Record<string, [number, number, number]> = {
    express: [59, 130, 246], // Blue
    standard: [249, 115, 22], // Orange
    economy: [34, 197, 94], // Green
  };

  const color = serviceColors[data.serviceType] || serviceColors.standard;
  doc.setFillColor(color[0], color[1], color[2]);
  doc.rect(margin + 1, yPosition, 40, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.serviceType.toUpperCase()} SERVICE`, margin + 3, yPosition + 4.5);
  
  // Date created
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Created: ${data.createdDate}`, pageWidth - margin - 3, yPosition + 4.5, { align: 'right' });
  
  yPosition += 9;

  // SECTION DIVIDER
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(margin + 1, yPosition, pageWidth - margin - 1, yPosition);
  yPosition += 2;

  // FROM SECTION - Left column
  const colWidth = (contentWidth - 4) / 2;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('SHIP FROM:', margin + 2, yPosition);
  yPosition += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(data.senderName, margin + 2, yPosition, { maxWidth: colWidth - 2 });
  yPosition += 4;
  doc.text(data.senderAddress, margin + 2, yPosition, { maxWidth: colWidth - 2 });
  yPosition += 4;
  doc.text(`${data.senderCity}, ${data.senderCountry}`, margin + 2, yPosition, { maxWidth: colWidth - 2 });
  yPosition += 4;
  doc.text(`Tel: ${data.senderPhone}`, margin + 2, yPosition, { maxWidth: colWidth - 2 });

  // TO SECTION - Right column
  const rightColX = margin + 2 + colWidth + 2;
  let rightYPosition = yPosition - 16;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('SHIP TO:', rightColX, rightYPosition);
  rightYPosition += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(data.receiverName, rightColX, rightYPosition, { maxWidth: colWidth - 2 });
  rightYPosition += 4;
  doc.text(data.receiverAddress, rightColX, rightYPosition, { maxWidth: colWidth - 2 });
  rightYPosition += 4;
  doc.text(`${data.receiverCity}, ${data.receiverCountry}`, rightColX, rightYPosition, { maxWidth: colWidth - 2 });
  rightYPosition += 4;
  doc.text(`Tel: ${data.receiverPhone}`, rightColX, rightYPosition, { maxWidth: colWidth - 2 });

  yPosition += 20;

  // SECTION DIVIDER
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(margin + 1, yPosition, pageWidth - margin - 1, yPosition);
  yPosition += 2;

  // SHIPMENT DETAILS - Grid layout
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('SHIPMENT DETAILS', margin + 2, yPosition);
  yPosition += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);

  const detailsBoxWidth = (contentWidth - 4) / 3;
  const detailsY = yPosition;

  // Weight box
  doc.setDrawColor(150, 150, 150);
  doc.setLineWidth(0.3);
  doc.rect(margin + 1, detailsY, detailsBoxWidth, 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('WEIGHT', margin + 2, detailsY + 3);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`${data.weight} kg`, margin + 2, detailsY + 7);

  // Service box
  const serviceBoxX = margin + 1 + detailsBoxWidth;
  doc.setDrawColor(150, 150, 150);
  doc.rect(serviceBoxX, detailsY, detailsBoxWidth, 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('SERVICE TYPE', serviceBoxX + 2, detailsY + 3);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(data.serviceType.charAt(0).toUpperCase() + data.serviceType.slice(1), serviceBoxX + 2, detailsY + 7);

  // Delivery box
  const deliveryBoxX = margin + 1 + detailsBoxWidth * 2;
  doc.setDrawColor(150, 150, 150);
  doc.rect(deliveryBoxX, detailsY, detailsBoxWidth, 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('EST. DELIVERY', deliveryBoxX + 2, detailsY + 3);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text(data.estimatedDelivery, deliveryBoxX + 2, detailsY + 7);

  yPosition = detailsY + 12;

  // SECTION DIVIDER
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(margin + 1, yPosition, pageWidth - margin - 1, yPosition);
  yPosition += 3;

  // IMPORTANT NOTES
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(200, 0, 0);
  doc.text('⚠ IMPORTANT:', margin + 2, yPosition);
  yPosition += 3;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(6);
  doc.text('• Verify all details before shipping', margin + 2, yPosition);
  yPosition += 2;
  doc.text('• Keep this label with shipment', margin + 2, yPosition);
  yPosition += 2;
  doc.text('• Do not fold or damage barcode', margin + 2, yPosition);
  yPosition += 3;

  // FOOTER - Professional
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(margin + 1, pageHeight - margin - 8, pageWidth - margin - 1, pageHeight - margin - 8);

  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text('Raphexpress International Shipping', margin + 2, pageHeight - margin - 5);
  doc.text('www.raphexpress.com | support@raphexpress.com', pageWidth - margin - 2, pageHeight - margin - 5, { align: 'right' });
  doc.text(`Label ID: ${data.trackingNumber}`, margin + 2, pageHeight - margin - 2);
  doc.text(new Date().toLocaleString(), pageWidth - margin - 2, pageHeight - margin - 2, { align: 'right' });

  // Save the PDF
  doc.save(`shipping-label-${data.trackingNumber}.pdf`);
};

// Generate a simple barcode representation (text-based)
export const generateBarcode = (text: string): string => {
  // This is a simple representation - in production, use a barcode library
  return text.split('').map(() => '*').join('');
};
