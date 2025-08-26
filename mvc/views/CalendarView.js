/**
 * Calendar View - Manages EventCalendar instance and UI rendering hooks
 */
class CalendarView {
	constructor(containerSelector = '#ec') {
		this.containerSelector = containerSelector;
		this.ec = null;
	}

	init(options = {}) {
		const ecEl = document.querySelector(this.containerSelector);
		if (!ecEl || typeof window.EventCalendar === 'undefined') {
			console.error('Calendar container or EventCalendar library not found.');
			return null;
		}

		// Reuse existing calendar if present
		if (window.ecCalendar) {
			this.ec = window.ecCalendar;
			this.applyRenderers();
			return this.ec;
		}

		this.ec = window.EventCalendar.create(ecEl, {
			view: 'resourceTimelineDay',
			initialView: 'resourceTimelineDay',
			slotWidth: '220',
			slotHeight: '80',
			duration: { days: 10 },
			headerToolbar: false,
			editable: false,
			durationEditable: false,
			eventStartEditable: false,
			slotEventOverlap: true,
			dayHeaderFormat: (date) => this.parseDate(date),
			eventContent: (arg) => this.renderEventDetails(arg),
			resourceLabelContent: (info) => this.renderResources(info),
			viewDidMount: () => this.onViewMounted(),
			eventAllUpdated: () => this.refreshUI(),
			...options
		});
		window.ecCalendar = this.ec;
		return this.ec;
	}

	applyRenderers() {
		if (!this.ec) return;
		this.ec.setOption('dayHeaderFormat', (date) => this.parseDate(date));
		this.ec.setOption('eventContent', (arg) => this.renderEventDetails(arg));
		this.ec.setOption('resourceLabelContent', (info) => this.renderResources(info));
		this.ec.setOption('viewDidMount', () => this.onViewMounted());
		this.ec.setOption('eventAllUpdated', () => this.refreshUI());
	}

	setOption(key, value) {
		if (!this.ec) return;
		this.ec.setOption(key, value);
	}

	setEvents(events) {
		if (!this.ec) return;
		this.ec.setOption('events', Array.isArray(events) ? events : []);
		// ensure UI sync after data changes
		setTimeout(() => this.refreshUI(), 0);
	}

	setResources(resources) {
		if (!this.ec) return;
		this.ec.setOption('resources', Array.isArray(resources) ? resources : []);
		// ensure UI sync after data changes
		setTimeout(() => this.refreshUI(), 0);
	}

	refreshUI() {
		TooltipService.init('.ec-body');
		this.syncDynamicHeight();
		this.applyObserver();
	}

	onViewMounted() {
		// Inject search UI via AppController; here ensure tooltips/height ready
		this.refreshUI();
	}

	parseDate(date) {
		const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
		const weekday = weekdayFormatter.format(date);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		const d = new Date(date);
		const excelEpoch = new Date(1900, 0, 1);
		const daysSinceEpoch = Math.floor((d - excelEpoch) / (1000 * 60 * 60 * 24)) + 1;
		const weekday2 = ((d.getDay() + 6) % 7) + 1;
		const parity = Math.floor((daysSinceEpoch - weekday2 + 1 / 7) % 2) + 1;
		const label = `${weekday} - ${day}-${month}-${year} (Week-${parity})`;
		const colorMap = { 1: '#ff0026ff', 2: '#225f27ff' };
		const color = colorMap[parity] || '#00000';
		return { html: `<div style="color: ${color}; padding: 4px 8px; border-radius: 4px;">${label}</div>` };
	}

	renderTooltipContent(arg) {
		return `
			<div class="custom-tooltip-content">
				<p class="event-desc-id">${arg.event.extendedProps.employeeID}</p>
				<p>12/11/2025 - 18/11/2025</p>
				<div class="event-desc-grid">
					<p>Address (Work Order)</p>
					<p>${arg.event.extendedProps.address}</p>
					<p>Resources</p>
					<p>${arg.event.extendedProps.eventType}</p>
					<p>Booking Status</p>
					<p>${arg.event.extendedProps.bookingStatus}</p>
				</div>
			</div>
		`;
	}

	renderEventDetails(arg) {
		const start = new Date(arg.event.start);
		const end = new Date(arg.event.end);
		const diffMs = end - start;
		const diffMins = Math.floor(diffMs / (1000 * 60));
		const hours = Math.floor(diffMins / 60);
		const minutes = diffMins % 60;
		const durationStr = `${hours}h ${minutes.toString().padStart(2, '0')}m`;
		arg.event.extendedProps.duration = durationStr;
		const tooltipHtml = this.renderTooltipContent(arg).replace(/"/g, '&quot;').replace(/\n/g, '');
		return {
			html: `
				<div class='event-disp-container' 
				 data-bs-toggle="tooltip"
				 data-bs-html="true" 
				 data-bs-placement="bottom"
				 data-popper-placement="left" 
				 data-bs-custom-class="custom-tooltip" 
				 title="${tooltipHtml}">
				<div class="event-disp">
					<p><span class="event-emp-id">${arg.event.extendedProps.employeeID}</span>${arg.event.extendedProps.employeeName}</p>
					<p>${arg.event.extendedProps.region}</p>
					<p>${arg.event.extendedProps.eventType}</p>
					<p>${arg.event.extendedProps.duration}</p>
				</div>
				<div class="event-disp-icon">...</div>
				</div>
			`
		};
	}

	renderResources(info) {
		const resource = info?.resource;
		const props = resource?.extendedProps;

		// Handle loading state
		if (resource?.id === "loading") {
			console.log('Rendering loading state'); // Debug log
			return {
				html: `<div class="person-details">
                        <div class="person-info">
                            <h5>Loading...</h5>
                        </div>
                    </div>`
			};
		}

		// Handle error state
		if (resource?.id === "error") {
			console.log('Rendering error state'); // Debug log
			return {
				html: `<div class="person-details">
                        <div class="person-info">
                            <h5 style="color:red;">Error loading resources</h5>
                        </div>
                    </div>`
			};
		}

		if (!props || !props.imgUrl || !props.name) {
			return { html: `<div class="person-details">No Content</div>` };
		}
		return {
			html: `<div class="person-details">
				<div class="profile-img"><img src="${props.imgUrl}" alt=""></div>
				<div class="person-info"><h5>${props.name}</h5></div>
			</div>`
		};
	}

	syncDynamicHeight() {
		const dayContainers = document.querySelectorAll('.ec-content > .ec-days:last-child > .ec-day > .ec-events');
		const target = document.querySelector('.ec-resource:last-child .person-details');
		const ecEvent = document.querySelector('.ec-content  .ec-days:last-child  .ec-day');
		const ecDaysLast = document.querySelector('.ec-days:last-child');
		const ecResourceLast = document.querySelector('.ec-resource:last-child');
		if (dayContainers.length && target && ecDaysLast && ecResourceLast) {
			let maxOffsetTop = 0;
			dayContainers.forEach((eventsContainer) => {
				const events = eventsContainer.querySelectorAll('.ec-event');
				events.forEach((ev) => { const eventTop = ev.offsetTop; if (eventTop > maxOffsetTop) { maxOffsetTop = eventTop; } });
			});
			const finalTop = maxOffsetTop == 0 ? 80 : maxOffsetTop + 85;
			target.style.height = finalTop + 'px';
			ecDaysLast.style.setProperty('--bor-top', `${finalTop}px`);
			ecResourceLast.style.setProperty('--bor-top', `${finalTop}px`);
			if (ecEvent) ecEvent.style.height = `${finalTop}px`;
		} else {
			// no-op if not present
		}
	}

	applyObserver() {
		const scrollContainer = document.querySelector('.ec-header');
		const dayHeads = document.querySelectorAll('.ec-day-head');
		if (!scrollContainer || !dayHeads.length) return;
		function updatePosition() {
			const containerRect = scrollContainer.getBoundingClientRect();
			dayHeads.forEach((head) => {
				const labelDiv = head.querySelector('time > div');
				if (!labelDiv) return;
				const headRect = head.getBoundingClientRect();
				if (headRect.right > containerRect.left && headRect.left < containerRect.right) {
					const offset = Math.max(0, containerRect.left - headRect.left);
					labelDiv.style.transform = `translateX(${offset}px)`;
				} else {
					labelDiv.style.transform = 'translateX(0px)';
				}
			});
		}
		scrollContainer.addEventListener('scroll', updatePosition);
		updatePosition();
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = CalendarView;
} else {
	window.CalendarView = CalendarView;
}
