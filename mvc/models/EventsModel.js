/**
 * Events Model - Manages calendar events data
 */
class EventsModel {
	constructor() {
		this.events = [];
		this.observers = [];
	}

	setEvents(events) {
		this.events = Array.isArray(events) ? events : [];
		this.notify();
	}

	getEvents() {
		return Array.isArray(this.events) ? this.events : [];
	}

	updateEvent(predicate, updater) {
		this.events = this.events.map(ev => (predicate(ev) ? updater(ev) : ev));
		this.notify();
	}

	addEvent(event) {
		this.events = [...this.events, event];
		this.notify();
	}

	removeEvent(predicate) {
		this.events = this.events.filter(ev => !predicate(ev));
		this.notify();
	}

	subscribe(callback) {
		this.observers.push(callback);
	}

	unsubscribe(callback) {
		this.observers = this.observers.filter(obs => obs !== callback);
	}

	notify() {
		this.observers.forEach(cb => {
			try { cb(this.getEvents()); } catch (e) { console.error('EventsModel observer error', e); }
		});
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = EventsModel;
} else {
	window.EventsModel = EventsModel;
}
