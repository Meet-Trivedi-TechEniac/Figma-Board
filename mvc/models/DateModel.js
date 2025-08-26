/**
 * Date Model - Manages date selection and range state
 */
class DateModel {
    constructor() {
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            duration: 10, // days
            currentView: 'resourceTimelineDay'
        };
        
        this.defaultSettings = {
            duration: 10,
            format: "DD/MM/YYYY",
            locale: {
                cancelLabel: "Cancel",
                format: "DD/MM/YYYY"
            }
        };
    }

    /**
     * Get current date state
     */
    getState() {
        return { ...this.state };
    }

    /**
     * Update date state
     */
    updateState(newState) {
        this.state = { ...this.state, ...newState };
        this.notifyStateChange();
    }

    /**
     * Set date range
     */
    setDateRange(startDate, endDate) {
        this.state.startDate = new Date(startDate);
        this.state.endDate = new Date(endDate);
        this.state.duration = this.calculateDuration(startDate, endDate);
        this.notifyStateChange();
    }

    /**
     * Set start date
     */
    setStartDate(date) {
        this.state.startDate = new Date(date);
        this.notifyStateChange();
    }

    /**
     * Set end date
     */
    setEndDate(date) {
        this.state.endDate = new Date(date);
        this.notifyStateChange();
    }

    /**
     * Set duration in days
     */
    setDuration(days) {
        this.state.duration = days;
        this.notifyStateChange();
    }

    /**
     * Get start date
     */
    getStartDate() {
        return new Date(this.state.startDate);
    }

    /**
     * Get end date
     */
    getEndDate() {
        return new Date(this.state.endDate);
    }

    /**
     * Get duration
     */
    getDuration() {
        return this.state.duration;
    }

    /**
     * Go to today
     */
    goToToday() {
        const today = new Date();
        this.setDateRange(today, today);
        this.setDuration(8); // Default to 8 days when going to today
    }

    /**
     * Navigate to previous period
     */
    goToPrevious() {
        const startDate = new Date(this.state.startDate);
        const endDate = new Date(this.state.endDate);
        const rangeDays = this.calculateDuration(startDate, endDate);
        
        startDate.setDate(startDate.getDate() - (rangeDays + 1));
        endDate.setDate(endDate.getDate() - (rangeDays + 1));
        
        this.setDateRange(startDate, endDate);
    }

    /**
     * Navigate to next period
     */
    goToNext() {
        const startDate = new Date(this.state.startDate);
        const endDate = new Date(this.state.endDate);
        const rangeDays = this.calculateDuration(startDate, endDate);
        
        startDate.setDate(startDate.getDate() + (rangeDays + 1));
        endDate.setDate(endDate.getDate() + (rangeDays + 1));
        
        this.setDateRange(startDate, endDate);
    }

    /**
     * Calculate duration between two dates
     */
    calculateDuration(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays + 1; // Inclusive
    }

    /**
     * Format date for display
     */
    formatDate(date) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    /**
     * Get formatted date range string
     */
    getFormattedDateRange() {
        const start = this.formatDate(this.state.startDate);
        const end = this.formatDate(this.state.endDate);
        return `${start} - ${end}`;
    }

    /**
     * Get date range picker configuration
     */
    getDateRangePickerConfig() {
        return {
            autoUpdateInput: true,
            locale: this.defaultSettings.locale,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            applyButtonClasses: "date-apply-btn",
            cancelButtonClasses: "date-cancel-btn"
        };
    }

    /**
     * Parse date from string
     */
    parseDate(dateString) {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    }

    /**
     * Check if date is today
     */
    isToday(date) {
        const today = new Date();
        const checkDate = new Date(date);
        return today.toDateString() === checkDate.toDateString();
    }

    /**
     * Get week number for a date
     */
    getWeekNumber(date) {
        const d = new Date(date);
        const excelEpoch = new Date(1900, 0, 1);
        const daysSinceEpoch = Math.floor((d - excelEpoch) / (1000 * 60 * 60 * 24)) + 1;
        const weekday2 = ((d.getDay() + 6) % 7) + 1;
        return Math.floor((daysSinceEpoch - weekday2 + 1 / 7) % 2) + 1;
    }

    /**
     * Get week color for a date
     */
    getWeekColor(date) {
        const weekNum = this.getWeekNumber(date);
        const colorMap = {
            1: "#ff0026ff",
            2: "#225f27ff"
        };
        return colorMap[weekNum] || "#000000";
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
                console.error('Error in date state observer:', error);
            }
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DateModel;
} else {
    window.DateModel = DateModel;
}
