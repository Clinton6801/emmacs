// components/checkout/ConfirmationForm.tsx

'use client'; 

import React from 'react';

// Use interfaces from CheckoutPage to define props
interface ConfirmationFormProps {
    orderData: {
        items: any[]; // Placeholder for full cart items
        delivery: {
            deliveryMethod: 'pickup' | 'delivery';
            firstName: string;
            address?: string;
            lastName: string;
            email: string;
            city: string;

            // ... all other delivery fields
        };
        payment: 'card' | 'transfer';
    };
    onFinalConfirm: () => void;
    onBack: () => void;
}

const ConfirmationForm: React.FC<ConfirmationFormProps> = ({ orderData, onFinalConfirm, onBack }) => {
    const { items, delivery, payment } = orderData;
    
    // Calculate total price (Simplified)
    const subtotal = items.reduce((sum, item) => sum + (item.finalPrice || 0), 0);
    const deliveryFee = delivery.deliveryMethod === 'delivery' ? 5.00 : 0.00;
    const finalTotal = subtotal + deliveryFee;

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">3. Confirm & Place Order</h2>

            {/* --- 3.1 Order Summary --- */}
            <div className="border rounded-lg p-4 bg-yellow-50">
                <h3 className="text-xl font-semibold mb-3 text-gray-700">Order Summary ({items.length} items)</h3>
                
                {items.map((item, index) => (
                    <div key={index} className="flex justify-between border-b last:border-b-0 py-2 text-sm">
                        <span className="text-gray-600">{item.productName} ({item.variant || item.selections.size})</span>
                        <span className="font-medium">${(item.finalPrice || 0).toFixed(2)}</span>
                    </div>
                ))}

                {/* --- Pricing Breakdown --- */}
                <div className="mt-4 pt-3 border-t border-gray-200 space-y-2">
                    <div className="flex justify-between text-base">
                        <span>Subtotal:</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base">
                        <span>Delivery Fee:</span>
                        <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-teal-700 pt-2 border-t">
                        <span>Grand Total:</span>
                        <span>${finalTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* --- 3.2 Delivery/Pickup Summary --- */}
            <div className="border rounded-lg p-4 bg-white shadow">
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                    {delivery.deliveryMethod === 'delivery' ? 'Delivery Details' : 'Pickup Details'}
                </h3>
                <p className="text-gray-600">Name: {delivery.firstName} {delivery.lastName}</p>
                <p className="text-gray-600">Email: {delivery.email}</p>
                {delivery.deliveryMethod === 'delivery' && (
                    <p className="text-gray-600">Address: {delivery.address}, {delivery.city}</p>
                )}
                <p className="text-gray-600 font-semibold mt-2">
                    Schedule: {new Date(items[0].schedule).toLocaleDateString()} at {new Date(items[0].schedule).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>

            {/* --- 3.3 Payment and Actions --- */}
            <div className="pt-4 flex justify-between items-center">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    &larr; Back to Payment
                </button>
                
                <button
                    type="button"
                    onClick={onFinalConfirm}
                    className="px-8 py-3 text-xl font-bold rounded-full bg-pink-600 hover:bg-pink-700 text-white shadow-lg transition-all"
                >
                    Pay ${finalTotal.toFixed(2)} Now
                </button>
            </div>
        </div>
    );
};

export default ConfirmationForm;