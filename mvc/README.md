# MVC Calendar Application Architecture

This document describes the MVC (Model-View-Controller) architecture implementation for the Calendar application.

## Overview

The application has been refactored from a monolithic structure to a clean MVC architecture, making it more maintainable, testable, and scalable for future dynamic data integration.

## Directory Structure

```
mvc/
├── models/           # Data models and business logic
│   ├── FilterModel.js
│   ├── TimeModel.js
│   └── DateModel.js
├── views/            # UI components and rendering logic
│   ├── FilterView.js
│   ├── TimeView.js
│   └── DateView.js
├── controllers/      # Application logic and coordination
│   ├── FilterController.js
│   ├── TimeController.js
│   ├── DateController.js
│   └── AppController.js
├── services/         # External services and API calls (future)
├── utils/            # Utility functions (future)
├── main.js          # Application entry point
└── README.md        # This file
```

## Architecture Components

### Models

Models represent the data and business logic of the application. They are responsible for:
- Managing application state
- Data validation
- Business rules
- Observer pattern for state changes

#### FilterModel
- Manages filter state (regions, work types, search, sorting)
- Provides methods for adding/removing filters
- Implements observer pattern for state changes

#### TimeModel
- Manages time settings (start time, end time, format)
- Provides time validation and formatting
- Handles time picker configurations

#### DateModel
- Manages date selection and range state
- Provides date navigation (previous, next, today)
- Handles date formatting and validation

### Views

Views handle the UI rendering and user interactions. They are responsible for:
- DOM manipulation
- Event binding
- UI updates based on model changes

#### FilterView
- Renders filter dropdowns and options
- Handles filter UI interactions
- Updates display based on filter state

#### TimeView
- Renders time picker components
- Handles time input interactions
- Manages time picker initialization

#### DateView
- Renders date range picker
- Handles date navigation buttons
- Manages date picker initialization

### Controllers

Controllers coordinate between models and views, handling application logic. They are responsible for:
- Business logic coordination
- Cross-component communication
- Event handling and routing

#### FilterController
- Coordinates filter logic between model and view
- Handles filter application to data
- Manages filter state changes

#### TimeController
- Coordinates time logic between model and view
- Handles time validation and business rules
- Manages time-related functionality

#### DateController
- Coordinates date logic between model and view
- Handles date navigation and validation
- Manages date-related functionality

#### AppController
- Main application coordinator
- Initializes all components
- Manages cross-component communication
- Handles global application state

## Key Features

### Observer Pattern
All models implement an observer pattern, allowing components to subscribe to state changes:

```javascript
// Subscribe to filter changes
filterModel.subscribe((state) => {
    console.log('Filter state changed:', state);
});

// Subscribe to time changes
timeModel.subscribe((state) => {
    console.log('Time state changed:', state);
});
```

### State Management
Centralized state management with methods to export/import application state:

```javascript
// Get current application state
const state = appController.getApplicationState();

// Export state as JSON
const stateJson = appController.exportState();

// Import state from JSON
appController.importState(stateJson);
```

### Cross-Component Communication
Controllers can subscribe to changes in other controllers:

```javascript
// Filter changes trigger calendar updates
filterController.subscribeToFilterChanges((filterState) => {
    // Update calendar with filtered data
    updateCalendarWithFilters(filterState);
});
```

## Usage

### Basic Initialization

```javascript
// The application automatically initializes when the page loads
// Access the main controller
const app = window.mvcApp;

// Get specific controllers
const filterController = app.getController('filter');
const timeController = app.getController('time');
const dateController = app.getController('date');
```

### Working with Filters

```javascript
// Add region filter
filterController.addRegion('Bankstown');

// Add work type filter
filterController.addWorkType('Care Worker');

// Set search term
filterController.setSearch('Diana');

// Reset all filters
filterController.reset();

// Get filtered data
const filteredResources = filterController.getFilteredAndSearchedResources(allResources, events);
```

### Working with Time

```javascript
// Set start time
timeController.setStartTime('09:00:00');

// Set end time
timeController.setEndTime('17:00:00');

// Validate time range
const isValid = timeController.validateTimeRange();

// Get time slots
const slots = timeController.getTimeSlots(30); // 30-minute intervals
```

### Working with Dates

```javascript
// Set date range
dateController.setDateRange(new Date('2025-01-01'), new Date('2025-01-10'));

// Navigate to previous period
dateController.goToPrevious();

// Navigate to next period
dateController.goToNext();

// Go to today
dateController.goToToday();

// Get working days
const workingDays = dateController.getWorkingDaysInRange();
```

## Integration with Existing Code

The MVC implementation is designed to work alongside the existing calendar code:

1. **Backward Compatibility**: Original functions like `setIntialData()`, `setLeaveData()`, etc. are preserved
2. **Gradual Migration**: You can gradually migrate functionality to the MVC structure
3. **Event Integration**: MVC components can trigger existing calendar updates

### Example Integration

```javascript
// In your existing calendar code
function updateCalendarWithMVC() {
    const app = window.mvcApp;
    if (!app) return;

    const filterState = app.getController('filter').getFilterState();
    const timeState = app.getController('time').getTimeState();
    const dateState = app.getController('date').getDateState();

    // Apply MVC state to calendar
    if (window.ecCalendar) {
        window.ecCalendar.setOption('slotMinTime', timeState.startTime);
        window.ecCalendar.setOption('slotMaxTime', timeState.endTime);
        window.ecCalendar.setOption('date', dateState.startDate);
        window.ecCalendar.setOption('duration', { days: dateState.duration });
    }
}
```

## Testing

Use the `mvc-test.html` file to test the MVC implementation:

1. Open `mvc-test.html` in a browser
2. Open browser console to see initialization logs
3. Test filter, time, and date functionality
4. Verify that MVC components work alongside existing calendar

## Future Enhancements

### Services Layer
- API integration for dynamic data
- Data persistence
- External service communication

### Utils Layer
- Common utility functions
- Helper methods
- Data transformation utilities

### Additional Models
- EventModel for calendar events
- ResourceModel for resource management
- UserModel for user preferences

### Advanced Features
- State persistence in localStorage
- Undo/redo functionality
- Real-time collaboration
- Advanced filtering and sorting

## Benefits of MVC Architecture

1. **Separation of Concerns**: Clear separation between data, UI, and logic
2. **Maintainability**: Easier to maintain and modify individual components
3. **Testability**: Components can be tested in isolation
4. **Scalability**: Easy to add new features and components
5. **Reusability**: Components can be reused across different parts of the application
6. **Dynamic Data Ready**: Architecture supports easy integration of dynamic data sources

## Migration Strategy

1. **Phase 1**: ✅ Outer components (Filter, Time, Date) - COMPLETED
2. **Phase 2**: Calendar events and resources
3. **Phase 3**: API integration and dynamic data
4. **Phase 4**: Advanced features and optimizations

This MVC architecture provides a solid foundation for scaling the calendar application and integrating dynamic data sources while maintaining the existing functionality.
