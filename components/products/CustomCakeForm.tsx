// components/products/CustomCakeForm.tsx

'use client'; // MUST be a client component for state and event handlers

import React, { useState, useMemo } from 'react';
import { CustomizableProduct, OptionGroup, Choice } from '../../src/types/product';
import { ScheduleConfig } from '../../src/types/schedule';
import DatePicker from './DatePicker'; // Needs to be created next
import { useCart } from '../../content/CartContext'; // Use the cart context

interface CustomCakeFormProps {
  product: CustomizableProduct;
  scheduleConfig: ScheduleConfig;
}

const CustomCakeForm: React.FC<CustomCakeFormProps> = ({ product, scheduleConfig }) => {
  // State to hold the user's current selections for size, flavor, etc.
  // Key: groupKey (e.g., 'size'), Value: choiceId(s) or text
  const [selections, setSelections] = useState<Record<string, string | string[]>>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get the cart functions (placeholder usage for now)
  const { addToCart } = useCart(); 
  
  // --- 1. Dynamic Price Calculation Logic ---
  const finalPrice = useMemo(() => {
    let price = product.basePrice;

    product.customizationGroups.forEach(group => {
      const selection = selections[group.groupKey];

      if (group.type === 'text-input' && typeof selection === 'string' && selection.trim().length > 0) {
        // Add flat fee for inscription if text is entered
        price += group.priceAdjustment || 0;
      } else if (group.choices && selection) {
        // Handle single-select
        if (typeof selection === 'string') {
          const selectedChoice = group.choices.find(c => c.choiceId === selection);
          price += selectedChoice ? selectedChoice.priceAdjustment : 0;
        } 
        // Handle multi-select (not fully implemented in this example but structure is ready)
        // else if (Array.isArray(selection)) { ... }
      }
    });
    return price;
  }, [selections, product]);
  
  // --- 2. Input Change Handler ---
  const handleSelectionChange = (groupKey: string, value: string) => {
    setSelections(prev => ({
      ...prev,
      [groupKey]: value,
    }));
  };
  
  // --- 3. Validation Check ---
  const isFormValid = useMemo(() => {
    // Check if all mandatory fields have a selection
    const allMandatorySelected = product.customizationGroups.every(group => {
      if (!group.isMandatory) return true;
      const selection = selections[group.groupKey];
      return selection !== undefined && selection !== null && (typeof selection !== 'string' || selection.trim() !== '');
    });
    
    // Check if a delivery/pickup date is selected
    const isDateSelected = selectedDate !== null;
    
    return allMandatorySelected && isDateSelected;
  }, [selections, selectedDate, product.customizationGroups]);

  // --- 4. Submission Logic ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please complete all required selections and choose a date.");
      return;
    }
    
    const orderItem = {
      productSlug: product.slug,
      productName: product.name,
      finalPrice: finalPrice,
      selections: selections,
      schedule: selectedDate,
      // ... other necessary data
    };
    
    // Placeholder for actual cart addition
    console.log("Adding to cart:", orderItem);
    // addToCart(orderItem); 
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-6 bg-gray-50 rounded-xl shadow-inner">
      <h2 className="text-2xl font-bold text-pink-600 border-b pb-2">Customize Your Order</h2>

      {/* --- Dynamic Customization Options --- */}
      {product.customizationGroups.map((group) => (
        <div key={group.groupKey} className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            {group.groupLabel} {group.isMandatory && <span className="text-red-500">*</span>}
          </h3>

          {/* Render based on group type */}
          {group.type === 'single-select' && group.choices && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.choices.map((choice: Choice) => (
                <label key={choice.choiceId} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 
                  ${selections[group.groupKey] === choice.choiceId ? 'bg-pink-100 border-pink-500 shadow-md' : 'bg-white hover:bg-gray-100'}`}
                >
                  <input
                    type="radio"
                    name={group.groupKey}
                    value={choice.choiceId}
                    checked={selections[group.groupKey] === choice.choiceId}
                    onChange={() => handleSelectionChange(group.groupKey, choice.choiceId)}
                    className="mr-3 accent-pink-500"
                  />
                  <div>
                    <span className="font-medium">{choice.label}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {choice.priceAdjustment > 0 ? `(+$${choice.priceAdjustment.toFixed(2)})` : ''}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          )}

          {group.type === 'text-input' && (
            <input
              type="text"
              placeholder={`Enter your message (Max ${group.maxLength} characters)`}
              maxLength={group.maxLength}
              onChange={(e) => handleSelectionChange(group.groupKey, e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
            />
          )}
        </div>
      ))}
      
      {/* --- Scheduling Component --- */}
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">3. Select Pickup/Delivery Date & Time <span className="text-red-500">*</span></h3>
        {/* DatePicker Component will handle the visual logic */}
        <DatePicker 
            scheduleConfig={scheduleConfig} 
            onDateSelect={setSelectedDate} 
        />
      </div>


      {/* --- Summary and Add to Cart --- */}
      <div className="pt-4 sticky bottom-0 bg-white shadow-2xl rounded-lg p-4 flex justify-between items-center">
        <div className="text-left">
          <p className="text-xl text-gray-500 font-medium">Estimated Price</p>
          <p className="text-4xl font-extrabold text-teal-700">${finalPrice.toFixed(2)}</p>
        </div>
        
        <button
          type="submit"
          disabled={!isFormValid}
          className={`px-10 py-4 text-xl font-bold rounded-full transition-all duration-300
            ${isFormValid ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          {isFormValid ? 'Add Custom Order to Cart' : 'Complete Selections'}
        </button>
      </div>
    </form>
  );
};

export default CustomCakeForm;