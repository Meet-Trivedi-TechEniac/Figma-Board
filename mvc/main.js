/**
 * Main entry point for MVC Calendar Application
 */

// Global application instance
let appController = null;

/**
 * Initialize the MVC application
 */
function initializeMVCApp() {
    try {
        // Create and initialize the main application controller
        appController = new AppController();
        appController.init();
        
        console.log('MVC Calendar Application started successfully!');
        
        // Make app controller globally accessible for debugging
        window.mvcApp = appController;
        
        return appController;
    } catch (error) {
        console.error('Failed to initialize MVC Calendar Application:', error);
        return null;
    }
}

/**
 * Get the application controller instance
 */
function getAppController() {
    return appController;
}

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMVCApp);
} else {
    // DOM is already ready
    initializeMVCApp();
}

/**
 * Export functions for use in other modules
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeMVCApp,
        getAppController
    };
} else {
    window.initializeMVCApp = initializeMVCApp;
    window.getAppController = getAppController;
}
