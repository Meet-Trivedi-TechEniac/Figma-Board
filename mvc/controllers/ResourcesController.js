/**
 * Resource Controller - Coordinates resources data fetching and rendering
 */
class ResourceController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    // Initialize controller
    init() {
        // Subscribe to model updates
        this.model.subscribe((resources, status) => {
            this.view.renderResources(resources, status);
        });

        // Initialize view
        this.view.init();

        // Load initial resources
        this.loadResources();
    }

    // Fetch resources from model
    async loadResources(options = {}) {
        await this.model.fetchResources(options);
    }

    // Expose method to refresh resources (e.g., for button click)
    refreshResources() {
        this.loadResources({ simulateFailure: false, delayMs: 2000 });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResourceController;
} else {
    window.ResourceController = ResourceController;
}