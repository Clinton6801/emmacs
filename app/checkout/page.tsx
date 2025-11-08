// app/checkout/page.tsx

'use client'; 

import React, { useState } from 'react';
import { useCart } from '../../content/CartContext'; // To access order items
// NEW IMPORT: Bring in the shared types
import { DeliveryData, PaymentMethodType } from '../../src/types/checkout';
import ConfirmationForm from '../../components/checkout/CustomizationForm'; // Your component
import DeliveryDetailsForm from '../../components/checkout/DeliveryDetailsForm'; // Component for Step 1
import PaymentMethod from '../../components/checkout/PaymentMethod'; // Component for Step 2

// ----------------------------------------------------------------------
// 1. DATA STRUCTURES (Forms and Checkout State)
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// 2. MAIN CHECKOUT COMPONENT
// ----------------------------------------------------------------------

const STEPS = {
    DELIVERY: 1,
    PAYMENT: 2,
    CONFIRMATION: 3,
};

const CheckoutPage: React.FC = () => {
    const { cartItems } = useCart();
    const [currentStep, setCurrentStep] = useState(STEPS.DELIVERY);
    const [deliveryData, setDeliveryData] = useState<DeliveryData | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | null>(null);

    // --- Navigation Handlers ---
    const handleNextStep = () => {
        setCurrentStep(prev => prev + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    // --- Step 1 Submission ---
    const handleDeliverySubmit = (data: DeliveryData) => {
        setDeliveryData(data);
        handleNextStep();
    };

    // --- Step 2 Submission ---
    const handlePaymentSubmit = (method: 'card' | 'transfer') => {
        setPaymentMethod(method);
        handleNextStep();
    };
    
    // --- Step 3 Submission (Final Order Placement) ---
    const handleFinalOrder = () => {
        console.log("FINAL ORDER PLACED:", {
            items: cartItems,
            delivery: deliveryData,
            payment: paymentMethod
        });
        alert('Order placed successfully! (See console for details)');
        // TODO: Clear cart, redirect to Thank You page
    };

    // --- Simple Cart Validation ---
    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-gray-700">Your Cart is Empty</h1>
                <p className="text-gray-500 mt-3">Add some delicious treats before checking out!</p>
            </div>
        );
    }

    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-extrabold text-teal-700 mb-10 text-center">Checkout</h1>
                
                {/* --- Step Indicator --- */}
                <div className="flex justify-between items-center mb-10 text-center text-gray-600">
                    <div className={`flex-1 ${currentStep >= STEPS.DELIVERY ? 'text-teal-600 font-bold' : ''}`}>1. Details</div>
                    <div className={`flex-1 ${currentStep >= STEPS.PAYMENT ? 'text-teal-600 font-bold' : ''}`}>2. Payment</div>
                    <div className={`flex-1 ${currentStep >= STEPS.CONFIRMATION ? 'text-teal-600 font-bold' : ''}`}>3. Confirm & Pay</div>
                </div>

                {/* --- Step Content --- */}
                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    {/* Step 1: Delivery Details */}
                    {currentStep === STEPS.DELIVERY && (
                        <DeliveryDetailsForm 
                            onSubmit={handleDeliverySubmit} 
                            initialData={deliveryData}
                        />
                    )}

                    {/* Step 2: Payment Method Selection */}
                    {currentStep === STEPS.PAYMENT && (
                        <PaymentMethod 
                            onSelect={handlePaymentSubmit} 
                            onBack={handlePrevStep}
                        />
                    )}

                    {/* Step 3: Confirmation and Final Pay Button (Your component) */}
                    {currentStep === STEPS.CONFIRMATION && deliveryData && paymentMethod && (
                        <ConfirmationForm 
                            orderData={{ items: cartItems, delivery: deliveryData, payment: paymentMethod }}
                            onFinalConfirm={handleFinalOrder}
                            onBack={handlePrevStep}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;