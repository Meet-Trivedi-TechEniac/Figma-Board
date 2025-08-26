/**
 * Time View - Handles UI rendering and interactions for time selection
 */
class TimeView {
    constructor(timeModel) {
        this.model = timeModel;
        this.elements = {};
        this.isInitialized = false;
        this.timePickers = {};
        this.isUpdatingUI = false; // guard to prevent change-loop
    }

    /**
     * Initialize the time view
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
            startTimeContainer: document.querySelector('#starttime .time-conatainer'),
            endTimeContainer: document.querySelector('#endtime .time-conatainer'),
            startTimeInput: document.querySelector('.starttime'),
            endTimeInput: document.querySelector('.endtime'),
            startTimeIcon: document.querySelector('#starttime .time-conatainer img'),
            endTimeIcon: document.querySelector('#endtime .time-conatainer img')
        };
    }

    /**
     * Render the time view
     */
    render() {
        this.initializeTimePickers();
        this.updateDisplay();
    }

    /**
     * Initialize time pickers
     */
    initializeTimePickers() {
        if (typeof $ === 'undefined' || typeof $.fn.timepicker === 'undefined') {
            console.warn('jQuery or timepicker not loaded');
            return;
        }

        // Initialize start time picker
        if (this.elements.startTimeInput) {
            this.timePickers.startTime = $(this.elements.startTimeInput).timepicker({
                ...this.model.getTimePickerConfig(),
                change: (time) => {
                    if (this.isUpdatingUI) return;
                    this.model.setStartTime(time);
                }
            });
        }

        // Initialize end time picker
        if (this.elements.endTimeInput) {
            this.timePickers.endTime = $(this.elements.endTimeInput).timepicker({
                ...this.model.getEndTimePickerConfig(),
                change: (time) => {
                    if (this.isUpdatingUI) return;
                    this.model.setEndTime(time);
                }
            });
        }
    }

    /**
     * Update display
     */
    updateDisplay() {
        const state = this.model.getState();
        // prevent change handlers from firing while syncing UI
        this.isUpdatingUI = true;
        try {
            if (this.timePickers.startTime) {
                this.timePickers.startTime.timepicker('setTime', this.formatTimeForDisplay(state.startTime));
            }
            if (this.timePickers.endTime) {
                this.timePickers.endTime.timepicker('setTime', this.formatTimeForDisplay(state.endTime));
            }
        } finally {
            // small async delay to let plugin finish internal events
            setTimeout(() => { this.isUpdatingUI = false; }, 0);
        }
    }

    /**
     * Format time for display
     */
    formatTimeForDisplay(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        this.bindIconClickEvents();
        this.bindInputFocusEvents();
    }

    /**
     * Bind icon click events
     */
    bindIconClickEvents() {
        // Start time icon click
        if (this.elements.startTimeIcon) {
            this.elements.startTimeIcon.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                setTimeout(() => {
                    if (this.elements.startTimeInput) {
                        this.elements.startTimeInput.focus();
                    }
                }, 10);
            });
        }

        // End time icon click
        if (this.elements.endTimeIcon) {
            this.elements.endTimeIcon.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                setTimeout(() => {
                    if (this.elements.endTimeInput) {
                        this.elements.endTimeInput.focus();
                    }
                }, 10);
            });
        }
    }

    /**
     * Bind input focus events
     */
    bindInputFocusEvents() {
        if (this.elements.startTimeInput) {
            this.elements.startTimeInput.addEventListener('focus', () => {
                this.elements.startTimeContainer.classList.add('focused');
            });

            this.elements.startTimeInput.addEventListener('blur', () => {
                this.elements.startTimeContainer.classList.remove('focused');
            });
        }

        if (this.elements.endTimeInput) {
            this.elements.endTimeInput.addEventListener('focus', () => {
                this.elements.endTimeContainer.classList.add('focused');
            });

            this.elements.endTimeInput.addEventListener('blur', () => {
                this.elements.endTimeContainer.classList.remove('focused');
            });
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
     * Reset to default times
     */
    resetToDefault() {
        this.model.resetToDefault();
    }

    /**
     * Validate time range
     */
    validateTimeRange() {
        const startTime = this.model.getStartTime();
        const endTime = this.model.getEndTime();
        return this.model.validateTimeRange(startTime, endTime);
    }

    /**
     * Show validation error
     */
    showValidationError(message) {
        // Add error styling
        this.elements.startTimeContainer.classList.add('error');
        this.elements.endTimeContainer.classList.add('error');
        
        // Show error message (you can implement this based on your UI)
        console.warn('Time validation error:', message);
    }

    /**
     * Clear validation error
     */
    clearValidationError() {
        this.elements.startTimeContainer.classList.remove('error');
        this.elements.endTimeContainer.classList.remove('error');
    }

    /**
     * Enable time inputs
     */
    enable() {
        if (this.elements.startTimeInput) {
            this.elements.startTimeInput.disabled = false;
        }
        if (this.elements.endTimeInput) {
            this.elements.endTimeInput.disabled = false;
        }
    }

    /**
     * Disable time inputs
     */
    disable() {
        if (this.elements.startTimeInput) {
            this.elements.startTimeInput.disabled = true;
        }
        if (this.elements.endTimeInput) {
            this.elements.endTimeInput.disabled = true;
        }
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
     * Destroy the view
     */
    destroy() {
        if (this.model) {
            this.model.unsubscribe(this.updateDisplay);
        }

        // Destroy time pickers
        if (this.timePickers.startTime) {
            this.timePickers.startTime.timepicker('destroy');
        }
        if (this.timePickers.endTime) {
            this.timePickers.endTime.timepicker('destroy');
        }

        this.isInitialized = false;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeView;
} else {
    window.TimeView = TimeView;
}
