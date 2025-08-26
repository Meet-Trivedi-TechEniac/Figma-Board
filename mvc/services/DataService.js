/**
 * DataService - Provides data for events and resources
 * For now, returns static data (migrated from calendar.js) but shaped for MVC.
 */
class DataService {
	static getInitialData() {
		const events = [
			{
				resourceId: "1",
				start: new Date("2025-08-13T11:45:00+05:30"),
				end: new Date("2025-08-14T13:00:00+05:30"),
				id: "123",
				type: "Full",
				slotEventOverlap: true,
				editable: false,
				durationEditable: false,
				eventStartEditable: false,
				className: ["ec-event-active"],
				extendedProps: {
					employeeID: "100123", // Remove
					employeeName: "Diana Alexiou",
					address: "12 King Street, Newtown NSW 2042",
					careerType: "Care Type xyz",
					bookingStatus: "Scheduled",
					region: "Bankstown",
					eventType: "Care Worker",
				},



			},
			
		];
		const resources = [
			{
				id: 1,
				extendedProps: {
					name: "Diana Alexiou",
					totalTime: "244h 29m ",
					imgUrl: "Assets/profiles/R1.jpg",
				},
			},
			
		];
		
		
		
		
		// const events = [];
		// const resources = [];

		return { events, resources };
	}

	static getLeaveData() {
		const events = [
			{
				resourceId: '8', start: new Date('2025-08-13T10:45:00+05:30'), end: new Date('2025-08-13T12:00:00+05:30'), id: '123', type: 'Full',
				editable: false, durationEditable: false, eventStartEditable: false, className: ['ec-event-yellow'],
				extendedProps: { employeeID: '100123', employeeName: 'Liam Carter', address: '12 King Street, Newtown NSW 2042', careerType: '	Care Worker', bookingStatus: 'Scheduled', region: 'Bankstown', eventType: 'Care Worker' }
			},
			{
				resourceId: '3', start: new Date('2025-08-13T10:00:00+05:30'), end: new Date('2025-08-13T10:00:00+05:30'),
				editable: false, durationEditable: false, eventStartEditable: false, className: ['ec-event-gray'],
				extendedProps: { employeeID: '100124', employeeName: 'Freya Dawson', address: '100 Elizabeth St, Sydney NSW', careerType: '	Care Worker', bookingStatus: 'Scheduled', region: 'Bankstown', eventType: 'Village Care Worker' }
			},
			{
				resourceId: '15', start: new Date('2025-08-13T10:45:00+05:30'), end: new Date('2025-08-13T12:00:00+05:30'), id: '123', type: 'Full',
				editable: false, durationEditable: false, eventStartEditable: false, className: ['ec-event-pink'],
				extendedProps: { employeeID: '100123', employeeName: 'Mason Green', address: '12 King Street, Newtown NSW 2042', careerType: 'Care Type xyz', bookingStatus: 'Scheduled', region: 'Bankstown', eventType: 'Care Worker' }
			},
		];

		const resources = [
			{ id: 8, extendedProps: { name: 'Liam Carter', totalTime: '244h 29m ', imgUrl: 'Assets/profiles/R4.jpg' } },
			{ id: 3, extendedProps: { name: 'Freya Dawson', totalTime: '244h 29m ', imgUrl: 'Assets/profiles/R2.jpg' } },
			{ id: 15, extendedProps: { name: 'Mason Green', totalTime: '244h 29m ', imgUrl: 'Assets/profiles/R1.jpg' } }
		];

		return { events, resources };
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = DataService;
} else {
	window.DataService = DataService;
}







