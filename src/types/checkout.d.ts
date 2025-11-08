// src/types/checkout.d.ts

// Interface for collecting user/delivery details (Step 1)
export interface DeliveryData {
    deliveryMethod: 'pickup' | 'delivery';
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
}

// Type for the selected payment method (Step 2)
export type PaymentMethodType = 'card' | 'transfer';