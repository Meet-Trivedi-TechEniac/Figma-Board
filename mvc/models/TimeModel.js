/**
 * Time Model - Manages time settings and state
 */
class TimeModel {
    constructor() {
        this.state = {
            startTime: "08:00:00",
            endTime: "16:00:00",
            timeFormat: "h:mm p",
            interval: 30
        };
        
        this.defaultSettings = {
            startTime: "08:00:00",
            endTime: "16:00:00",
            timeFormat: "h:mm p",
            interval: 30,
            startTimeDefault: "08",
            endTimeDefault: "16",
            maxTime: "4:00pm"
        };
    }

    /**
     * Get current time state
     */
    getState() {
        return { ...this.state };
    }

    /**
     * Update time state
     */
    updateState(newState) {
        this.state = { ...this.state, ...newState };
        this.notifyStateChange();
    }

    /**
     * Set start time
     */
    setStartTime(time) {
        this.state.startTime = this.formatTo24HourTime(time);
        this.notifyStateChange();
    }

    /**
     * Set end time
     */
    setEndTime(time) {
        this.state.endTime = this.formatTo24HourTime(time);
        this.notifyStateChange();
    }

    /**
     * Get start time
     */
    getStartTime() {
        return this.state.startTime;
    }

    /**
     * Get end time
     */
    getEndTime() {
        return this.state.endTime;
    }

    /**
     * Reset to default times
     */
    resetToDefault() {
        this.state = { ...this.defaultSettings };
        this.notifyStateChange();
    }

    /**
     * Format time to 24-hour format
     */
    formatTo24HourTime(dateObj) {
        if (typeof dateObj === 'string') {
            return dateObj;
        }
        
        const pad = (n) => String(n).padStart(2, "0");
        const hours = pad(dateObj.getHours());
        const minutes = pad(dateObj.getMinutes());
        const seconds = pad(dateObj.getSeconds());
        return `${hours}:${minutes}:${seconds}`;
    }

    /**
     * Get time picker configuration
     */
    getTimePickerConfig() {
        return {
            timeFormat: this.state.timeFormat,
            interval: this.state.interval,
            startTime: "08:00",
            maxTime: this.defaultSettings.maxTime,
            defaultTime: this.defaultSettings.startTimeDefault,
            dynamic: false,
            dropdown: true,
            scrollbar: false
        };
    }

    /**
     * Get end time picker configuration
     */
    getEndTimePickerConfig() {
        return {
            timeFormat: this.state.timeFormat,
            interval: this.state.interval,
            startTime: "09:00",
            maxTime: this.defaultSettings.maxTime,
            defaultTime: this.defaultSettings.endTimeDefault,
            dynamic: false,
            dropdown: true,
            scrollbar: false
        };
    }

    /**
     * Validate time range
     */
    validateTimeRange(startTime, endTime) {
        const start = this.parseTime(startTime);
        const end = this.parseTime(endTime);
        return start < end;
    }

    /**
     * Parse time string to minutes since midnight
     */
    parseTime(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    /**
     * Get time range in minutes
     */
    getTimeRangeInMinutes() {
        const start = this.parseTime(this.state.startTime);
        const end = this.parseTime(this.state.endTime);
        return end - start;
    }

    // Observer pattern for state changes
    observers = [];

    /**
     * Subscribe to state changes
     */
    subscribe(callback) {
        this.observers.push(callback);
    }

    /**
     * Unsubscribe from state changes
     */
    unsubscribe(callback) {
        this.observers = this.observers.filter(obs => obs !== callback);
    }

    /**
     * Notify all observers of state change
     */
    notifyStateChange() {
        this.observers.forEach(callback => {
            try {
                callback(this.getState());
            } catch (error) {
                console.error('Error in time state observer:', error);
            }
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeModel;
} else {
    window.TimeModel = TimeModel;
}
