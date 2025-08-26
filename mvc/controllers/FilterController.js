/**
 * Filter Controller - Handles filter logic and coordinates between model and view
 */
class FilterController {
    constructor(filterModel, filterView) {
        this.model = filterModel;
        this.view = filterView;
        this.isInitialized = false;
    }

    /**
     * Initialize the filter controller
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
            this.handleFilterChange(state);
        });
    }

    /**
     * Handle filter state changes
     */
    handleFilterChange(filterState) {
        // Notify other components about filter changes
        this.notifyFilterChange(filterState);
        
        // Log filter changes for debugging
        console.log('Filter state changed:', filterState);
    }

    /**
     * Add region filter
     */
    addRegion(region) {
        this.model.addRegion(region);
    }

    /**
     * Remove region filter
     */
    removeRegion(region) {
        this.model.removeRegion(region);
    }

    /**
     * Add work type filter
     */
    addWorkType(workType) {
        this.model.addWorkType(workType);
    }

    /**
     * Remove work type filter
     */
    removeWorkType(workType) {
        this.model.removeWorkType(workType);
    }

    /**
     * Set search term
     */
    setSearch(search) {
        this.model.setSearch(search);
    }

    /**
     * Toggle sort order
     */
    toggleSort() {
        this.model.toggleSort();
    }

    /**
     * Reset all filters
     */
    reset() {
        this.model.reset();
    }

    /**
     * Get current filter state
     */
    getFilterState() {
        return this.model.getState();
    }

    /**
     * Check if any filter is active
     */
    hasActiveFilters() {
        return this.model.hasActiveFilters();
    }

    /**
     * Get available regions
     */
    getRegions() {
        return this.model.getRegions();
    }

    /**
     * Get available work types
     */
    getWorkTypes() {
        return this.model.getWorkTypes();
    }

    /**
     * Show filter container
     */
    showFilter() {
        this.view.show();
    }

    /**
     * Hide filter container
     */
    hideFilter() {
        this.view.hide();
    }

    /**
     * Toggle filter container visibility
     */
    toggleFilter() {
        this.view.toggle();
    }

    /**
     * Apply filters to data
     */
    applyFiltersToData(data) {
        const filterState = this.model.getState();
        let filteredData = [...data];

        // Apply region filter
        if (filterState.region.length > 0) {
            filteredData = filteredData.filter(item => 
                filterState.region.includes(item.extendedProps?.region)
            );
        }

        // Apply work type filter
        if (filterState.worktype.length > 0) {
            filteredData = filteredData.filter(item => 
                filterState.worktype.includes(item.extendedProps?.eventType)
            );
        }

        // Apply search filter
        if (filterState.search) {
            filteredData = filteredData.filter(item => 
                item.extendedProps?.employeeName?.toLowerCase().includes(filterState.search)
            );
        }

        // Apply sorting
        if (filteredData.length > 0 && filteredData[0].extendedProps?.employeeName) {
            filteredData.sort((a, b) => {
                const nameA = a.extendedProps.employeeName.toLowerCase();
                const nameB = b.extendedProps.employeeName.toLowerCase();
                
                if (filterState.sortAsc) {
                    return nameA.localeCompare(nameB);
                } else {
                    return nameB.localeCompare(nameA);
                }
            });
        }

        return filteredData;
    }

    /**
     * Get filtered resource IDs
     */
    getFilteredResourceIds(events) {
        const filteredEvents = this.applyFiltersToData(events);
        return filteredEvents.map(event => String(event.resourceId));
    }

    /**
     * Get filtered and searched resources
     */
    getFilteredAndSearchedResources(allResources, events) {
        const filteredEventIds = this.getFilteredResourceIds(events);
        // When no filters are active, show all resources (even if no events)
        let filteredResources = [];
        if (!this.hasActiveFilters()) {
            filteredResources = allResources;
        } else {
            filteredResources = allResources.filter(resource => 
                filteredEventIds.includes(String(resource.id))
            );
        }

        const filterState = this.model.getState();

        // Apply search to resources
        if (filterState.search) {
            filteredResources = filteredResources.filter(resource =>
                resource.extendedProps.name.toLowerCase().includes(filterState.search)
            );
        }

        // Apply sorting to resources
        filteredResources.sort((a, b) => {
            const nameA = a.extendedProps.name.toLowerCase();
            const nameB = b.extendedProps.name.toLowerCase();
            
            if (filterState.sortAsc) {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });

        // If there are filters but no results, keep empty to reflect filter outcome

        return filteredResources;
    }

    // Observer pattern for filter changes
    observers = [];

    /**
     * Subscribe to filter changes
     */
    subscribeToFilterChanges(callback) {
        this.observers.push(callback);
    }

    /**
     * Unsubscribe from filter changes
     */
    unsubscribeFromFilterChanges(callback) {
        this.observers = this.observers.filter(obs => obs !== callback);
    }

    /**
     * Notify observers of filter changes
     */
    notifyFilterChange(filterState) {
        this.observers.forEach(callback => {
            try {
                callback(filterState);
            } catch (error) {
                console.error('Error in filter change observer:', error);
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
    module.exports = FilterController;
} else {
    window.FilterController = FilterController;
}
