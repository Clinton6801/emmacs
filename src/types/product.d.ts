// src/types/product.d.ts

// ====================================================================
// A. CORE PRODUCT INTERFACES (Used by both Catfish and Cakes)
// ====================================================================

/**
 * Defines the common structure for any product in the store.
 */
export interface BaseProduct {
    _id: string; // Database ID
    name: string;
    slug: string; // URL slug (e.g., 'fresh-catfish' or 'signature-red-velvet')
    description: string;
    category: 'Cakes' | 'Doughnuts' | 'MeatPies' | 'Catfish';
    imageUrls: string[]; 
    basePrice: number; // Starting price for customizable, final price for standard
    isCustomizable: boolean;
}

// ====================================================================
// B. CUSTOMIZABLE PRODUCT SCHEMA (CAKES/PIES)
// ====================================================================

/**
 * Defines a single choice within a customization group.
 */
export interface Choice {
    choiceId: string; // Unique ID (e.g., 'size_8in')
    label: string; // Display name (e.g., "8-Inch Round (Serves 12)")
    priceAdjustment: number; // The additional cost for this choice (e.g., 15.00)
}

/**
 * Defines a group of customization options (e.g., Size, Flavor, Inscription).
 */
export interface OptionGroup {
    groupKey: string; // Unique key for the group (e.g., 'size', 'flavor')
    groupLabel: string; // Display name (e.g., "Select Your Cake Size")
    type: 'single-select' | 'multi-select' | 'text-input'; 
    isMandatory: boolean; 
    
    // For single/multi-select types
    choices?: Choice[];
    
    // For text-input types (e.g., Inscription)
    maxLength?: number;
    priceAdjustment?: number; // Flat fee for adding a text input (e.g., $2.00)
}

/**
 * The full structure for a complex, customizable product like a Cake.
 */
export interface CustomizableProduct extends BaseProduct {
    isCustomizable: true;
    customizationGroups: OptionGroup[];
    // Add logic like lead time requirements here if needed
    minLeadTimeHours: number; // e.g., 48 hours for a custom cake
}


// ====================================================================
// C. STANDARD INVENTORY PRODUCT SCHEMA (CATFISH)
// ====================================================================

/**
 * Defines a simple, standard inventory product like Catfish.
 */
export interface StandardProduct extends BaseProduct {
    isCustomizable: false;
    
    // Options are simpler, typically relating to weight or preparation
    standardOptions: {
        optionKey: string; // e.g., 'weight' or 'prep'
        optionLabel: string;
        // Allows simple quantity/weight-based selection
        variants: {
            variantId: string;
            label: string; // e.g., "1 Kg" or "Smoked"
            price: number; // Final price for this variant
            stock: number; // Inventory tracking
        }[];
    }
}