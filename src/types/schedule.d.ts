// src/types/schedule.d.ts

// ====================================================================
// 1. Daily Operating Hours Configuration (The Rules)
// ====================================================================

/**
 * Defines the business's standard operating hours and lead time requirements.
 * This is used to generate the available dates and slots.
 */
export interface ScheduleConfig {
    // The main time frame for accepting pickups/deliveries
    defaultWindow: {
        startTime: string; // e.g., "09:00" (HH:mm format)
        endTime: string;   // e.g., "17:00" 
    };
    
    // The interval between available time slots
    slotDurationMinutes: number; // e.g., 30 (for slots at :00 and :30)
    
    // The minimum time required between placing an order and fulfillment
    minLeadTimeHours: number; // e.g., 24 (must order 24 hours in advance)
    
    // Specific exceptions for certain days of the week (e.g., closing early Friday)
    dayExceptions: {
        dayOfWeek: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
        isClosed: boolean;
        customStartTime?: string; 
        customEndTime?: string;   
    }[];
}

// ====================================================================
// 2. Capacity Management and Blackouts (The Limits)
// ====================================================================

/**
 * Defines capacity limits and manual blackout dates to prevent overbooking.
 */
export interface CapacityLimit {
    date: string; // The specific date (e.g., "2025-12-24")
    
    // The maximum total number of orders the kitchen can handle on this date
    maxOrders: number; 
    
    // A manual flag to block all orders for a special event or holiday
    isBlackoutDay: boolean; 
    
    // Optional: Capacity can be set by specific time slots for finer control
    timeSlotCapacity?: {
        timeSlot: string; // e.g., "12:00"
        limit: number;    // e.g., only 5 orders can be picked up at 12:00
        bookedCount: number; // How many orders are already booked for this slot
    }[];
}