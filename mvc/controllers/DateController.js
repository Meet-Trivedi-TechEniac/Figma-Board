/**
 * Date Controller - Handles date logic and coordinates between model and view
 */
class DateController {
    constructor(dateModel, dateView) {
        this.model = dateModel;
        this.view = dateView;
        this.isInitialized = false;
    }

    /**
     * Initialize the date controller
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
            this.handleDateChange(state);
        });
    }

    /**
     * Handle date state changes
     */
    handleDateChange(dateState) {
        // Notify other components about date changes
        this.notifyDateChange(dateState);
        
        // Log date changes for debugging
        console.log('Date state changed:', dateState);
    }

    /**
     * Set date range
     */
    setDateRange(startDate, endDate) {
        this.model.setDateRange(startDate, endDate);
    }

    /**
     * Set start date
     */
    setStartDate(date) {
        this.model.setStartDate(date);
    }

    /**
     * Set end date
     */
    setEndDate(date) {
        this.model.setEndDate(date);
    }

    /**
     * Get start date
     */
    getStartDate() {
        return this.model.getStartDate();
    }

    /**
     * Get end date
     */
    getEndDate() {
        return this.model.getEndDate();
    }

    /**
     * Get date state
     */
    getDateState() {
        return this.model.getState();
    }

    /**
     * Get duration
     */
    getDuration() {
        return this.model.getDuration();
    }

    /**
     * Go to today
     */
    goToToday() {
        this.model.goToToday();
    }

    /**
     * Navigate to previous period
     */
    goToPrevious() {
        this.model.goToPrevious();
    }

    /**
     * Navigate to next period
     */
    goToNext() {
        this.model.goToNext();
    }

    /**
     * Get formatted date range
     */
    getFormattedDateRange() {
        return this.model.getFormattedDateRange();
    }

    /**
     * Check if date is today
     */
    isToday(date) {
        return this.model.isToday(date);
    }

    /**
     * Get week number for a date
     */
    getWeekNumber(date) {
        return this.model.getWeekNumber(date);
    }

    /**
     * Get week color for a date
     */
    getWeekColor(date) {
        return this.model.getWeekColor(date);
    }

    /**
     * Enable date navigation
     */
    enable() {
        this.view.enable();
    }

    /**
     * Disable date navigation
     */
    disable() {
        this.view.disable();
    }

    /**
     * Get date range picker configuration
     */
    getDateRangePickerConfig() {
        return this.model.getDateRangePickerConfig();
    }

    /**
     * Calculate working days between two dates
     */
    calculateWorkingDays(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        let workingDays = 0;
        
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
            const dayOfWeek = date.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sunday (0) and Saturday (6)
                workingDays++;
            }
        }
        
        return workingDays;
    }

    /**
     * Get working days in current range
     */
    getWorkingDaysInRange() {
        return this.calculateWorkingDays(this.model.getStartDate(), this.model.getEndDate());
    }

    /**
     * Check if date is a weekend
     */
    isWeekend(date) {
        const dayOfWeek = new Date(date).getDay();
        return dayOfWeek === 0 || dayOfWeek === 6;
    }

    /**
     * Check if date is a holiday (placeholder for future implementation)
     */
    isHoliday(date) {
        // This can be extended to check against a holiday calendar
        return false;
    }

    /**
     * Get next working day
     */
    getNextWorkingDay(date) {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        
        while (this.isWeekend(nextDay) || this.isHoliday(nextDay)) {
            nextDay.setDate(nextDay.getDate() + 1);
        }
        
        return nextDay;
    }

    /**
     * Get previous working day
     */
    getPreviousWorkingDay(date) {
        const prevDay = new Date(date);
        prevDay.setDate(prevDay.getDate() - 1);
        
        while (this.isWeekend(prevDay) || this.isHoliday(prevDay)) {
            prevDay.setDate(prevDay.getDate() - 1);
        }
        
        return prevDay;
    }

    /**
     * Get date range for a specific week
     */
    getWeekRange(date) {
        const targetDate = new Date(date);
        const dayOfWeek = targetDate.getDay();
        const startOfWeek = new Date(targetDate);
        startOfWeek.setDate(targetDate.getDate() - dayOfWeek);
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        return {
            start: startOfWeek,
            end: endOfWeek
        };
    }

    /**
     * Get date range for a specific month
     */
    getMonthRange(date) {
        const targetDate = new Date(date);
        const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
        const endOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
        
        return {
            start: startOfMonth,
            end: endOfMonth
        };
    }

    /**
     * Format date for display
     */
    formatDate(date, format = 'DD/MM/YYYY') {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        
        switch (format) {
            case 'DD/MM/YYYY':
                return `${day}/${month}/${year}`;
            case 'MM/DD/YYYY':
                return `${month}/${day}/${year}`;
            case 'YYYY-MM-DD':
                return `${year}-${month}-${day}`;
            case 'DD-MM-YYYY':
                return `${day}-${month}-${year}`;
            default:
                return `${day}/${month}/${year}`;
        }
    }

    /**
     * Parse date from string
     */
    parseDate(dateString, format = 'DD/MM/YYYY') {
        let day, month, year;
        
        switch (format) {
            case 'DD/MM/YYYY':
                [day, month, year] = dateString.split('/').map(Number);
                break;
            case 'MM/DD/YYYY':
                [month, day, year] = dateString.split('/').map(Number);
                break;
            case 'YYYY-MM-DD':
                [year, month, day] = dateString.split('-').map(Number);
                break;
            case 'DD-MM-YYYY':
                [day, month, year] = dateString.split('-').map(Number);
                break;
            default:
                [day, month, year] = dateString.split('/').map(Number);
        }
        
        return new Date(year, month - 1, day);
    }

    /**
     * Validate date range
     */
    validateDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        return start <= end;
    }

    /**
     * Get date difference in days
     */
    getDateDifferenceInDays(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // Observer pattern for date changes
    observers = [];

    /**
     * Subscribe to date changes
     */
    subscribeToDateChanges(callback) {
        this.observers.push(callback);
    }

    /**
     * Unsubscribe from date changes
     */
    unsubscribeFromDateChanges(callback) {
        this.observers = this.observers.filter(obs => obs !== callback);
    }

    /**
     * Notify observers of date changes
     */
    notifyDateChange(dateState) {
        this.observers.forEach(callback => {
            try {
                callback(dateState);
            } catch (error) {
                console.error('Error in date change observer:', error);
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
    module.exports = DateController;
} else {
    window.DateController = DateController;
}
