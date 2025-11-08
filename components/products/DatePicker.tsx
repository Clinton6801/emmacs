// components/products/DatePicker.tsx

'use client'; // Required for state and interaction

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ScheduleConfig, CapacityLimit } from '../../src/types/schedule';
import { getCapacityForDate, mockScheduleConfig } from '../../src/lib/data'; // Import data/mocks

interface DatePickerProps {
    scheduleConfig: ScheduleConfig;
    onDateSelect: (date: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ scheduleConfig, onDateSelect }) => {
    // We would typically use a library like react-day-picker, but we'll use a simple list of selectable dates here
    const [selectedDateString, setSelectedDateString] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [capacityData, setCapacityData] = useState<CapacityLimit | undefined>(undefined);

    const now = useMemo(() => new Date(), []);
    const minOrderDate = useMemo(() => {
        const d = new Date(now.getTime() + scheduleConfig.minLeadTimeHours * 60 * 60 * 1000);
        // Normalize to start of day for cleaner calculation
        d.setHours(0, 0, 0, 0); 
        return d;
    }, [scheduleConfig.minLeadTimeHours, now]);
    
    // --- 1. Fetch Capacity Data for Selected Day ---
    useEffect(() => {
        if (selectedDateString) {
            // In a real application, this would be an API call, but we use the mock function
            const capacity = getCapacityForDate(selectedDateString);
            setCapacityData(capacity);
        } else {
            setCapacityData(undefined);
        }
        // Reset time selection when date changes
        setSelectedTime(null);
    }, [selectedDateString]);


    // --- 2. Generate and Filter Available Time Slots ---
    const availableTimeSlots = useMemo(() => {
        if (!selectedDateString) return [];

        const slots: string[] = [];
        const [startHour, startMinute] = scheduleConfig.defaultWindow.startTime.split(':').map(Number);
        const [endHour, endMinute] = scheduleConfig.defaultWindow.endTime.split(':').map(Number);
        
        let currentMinutes = startHour * 60 + startMinute;
        const endMinutes = endHour * 60 + endMinute;

        while (currentMinutes < endMinutes) {
            const hour = Math.floor(currentMinutes / 60);
            const minute = currentMinutes % 60;
            const timeSlot = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            
            // Check Capacity (Simplified: if slot is in mock data and bookedCount equals limit, block it)
            const slotCapacity = capacityData?.timeSlotCapacity?.find(t => t.timeSlot === timeSlot);
            const isBookedOut = slotCapacity && slotCapacity.bookedCount >= slotCapacity.limit;

            if (!isBookedOut) {
                slots.push(timeSlot);
            }

            currentMinutes += scheduleConfig.slotDurationMinutes;
        }

        return slots;
    }, [selectedDateString, scheduleConfig.defaultWindow, scheduleConfig.slotDurationMinutes, capacityData]);

    // --- 3. Update Parent Component ---
    useEffect(() => {
        if (selectedDateString && selectedTime) {
            // Combine date and time into a single Date object to send to the cart
            const [year, month, day] = selectedDateString.split('-').map(Number);
            const [hour, minute] = selectedTime.split(':').map(Number);
            const finalDate = new Date(year, month - 1, day, hour, minute); // month is 0-indexed
            onDateSelect(finalDate);
        } else {
            onDateSelect(null);
        }
    }, [selectedDateString, selectedTime, onDateSelect]);
    
    
    // --- 4. Simplified Date Picker (Mocking a 7-day view) ---
    const selectableDays = useMemo(() => {
        const days: { date: Date, dateString: string, isSelectable: boolean }[] = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(minOrderDate);
            date.setDate(minOrderDate.getDate() + i);
            
            const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
            const dayOfWeek = date.toLocaleString('en-us', { weekday: 'long' });
            const isClosed = scheduleConfig.dayExceptions.some(e => e.dayOfWeek === dayOfWeek && e.isClosed);
            const isBlackout = getCapacityForDate(dateString)?.isBlackoutDay || false;
            
            days.push({ date, dateString, isSelectable: !isClosed && !isBlackout });
        }
        return days;
    }, [minOrderDate, scheduleConfig.dayExceptions]);


    return (
        <div className="space-y-6">
            <p className="text-sm text-gray-500">
                Minimum lead time is **{scheduleConfig.minLeadTimeHours} hours**.
            </p>
            
            {/* Date Selection */}
            <div>
                <h4 className="font-medium mb-2">Select Date:</h4>
                <div className="flex space-x-3 overflow-x-auto pb-2">
                    {selectableDays.map(({ date, dateString, isSelectable }) => (
                        <button
                            key={dateString}
                            type="button"
                            disabled={!isSelectable}
                            onClick={() => setSelectedDateString(dateString)}
                            className={`p-3 rounded-lg flex-shrink-0 w-24 text-center border-2 transition-colors
                                ${selectedDateString === dateString 
                                    ? 'bg-teal-500 border-teal-700 text-white shadow-lg' 
                                    : 'bg-white border-gray-200 hover:bg-gray-100'
                                }
                                ${!isSelectable && 'bg-red-100 border-red-300 text-gray-400 cursor-not-allowed'}
                            `}
                        >
                            <span className="block text-sm font-semibold">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                            <span className="block text-xl font-bold">{date.getDate()}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Time Slot Selection */}
            {selectedDateString && (
                <div>
                    <h4 className="font-medium mb-2">Select Time Slot:</h4>
                    {capacityData?.isBlackoutDay ? (
                        <p className="text-red-600 font-semibold">This date is fully booked or a holiday blackout.</p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {availableTimeSlots.length > 0 ? (
                                availableTimeSlots.map(time => (
                                    <button
                                        key={time}
                                        type="button"
                                        onClick={() => setSelectedTime(time)}
                                        className={`px-4 py-2 rounded-full border transition-colors text-sm font-medium
                                            ${selectedTime === time 
                                                ? 'bg-pink-500 border-pink-700 text-white shadow-md' 
                                                : 'bg-white border-gray-300 hover:bg-pink-50'
                                            }
                                        `}
                                    >
                                        {time}
                                    </button>
                                ))
                            ) : (
                                <p className="text-gray-500">No available slots for this date.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DatePicker;