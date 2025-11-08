// components/checkout/PaymentMethod.tsx

'use client'; 

import React, { useState } from 'react';

type PaymentOption = 'card' | 'transfer';

interface PaymentMethodProps {
    onSelect: (method: PaymentOption) => void;
    onBack: () => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ onSelect, onBack }) => {
    
    const [selectedMethod, setSelectedMethod] = useState<PaymentOption | null>(null);

    const handleContinue = () => {
        if (selectedMethod) {
            // Pass the selected method back to the parent CheckoutPage
            onSelect(selectedMethod);
        } else {
            alert("Please select a payment method to continue.");
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">2. Select Payment Method</h2>

            {/* --- Payment Options --- */}
            <div className="space-y-4">
                
                {/* Option 1: Card Payment */}
                <button
                    type="button"
                    onClick={() => setSelectedMethod('card')}
                    className={`w-full text-left p-5 rounded-lg border-2 transition-colors 
                        ${selectedMethod === 'card' 
                            ? 'bg-pink-100 border-pink-500 shadow-lg ring-4 ring-pink-200' 
                            : 'bg-white border-gray-300 hover:bg-gray-100'}
                    `}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold text-gray-800">
                            Credit/Debit Card
                        </span>
                        <span className="text-gray-500">
                            Visa, MasterCard, Verve
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Pay securely online using our integrated payment gateway.
                    </p>
                </button>

                {/* Option 2: Bank Transfer (Common for local businesses) */}
                <button
                    type="button"
                    onClick={() => setSelectedMethod('transfer')}
                    className={`w-full text-left p-5 rounded-lg border-2 transition-colors 
                        ${selectedMethod === 'transfer' 
                            ? 'bg-pink-100 border-pink-500 shadow-lg ring-4 ring-pink-200' 
                            : 'bg-white border-gray-300 hover:bg-gray-100'}
                    `}
                >
                    <div className="flex items-center justify-between">
                         <span className="text-xl font-semibold text-gray-800">
                            Bank Transfer
                        </span>
                        <span className="text-gray-500">
                            Manual confirmation required
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        We will provide account details on the confirmation screen. Order requires verification.
                    </p>
                </button>
                
            </div>
            
            {/* --- Navigation Buttons --- */}
            <div className="pt-6 flex justify-between items-center">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    &larr; Back to Details
                </button>
                
                <button
                    type="button"
                    onClick={handleContinue}
                    disabled={!selectedMethod}
                    className={`px-8 py-3 text-xl font-bold rounded-full transition-all duration-300
                        ${selectedMethod 
                            ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                    `}
                >
                    Continue to Confirmation
                </button>
            </div>
        </div>
    );
};

export default PaymentMethod;