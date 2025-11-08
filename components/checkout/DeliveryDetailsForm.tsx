// components/checkout/DeliveryDetailsForm.tsx

'use client'; 

import React, { useState } from 'react';
import { DeliveryData } from '../../src/types/checkout';

interface DeliveryDetailsFormProps {
    onSubmit: (data: DeliveryData) => void;
    initialData: DeliveryData | null;
}

const initialFormState: DeliveryData = {
    deliveryMethod: 'pickup',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
};

const DeliveryDetailsForm: React.FC<DeliveryDetailsFormProps> = ({ onSubmit, initialData }) => {
    
    const [formData, setFormData] = useState<DeliveryData>(initialData || initialFormState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleMethodChange = (method: 'pickup' | 'delivery') => {
        setFormData(prev => ({
            ...prev,
            deliveryMethod: method,
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation (e.g., ensuring required contact info is present)
        if (!formData.firstName || !formData.email || !formData.phone) {
            alert("Please fill in all required contact information.");
            return;
        }

        // More complex validation for delivery method
        if (formData.deliveryMethod === 'delivery' && (!formData.address || !formData.city)) {
            alert("Please provide a complete delivery address.");
            return;
        }
        
        // Pass the valid data up to the parent component (CheckoutPage.tsx)
        onSubmit(formData);
    };

    const isDelivery = formData.deliveryMethod === 'delivery';

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">1. Delivery / Pickup Details</h2>

            {/* --- Fulfillment Method Selector --- */}
            <div className="flex space-x-4 mb-6">
                <button
                    type="button"
                    onClick={() => handleMethodChange('pickup')}
                    className={`flex-1 p-4 rounded-lg border-2 font-semibold transition-colors 
                        ${!isDelivery ? 'bg-teal-500 border-teal-700 text-white shadow-md' : 'bg-white border-gray-300 hover:bg-gray-100'}
                    `}
                >
                    📍 Pickup (Free)
                </button>
                <button
                    type="button"
                    onClick={() => handleMethodChange('delivery')}
                    className={`flex-1 p-4 rounded-lg border-2 font-semibold transition-colors 
                        ${isDelivery ? 'bg-teal-500 border-teal-700 text-white shadow-md' : 'bg-white border-gray-300 hover:bg-gray-100'}
                    `}
                >
                    🛵 Delivery (Fee Applies)
                </button>
            </div>

            {/* --- Contact Information (Always Required) --- */}
            <h3 className="text-xl font-semibold text-gray-700">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="firstName" placeholder="First Name *" required value={formData.firstName} onChange={handleChange} className="p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                <input type="text" name="lastName" placeholder="Last Name *" required value={formData.lastName} onChange={handleChange} className="p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                <input type="email" name="email" placeholder="Email Address *" required value={formData.email} onChange={handleChange} className="p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                <input type="tel" name="phone" placeholder="Phone Number *" required value={formData.phone} onChange={handleChange} className="p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500" />
            </div>

            {/* --- Delivery Address (Conditional) --- */}
            {isDelivery && (
                <>
                    <h3 className="text-xl font-semibold text-gray-700 pt-4">Shipping Address</h3>
                    <input type="text" name="address" placeholder="Street Address *" required={isDelivery} value={formData.address} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-pink-500 focus:border-pink-500" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="city" placeholder="City *" required={isDelivery} value={formData.city} onChange={handleChange} className="p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                        <input type="text" name="zipCode" placeholder="ZIP Code" value={formData.zipCode} onChange={handleChange} className="p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                    </div>
                </>
            )}
            
            {/* --- Pickup Info (Conditional) --- */}
            {!isDelivery && (
                <div className="p-4 bg-yellow-100 rounded-lg text-gray-700 mt-6">
                    <p className="font-semibold">Pickup Location:</p>
                    <p className="text-sm">123 Cake & Catch St, Lagos. You will receive an email with pickup instructions after payment.</p>
                </div>
            )}


            {/* --- Submission Button --- */}
            <div className="pt-6">
                <button
                    type="submit"
                    className="w-full py-4 text-xl font-bold rounded-full bg-teal-500 hover:bg-teal-600 text-white shadow-lg transition-colors"
                >
                    Continue to Payment
                </button>
            </div>
        </form>
    );
};

export default DeliveryDetailsForm;