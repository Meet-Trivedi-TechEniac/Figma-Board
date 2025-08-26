/**
 * Filter View - Handles UI rendering and interactions for filters
 */
class FilterView {
  constructor(filterModel) {
    this.model = filterModel;
    this.elements = {};
    this.isInitialized = false;
  }

  /**
   * Initialize the filter view
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
    const regionLabel = document.querySelector(
      '.custom-dropdown label[for="region-filter"]'
    );
    const worktypeLabel = document.querySelector(
      '.custom-dropdown label[for="work-type-filter"]'
    );
    const regionDropdown = regionLabel ? regionLabel.parentElement : null;
    const worktypeDropdown = worktypeLabel ? worktypeLabel.parentElement : null;

    this.elements = {
      filterContainer: document.querySelector(".filter-container"),
      filterBtn: document.getElementById("filter-btn"),
      filterClose: document.getElementById("filter-close"),
      resetBtn: document.getElementById("reset"),
      regionDropdown: regionDropdown,
      worktypeDropdown: worktypeDropdown,
      regionOptions: regionDropdown
        ? regionDropdown.querySelectorAll(".dropdown-option")
        : [],
      worktypeOptions: worktypeDropdown
        ? worktypeDropdown.querySelectorAll(".dropdown-option")
        : [],
      regionDisplay: regionDropdown
        ? regionDropdown.querySelector(".value-display")
        : null,
      worktypeDisplay: worktypeDropdown
        ? worktypeDropdown.querySelector(".value-display")
        : null,
      gridContainer: document.querySelector(".grid-container"),
    };
  }

  /**
   * Render the filter view
   */
  render() {
    this.renderDropdowns();
    this.updateDisplayText();
    this.renderLoadingOrError();
  }

  /**
   * Render dropdown options
   */
  renderDropdowns() {
    // Render region options
    if (this.elements.regionOptions && this.elements.regionOptions.length) {
      const regions = this.model.getRegions();
      if (regions && regions.length) {
        this.renderDropdownOptions(this.elements.regionOptions, regions);
      }
    }

    // Render work type options
    if (this.elements.worktypeOptions && this.elements.worktypeOptions.length) {
      const workTypes = this.model.getWorkTypes();
      if (workTypes && workTypes.length) {
        this.renderDropdownOptions(this.elements.worktypeOptions, workTypes);
      }
    }
  }

  /**
   * Render dropdown options
   */
  renderDropdownOptions(optionElements, options) {
    if (!optionElements || typeof optionElements.forEach !== "function") return;
    optionElements.forEach((element, index) => {
      const checkbox = element.querySelector('input[type="checkbox"]');
      if (checkbox && options[index]) {
        checkbox.value = options[index];
        // Update text content if needed
        const textNode = element.childNodes[element.childNodes.length - 1];
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          textNode.textContent = ` ${options[index]}`;
        }
      }
    });
  }

  /**
   * Update display text for dropdowns
   */
  updateDisplayText() {
    const state = this.model.getState();
    const { isLoadingFilters, filterLoadError } = state;

    const setDisplayText = (displayEl, selectedArray, optionsArray) => {
      if (!displayEl) return;
      if (isLoadingFilters) {
        displayEl.textContent = "Loading...";
        return;
      }
      if (filterLoadError) {
        displayEl.textContent = "Failed to load";
        return;
      }
      if (Array.isArray(selectedArray) && selectedArray.length > 0) {
        displayEl.textContent = selectedArray.join(", ");
        return;
      }
      if (Array.isArray(optionsArray) && optionsArray.length === 0) {
        displayEl.textContent = "No options available";
        return;
      }
      displayEl.textContent = "Select an option";
    };

    // Update region display
    setDisplayText(this.elements.regionDisplay, state.region, this.model.getRegions());
    // Update work type display
    setDisplayText(this.elements.worktypeDisplay, state.worktype, this.model.getWorkTypes());

    // loading/error handled elsewhere
  }

  /**
   * Render loading or error placeholders inside dropdown lists
   */
  renderLoadingOrError() {
    const { isLoadingFilters, filterLoadError } = this.model.getState();

    const updateList = (dropdown) => {
      if (!dropdown) return;
      const list = dropdown.querySelector('.dropdown-options');
      if (!list) return;
      // Clear list items when loading or error to show a placeholder
      if (isLoadingFilters || filterLoadError) {
        list.innerHTML = '';
        const li = document.createElement('li');
        li.className = 'dropdown-option placeholder';
        li.textContent = isLoadingFilters ? 'Loading options...' : 'Failed to load options';
        list.appendChild(li);
      } else {
        // Re-render options from model when data available
        const opts = dropdown === this.elements.regionDropdown ? this.model.getRegions() : this.model.getWorkTypes();
        const hasPlaceholder = !!list.querySelector('.placeholder');
        const needsRebuild = hasPlaceholder || list.children.length !== opts.length;
        if (needsRebuild && Array.isArray(opts)) {
          list.innerHTML = '';
          if (opts.length === 0) {
            const li = document.createElement('li');
            li.className = 'dropdown-option placeholder';
            li.textContent = 'No options available';
            list.appendChild(li);
          } else {
            opts.forEach((val) => {
              const li = document.createElement('li');
              li.className = 'dropdown-option';
              li.innerHTML = `<input type="checkbox" value="${val}" /> ${val}`;
              list.appendChild(li);
            });
          }
          // re-cache option nodes and re-bind events
          if (dropdown === this.elements.regionDropdown) {
            this.elements.regionOptions = dropdown.querySelectorAll('.dropdown-option');
            this.bindDropdownOptionEvents(this.elements.regionDropdown, this.elements.regionOptions, 'region');
          } else {
            this.elements.worktypeOptions = dropdown.querySelectorAll('.dropdown-option');
            this.bindDropdownOptionEvents(this.elements.worktypeDropdown, this.elements.worktypeOptions, 'worktype');
          }
        }
      }
    };

    updateList(this.elements.regionDropdown);
    updateList(this.elements.worktypeDropdown);
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    this.bindDropdownEvents();
    this.bindFilterToggleEvents();
    this.bindResetEvent();
  }

  /**
   * Bind dropdown events
   */
  bindDropdownEvents() {
    // Global dropdown close listener
    document.addEventListener("click", (e) => {
      const dropdowns = document.querySelectorAll(".custom-dropdown");
      dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove("open");
        }
      });
    });

    // Region dropdown events
    if (this.elements.regionDropdown && this.elements.regionOptions) {
      this.bindDropdownOptionEvents(
        this.elements.regionDropdown,
        this.elements.regionOptions,
        "region"
      );
    }

    // Work type dropdown events
    if (this.elements.worktypeDropdown && this.elements.worktypeOptions) {
      this.bindDropdownOptionEvents(
        this.elements.worktypeDropdown,
        this.elements.worktypeOptions,
        "worktype"
      );
    }
  }

  /**
   * Bind dropdown option events
   */
  bindDropdownOptionEvents(dropdown, options, filterKey) {
    if (!dropdown || !options) return;
    const selected = dropdown.querySelector(".dropdown-selected");
    const display = dropdown.querySelector(".value-display");

    // Toggle dropdown
    if (selected) {
      selected.addEventListener("click", (e) => {
        e.stopPropagation();

        // Close other dropdowns
        document.querySelectorAll(".custom-dropdown").forEach((dd) => {
          if (dd !== dropdown) {
            dd.classList.remove("open");
          }
        });

        dropdown.classList.toggle("open");
      });
    }

    // Option selection
    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();

        const checkbox = option.querySelector('input[type="checkbox"]');
        const value = checkbox.value.trim();

        // Avoid double toggle when clicking checkbox directly
        if (e.target.tagName.toLowerCase() !== "input") {
          checkbox.checked = !checkbox.checked;
        }

        if (checkbox.checked) {
          if (filterKey === "region") {
            this.model.addRegion(value);
          } else if (filterKey === "worktype") {
            this.model.addWorkType(value);
          }
          option.classList.add("selected-option");
        } else {
          if (filterKey === "region") {
            this.model.removeRegion(value);
          } else if (filterKey === "worktype") {
            this.model.removeWorkType(value);
          }
          option.classList.remove("selected-option");
        }

        dropdown.classList.remove("open");
      });
    });
  }

  /**
   * Bind filter toggle events
   */
  bindFilterToggleEvents() {
    if (this.elements.filterBtn) {
      this.elements.filterBtn.addEventListener("click", () => {
        this.elements.gridContainer.classList.toggle("hide-filter");
      });
    }

    if (this.elements.filterClose) {
      this.elements.filterClose.addEventListener("click", () => {
        this.elements.gridContainer.classList.add("hide-filter");
      });
    }
  }

  /**
   * Bind reset event
   */
  bindResetEvent() {
    if (this.elements.resetBtn) {
      this.elements.resetBtn.addEventListener("click", () => {
        this.resetUI();
        this.model.reset();
      });
    }
  }

  /**
   * Reset UI elements
   */
  resetUI() {
    // Uncheck all checkboxes
    document
      .querySelectorAll('.custom-dropdown input[type="checkbox"]')
      .forEach((cb) => {
        cb.checked = false;
      });

    // Remove selected classes
    document.querySelectorAll(".dropdown-option").forEach((option) => {
      option.classList.remove("selected-option");
    });

    // Reset display text
    this.updateDisplayText();

    // Close dropdowns
    document.querySelectorAll(".custom-dropdown").forEach((dropdown) => {
      dropdown.classList.remove("open");
    });

    // Clear search input (sidebar search)
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.value = '';
      // Also notify filter model to clear search if any
      if (typeof this.model.setSearch === 'function') {
        this.model.setSearch('');
      }
    }
  }

  /**
   * Subscribe to model changes
   */
  subscribeToModel() {
    this.model.subscribe((state) => {
      // rebuild lists/placeholders first
      this.renderLoadingOrError();
      // then update texts and selection states
      this.updateDisplayText();
      this.updateCheckboxStates(state);
    });
  }

  /**
   * Update checkbox states based on model state
   */
  updateCheckboxStates(state) {
    // Update region checkboxes
    if (this.elements.regionOptions && this.elements.regionOptions.forEach) {
      this.elements.regionOptions.forEach((option) => {
        const checkbox = option.querySelector('input[type="checkbox"]');
        if (!checkbox) return;
        const value = checkbox.value.trim();

        if (state.region.includes(value)) {
          checkbox.checked = true;
          option.classList.add("selected-option");
        } else {
          checkbox.checked = false;
          option.classList.remove("selected-option");
        }
      });
    }

    // Update work type checkboxes
    if (
      this.elements.worktypeOptions &&
      this.elements.worktypeOptions.forEach
    ) {
      this.elements.worktypeOptions.forEach((option) => {
        const checkbox = option.querySelector('input[type="checkbox"]');
        if (!checkbox) return;
        const value = checkbox.value.trim();

        if (state.worktype.includes(value)) {
          checkbox.checked = true;
          option.classList.add("selected-option");
        } else {
          checkbox.checked = false;
          option.classList.remove("selected-option");
        }
      });
    }
  }

  /**
   * Show filter container
   */
  show() {
    this.elements.gridContainer.classList.remove("hide-filter");
  }

  /**
   * Hide filter container
   */
  hide() {
    this.elements.gridContainer.classList.add("hide-filter");
  }

  /**
   * Toggle filter container visibility
   */
  toggle() {
    this.elements.gridContainer.classList.toggle("hide-filter");
  }

  /**
   * Destroy the view
   */
  destroy() {
    if (this.model) {
      this.model.unsubscribe(this.updateDisplayText);
    }
    this.isInitialized = false;
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = FilterView;
} else {
  window.FilterView = FilterView;
}
