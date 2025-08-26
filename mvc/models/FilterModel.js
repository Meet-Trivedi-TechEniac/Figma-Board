/**
 * Filter Model - Manages filter state and data
 */
class FilterModel {
  constructor() {
    this.state = {
      region: [],
      worktype: [],
      search: "",
      sortAsc: true,
      isLoadingFilters: false,
      filterLoadError: false,
    };

    // Available filter options (populated via API fetch)
    this.regions = [];
    this.workTypes = [];
  }

  /**
   * Get current filter state
   */
  
  getState() {
    return { ...this.state };
  }

  /**
   * Update filter state
   */
  updateState(newState) {
    this.state = { ...this.state, ...newState };
    this.notifyStateChange();
  }

  /**
   * Reset all filters to default
   */
  reset() {
    this.state = {
      region: [],
      worktype: [],
      search: "",
      sortAsc: true,
      isLoadingFilters: false,
      filterLoadError: false,
    };
    this.notifyStateChange();
  }

  /**
   * Add region filter
   */
  addRegion(region) {
    if (!this.state.region.includes(region)) {
      this.state.region.push(region);
      this.notifyStateChange();
    }
  }

  /**
   * Remove region filter
   */
  removeRegion(region) {
    this.state.region = this.state.region.filter((r) => r !== region);
    this.notifyStateChange();
  }

  /**
   * Add work type filter
   */
  addWorkType(workType) {
    if (!this.state.worktype.includes(workType)) {
      this.state.worktype.push(workType);
      this.notifyStateChange();
    }
  }

  /**
   * Remove work type filter
   */
  removeWorkType(workType) {
    this.state.worktype = this.state.worktype.filter((w) => w !== workType);
    this.notifyStateChange();
  }

  /**
   * Set search term
   */
  setSearch(search) {
    this.state.search = search.toLowerCase();
    this.notifyStateChange();
  }

  /**
   * Toggle sort order
   */
  toggleSort() {
    this.state.sortAsc = !this.state.sortAsc;
    this.notifyStateChange();
  }

  /**
   * Get available regions
   */
  getRegions() {
    return Array.isArray(this.regions) ? [...this.regions] : [];
  }

  /**
   * Get available work types
   */
  getWorkTypes() {
    return Array.isArray(this.workTypes) ? [...this.workTypes] : [];
  }

  /**
   * Fetch filter options (mimics API call with delay)
   */
  fetchFilterOptions(options = {}) {
    const { simulateFailure = false, delayMs = 5000 } = options;
    // set loading state and clear current options
    this.regions = [];
    this.workTypes = [];
    this.state.isLoadingFilters = true;
    this.state.filterLoadError = false;
    this.notifyStateChange();

    const api = (typeof ApiService !== 'undefined' && ApiService.fetchFilterOptions)
      ? ApiService.fetchFilterOptions({ simulateFailure, delayMs })
      : new Promise((resolve) => setTimeout(() => resolve({ regions: [], workTypes: [] }), delayMs));

    api
      .then(({ regions, workTypes }) => {
        this.regions = Array.isArray(regions) ? regions : [];
        this.workTypes = Array.isArray(workTypes) ? workTypes : [];
        this.state.isLoadingFilters = false;
        this.state.filterLoadError = false;
        this.notifyStateChange();
      })
      .catch(() => {
        this.state.isLoadingFilters = false;
        this.state.filterLoadError = true;
        this.notifyStateChange();
      });
  }

  /**
   * Check if any filter is active
   */
  hasActiveFilters() {
    return (
      this.state.region.length > 0 ||
      this.state.worktype.length > 0 ||
      this.state.search !== ""
    );
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
    this.observers = this.observers.filter((obs) => obs !== callback);
  }

  /**
   * Notify all observers of state change
   */
  notifyStateChange() {
    this.observers.forEach((callback) => {
      try {
        callback(this.getState());
      } catch (error) {
        console.error("Error in filter state observer:", error);
      }
    });
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = FilterModel;
} else {
  window.FilterModel = FilterModel;
}
