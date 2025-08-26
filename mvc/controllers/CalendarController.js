/**
 * Calendar Controller - Coordinates calendar view with models and services
 */
class CalendarController {
	constructor(calendarView, eventsModel, resourcesModel, filterController, timeController, dateController) {
		this.view = calendarView;
		this.eventsModel = eventsModel;
		this.resourcesModel = resourcesModel;
		this.filterController = filterController;
		this.timeController = timeController;
		this.dateController = dateController;
		this.isInitialized = false;
	}

	init() {
		if (this.isInitialized) return;
		this.view.init();
		this.bindModelSubscriptions();
		this.bindControllerSubscriptions();
		this.isInitialized = true;
	}

	bindModelSubscriptions() {
		this.eventsModel.subscribe((events) => {
			this.view.setEvents(events);
		});
		this.resourcesModel.subscribe((resources) => {
			this.view.setResources(resources);
		});
	}

	bindControllerSubscriptions() {
		if (this.filterController?.subscribeToFilterChanges) {
			this.filterController.subscribeToFilterChanges(() => {
				this.applyFiltersToCalendar();
			});
		}
		if (this.timeController?.subscribeToTimeChanges) {
			this.timeController.subscribeToTimeChanges((timeState) => {
				if (!this.view) return;
				this.view.setOption('slotMinTime', timeState.startTime);
				this.view.setOption('slotMaxTime', timeState.endTime);
				this.view.refreshUI();
			});
		}
		if (this.dateController?.subscribeToDateChanges) {
			this.dateController.subscribeToDateChanges((dateState) => {
				if (!this.view) return;
				this.view.setOption('date', dateState.startDate);
				this.view.setOption('duration', { days: dateState.duration });
			});
		}
	}

	applyFiltersToCalendar() {
		const events = this.eventsModel.getEvents();
		const resources = this.resourcesModel.getResources();
		const filteredResources = this.filterController.getFilteredAndSearchedResources(resources, events);
		this.view.setResources(filteredResources);
		// events stay same; filter is applied via resources selection in this UI
		this.view.refreshUI();
	}

	loadInitialData() {
		const { events, resources } = DataService.getInitialData();
		this.eventsModel.setEvents(events);
		this.resourcesModel.setResources(resources);
	}

	loadLeaveData() {
		const { events, resources } = DataService.getLeaveData();
		this.eventsModel.setEvents(events);
		this.resourcesModel.setResources(resources);
	}

	setTimeRange(startTime, endTime) {
		this.view.setOption('slotMinTime', startTime);
		this.view.setOption('slotMaxTime', endTime);
		this.view.refreshUI();
	}

	setDateRange(startDate, days) {
		this.view.setOption('date', startDate);
		this.view.setOption('duration', { days });
	}

	refreshUI() {
		this.view.refreshUI();
	}

	destroy() {
		this.isInitialized = false;
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = CalendarController;
} else {
	window.CalendarController = CalendarController;
}
