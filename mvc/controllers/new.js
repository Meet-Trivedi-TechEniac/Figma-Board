/**
 * Main Application Controller - Coordinates all MVC components
 */
class AppController {
    constructor() {
        this.controllers = {};
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;

        console.log('Initializing MVC Calendar Application...');

        try {
            this.initializeModels();
            this.initializeViews();
            this.initializeControllers();
            this.setupEventListeners();
            this.setupCrossComponentCommunication();

            this.isInitialized = true;
            console.log('MVC Calendar Application initialized successfully!');
        } catch (error) {
            console.error('AppController initialization failed:', error);
            throw error; // Propagate to main.js
        }
    }

    initializeModels() {
        try {
            this.models = {
                filter: new window.FilterModel(),
                time: new window.TimeModel(),
                date: new window.DateModel(),
                events: new window.EventsModel(),
                resources: new window.ResourcesModel()
            };
            console.log('Models initialized');
        } catch (error) {
            console.error('Model initialization failed:', error);
            throw error;
        }
    }

    initializeViews() {
        try {
            this.views = {
                filter: new window.FilterView(this.models.filter),
                time: new window.TimeView(this.models.time),
                date: new window.DateView(this.models.date),
                calendar: new window.CalendarView('#ec'),
                resources: new window.ResourceView('#ec')
            };
            console.log('Views initialized');
        } catch (error) {
            console.error('View initialization failed:', error);
            throw error;
        }
    }

    initializeControllers() {
        try {
            this.controllers = {
                filter: new window.FilterController(this.models.filter, this.views.filter),
                time: new window.TimeController(this.models.time, this.views.time),
                date: new window.DateController(this.models.date, this.views.date),
                resources: new window.ResourceController(this.models.resources, this.views.resources)
            };

            this.controllers.calendar = new window.CalendarController(
                this.views.calendar,
                this.models.events,
                this.models.resources,
                this.controllers.filter,
                this.controllers.time,
                this.controllers.date
            );

            Object.values(this.controllers).forEach(controller => {
                try {
                    controller.init();
                } catch (error) {
                    console.error(`Controller ${controller.constructor.name} initialization failed:`, error);
                }
            });

            console.log('Controllers initialized');
        } catch (error) {
            console.error('Controller initialization failed:', error);
            throw error;
        }
    }

    // ... rest of the methods (unchanged, except for onDOMReady below) ...

    onDOMReady() {
        console.log('DOM ready, setting up application...');

        try {
            // Initialize calendar
            if (typeof window.createCalendar === 'function') {
                window.createCalendar();
                console.log('createCalendar executed');
            } else {
                console.warn('createCalendar function not found');
            }

            // Ensure calendar has data
            if (this.controllers.calendar) {
                this.controllers.calendar.loadInitialData();
                console.log('Calendar initial data loaded');
            }

            // Load initial resources
            if (this.controllers.resources) {
                this.controllers.resources.loadResources({ simulateFailure: false, delayMs: 2000 });
                console.log('Resources loading initiated');
            }

            // Additional setup
            this.setupSearchFunctionality();
            this.setupTabSwitching();

            // Load filter options
            if (!this._filtersLoaded && this.models.filter && typeof this.models.filter.fetchFilterOptions === 'function') {
                this._filtersLoaded = true;
                this.models.filter.fetchFilterOptions();
                console.log('Filter options loading initiated');
            }
        } catch (error) {
            console.error('onDOMReady failed:', error);
        }
    }

    // ... rest of the methods (unchanged) ...
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppController;
} else {
    window.AppController = AppController;
}