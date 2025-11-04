import { useState, useEffect } from 'react';

export type OrderType = 'international' | 'local';

export interface AddressData {
  name: string;
  phone1: string;
  phone2: string;
  email: string;
  country: string;
  state: string;
  city: string;
  address: string;
  apt: string;
  taxId: string;
}

export interface PackageData {
  goodsType: string;
  otherGoodsDescription: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  dimensionUnit: 'mm' | 'cm' | 'm';
  quantity: string;
}

export interface ShippingData {
  shippingMethod: 'air' | 'sea';
  isFullContainer: boolean;
  containerType: '' | '20ft Container' | '40ft Container' | '45ft Container';
  goodsValue: string;
  customsClearance: boolean;
  insurance: boolean;
}

export interface ValidationErrors {
  [key: string]: string;
}

const initialAddress: AddressData = {
  name: '',
  phone1: '',
  phone2: '',
  email: '',
  country: '',
  state: '',
  city: '',
  address: '',
  apt: '',
  taxId: '',
};

const initialPackage: PackageData = {
  goodsType: '',
  otherGoodsDescription: '',
  weight: '',
  length: '',
  width: '',
  height: '',
  dimensionUnit: 'cm',
  quantity: '1',
};

const initialShipping: ShippingData = {
  shippingMethod: 'sea',
  isFullContainer: false,
  containerType: '',
  goodsValue: '',
  customsClearance: false,
  insurance: false,
};

export const useOrderForm = (orderType: OrderType) => {
  const [fromAddress, setFromAddress] = useState<AddressData>(initialAddress);
  const [toAddress, setToAddress] = useState<AddressData>(initialAddress);
  const [packageDetails, setPackageDetails] = useState<PackageData>(initialPackage);
  const [shippingOptions, setShippingOptions] = useState<ShippingData>(initialShipping);
  const [cbm, setCbm] = useState('0.00');
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Calculate CBM when dimensions change
  useEffect(() => {
    const { length, width, height, dimensionUnit } = packageDetails;
    if (length && width && height) {
      let l = parseFloat(length);
      let w = parseFloat(width);
      let h = parseFloat(height);

      // Convert to meters
      if (dimensionUnit === 'mm') {
        l = l / 1000;
        w = w / 1000;
        h = h / 1000;
      } else if (dimensionUnit === 'cm') {
        l = l / 100;
        w = w / 100;
        h = h / 100;
      }

      const calculatedCbm = l * w * h;
      setCbm(calculatedCbm.toFixed(4));
    } else {
      setCbm('0.00');
    }
  }, [packageDetails.length, packageDetails.width, packageDetails.height, packageDetails.dimensionUnit]);

  // Validation Functions
  const validateStep1 = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!fromAddress.name.trim()) newErrors.fromName = 'Name is required';
    if (!fromAddress.phone1.trim()) newErrors.fromPhone1 = 'Phone is required';
    if (!fromAddress.email.trim()) {
      newErrors.fromEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(fromAddress.email)) {
      newErrors.fromEmail = 'Email is invalid';
    }
    if (!fromAddress.country.trim()) newErrors.fromCountry = 'Country is required';
    if (!fromAddress.state.trim()) newErrors.fromState = 'State is required';
    if (!fromAddress.city.trim()) newErrors.fromCity = 'City is required';
    if (!fromAddress.address.trim()) newErrors.fromAddress = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!toAddress.name.trim()) newErrors.toName = 'Name is required';
    if (!toAddress.phone1.trim()) newErrors.toPhone1 = 'Phone is required';
    if (!toAddress.email.trim()) {
      newErrors.toEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(toAddress.email)) {
      newErrors.toEmail = 'Email is invalid';
    }
    if (!toAddress.country.trim()) newErrors.toCountry = 'Country is required';
    if (!toAddress.state.trim()) newErrors.toState = 'State is required';
    if (!toAddress.city.trim()) newErrors.toCity = 'City is required';
    if (!toAddress.address.trim()) newErrors.toAddress = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!packageDetails.goodsType.trim()) newErrors.goodsType = 'Goods type is required';
    if (packageDetails.goodsType === 'Other' && !packageDetails.otherGoodsDescription.trim()) {
      newErrors.otherGoods = 'Please describe the goods';
    }
    if (!packageDetails.weight.trim()) newErrors.weight = 'Weight is required';
    if (!packageDetails.length.trim()) newErrors.length = 'Length is required';
    if (!packageDetails.width.trim()) newErrors.width = 'Width is required';
    if (!packageDetails.height.trim()) newErrors.height = 'Height is required';
    if (!packageDetails.quantity.trim()) newErrors.quantity = 'Quantity is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (shippingOptions.isFullContainer && !shippingOptions.containerType) {
      newErrors.containerType = 'Please select a container type';
    }
    if (!shippingOptions.goodsValue.trim()) newErrors.goodsValue = 'Goods value is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      case 3:
        return validateStep3();
      case 4:
        return validateStep4();
      default:
        return true;
    }
  };

  const getOrderData = () => ({
    orderType,
    fromAddress,
    toAddress,
    packageDetails,
    shippingOptions,
    cbm,
    createdAt: new Date().toISOString(),
  });

  return {
    fromAddress,
    setFromAddress,
    toAddress,
    setToAddress,
    packageDetails,
    setPackageDetails,
    shippingOptions,
    setShippingOptions,
    cbm,
    errors,
    setErrors,
    validateStep,
    getOrderData,
  };
};
