/**
 * Date View - Handles UI rendering and interactions for date selection
 */
class DateView {
    constructor(dateModel) {
        this.model = dateModel;
        this.elements = {};
        this.isInitialized = false;
        this.dateRangePicker = null;
    }

    /**
     * Initialize the date view
     */
    init() {
        if (this.isInitialized) return;
        
        this.cacheElements();
        this.render();
        this.bindEvents();
        this.subscribeToModel();
        
        this.isInitialized = true;
    }

    /**
     * Cache DOM elements
     */
    cacheElements() {
        this.elements = {
            dateInput: document.querySelector('input[name="datefilter"]'),
            prevBtn: document.getElementById('calPrev'),
            nextBtn: document.getElementById('calNext'),
            todayBtn: document.getElementById('today-btn')
        };
    }

    /**
     * Render the date view
     */
    render() {
        this.initializeDateRangePicker();
        this.updateDisplay();
    }

    /**
     * Initialize date range picker
     */
    initializeDateRangePicker() {
        if (typeof $ === 'undefined' || typeof $.fn.daterangepicker === 'undefined') {
            console.warn('jQuery or daterangepicker not loaded');
            return;
        }

        if (!this.elements.dateInput) {
            console.warn('Date input element not found');
            return;
        }

        // Initialize date range picker
        this.dateRangePicker = $(this.elements.dateInput).daterangepicker({
            ...this.model.getDateRangePickerConfig(),
            applyButtonClasses: "date-apply-btn",
            cancelButtonClasses: "date-cancel-btn"
        });

        // Bind apply event
        $(this.elements.dateInput).on('apply.daterangepicker', (ev, picker) => {
            const startDate = picker.startDate.toDate();
            const endDate = picker.endDate.toDate();
            
            this.model.setDateRange(startDate, endDate);
            
            // Update input value
            $(this.elements.dateInput).val(
                picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY')
            );
        });
    }

    /**
     * Update display
     */
    updateDisplay() {
        const state = this.model.getState();
        
        // Update date range picker if it exists
        if (this.dateRangePicker && this.dateRangePicker.data('daterangepicker')) {
            const picker = this.dateRangePicker.data('daterangepicker');
            picker.setStartDate(moment(state.startDate));
            picker.setEndDate(moment(state.endDate));
        }

        // Update input value
        if (this.elements.dateInput) {
            this.elements.dateInput.value = this.model.getFormattedDateRange();
        }
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        this.bindNavigationEvents();
        this.bindTodayEvent();
    }

    /**
     * Bind navigation events
     */
    bindNavigationEvents() {
        // Previous button
        if (this.elements.prevBtn) {
            this.elements.prevBtn.addEventListener('click', () => {
                this.navigatePrevious();
            });
        }

        // Next button
        if (this.elements.nextBtn) {
            this.elements.nextBtn.addEventListener('click', () => {
                this.navigateNext();
            });
        }
    }

    /**
     * Bind today button event
     */
    bindTodayEvent() {
        if (this.elements.todayBtn) {
            this.elements.todayBtn.addEventListener('click', () => {
                this.goToToday();
            });
        }
    }

    /**
     * Navigate to previous period
     */
    navigatePrevious() {
        if (!this.dateRangePicker || !this.dateRangePicker.data('daterangepicker')) {
            this.model.goToPrevious();
            return;
        }

        const picker = this.dateRangePicker.data('daterangepicker');
        const rangeDays = picker.endDate.diff(picker.startDate, 'days');
        const newStart = picker.startDate.clone().subtract(rangeDays + 1, 'days');
        const newEnd = picker.endDate.clone().subtract(rangeDays + 1, 'days');

        picker.setStartDate(newStart);
        picker.setEndDate(newEnd);
        
        $(this.elements.dateInput).val(
            `${newStart.format('DD/MM/YYYY')} - ${newEnd.format('DD/MM/YYYY')}`
        );
        
        $(this.elements.dateInput).trigger('apply.daterangepicker', [picker]);
    }

    /**
     * Navigate to next period
     */
    navigateNext() {
        if (!this.dateRangePicker || !this.dateRangePicker.data('daterangepicker')) {
            this.model.goToNext();
            return;
        }

        const picker = this.dateRangePicker.data('daterangepicker');
        const rangeDays = picker.endDate.diff(picker.startDate, 'days');
        const newStart = picker.startDate.clone().add(rangeDays + 1, 'days');
        const newEnd = picker.endDate.clone().add(rangeDays + 1, 'days');

        picker.setStartDate(newStart);
        picker.setEndDate(newEnd);
        
        $(this.elements.dateInput).val(
            `${newStart.format('DD/MM/YYYY')} - ${newEnd.format('DD/MM/YYYY')}`
        );
        
        $(this.elements.dateInput).trigger('apply.daterangepicker', [picker]);
    }

    /**
     * Go to today
     */
    goToToday() {
        this.model.goToToday();
        
        // Update date range picker if it exists
        if (this.dateRangePicker && this.dateRangePicker.data('daterangepicker')) {
            const picker = this.dateRangePicker.data('daterangepicker');
            const today = moment();
            picker.setStartDate(today);
            picker.setEndDate(today);
            
            $(this.elements.dateInput).val(
                today.format('DD/MM/YYYY') + ' - ' + today.format('DD/MM/YYYY')
            );
        }
    }

    /**
     * Subscribe to model changes
     */
    subscribeToModel() {
        this.model.subscribe((state) => {
            this.updateDisplay();
        });
    }

    /**
     * Set date range
     */
    setDateRange(startDate, endDate) {
        this.model.setDateRange(startDate, endDate);
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
     * Get duration
     */
    getDuration() {
        return this.model.getDuration();
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
        if (this.elements.prevBtn) {
            this.elements.prevBtn.disabled = false;
        }
        if (this.elements.nextBtn) {
            this.elements.nextBtn.disabled = false;
        }
        if (this.elements.todayBtn) {
            this.elements.todayBtn.disabled = false;
        }
        if (this.elements.dateInput) {
            this.elements.dateInput.disabled = false;
        }
    }

    /**
     * Disable date navigation
     */
    disable() {
        if (this.elements.prevBtn) {
            this.elements.prevBtn.disabled = true;
        }
        if (this.elements.nextBtn) {
            this.elements.nextBtn.disabled = true;
        }
        if (this.elements.todayBtn) {
            this.elements.todayBtn.disabled = true;
        }
        if (this.elements.dateInput) {
            this.elements.dateInput.disabled = true;
        }
    }

    /**
     * Get date range picker configuration
     */
    getDateRangePickerConfig() {
        return this.model.getDateRangePickerConfig();
    }

    /**
     * Destroy the view
     */
    destroy() {
        if (this.model) {
            this.model.unsubscribe(this.updateDisplay);
        }

        // Destroy date range picker
        if (this.dateRangePicker && this.dateRangePicker.data('daterangepicker')) {
            this.dateRangePicker.data('daterangepicker').remove();
        }

        this.isInitialized = false;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DateView;
} else {
    window.DateView = DateView;
}
