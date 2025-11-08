// src/lib/data.ts (Mock Data Source)

import { CustomizableProduct, StandardProduct } from '../types/product';
import { ScheduleConfig , CapacityLimit } from '../types/schedule';

// Mock Data for a Custom Cake
const mockCake: CustomizableProduct = {
    _id: "cake_choc101",
    name: "Signature Chocolate Delight",
    slug: "signature-chocolate-delight",
    description: "Rich, moist chocolate cake with your choice of filling and inscription.",
    basePrice: 25.00,
    category: "Cakes",
    imageUrls: ["/images/cake-product-1.jpg"],
    isCustomizable: true,
    minLeadTimeHours: 48,
    customizationGroups: [
        { groupKey: "size", groupLabel: "1. Select Your Cake Size", type: "single-select", isMandatory: true,
            choices: [
                { choiceId: 'size_6in', label: '6-Inch Round', priceAdjustment: 0.00 },
                { choiceId: 'size_8in', label: '8-Inch Round', priceAdjustment: 15.00 },
                { choiceId: 'size_2tier', label: 'Two-Tier Special', priceAdjustment: 55.00 }
            ]
        },
        { groupKey: "inscription", groupLabel: "2. Personalized Message (Optional)", type: "text-input", isMandatory: false, maxLength: 50, priceAdjustment: 2.00 }
    ]
};

// Mock Data for a Standard Catfish Product
const mockCatfish: StandardProduct = {
    _id: "catfish_fresh202",
    name: "Premium Whole Catfish (Fresh)",
    slug: "fresh-catfish",
    description: "Locally sourced, fresh Catfish. Perfect for grilling or soup.",
    basePrice: 12.50,
    category: "Catfish",
    imageUrls: ["/images/catfish-product-1.jpg"],
    isCustomizable: false,
    standardOptions: {
        optionKey: 'weight',
        optionLabel: 'Select Weight/Preparation',
        variants: [
            { variantId: 'w_1kg', label: '1 Kg (Fresh)', price: 12.50, stock: 50 },
            { variantId: 'w_2kg', label: '2 Kg (Fresh)', price: 25.00, stock: 20 },
            { variantId: 'w_1kg_smoked', label: '1 Kg (Smoked)', price: 15.00, stock: 15 },
        ]
    }
};

// Mock function to simulate fetching data based on the slug
export async function getProductBySlug(slug: string) {
    if (slug === 'signature-chocolate-delight') {
        return mockCake;
    }
    if (slug === 'fresh-catfish') {
        return mockCatfish;
    }

    // Handle the old "cakes" and "catfish" slugs as redirects for a clean future transition
    if (slug === 'cakes') { // Keep this temporarily for the link you clicked
        return mockCake;
    }
    if (slug === 'catfish') {
        return mockCatfish;
    }
    return null; // Return null if product not found
}


// src/lib/data.ts (Updated for Scheduling Mock)

// ... existing product mocks ...

// Mock Capacity Data
const mockCapacity: CapacityLimit[] = [
    { date: "2025-11-15", maxOrders: 5, isBlackoutDay: false, timeSlotCapacity: [
        { timeSlot: "12:00", limit: 1, bookedCount: 1 }, // Fully booked slot
        { timeSlot: "14:00", limit: 3, bookedCount: 2 }
    ]},
    { date: "2025-11-16", maxOrders: 10, isBlackoutDay: true }, // Example Blackout Day
    // Note: Use a date in the future relative to the user's current date when testing!
];

/**
 * Simulates fetching capacity data for a specific date.
 */
export function getCapacityForDate(date: string): CapacityLimit | undefined {
    return mockCapacity.find(c => c.date === date);
}

// Export the mock ScheduleConfig defined previously
export const mockScheduleConfig: ScheduleConfig = {
    defaultWindow: { startTime: "09:00", endTime: "17:00" },
    slotDurationMinutes: 60, // Slots every hour for simplicity (9:00, 10:00, etc.)
    minLeadTimeHours: 48, // Must order 2 days in advance
    dayExceptions: [{ dayOfWeek: 'Sunday', isClosed: true }]
};