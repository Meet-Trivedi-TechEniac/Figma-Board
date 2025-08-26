/**
 * Time Controller - Handles time logic and coordinates between model and view
 */
class TimeController {
    constructor(timeModel, timeView) {
        this.model = timeModel;
        this.view = timeView;
        this.isInitialized = false;
    }

    /**
     * Initialize the time controller
     */
    init() {
        if (this.isInitialized) return;
        
        this.view.init();
        this.subscribeToModel();
        
        this.isInitialized = true;
    }

    /**
     * Subscribe to model changes
     */
    subscribeToModel() {
        this.model.subscribe((state) => {
            this.handleTimeChange(state);
        });
    }

    /**
     * Handle time state changes
     */
    handleTimeChange(timeState) {
        // Notify other components about time changes
        this.notifyTimeChange(timeState);
        
        // Log time changes for debugging
        console.log('Time state changed:', timeState);
    }

    /**
     * Set start time
     */
    setStartTime(time) {
        this.model.setStartTime(time);
    }

    /**
     * Set end time
     */
    setEndTime(time) {
        this.model.setEndTime(time);
    }

    /**
     * Get start time
     */
    getStartTime() {
        return this.model.getStartTime();
    }

    /**
     * Get end time
     */
    getEndTime() {
        return this.model.getEndTime();
    }

    /**
     * Get time state
     */
    getTimeState() {
        return this.model.getState();
    }

    /**
     * Reset to default times
     */
    resetToDefault() {
        this.model.resetToDefault();
    }

    /**
     * Validate time range
     */
    validateTimeRange() {
        const isValid = this.model.validateTimeRange(this.model.getStartTime(), this.model.getEndTime());
        
        if (!isValid) {
            this.view.showValidationError('End time must be after start time');
        } else {
            this.view.clearValidationError();
        }
        
        return isValid;
    }

    /**
     * Get time range in minutes
     */
    getTimeRangeInMinutes() {
        return this.model.getTimeRangeInMinutes();
    }

    /**
     * Get time range in hours
     */
    getTimeRangeInHours() {
        return this.model.getTimeRangeInMinutes() / 60;
    }

    /**
     * Format time for display
     */
    formatTimeForDisplay(timeString) {
        return this.view.formatTimeForDisplay(timeString);
    }

    /**
     * Enable time inputs
     */
    enable() {
        this.view.enable();
    }

    /**
     * Disable time inputs
     */
    disable() {
        this.view.disable();
    }

    /**
     * Get time picker configuration
     */
    getTimePickerConfig() {
        return this.model.getTimePickerConfig();
    }

    /**
     * Get end time picker configuration
     */
    getEndTimePickerConfig() {
        return this.model.getEndTimePickerConfig();
    }

    /**
     * Check if time is within business hours
     */
    isWithinBusinessHours(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const timeInMinutes = hours * 60 + minutes;
        
        // Business hours: 8:00 AM to 6:00 PM (480 to 1080 minutes)
        return timeInMinutes >= 480 && timeInMinutes <= 1080;
    }

    /**
     * Get business hours
     */
    getBusinessHours() {
        return {
            start: '08:00:00',
            end: '18:00:00'
        };
    }

    /**
     * Validate business hours
     */
    validateBusinessHours() {
        const startTime = this.model.getStartTime();
        const endTime = this.model.getEndTime();
        
        const startValid = this.isWithinBusinessHours(startTime);
        const endValid = this.isWithinBusinessHours(endTime);
        
        if (!startValid || !endValid) {
            this.view.showValidationError('Times must be within business hours (8:00 AM - 6:00 PM)');
            return false;
        }
        
        this.view.clearValidationError();
        return true;
    }

    /**
     * Set business hours
     */
    setBusinessHours(startTime, endTime) {
        this.model.updateState({
            startTime: this.model.formatTo24HourTime(startTime),
            endTime: this.model.formatTo24HourTime(endTime)
        });
    }

    /**
     * Get time slots for a given interval
     */
    getTimeSlots(intervalMinutes = 30) {
        const startTime = this.model.getStartTime();
        const endTime = this.model.getEndTime();
        
        const slots = [];
        const start = this.model.parseTime(startTime);
        const end = this.model.parseTime(endTime);
        
        for (let time = start; time < end; time += intervalMinutes) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
            slots.push(timeString);
        }
        
        return slots;
    }

    /**
     * Check if a time conflicts with existing events
     */
    checkTimeConflict(newStartTime, newEndTime, existingEvents) {
        const newStart = this.model.parseTime(newStartTime);
        const newEnd = this.model.parseTime(newEndTime);
        
        return existingEvents.some(event => {
            const eventStart = this.model.parseTime(event.start);
            const eventEnd = this.model.parseTime(event.end);
            
            // Check for overlap
            return (newStart < eventEnd && newEnd > eventStart);
        });
    }

    /**
     * Get available time slots
     */
    getAvailableTimeSlots(existingEvents, intervalMinutes = 30) {
        const allSlots = this.getTimeSlots(intervalMinutes);
        const availableSlots = [];
        
        for (let i = 0; i < allSlots.length - 1; i++) {
            const slotStart = allSlots[i];
            const slotEnd = allSlots[i + 1];
            
            const hasConflict = this.checkTimeConflict(slotStart, slotEnd, existingEvents);
            
            if (!hasConflict) {
                availableSlots.push({
                    start: slotStart,
                    end: slotEnd
                });
            }
        }
        
        return availableSlots;
    }

    // Observer pattern for time changes
    observers = [];

    /**
     * Subscribe to time changes
     */
    subscribeToTimeChanges(callback) {
        this.observers.push(callback);
    }

    /**
     * Unsubscribe from time changes
     */
    unsubscribeFromTimeChanges(callback) {
        this.observers = this.observers.filter(obs => obs !== callback);
    }

    /**
     * Notify observers of time changes
     */
    notifyTimeChange(timeState) {
        this.observers.forEach(callback => {
            try {
                callback(timeState);
            } catch (error) {
                console.error('Error in time change observer:', error);
            }
        });
    }

    /**
     * Destroy the controller
     */
    destroy() {
        if (this.view) {
            this.view.destroy();
        }
        
        this.observers = [];
        this.isInitialized = false;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeController;
} else {
    window.TimeController = TimeController;
}
