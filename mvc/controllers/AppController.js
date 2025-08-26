/**
 * Main Application Controller - Coordinates all MVC components
 */
class AppController {
    constructor() {
        this.controllers = {};
        this.isInitialized = false;
    }

    /**
     * Initialize the application
     */
    init() {
        if (this.isInitialized) return;

        console.log('Initializing MVC Calendar Application...');

        this.initializeModels();
        this.initializeViews();
        this.initializeControllers();
        this.setupEventListeners();
        this.setupCrossComponentCommunication();

        this.isInitialized = true;
        console.log('MVC Calendar Application initialized successfully!');
    }

    /**
     * Initialize all models
     */
    initializeModels() {
        this.models = {
            filter: new FilterModel(),
            time: new TimeModel(),
            date: new DateModel(),
            events: new EventsModel(),
            resources: new ResourcesModel()
        };

        console.log('Models initialized');
    }

    /**
     * Initialize all views
     */
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

    /**
     * Initialize all controllers
     */
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

    /**
     * Setup event listeners for global events
     */
    setupEventListeners() {
        // Listen for DOM content loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.onDOMReady();
            });
        } else {
            this.onDOMReady();
        }

        // Listen for window resize
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });

        // Listen for beforeunload
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });

        // Optional: Add listener for refresh button (if you have one)
        const refreshButton = document.getElementById('refresh-resources-btn');
        if (refreshButton) {
            refreshButton.addEventListener('click', () => {
                this.controllers.resources.refreshResources();
            });
        }
    }
    /**
     * Setup cross-component communication
     */
    setupCrossComponentCommunication() {
        // Filter changes should update calendar
        this.controllers.filter.subscribeToFilterChanges((filterState) => {
            this.handleFilterChange(filterState);
        });

        // Time changes should update calendar
        this.controllers.time.subscribeToTimeChanges((timeState) => {
            this.handleTimeChange(timeState);
        });

        // Date changes should update calendar
        this.controllers.date.subscribeToDateChanges((dateState) => {
            this.handleDateChange(dateState);
        });
    }

    /**
     * Handle DOM ready event
     */
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


    /**
     * Setup search functionality
     */
    setupSearchFunctionality() {
        const sidebarTitle = document.querySelector('.ec-sidebar-title');
        if (!sidebarTitle) return;

        // Create search container
        const searchContainer = document.createElement('div');
        searchContainer.classList.add('search-container');

        // Create search input
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.name = 'search-input';
        searchInput.placeholder = 'Search resources';
        searchInput.classList.add('search-input');

        // Create search icon
        const searchIcon = document.createElement('img');
        searchIcon.src = 'Assets/icons/search.svg';
        searchIcon.alt = 'Search';
        searchIcon.classList.add('search-icon');

        // Create sort button
        const sortBtn = document.createElement('button');
        const sortIcon = document.createElement('img');
        sortIcon.src = 'Assets/icons/swap.svg';
        sortIcon.alt = 'Sort';
        sortBtn.classList.add('sort-btn');
        sortBtn.appendChild(sortIcon);

        // Append elements
        searchContainer.appendChild(searchIcon);
        searchContainer.appendChild(searchInput);
        sidebarTitle.appendChild(searchContainer);
        sidebarTitle.appendChild(sortBtn);

        // Bind search events
        const debouncedSearch = this.debounce((event) => {
            this.controllers.filter.setSearch(event.target.value.trim());
        }, 500);

        searchInput.addEventListener('keyup', debouncedSearch);

        // Bind sort events
        sortBtn.addEventListener('click', () => {
            this.controllers.filter.toggleSort();
        });
    }

    /**
     * Setup tab switching functionality
     */
    setupTabSwitching() {
        const initialTabBtn = document.getElementById('intial-tab-btn');
        const leaveTabBtn = document.getElementById('leave-tab-btn');

        if (initialTabBtn) {
            initialTabBtn.addEventListener('click', () => {
                this.controllers.resources.loadResources({ simulateFailure: false, delayMs: 2000 });
                this.switchToInitialTab();
            });
        }

        if (leaveTabBtn) {
            leaveTabBtn.addEventListener('click', () => {
                this.switchToLeaveTab();
            });
        }
    }


    /**
     * Switch to initial tab
     */
    switchToInitialTab() {
        const initialTabBtn = document.getElementById('intial-tab-btn');
        const leaveTabBtn = document.getElementById('leave-tab-btn');

        // Update UI
        initialTabBtn.children[0].classList.add('active-tab-btn');
        leaveTabBtn.children[0].classList.remove('active-tab-btn');

        // Reset filters
        this.controllers.filter.reset();

        // Load initial data via MVC calendar controller; fallback to legacy
        if (this.controllers.calendar) {
            this.controllers.calendar.loadInitialData();
        } else if (typeof setIntialData === 'function') {
            setIntialData();
        }
    }

    /**
     * Switch to leave tab
     */
    switchToLeaveTab() {
        const initialTabBtn = document.getElementById('intial-tab-btn');
        const leaveTabBtn = document.getElementById('leave-tab-btn');

        // Update UI
        leaveTabBtn.children[0].classList.add('active-tab-btn');
        initialTabBtn.children[0].classList.remove('active-tab-btn');

        // Reset filters
        this.controllers.filter.reset();

        // Load leave data via MVC calendar controller; fallback to legacy
        if (this.controllers.calendar) {
            this.controllers.calendar.loadLeaveData();
        } else if (typeof setLeaveData === 'function') {
            setLeaveData();
        }
    }

    /**
     * Handle filter changes
     */
    handleFilterChange(filterState) {
        console.log('Filter changed:', filterState);

        // Update calendar with filtered data
        if (this.controllers.calendar) {
            this.controllers.calendar.applyFiltersToCalendar();
        } else if (window.ecCalendar) {
            this.updateCalendarWithFilters(filterState);
        }
    }

    /**
     * Handle time changes
     */
    handleTimeChange(timeState) {
        console.log('Time changed:', timeState);

        // Update calendar time settings
        if (window.ecCalendar) {
            window.ecCalendar.setOption('slotMinTime', timeState.startTime);
            window.ecCalendar.setOption('slotMaxTime', timeState.endTime);

            // Refresh calendar UI
            if (typeof window.refreshCalendarUI === 'function') {
                setTimeout(() => {
                    window.refreshCalendarUI();
                }, 0);
            }
        }
    }

    /**
     * Handle date changes
     */
    handleDateChange(dateState) {
        console.log('Date changed:', dateState);

        // Update calendar date settings
        if (window.ecCalendar) {
            window.ecCalendar.setOption('date', dateState.startDate);
            window.ecCalendar.setOption('duration', { days: dateState.duration });
        }
    }

    /**
     * Update calendar with filters
     */
    updateCalendarWithFilters(filterState) {
        // This would integrate with your existing filtering logic
        if (typeof applyAllFilters === 'function') {
            applyAllFilters();
        }
    }

    /**
     * Handle window resize
     */
    handleWindowResize() {
        // Handle responsive behavior
        if (typeof window.refreshCalendarUI === 'function') {
            window.refreshCalendarUI();
        }
    }

    /**
     * Debounce function
     */
    debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    /**
     * Get controller by name
     */
    getController(name) {
        return this.controllers[name];
    }

    /**
     * Get model by name
     */
    getModel(name) {
        return this.models[name];
    }

    /**
     * Get view by name
     */
    getView(name) {
        return this.views[name];
    }

    /**
     * Reset all components
     */
    resetAll() {
        this.controllers.filter.reset();
        this.controllers.time.resetToDefault();
        this.controllers.date.goToToday();
    }

    /**
     * Get application state
     */
    getApplicationState() {
        return {
            filter: this.models.filter.getState(),
            time: this.models.time.getState(),
            date: this.models.date.getState()
        };
    }

    /**
     * Set application state
     */
    setApplicationState(state) {
        if (state.filter) {
            this.models.filter.updateState(state.filter);
        }
        if (state.time) {
            this.models.time.updateState(state.time);
        }
        if (state.date) {
            this.models.date.updateState(state.date);
        }
    }

    /**
     * Export application state
     */
    exportState() {
        return JSON.stringify(this.getApplicationState());
    }

    /**
     * Import application state
     */
    importState(stateString) {
        try {
            const state = JSON.parse(stateString);
            this.setApplicationState(state);
            return true;
        } catch (error) {
            console.error('Error importing state:', error);
            return false;
        }
    }

    /**
     * Cleanup resources
     */
    cleanup() {
        console.log('Cleaning up MVC Calendar Application...');

        // Destroy all controllers
        Object.values(this.controllers).forEach(controller => {
            if (controller.destroy) {
                controller.destroy();
            }
        });

        this.isInitialized = false;
    }
}

// Export for use in other modules

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppController;
} else {
    window.AppController = AppController;
}