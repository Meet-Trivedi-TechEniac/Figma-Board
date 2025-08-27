var EventCalendar = window.EventCalendar;

// --- FILTER/SEARCH STATE ---
let filterState = {
    region: null,
    worktype: null,
    search: "",
    sortAsc: true,
};

//Global Data
let eventData = [];
let resourceData = [];

let filterStatus = {
    isLoading: false,
    isError: false,
    region: [],
    worktype: [],
};

let resorcesState = {
    isLoading: false,
    isError: false,
    resourceData: [],
};

const eventStatus = {
    isLoading: true,
    isError: false,
    eventData: [],
};

let currentRequestToken = 0; // Global counter

function setIntialData() {
    eventData = [
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
                employeeID: "100123",
                employeeName: "Diana Alexiou",
                address: "12 King Street, Newtown NSW 2042",
                careerType: "Care Type xyz",
                bookingStatus: "Scheduled",
                region: "Bankstown",
                eventType: "Care Worker",
            },
        },
        {
            resourceId: "1",
            start: new Date("2025-08-13T11:55:00+05:30"),
            end: new Date("2025-08-13T13:00:00+05:30"),
            id: "123",
            type: "Full",
            slotEventOverlap: true,
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100123",
                employeeName: "Diana Alexiou",
                address: "12 King Street, Newtown NSW 2042",
                careerType: "Care Type xyz",
                bookingStatus: "Scheduled",
                region: "Bankstown",
                eventType: "Care Worker",
            },
        },
        {
            resourceId: "2",
            start: new Date("2025-08-13T12:00:00+05:30"),
            end: new Date("2025-08-13T13:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100124",
                employeeName: "Olivia Clarke",
                address: "100 Elizabeth St, Sydney NSW",
                careerType: "Care Type xyz",
                bookingStatus: "Scheduled",
                region: "Beacon - Blacktown",
                eventType: "Care Worker",
            },
        },
        {
            resourceId: "1",
            start: new Date("2025-08-13T09:20:00+05:30"),
            end: new Date("2025-08-13T11:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100125",
                employeeName: "Liam Bennett",
                address: "34 Pitt Street, Redfern NSW",
                careerType: "Care Type xyz",
                bookingStatus: "Completed",
                region: "Bowral",
                eventType: "Care Worker",
            },
        },
        {
            resourceId: "1",
            start: new Date("2025-08-13T10:35:00+05:30"),
            end: new Date("2025-08-13T15:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100125",
                employeeName: "Liam Bennett",
                address: "34 Pitt Street, Redfern NSW",
                careerType: "Care Type xyz",
                bookingStatus: "Completed",
                region: "Bowral",
                eventType: "Care Worker",
            },
        },
        {
            resourceId: "18",
            start: new Date("2025-08-13T13:45:00+05:30"),
            end: new Date("2025-08-13T15:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100125",
                employeeName: "Liam Bennett",
                address: "34 Pitt Street, Redfern NSW",
                careerType: "Care Type xyz",
                bookingStatus: "Completed",
                region: "Bowral",
                eventType: "Care Worker",
            },
        },
        {
            resourceId: "4",
            start: new Date("2025-08-13T01:45:00+05:30"),
            end: new Date("2025-08-13T12:45:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100126",
                employeeName: "Mia Walker",
                address: "77 George St, The Rocks NSW",
                careerType: "Care Type xyz",
                bookingStatus: "Completed",
                region: "Cityeast",
                eventType: "Care Worker",
            },
        },
        {
            resourceId: "5",
            start: new Date("2025-08-13T10:00:00+05:30"),
            end: new Date("2025-08-13T11:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100127",
                employeeName: "Ethan Johnson",
                address: "22 Oxford St, Darlinghurst NSW",
                careerType: "Care Type xyz",
                bookingStatus: "Completed",
                region: "Dural",
                eventType: "Care Worker",
            },
        },
        {
            resourceId: "6",
            start: new Date("2025-08-13T08:00:00+05:30"),
            end: new Date("2025-08-13T09:30:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100128",
                employeeName: "Chloe Walker",
                address: "5 High Street, Parramatta NSW",
                careerType: "Care Type A",
                bookingStatus: "Scheduled",
                region: "Hawkesbury",
                eventType: "Care Worker",
            },
        },
        {
            resourceId: "7",
            start: new Date("2025-08-13T10:00:00+05:30"),
            end: new Date("2025-08-13T11:15:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100129",
                employeeName: "Noah Carter",
                address: "88 Victoria Rd, Rydalmere NSW",
                careerType: "Care Type B",
                bookingStatus: "Scheduled",
                region: "Beacon - Blacktown",
                eventType: "Domestic Assistance Worker",
            },
        },
        {
            resourceId: "8",
            start: new Date("2025-08-13T11:30:00+05:30"),
            end: new Date("2025-08-13T13:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100130",
                employeeName: "Grace Foster",
                address: "33 Norton St, Leichhardt NSW",
                careerType: "Care Type C",
                bookingStatus: "Completed",
                region: "Bowral",
                eventType: "Domestic Assistance Worker",
            },
        },
        {
            resourceId: "9",
            start: new Date("2025-08-13T13:15:00+05:30"),
            end: new Date("2025-08-13T14:45:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100131",
                employeeName: "Oscar Hughes",
                address: "50 King St, Mascot NSW",
                careerType: "Care Type D",
                bookingStatus: "Completed",
                region: "Cityeast",
                eventType: "Domestic Assistance Worker",
            },
        },
        {
            resourceId: "10",
            start: new Date("2025-08-13T09:00:00+05:30"),
            end: new Date("2025-08-13T10:30:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100132",
                employeeName: "Liam Carter",
                address: "120 George St, Liverpool NSW",
                careerType: "Care Type A",
                bookingStatus: "Scheduled",
                region: "Dural",
                eventType: "Domestic Assistance Worker",
            },
        },
        {
            resourceId: "11",
            start: new Date("2025-08-13T14:00:00+05:30"),
            end: new Date("2025-08-13T15:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100133",
                employeeName: "Ava Reynolds",
                address: "78 Campbell St, Surry Hills NSW",
                careerType: "Care Type B",
                bookingStatus: "Completed",
                region: "Hawkesbury",
                eventType: "Domestic Assistance Worker",
            },
        },
        {
            resourceId: "12",
            start: new Date("2025-08-13T10:45:00+05:30"),
            end: new Date("2025-08-13T12:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100134",
                employeeName: "Freya Dawson",
                address: "101 Queen St, Beaconsfield NSW",
                careerType: "Care Type C",
                bookingStatus: "Scheduled",
                region: "Hawkesbury",
                eventType: "Village Care Worker",
            },
        },
        {
            resourceId: "13",
            start: new Date("2025-08-13T08:30:00+05:30"),
            end: new Date("2025-08-13T09:30:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100135",
                employeeName: "Sienna Brooks",
                address: "43 Main St, Zetland NSW",
                careerType: "Care Type D",
                bookingStatus: "Scheduled",
                region: "Dural",
                eventType: "Village Care Worker",
            },
        },
        {
            resourceId: "14",
            start: new Date("2025-08-13T15:00:00+05:30"),
            end: new Date("2025-08-13T16:30:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100136",
                employeeName: "Leo Murphy",
                address: "67 Bridge Rd, Glebe NSW",
                careerType: "Care Type A",
                bookingStatus: "Completed",
                region: "Cityeast",
                eventType: "Village Care Worker",
            },
        },
        {
            resourceId: "15",
            start: new Date("2025-08-13T13:00:00+05:30"),
            end: new Date("2025-08-13T14:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100137",
                employeeName: "Lily Morgan",
                address: "19 Stanley St, Darlinghurst NSW",
                careerType: "Care Type B",
                bookingStatus: "Scheduled",
                region: "Bowral",
                eventType: "Village Care Worker",
            },
        },
        {
            resourceId: "16",
            start: new Date("2025-08-13T11:15:00+05:30"),
            end: new Date("2025-08-13T12:45:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100138",
                employeeName: "Elliot Brooks",
                address: "55 Bay St, Botany NSW",
                careerType: "Care Type C",
                bookingStatus: "Completed",
                region: "Beacon - Blacktown",
                eventType: "Village Care Worker",
            },
        },
        {
            resourceId: "17",
            start: new Date("2025-08-13T08:45:00+05:30"),
            end: new Date("2025-08-13T10:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100139",
                employeeName: "Mason Green",
                address: "66 Clarence St, Sydney NSW",
                careerType: "Care Type D",
                bookingStatus: "Scheduled",
                region: "Bankstown",
                eventType: "Village Care Worker",
            },
        },
        {
            resourceId: "18",
            start: new Date("2025-08-13T14:15:00+05:30"),
            end: new Date("2025-08-13T15:30:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100140",
                employeeName: "Isla Matthews",
                address: "20 Regent St, Chippendale NSW",
                careerType: "Care Type A",
                bookingStatus: "Completed",
                region: "Bankstown",
                eventType: "Domestic Assistance Worker",
            },
        },
    ];

    resourceData = [
        {
            id: 1,
            extendedProps: {
                name: "Diana Alexiou",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R1.jpg",
            },
        },
        {
            id: 2,
            extendedProps: {
                name: "Olivia Clarke",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R2.jpg",
            },
        },
        {
            id: 3,
            extendedProps: {
                name: "Liam Bennett",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R3.jpg",
            },
        },
        {
            id: 4,
            extendedProps: {
                name: "Mia Walker",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R4.jpg",
            },
        },
        {
            id: 5,
            extendedProps: {
                name: "Ethan Johnson",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R5.jpg",
            },
        },
        {
            id: 6,
            extendedProps: {
                name: "Chloe Walker",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R6.jpg",
            },
        },
        {
            id: 7,
            extendedProps: {
                name: "Noah Carter",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R7.jpg",
            },
        },
        {
            id: 8,
            extendedProps: {
                name: "Grace Foster",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R8.jpg",
            },
        },
        {
            id: 9,
            extendedProps: {
                name: "Oscar Hughes",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R9.jpg",
            },
        },
        {
            id: 10,
            extendedProps: {
                name: "Liam Carter",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R1.jpg",
            },
        },
        {
            id: 11,
            extendedProps: {
                name: "Ava Reynolds",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R2.jpg",
            },
        },
        {
            id: 12,
            extendedProps: {
                name: "Freya Dawson",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R3.jpg",
            },
        },
        {
            id: 13,
            extendedProps: {
                name: "Sienna Brooks",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R4.jpg",
            },
        },
        {
            id: 14,
            extendedProps: {
                name: "Leo Murphy",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R5.jpg",
            },
        },
        {
            id: 15,
            extendedProps: {
                name: "Lily Morgan",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R6.jpg",
            },
        },
        {
            id: 16,
            extendedProps: {
                name: "Elliot Brooks",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R7.jpg",
            },
        },
        {
            id: 17,
            extendedProps: {
                name: "Mason Green",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R8.jpg",
            },
        },
        {
            id: 18,
            extendedProps: {
                name: "Isla Matthews",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R9.jpg",
            },
        },
    ];
    reRenderEvents();
}

function setLeaveData() {
    eventData = [
        {
            resourceId: "1",
            start: new Date("2025-08-13T10:45:00+05:30"),
            end: new Date("2025-08-13T12:00:00+05:30"),
            id: "123",
            type: "Full",
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100123",
                employeeName: "Diana Alexiou",
                address: "12 King Street, Newtown NSW 2042",
                careerType: "Care Type xyz",
                bookingStatus: "Scheduled",
                region: "Bankstown",
                eventType: "Care Worker",
            },
        },
        {
            resourceId: "2",
            start: new Date("2025-08-13T10:00:00+05:30"),
            end: new Date("2025-08-13T10:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-gray"],
            extendedProps: {
                employeeID: "100124",
                employeeName: "Olivia Clarke",
                address: "100 Elizabeth St, Sydney NSW",
                careerType: "Care Type xyz",
                bookingStatus: "Scheduled",
                region: "Bankstown",
                eventType: "Care Worker",
            },
        },
        {
            resourceId: "3",
            start: new Date("2025-08-13T13:30:00+05:30"),
            end: new Date("2025-08-13T15:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100125",
                employeeName: "Liam Bennett",
                address: "34 Pitt Street, Redfern NSW",
                careerType: "Care Type xyz",
                bookingStatus: "Completed",
                region: "Bowral",
                eventType: "Care Worker",
            },
        },
        {
            resourceId: "4",
            start: new Date("2025-08-13T09:45:00+05:30"),
            end: new Date("2025-08-13T10:45:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-pink"],
            extendedProps: {
                employeeID: "100126",
                employeeName: "Mia Walker",
                address: "77 George St, The Rocks NSW",
                careerType: "Care Type xyz",
                bookingStatus: "Completed",
                region: "Cityeast",
                eventType: "Care Worker",
            },
        },
        {
            resourceId: "5",
            start: new Date("2025-08-13T12:00:00+05:30"),
            end: new Date("2025-08-13T13:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-yellow"],
            extendedProps: {
                employeeID: "100127",
                employeeName: "Ethan Johnson",
                address: "22 Oxford St, Darlinghurst NSW",
                careerType: "Care Type xyz",
                bookingStatus: "Completed",
                region: "Dural",
                eventType: "Care Worker",
            },
        },
        {
            resourceId: "6",
            start: new Date("2025-08-13T08:00:00+05:30"),
            end: new Date("2025-08-13T09:30:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-gray"],
            extendedProps: {
                employeeID: "100128",
                employeeName: "Chloe Walker",
                address: "5 High Street, Parramatta NSW",
                careerType: "Care Type A",
                bookingStatus: "Scheduled",
                region: "Hawkesbury",
                eventType: "Care Worker",
            },
        },
        {
            resourceId: "7",
            start: new Date("2025-08-13T10:00:00+05:30"),
            end: new Date("2025-08-13T11:15:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100129",
                employeeName: "Noah Carter",
                address: "88 Victoria Rd, Rydalmere NSW",
                careerType: "Care Type B",
                bookingStatus: "Scheduled",
                region: "Beacon - Blacktown",
                eventType: "Domestic Assistance Worker",
            },
        },
        {
            resourceId: "8",
            start: new Date("2025-08-13T11:30:00+05:30"),
            end: new Date("2025-08-13T13:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-yellow"],
            extendedProps: {
                employeeID: "100130",
                employeeName: "Grace Foster",
                address: "33 Norton St, Leichhardt NSW",
                careerType: "Care Type C",
                bookingStatus: "Completed",
                region: "Bowral",
                eventType: "Domestic Assistance Worker",
            },
        },
        {
            resourceId: "9",
            start: new Date("2025-08-13T13:15:00+05:30"),
            end: new Date("2025-08-13T14:45:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-pink"],
            extendedProps: {
                employeeID: "100131",
                employeeName: "Oscar Hughes",
                address: "50 King St, Mascot NSW",
                careerType: "Care Type D",
                bookingStatus: "Completed",
                region: "Cityeast",
                eventType: "Domestic Assistance Worker",
            },
        },
        {
            resourceId: "10",
            start: new Date("2025-08-13T09:00:00+05:30"),
            end: new Date("2025-08-13T10:30:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100132",
                employeeName: "Liam Carter",
                address: "120 George St, Liverpool NSW",
                careerType: "Care Type A",
                bookingStatus: "Scheduled",
                region: "Dural",
                eventType: "Domestic Assistance Worker",
            },
        },
        {
            resourceId: "11",
            start: new Date("2025-08-13T14:00:00+05:30"),
            end: new Date("2025-08-13T15:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-yellow"],
            extendedProps: {
                employeeID: "100133",
                employeeName: "Ava Reynolds",
                address: "78 Campbell St, Surry Hills NSW",
                careerType: "Care Type B",
                bookingStatus: "Completed",
                region: "Hawkesbury",
                eventType: "Domestic Assistance Worker",
            },
        },
        {
            resourceId: "12",
            start: new Date("2025-08-13T10:45:00+05:30"),
            end: new Date("2025-08-13T12:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-pink"],
            extendedProps: {
                employeeID: "100134",
                employeeName: "Freya Dawson",
                address: "101 Queen St, Beaconsfield NSW",
                careerType: "Care Type C",
                bookingStatus: "Scheduled",
                region: "Hawkesbury",
                eventType: "Village Care Worker",
            },
        },
        {
            resourceId: "13",
            start: new Date("2025-08-13T08:30:00+05:30"),
            end: new Date("2025-08-13T09:30:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-gray"],
            extendedProps: {
                employeeID: "100135",
                employeeName: "Sienna Brooks",
                address: "43 Main St, Zetland NSW",
                careerType: "Care Type D",
                bookingStatus: "Scheduled",
                region: "Dural",
                eventType: "Village Care Worker",
            },
        },
        {
            resourceId: "14",
            start: new Date("2025-08-13T15:00:00+05:30"),
            end: new Date("2025-08-13T16:30:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100136",
                employeeName: "Leo Murphy",
                address: "67 Bridge Rd, Glebe NSW",
                careerType: "Care Type A",
                bookingStatus: "Completed",
                region: "Cityeast",
                eventType: "Village Care Worker",
            },
        },
        {
            resourceId: "15",
            start: new Date("2025-08-13T13:00:00+05:30"),
            end: new Date("2025-08-13T14:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-yellow"],
            extendedProps: {
                employeeID: "100137",
                employeeName: "Lily Morgan",
                address: "19 Stanley St, Darlinghurst NSW",
                careerType: "Care Type B",
                bookingStatus: "Scheduled",
                region: "Bowral",
                eventType: "Village Care Worker",
            },
        },
        {
            resourceId: "16",
            start: new Date("2025-08-13T11:15:00+05:30"),
            end: new Date("2025-08-13T12:45:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-pink"],
            extendedProps: {
                employeeID: "100138",
                employeeName: "Elliot Brooks",
                address: "55 Bay St, Botany NSW",
                careerType: "Care Type C",
                bookingStatus: "Completed",
                region: "Beacon - Blacktown",
                eventType: "Village Care Worker",
            },
        },
        {
            resourceId: "17",
            start: new Date("2025-08-13T08:45:00+05:30"),
            end: new Date("2025-08-13T10:00:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-gray"],
            extendedProps: {
                employeeID: "100139",
                employeeName: "Mason Green",
                address: "66 Clarence St, Sydney NSW",
                careerType: "Care Type D",
                bookingStatus: "Scheduled",
                region: "Bankstown",
                eventType: "Village Care Worker",
            },
        },
        {
            resourceId: "18",
            start: new Date("2025-08-13T14:15:00+05:30"),
            end: new Date("2025-08-13T15:30:00+05:30"),
            editable: false,
            durationEditable: false,
            eventStartEditable: false,
            className: ["ec-event-active"],
            extendedProps: {
                employeeID: "100140",
                employeeName: "Isla Matthews",
                address: "20 Regent St, Chippendale NSW",
                careerType: "Care Type A",
                bookingStatus: "Completed",
                region: "Bankstown",
                eventType: "Domestic Assistance Worker",
            },
        },
    ];

    resourceData = [
        {
            id: 8,
            extendedProps: {
                name: "Liam Carter",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R4.jpg",
            },
        },
        {
            id: 3,
            extendedProps: {
                name: "Freya Dawson",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R2.jpg",
            },
        },
        {
            id: 15,
            extendedProps: {
                name: "Mason Green",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R1.jpg",
            },
        },
        {
            id: 1,
            extendedProps: {
                name: "Leo Murphy",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R6.jpg",
            },
        },
        {
            id: 11,
            extendedProps: {
                name: "Oscar Hughes",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R9.jpg",
            },
        },
        {
            id: 6,
            extendedProps: {
                name: "Ava Reynolds",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R5.jpg",
            },
        },
        {
            id: 13,
            extendedProps: {
                name: "Sienna Brooks",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R8.jpg",
            },
        },
        {
            id: 2,
            extendedProps: {
                name: "Chloe Walker",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R3.jpg",
            },
        },
        {
            id: 10,
            extendedProps: {
                name: "Elliot Brooks",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R7.jpg",
            },
        },
        {
            id: 4,
            extendedProps: {
                name: "Grace Foster",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R6.jpg",
            },
        },
        {
            id: 5,
            extendedProps: {
                name: "Mia Walker",
                totalTime: "244h 29m ",
                imgUrl: "Assets/profiles/R9.jpg",
            },
        },
    ];

    reRenderEvents();
}

function syncDynamicHeight() {
    const dayContainers = document.querySelectorAll(
        ".ec-content > .ec-days:last-child > .ec-day > .ec-events"
    );
    const target = document.querySelector(
        ".ec-resource:last-child .person-details"
    );
    const ecEvent = document.querySelector(
        ".ec-content  .ec-days:last-child  .ec-day"
    );

    const ecDaysLast = document.querySelector(".ec-days:last-child");
    const ecResourceLast = document.querySelector(".ec-resource:last-child");

    if (dayContainers.length && target && ecDaysLast && ecResourceLast) {
        let maxOffsetTop = 0;

        dayContainers.forEach((eventsContainer) => {
            const events = eventsContainer.querySelectorAll(".ec-event");

            events.forEach((ev) => {
                const eventTop = ev.offsetTop;
                if (eventTop > maxOffsetTop) {
                    maxOffsetTop = eventTop;
                }
            });
        });

        const finalTop = maxOffsetTop == 0 ? 80 : maxOffsetTop + 85;
        target.style.height = finalTop + "px";
        ecDaysLast.style.setProperty("--bor-top", `${finalTop}px`);
        ecResourceLast.style.setProperty("--bor-top", `${finalTop}px`);

        console.log("Applied dynamic --bor-top:", finalTop);

        ecEvent.style.height = `${finalTop}px`;
    } else {
        console.warn("syncDynamicHeight: Required elements not found.");
    }
}

function disposeAllTooltips() {
    const tooltipElements = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
    );
    tooltipElements.forEach((el) => {
        const instance = bootstrap.Tooltip.getInstance(el);
        if (instance) instance.dispose();
    });
}

function reRenderEvents() {
    //Rerender new Events
    window.ecCalendar.setOption("events", eventData);
    window.ecCalendar.setOption("resources", resourceData);
    resetFilters();
}

// function changeActivetab() {
//     const initalTabBtn = document.getElementById("intial-tab-btn");
//     const leaveTabBtn = document.getElementById("leave-tab-btn");

//     initalTabBtn.addEventListener("click", (el) => {
//         //Chnage Ui
//         initalTabBtn.children[0].classList.add("active-tab-btn");
//         leaveTabBtn.children[0].classList.remove("active-tab-btn");

//         handleGetResorces(getBookableResources, mapOverIntialData);
//         resetFilters();
//     });

//     leaveTabBtn.addEventListener("click", (el) => {
//         //Chnage Ui
//         leaveTabBtn.children[0].classList.add("active-tab-btn");
//         initalTabBtn.children[0].classList.remove("active-tab-btn");

//         handleGetResorces(getTimeOffRequests, mapOverLeaveData);
//         resetFilters();
//     });
// }



function mapEvents(agreementResponse, applyLeaveColors = false, timeOffResponse = null) {
    const validResourceIds = new Set(resourceData.map((resource) => resource.id));
    const statusMap = {
        690970000: "Active",
        690970001: "Processed",
        690970002: "Canceled",
    };
    const leaveTypeClassMap = {
        // Yellow class for Long Service Leave and related types
        285930012: "ec-event-yellow", // Long Service Leave
        285930013: "ec-event-yellow", // Mat. Leave - Full
        285930014: "ec-event-yellow", // Mat. Leave - Half
        285930015: "ec-event-yellow", // Mat. Leave - No Pay    
        285930027: "ec-event-yellow", // Workers Comp
        285930028: "ec-event-yellow", // Workers Comp (ARV)

        // Pink class for Other leave types
        285930003: "ec-event-pink", // Sick Leave
        285930023: "ec-event-pink", // Sick Leave - Unpaid
        285930024: "ec-event-pink", // Sick Leave(w / Cert)
        285930004: "ec-event-pink", // Annual Leave
        285930005: "ec-event-pink", // Carers Leave
        285930029: "ec-event-pink", // Casual Worker - Leave
        285930006: "ec-event-pink", // Compassionate Leave
        285930007: "ec-event-pink", // Disaster Leave
        285930008: "ec-event-pink", // Staff Not Available
        285930010: "ec-event-pink", // Jury Leave
        285930011: "ec-event-pink", // Leave Without Pay
        285930016: "ec-event-pink", // Parental Leave
        285930018: "ec-event-pink", // Pub Hol - Not Worked
        285930017: "ec-event-pink", // Pub Hol - Worked Block Shift
        285930019: "ec-event-pink", // Purchased Leave
        285930020: "ec-event-pink", // Refused Work
        285930021: "ec-event-pink", // Rehab
        285930000: "ec-event-pink", // Special Paid Leave
        285930025: "ec-event-pink", // Study Leave
        285930026: "ec-event-pink", // Sun.Pub.Hol.Leave
    };

    const mappedEvents = agreementResponse.entities
        .filter((event) => validResourceIds.has(event._msdyn_resource_value))
        .map((event) => {
            const startDate = new Date(event.msdyn_bookingdate);
            const durationMinutes =
                event.msdyn_bookingsetup.msdyn_estimatedduration || 60;
            const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);
            const addressParts = [
                event?.msdyn_workorder?.msdyn_address1 || "",
                event?.msdyn_workorder?.msdyn_address2 || "",
                event?.msdyn_workorder?.msdyn_address3 || "",
                event?.msdyn_workorder?.msdyn_city || "",
                event?.msdyn_workorder?.msdyn_stateorprovince || "",
                event?.msdyn_workorder?.msdyn_postalcode || "",
                event?.msdyn_workorder?.msdyn_country || "",
            ]

                .filter((part) => part)
                .join(", ");

            let className = "ec-event-active";
            let resourceTimeOffs;
            if (applyLeaveColors && timeOffResponse) {
                const timeOffMap = new Map();
                if (timeOffResponse.entities && timeOffResponse.entities.length > 0) {
                    timeOffResponse.entities.forEach((timeOff) => {
                        const resourceId = timeOff._msdyn_resource_value;
                        const start = new Date(timeOff.msdyn_starttime);
                        const end = new Date(timeOff.msdyn_endtime);
                        if (!timeOffMap.has(resourceId)) {
                            timeOffMap.set(resourceId, []);
                        }
                        timeOffMap.get(resourceId).push({ start, end, leaveType: timeOff.vel_leavetype });
                    });
                }
                resourceTimeOffs = timeOffMap.get(event._msdyn_resource_value) || [];
                console.log("resourceTimeOffs", resourceTimeOffs)
                if (resourceTimeOffs.length > 0) {
                    for (const timeOff of resourceTimeOffs) {

                        className = leaveTypeClassMap[timeOff.leaveType] || "ec-event-active";
                        break;

                    }
                }
            }
            console.log("className", className)
            return {
                resourceId: event?._msdyn_resource_value,
                start: startDate,
                end: endDate,
                id: event?.msdyn_agreementbookingdateid,
                type: "Full",
                slotEventOverlap: true,
                editable: false,
                durationEditable: false,
                eventStartEditable: false,
                className: [className],
                extendedProps: {
                    bookingID: event?._msdyn_agreement_value,
                    employeeID: event?.msdyn_name,
                    employeeName: event?.msdyn_resource?.name || "N/A",
                    address: addressParts,
                    suburb: event?.msdyn_workorder?.msdyn_city || "N/A",
                    serviceType: event?.msdyn_bookingsetup?._ang_incidenttype_value || "Care Worker",
                    bookingStatus: statusMap[event?.msdyn_status] || "Unknown",
                    region: event?.msdyn_workorder?._msdyn_serviceterritory_value,
                    agreementBookingSetupId: event?.msdyn_bookingsetup?.msdyn_agreementbookingsetupid,
                    leaveType: resourceTimeOffs?.find((timeOff) =>
                        (startDate >= timeOff.start && startDate < timeOff.end) ||
                        (endDate > timeOff.start && endDate <= timeOff.end) ||
                        (startDate <= timeOff.start && endDate >= timeOff.end)
                    )?.leaveType || null,
                },
            };
        });

    eventStatus.isLoading = false;
    eventStatus.eventData = mappedEvents;
    eventData = mappedEvents; // Update global eventData
    console.log(`Events fetched successfully (${applyLeaveColors ? "Leave Conflicts" : "Initial"} Tab):`, mappedEvents);
    reRenderEvents();
    return mappedEvents;
}

// Updated changeActivetab
async function changeActivetab() {
    const initalTabBtn = document.getElementById("intial-tab-btn");
    const leaveTabBtn = document.getElementById("leave-tab-btn");

    initalTabBtn.addEventListener("click", async (el) => {
        // Change UI
        initalTabBtn.children[0].classList.add("active-tab-btn");
        leaveTabBtn.children[0].classList.remove("active-tab-btn");

        await handleGetResorces(getBookableResources, mapOverIntialData);
        const agreementResponse = await getAgreementBookingDatesBetween();
        mapEvents(agreementResponse, false); // No leave colors for initial tab
        resetFilters();




    });

    leaveTabBtn.addEventListener("click", async (el) => {
        // Change UI
        leaveTabBtn.children[0].classList.add("active-tab-btn");
        initalTabBtn.children[0].classList.remove("active-tab-btn");

        await handleGetResorces(getTimeOffRequests, mapOverLeaveData);
        const agreementResponse = await getAgreementBookingDatesBetween();
        const timeOffResponse = await getTimeOffRequests();
        mapEvents(agreementResponse, true, timeOffResponse); // Apply leave colors for Leave Conflicts tab
        resetFilters();
    });
}








function parseDate(date) {
    const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
    });
    const weekday = weekdayFormatter.format(date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const d = new Date(date);

    // Convert to Excel date number (days since 1900-01-01)
    const excelEpoch = new Date(1900, 0, 1);
    const daysSinceEpoch =
        Math.floor((d - excelEpoch) / (1000 * 60 * 60 * 24)) + 1;

    // WEEKDAY function with mode 2 (Monday = 1, Sunday = 7)
    const weekday2 = ((d.getDay() + 6) % 7) + 1;

    // Excel formula: INT(MOD(date-WEEKDAY(date,2)+1/7,2))+1
    let parity = Math.floor((daysSinceEpoch - weekday2 + 1 / 7) % 2) + 1;

    let label = `${weekday} - ${day}-${month}-${year} (Week-${parity})`;

    const colorMap = {
        1: "#4F7AB3",
        2: "#225f27ff",
    };

    const color = colorMap[parity] || "#00000";

    // Return HTML string with inline background style
    return {
        html: `<div style="color: ${color}; padding: 4px 8px; border-radius: 4px;">${label}</div>`,
    };
}

function renderTooltipContent(arg) {
    return `
    <div class="custom-tooltip-content">
      <p class="event-desc-id">${arg.event.extendedProps.employeeID}</p>
     
      <p>${new Date(arg.event.start).toLocaleDateString()} - ${new Date(
        arg.event.end
    ).toLocaleDateString()}</p>
      <div class="event-desc-grid">
        <p>Address (Work Order)</p>
        <p>${arg.event.extendedProps.address}</p>
        <p>Suburb</p>
        <p>${arg.event.extendedProps.suburb}</p>
        <p>Booking Status</p>
        <p>${arg.event.extendedProps.bookingStatus}</p>
        <p>Agreement Booking</p>
        <p><a href="/agreement-booking/${arg.event.extendedProps.agreementBookingSetupId
        }" target="_blank">View Agreement</a></p>
      </div>
    </div>
  `;
}

function renderStatusIcon(status) {
    const icon = {
        Processed: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" color="#4F7AB3">
                <path
                    d="M15.3437 4.84375L16.5937 3.40625C16.8437 3.125 16.8125 2.65625 16.5313 2.40625C16.1875 2.15625 15.75 2.1875 15.5 2.5L14.1875 4.0625C13.1563 3.46875 11.9687 3.0625 10.7187 2.96875V1.9375H12.7188C13.0938 1.9375 13.4063 1.625 13.4063 1.25C13.4063 0.875 13.0938 0.5625 12.7188 0.5625H7.3125C6.9375 0.5625 6.625 0.875 6.625 1.25C6.625 1.625 6.9375 1.9375 7.3125 1.9375H9.3125V2.9375C5.0625 3.28125 1.71875 6.84375 1.71875 11.1875C1.71875 15.75 5.4375 19.4688 10 19.4688C14.5625 19.4688 18.2812 15.75 18.2812 11.1875C18.2812 8.65625 17.125 6.375 15.3437 4.84375ZM10 18.0625C6.21875 18.0625 3.125 14.9688 3.125 11.1875C3.125 7.40625 6.21875 4.3125 10 4.3125C13.7813 4.3125 16.875 7.40625 16.875 11.1875C16.875 14.9688 13.7813 18.0625 10 18.0625Z"
                    fill="currentColor" />
                <path
                    d="M10.6875 11.0625V7.4375C10.6875 7.0625 10.375 6.75 10 6.75C9.625 6.75 9.3125 7.0625 9.3125 7.4375V11.3437C9.3125 11.5312 9.375 11.7188 9.53125 11.8438L11.8438 14.1562C11.9688 14.2812 12.1563 14.375 12.3438 14.375C12.5313 14.375 12.7188 14.3125 12.8438 14.1562C13.125 13.875 13.125 13.4375 12.8438 13.1562L10.6875 11.0625Z"
                    fill="currentColor" />
            </svg>`,
        Canceled: `<svg xmlns="http://www.w3.org/2000/svg" fill="#FA5252" viewBox="0 0 50 50" width="20px" height="20px">
                  <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"/>
                </svg>`,
        unscheduled: null,
    };

    return icon[status] || " ";
}

function formatEventTime(date) {
    // Use Intl.DateTimeFormat for localized formatting
    const formatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Use 12-hour format
        // timeZoneName: "short", // Get timezone abbreviation (e.g., "IST", "PST")
    });

    // Format the date and extract parts
    const parts = formatter.formatToParts(new Date(date));
    const formattedDate = parts
        .map((part) => {
            if (part.type === "timeZoneName") {
                return `(${part.value})`; // Wrap timezone in parentheses
            }
            return part.value;
        })
        .join("")
        .replace(/,\s/, " "); // Replace comma with space

    return formattedDate;
}

function renderEventDetails(arg) {
    console.log("args", arg);
    const start = new Date(arg.event.start);
    const end = new Date(arg.event.end);
    const diffMs = end - start;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;

    const nameArray = arg.event.extendedProps.employeeName.split(" ");
    const firstName = nameArray[0] || "";
    const lastName = nameArray.slice(1).join(" ") || "";

    const durationStr = `${hours}h ${minutes.toString().padStart(2, "0")}m`;
    arg.event.extendedProps.duration = durationStr;

    const tooltipHtml = renderTooltipContent(arg)
        .replace(/"/g, "&quot;") // Escape double quotes for title attribute
        .replace(/\n/g, ""); // Remove line breaks
    console.log(
        "arg.event.extendedProps.duration",
        arg.event.extendedProps.duration
    );

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
            <p>${firstName} ${lastName}</p> <!-- Display first name and last name -->
            <p>${arg.event.extendedProps.suburb || "N/A"
            }</p> <!-- Display suburb -->
            <!-- Display type of service -->
            <p>${formatEventTime(start)} - ${arg.event.extendedProps.duration
            }</p> <!-- Display formatted start time -->
             
 
             <!-- Display duration -->
        </div>
        <div class="event-disp-icon">
       
            ${renderStatusIcon(arg.event.extendedProps.bookingStatus)}
        </div>
      </div>
    `,
    };
}

function renderResources(info) {
    const resource = info?.resource;
    const props = info?.resource?.extendedProps;

    // Handle loading state
    if (resource.id === "loading") {
        return {
            html: `<div class="person-details">
               <div class="person-info">
                 <h5>Loading...</h5>
               </div>
             </div>`,
        };
    }

    // Handle error state
    if (resource?.id === "error") {
        return {
            html: `<div class="person-details">
               <div class="person-info">
                 <h5 style="color:red;">Error loading resources</h5>
               </div>
             </div>`,
        };
    }

    // Validate required fields
    if (!props || !props?.imgUrl || !props?.name) {
        return {
            html: `<div class="person-details">No Content</div>`,
        };
    }

    return {
        html: `<div class="person-details">
        <div class="profile-img">
          <img src="${info?.resource?.extendedProps?.imgUrl}" alt="">
        </div>
        <div class="person-info">   
          <h5>${info?.resource?.extendedProps?.name}</h5>
         
        </div>
      </div>`,
    };
}

function getResources() {
    return typeof resourceData !== "undefined" ? resourceData : [];
}

function getEvents() {
    // Always return the current global event data
    return typeof eventData !== "undefined" ? eventData : [];
}

// New Filters
// 🔹 FILTER: Only Events by Region
function getFilteredEventsOnly() {
    const events = getEvents();

    if (Array.isArray(filterState.region) && filterState.region.length > 0) {
        return events.filter((ev) =>
            filterState.region.includes(ev.extendedProps.region)
        );
    }

    return events;
}

// 🔹 FILTER: Only Resources by WorkType + Search + Sort
function getFilteredResourcesOnly() {
    let resources = getResources();

    // WorkType
    if (Array.isArray(filterState.worktype) && filterState.worktype.length > 0) {
        resources = resources.filter((res) =>
            filterState.worktype.includes(res.extendedProps.resourceType)
        );
    }

    // Search
    if (filterState.search) {
        const searchLower = filterState.search.toLowerCase();
        resources = resources.filter((res) =>
            res.extendedProps.name.toLowerCase().includes(searchLower)
        );
    }

    // Sort
    resources.sort((a, b) => {
        const valA = a?.extendedProps.name.toLowerCase();
        const valB = b?.extendedProps.name.toLowerCase();
        if (valA < valB) return filterState.sortAsc ? -1 : 1;
        if (valA > valB) return filterState.sortAsc ? 1 : -1;
        return 0;
    });

    return resources;
}

function updateResources(resources) {
    if (window.ecCalendar) {
        disposeAllTooltips();
        window.ecCalendar.setOption("resources", resources);
        setTimeout(() => {
            refreshCalendarUI();
        }, 0);
    }
}

function updateEvents(events) {
    if (window.ecCalendar) {
        disposeAllTooltips();
        window.ecCalendar.setOption("events", events);
        setTimeout(() => {
            refreshCalendarUI();
        }, 0);
    }
}

// 🔹 Apply ONLY Resource Filter
function applyOnlyResourceFilter() {
    const filteredResources = getFilteredResourcesOnly();

    // Reset if filters applied but no results
    const anyFilter =
        (filterState.worktype && filterState.worktype !== "Select an option") ||
        filterState.search;

    if (anyFilter && filteredResources.length === 0) {
        updateResources(getResources());
    } else {
        updateResources(filteredResources);
    }
}

// 🔹 Apply ONLY Event Filter
function applyOnlyEventFilter() {
    const filteredEvents = getFilteredEventsOnly();

    const anyFilter =
        Array.isArray(filterState.region) &&
        filterState.region.length > 0 &&
        filterState.region[0] !== "Select an option";

    if (anyFilter && filteredEvents.length === 0) {
        updateEvents(getEvents());
    } else {
        updateEvents(filteredEvents);
    }
}

// 🔹 Apply BOTH (reset if needed)
function applyAllFilters() {
    const filteredResources = getFilteredResourcesOnly();
    const filteredEvents = getFilteredEventsOnly();

    const resourceFiltersApplied =
        (filterState.worktype && filterState.worktype !== "Select an option") ||
        filterState.search;

    const eventFiltersApplied =
        Array.isArray(filterState.region) &&
        filterState.region.length > 0 &&
        filterState.region[0] !== "Select an option";

    // Reset to all if either has no results and filters are active
    const finalResources =
        resourceFiltersApplied && filteredResources.length === 0
            ? getResources()
            : filteredResources;

    const finalEvents =
        eventFiltersApplied && filteredEvents.length === 0
            ? getEvents()
            : filteredEvents;

    updateResources(finalResources);
    updateEvents(finalEvents);
}

function setupFilterDropdownsAndReset() {
    // Initialize as arrays for multi-select
    filterState.region = [];
    filterState.worktype = [];

    // Helper for multi-select dropdown
    function setupMultiSelect(dropdownSelector, filterKey) {
        const dropdown = document.querySelector(dropdownSelector).parentElement;
        const listItems = dropdown.querySelectorAll(".dropdown-option");
        const valueDisplay = dropdown.querySelector(".value-display");

        listItems.forEach((li) => {
            const checkbox = li.querySelector("input[type='checkbox']");
            const value = checkbox.value.trim();

            li.addEventListener("click", function (e) {
                // Avoid toggling twice when clicking the checkbox directly
                if (e.target.tagName.toLowerCase() !== "input") {
                    checkbox.checked = !checkbox.checked;
                }

                if (checkbox.checked) {
                    if (!filterState[filterKey].includes(value)) {
                        filterState[filterKey].push(value);
                    }
                    e.target.classList.add("selected-option");
                } else {
                    filterState[filterKey] = filterState[filterKey].filter(
                        (v) => v !== value
                    );
                    e.target.classList.remove("selected-option");
                }

                // Update dropdown text
                // if (filterState[filterKey].length > 0) {
                //   valueDisplay.textContent = filterState[filterKey].join(", ");
                // } else {
                //   valueDisplay.textContent = "Select an option";
                // }

                if (filterState[filterKey].length > 0) {
                    valueDisplay.textContent = `${filterState[filterKey].length} item(s) selected`;
                } else {
                    valueDisplay.textContent = "Select an option";
                }

                applyAllFilters();
            });
        });
    }

    // Setup for Region and Worktype
    setupMultiSelect('.custom-dropdown label[for="region-filter"]', "region");
    setupMultiSelect(
        '.custom-dropdown label[for="work-type-filter"]',
        "worktype"
    );

    // Reset button logic
    const resetBtn = document.getElementById("reset");
    if (resetBtn) {
        resetBtn.addEventListener("click", resetFilters);
    }
}

function resetFilters() {
    filterState.region = [];
    filterState.worktype = [];
    filterState.search = "";
    filterState.sortAsc = true;

    // Uncheck all checkboxes
    document
        .querySelectorAll(".custom-dropdown input[type='checkbox']")
        .forEach((cb) => (cb.checked = false));

    document
        .querySelectorAll(".dropdown-option")
        .forEach((cb) => cb.classList.remove("selected-option"));

    // Reset displayed text
    document
        .querySelectorAll(".value-display")
        .forEach((vd) => (vd.textContent = "Select an option"));

    // Reset search input
    const searchInput = document.querySelector(".search-input");
    if (searchInput) searchInput.value = "";

    $(".starttime").timepicker("setTime", "6:00 AM");
    $(".endtime").timepicker("setTime", "6:00 PM");
    applyAllFilters();
}

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function filterResources(query) {
    const allResources = getResources();
    let filteredResources = allResources;

    if (query) {
        filteredResources = allResources.filter((resource) =>
            resource.extendedProps.name.toLowerCase().includes(query)
        );
    }
    upadateResources(filteredResources);
}

function createSorter() {
    let ascending = true;

    return function () {
        const sorted = getResources().sort((a, b) => {
            const valA = a.extendedProps.name.toLowerCase();
            const valB = b.extendedProps.name.toLowerCase();

            if (valA < valB) return ascending ? -1 : 1;
            if (valA > valB) return ascending ? 1 : -1;
            return 0;
        });

        ascending = !ascending;
        upadateResources(sorted);
    };
}

function initializeAllTooltips() {
    disposeAllTooltips();
    const elements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    elements.forEach((el) => {
        const existing = bootstrap.Tooltip.getInstance(el);
        if (existing) existing.dispose();

        new bootstrap.Tooltip(el, {
            container: ".ec-body",
            boundary: "clippingParents",
            fallbackPlacements: ["top", "bottom", "left", "right"],
        });
        console.log("Updated ToolTips");
    });
}

// --- SEARCH & SORT HOOKUP ---
function renderSearch() {
    const sidebarTitle = document.querySelector(".ec-sidebar-title");
    if (!sidebarTitle) return;

    // Create container for search
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container");

    // Create search input
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.name = "search-input";
    searchInput.placeholder = "Search resources";
    searchInput.classList.add("search-input");

    // Create search icon (optional)
    const searchIcon = document.createElement("img");
    searchIcon.src =
        "https://aahdevelopment.crm6.dynamics.com/WebResources/sog_search";
    searchIcon.alt = "Search";
    searchIcon.classList.add("search-icon");

    // Create sort btn (optional)
    const sortBtn = document.createElement("button");
    const sortIcon = document.createElement("img");
    sortIcon.src =
        "https://aahdevelopment.crm6.dynamics.com/WebResources/sog_swap";
    sortIcon.alt = "Sort";
    sortBtn.classList.add("sort-btn");
    sortBtn.appendChild(sortIcon);

    // Append input and icon to container
    searchContainer.appendChild(searchIcon);
    searchContainer.appendChild(searchInput);

    // Append search container to sidebar
    sidebarTitle.appendChild(searchContainer);
    sidebarTitle.appendChild(sortBtn);

    const debouncedFilter = debounce((event) => {
        filterState.search = event.target.value.trim().toLowerCase();
        applyAllFilters();
    }, 500);

    searchInput.addEventListener("keyup", debouncedFilter);

    sortBtn.addEventListener("click", function () {
        filterState.sortAsc = !filterState.sortAsc;
        applyAllFilters();
    });
}

function applyObserver() {
    const scrollContainer = document.querySelector(".ec-header"); // horizontal scroll container
    const dayHeads = document.querySelectorAll(".ec-day-head");

    function updatePosition() {
        const containerRect = scrollContainer.getBoundingClientRect();

        dayHeads.forEach((head) => {
            const labelDiv = head.querySelector("time > div");
            if (!labelDiv) return;

            const headRect = head.getBoundingClientRect();

            if (
                headRect.right > containerRect.left &&
                headRect.left < containerRect.right
            ) {
                // Element is at least partially visible
                const offset = Math.max(0, containerRect.left - headRect.left);
                labelDiv.style.transform = `translateX(${offset}px)`;
            } else {
                // Fully outside viewport
                labelDiv.style.transform = "translateX(0px)";
            }
        });
    }

    // Update on scroll
    scrollContainer.addEventListener("scroll", updatePosition);
    // Update once at load
    updatePosition();
}

function refreshCalendarUI() {
    initializeAllTooltips();
    syncDynamicHeight();
    applyObserver();
}

function createCalendar() {
    const ecEl = document.getElementById("ec");

    if (!ecEl || typeof EventCalendar === "undefined") {
        console.error("Calendar container or EventCalendar library not found.");
        return;
    }

    const ec = EventCalendar.create(ecEl, {
        view: "resourceTimelineDay",
        initialView: "resourceTimelineDay",
        slotWidth: "220", //249
        slotHeight: "80",
        duration: { days: 10 },
        headerToolbar: false,
        editable: false,
        durationEditable: false,
        eventStartEditable: false,
        slotEventOverlap: true,

        dayHeaderFormat: parseDate,
        eventContent: renderEventDetails,
        resourceLabelContent: renderResources,
        viewDidMount: renderSearch,
        eventAllUpdated: refreshCalendarUI,
        datesSet: handleEventFetch,

        slotMinTime: "6:00:00",
        slotMaxTime: "18:00:00",
    });
    window.ecCalendar = ec;
}

function getTerritory() {
    // return window.parent.Xrm.WebApi.retrieveMultipleRecords(
    //     "territory",
    //     "?$select=territoryid,name&$filter=statecode eq 0"
    // );
}

function getCareType() {
    // return window.parent.Xrm.WebApi.retrieveMultipleRecords(
    //     "stringmap",
    //     "?$select=attributename,attributevalue,value&$filter=attributename eq 'msdyn_resourcetype'"
    // );
}

function renderDropdowns() {
    const regionLabel = document.querySelector(
        '[name="region-filter"] .value-display'
    );
    const worktypeLabel = document.querySelector(
        '[name="work-type-filter"] .value-display'
    );

    const regionDropdown = document.querySelector(
        '.custom-dropdown label[for="region-filter"]'
    ).nextElementSibling.nextElementSibling; // the <ul> after region div

    const worktypeDropdown = document.querySelector(
        '.custom-dropdown label[for="work-type-filter"]'
    ).nextElementSibling.nextElementSibling; // the <ul> after worktype div

    if (!regionDropdown || !worktypeDropdown) {
        console.error("❌ Could not find dropdown ULs");
        return;
    }

    if (filterStatus.isLoading) {
        regionLabel.textContent = "Loading...";
        worktypeLabel.textContent = "Loading...";
        return;
    }

    if (filterStatus.isError) {
        regionLabel.textContent = "Error loading options";
        worktypeLabel.textContent = "Error loading options";
        return;
    }

    // Success case
    regionLabel.textContent = filterStatus?.region?.length
        ? "Select an option"
        : "Options not found";

    worktypeLabel.textContent = filterStatus?.worktype?.length
        ? "Select an option"
        : "Options not found";

    // Clear and render region dropdown
    regionDropdown.innerHTML = "";
    filterStatus.region.forEach((r) => {
        regionDropdown.insertAdjacentHTML(
            "beforeend",
            `<li class="dropdown-option"><input type="checkbox" value="${r?.territoryid}" /> ${r?.name}</li>`
        );
    });

    // Clear and render worktype dropdown
    worktypeDropdown.innerHTML = "";
    filterStatus.worktype.forEach((w) => {
        worktypeDropdown.insertAdjacentHTML(
            "beforeend",
            `<li class="dropdown-option"><input type="checkbox" value="${w.attributevalue}" /> ${w.value}</li>`
        );
    });
}

function handleFilterFetch() {
    filterStatus.isLoading = true;
    filterStatus.isError = false;
    renderDropdowns();

    Promise.all([getTerritory(), getCareType()])
        .then(([territoryResults, careTypeResults]) => {
            filterStatus.isLoading = false;
            filterStatus.isError = false;

            filterStatus.region = territoryResults?.entities || [];
            // Extract the 'value' (or whatever you want) for care types
            filterStatus.worktype = careTypeResults?.entities || [];

            renderDropdowns();
            setupFilterDropdownsAndReset();
        })
        .catch((err) => {
            console.error(err);
            filterStatus.isLoading = false;
            filterStatus.isError = true;
            renderDropdowns();
        });
}

// Intial Data
function getBookableResources() {
    return new Promise((resolve, reject) => {
        resolve({
            entities: [
                { "@odata.context": "https://aahdevelopment.crm6.dynamics.com/api/data/v9.1/$metadata#bookableresources(name,resourcetype,UserId(photourl))" },

                {
                    "@odata.etag": "W/\"566454569\"",
                    "bookableresourceid": "b3141cf1-91e1-ee11-904c-000d3aca6924",
                    "name": "Jamie Higgins",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "cc428a1d-ac0b-ed11-b83d-00224891bbb1",
                        "systemuserid": "cc428a1d-ac0b-ed11-b83d-00224891bbb1",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"480193957\"",
                    "bookableresourceid": "157d1c09-92e1-ee11-904c-000d3aca6924",
                    "name": "Jonathan Stacey",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "353c0984-c780-ed11-81ad-00224893b533",
                        "systemuserid": "353c0984-c780-ed11-81ad-00224893b533",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"511212808\"",
                    "bookableresourceid": "c21bd34a-a606-ef11-9f89-000d3acb40a4",
                    "name": "Kerrie Ristau",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "c5ed65c6-2a49-ed11-bba2-00224893be4a",
                        "systemuserid": "c5ed65c6-2a49-ed11-bba2-00224893be4a",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"564961242\"",
                    "bookableresourceid": "e12cbc88-a606-ef11-9f89-000d3acb40a4",
                    "name": "Edward Lo",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "284848dc-fc54-ed11-9562-00224893b1c0",
                        "systemuserid": "284848dc-fc54-ed11-9562-00224893b1c0",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"480195234\"",
                    "bookableresourceid": "f3dc76b9-a606-ef11-9f89-000d3acb40a4",
                    "name": "Sacha Crick",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "fba9324c-a60c-ed11-b83d-002248128c80",
                        "systemuserid": "fba9324c-a60c-ed11-b83d-002248128c80",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"525968845\"",
                    "bookableresourceid": "4b425a52-c244-ef11-a316-000d3acbd62b",
                    "name": "Alan Dunn",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "bc0ad1ed-b371-ed11-81ac-00224893b82f",
                        "systemuserid": "bc0ad1ed-b371-ed11-81ac-00224893b82f",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"554373331\"",
                    "bookableresourceid": "027b0c5c-fa6f-ef11-a671-000d3acbd62b",
                    "name": "Adam Richards",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "5710d3db-87d9-ed11-a7c7-00224893b6c3",
                        "systemuserid": "5710d3db-87d9-ed11-a7c7-00224893b6c3",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"533197331\"",
                    "bookableresourceid": "8607eb57-fb6f-ef11-a671-000d3acbd62b",
                    "name": "A STEP AHEAD IN FOOTCARE PTY LIMITED",
                    "resourcetype": 5,
                    "UserId": null
                },
                {
                    "@odata.etag": "W/\"536697240\"",
                    "bookableresourceid": "59034803-2397-ef11-8a69-000d3ad23c5b",
                    "name": "\tIKLEAN SERVICES (NORTH-WEST) PTY LTD",
                    "resourcetype": 5,
                    "UserId": null
                },
                {
                    "@odata.etag": "W/\"45407734\"",
                    "bookableresourceid": "331eca6a-5a51-eb11-a812-000d3ae11ff1",
                    "name": "Nathan Gouldberg",
                    "resourcetype": 5,
                    "UserId": null
                },
                {
                    "@odata.etag": "W/\"566754433\"",
                    "bookableresourceid": "6d616491-a106-ef11-9f89-002248100a21",
                    "name": "Clancy",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "c2f43a16-fbe1-ec11-bb3d-00224892f217",
                        "systemuserid": "c2f43a16-fbe1-ec11-bb3d-00224892f217",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"480193942\"",
                    "bookableresourceid": "e7c99055-f2ea-ee11-a1fd-00224810de46",
                    "name": "Balaji Mariappan",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "9ceffa77-4878-ee11-8179-00224898a6e5",
                        "systemuserid": "9ceffa77-4878-ee11-8179-00224898a6e5",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"83294117\"",
                    "bookableresourceid": "0f5729ba-9409-ed11-82e5-002248112e98",
                    "name": "Felix Yu",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "234f263c-63fb-ec11-82e6-002248112e98",
                        "systemuserid": "234f263c-63fb-ec11-82e6-002248112e98",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"87370982\"",
                    "bookableresourceid": "ccac2631-aff6-ec11-82e7-002248112e98",
                    "name": "Heolle Olleres",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "3828dfb0-81dd-ec11-bb3c-002248951320",
                        "systemuserid": "3828dfb0-81dd-ec11-bb3c-002248951320",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"571064529\"",
                    "bookableresourceid": "481ef7cb-3a56-f011-bec2-002248129443",
                    "name": "Aachal Shrestha",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "5cd87cda-529a-ee11-be37-00224898a934",
                        "systemuserid": "5cd87cda-529a-ee11-be37-00224898a934",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"45407735\"",
                    "bookableresourceid": "f5a2a1dd-3077-eb11-a812-002248145e5a",
                    "name": "Qwerty Allied Health",
                    "resourcetype": 5,
                    "UserId": null
                },
                {
                    "@odata.etag": "W/\"45407736\"",
                    "bookableresourceid": "7adb98e6-bb69-eb11-a812-00224814616c",
                    "name": "Sehar Suleman",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "1df2c953-3038-eb11-bf69-00224814f9a4",
                        "systemuserid": "1df2c953-3038-eb11-bf69-00224814f9a4",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"45407737\"",
                    "bookableresourceid": "68c5a7f8-bb69-eb11-a812-00224814616c",
                    "name": "Noah Gillham",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "1a5f1471-3338-eb11-bf69-00224814f9a4",
                        "systemuserid": "1a5f1471-3338-eb11-bf69-00224814f9a4",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"45407738\"",
                    "bookableresourceid": "6005d80a-bc69-eb11-a812-00224814616c",
                    "name": "Kthryn Bondoc",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "0c995e4e-3438-eb11-bf69-00224814f9a4",
                        "systemuserid": "0c995e4e-3438-eb11-bf69-00224814f9a4",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"45407739\"",
                    "bookableresourceid": "2870db59-1e90-eb11-b1ac-00224814651e",
                    "name": "Chadi Tannous",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "641ab393-5160-eb11-89f5-000d3a791111",
                        "systemuserid": "641ab393-5160-eb11-89f5-000d3a791111",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"45407740\"",
                    "bookableresourceid": "05e98dde-1f90-eb11-b1ac-00224814651e",
                    "name": "John Brown",
                    "resourcetype": 5,
                    "UserId": null
                },
                {
                    "@odata.etag": "W/\"45407741\"",
                    "bookableresourceid": "ad78810c-2090-eb11-b1ac-00224814651e",
                    "name": "David Brown",
                    "resourcetype": 5,
                    "UserId": null
                },
                {
                    "@odata.etag": "W/\"50945828\"",
                    "bookableresourceid": "c565246b-1aec-eb11-bacb-00224814b19c",
                    "name": "Sue Sweeney",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "1495ca18-fb4a-eb11-bb23-000d3a797a6f",
                        "systemuserid": "1495ca18-fb4a-eb11-bb23-000d3a797a6f",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"45419806\"",
                    "bookableresourceid": "b8bbfd6d-f3b1-eb11-8236-00224814b363",
                    "name": "Old Mate's Agency",
                    "resourcetype": 1,
                    "UserId": null
                },
                {
                    "@odata.etag": "W/\"51339408\"",
                    "bookableresourceid": "b03dab72-30e8-eb11-bacb-00224814b853",
                    "name": "Nilanthie Sivasubramaniam",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "778a4c7a-3038-eb11-bf69-00224814f9a4",
                        "systemuserid": "778a4c7a-3038-eb11-bf69-00224814f9a4",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"564985542\"",
                    "bookableresourceid": "402fd944-4555-eb11-a812-00224814c8e9",
                    "name": "Ali Khan",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "cbd09f56-3238-eb11-a813-000d3ae11ff1",
                        "systemuserid": "cbd09f56-3238-eb11-a813-000d3ae11ff1",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"45407743\"",
                    "bookableresourceid": "7a3c8a1d-bd53-eb11-a812-00224814ccfa",
                    "name": "Daniel",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "339646e9-3038-eb11-bf69-00224814f9a4",
                        "systemuserid": "339646e9-3038-eb11-bf69-00224814f9a4",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"51865511\"",
                    "bookableresourceid": "df7e8147-1b56-eb11-a812-00224814ccfa",
                    "name": "Lovely Care Agency",
                    "resourcetype": 2,
                    "UserId": null
                },
                {
                    "@odata.etag": "W/\"51508754\"",
                    "bookableresourceid": "66c14257-e8f0-eb11-94ef-00224814e316",
                    "name": "Malachi Mashiah",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "1d1ab3ce-0d40-eb11-bf70-000d3a795b83",
                        "systemuserid": "1d1ab3ce-0d40-eb11-bf70-000d3a795b83",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"70175959\"",
                    "bookableresourceid": "e2605644-02f1-eb11-94ef-00224814e316",
                    "name": "Philip Blow",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "c4218bef-3038-eb11-bf69-00224814f9a4",
                        "systemuserid": "c4218bef-3038-eb11-bf69-00224814f9a4",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"51412234\"",
                    "bookableresourceid": "66a0d795-7def-eb11-94ef-00224814e3f2",
                    "name": "Juliana Teoh",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "51fa7ae4-098d-eb11-b1ac-002248155ce7",
                        "systemuserid": "51fa7ae4-098d-eb11-b1ac-002248155ce7",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"48400580\"",
                    "bookableresourceid": "18b5397a-caa3-eb11-b1ac-0022481508c4",
                    "name": "Jeffrey Wonger",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "d1ad2b4c-3038-eb11-bf69-00224814f9a4",
                        "systemuserid": "d1ad2b4c-3038-eb11-bf69-00224814f9a4",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"80265779\"",
                    "bookableresourceid": "41506cb7-8e60-eb11-a812-00224815157c",
                    "name": "Caroline Olminkhof",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "6899e557-3138-eb11-a813-000d3ae11ff1",
                        "systemuserid": "6899e557-3138-eb11-a813-000d3ae11ff1",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"45407747\"",
                    "bookableresourceid": "f30360c9-8e60-eb11-a812-00224815157c",
                    "name": "Steven Sellen",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "1971814f-3338-eb11-bf69-00224814f9a4",
                        "systemuserid": "1971814f-3338-eb11-bf69-00224814f9a4",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"564987038\"",
                    "bookableresourceid": "a5ba7ae1-8e60-eb11-a812-00224815157c",
                    "name": "Stephen Pocknall",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "1cb57a21-3138-eb11-a813-000d3ae11ff1",
                        "systemuserid": "1cb57a21-3138-eb11-a813-000d3ae11ff1",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"564627980\"",
                    "bookableresourceid": "9659b5e8-2343-eb11-a812-002248151e02",
                    "name": "Joel Yeo",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "89d9dd7d-3338-eb11-bf69-00224814f9a4",
                        "systemuserid": "89d9dd7d-3338-eb11-bf69-00224814f9a4",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"45407750\"",
                    "bookableresourceid": "b39bc4c4-6851-eb11-a812-002248151e02",
                    "name": "Raymond Lesmana",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "2bfc1d32-2c37-eb11-bf72-000d3a7970eb",
                        "systemuserid": "2bfc1d32-2c37-eb11-bf72-000d3a7970eb",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"68821505\"",
                    "bookableresourceid": "30c5589a-9f4c-ec11-8f8e-002248151e5b",
                    "name": "Anglicare Health Centre Castle Hill",
                    "resourcetype": 5,
                    "UserId": null
                },
                {
                    "@odata.etag": "W/\"506070363\"",
                    "bookableresourceid": "76e033fa-e24c-ec11-8f8e-002248151e5b",
                    "name": "Alex Peterson",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "792e7a88-da1d-ec11-b6e7-00224818546f",
                        "systemuserid": "792e7a88-da1d-ec11-b6e7-00224818546f",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"81622780\"",
                    "bookableresourceid": "bbb97b20-3b82-eb11-a812-0022481522dc",
                    "name": "Alexander Peterson",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "cb049c54-3438-eb11-bf69-00224814f9a4",
                        "systemuserid": "cb049c54-3438-eb11-bf69-00224814f9a4",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"50675095\"",
                    "bookableresourceid": "0b2892be-da71-eb11-a812-002248153009",
                    "name": "Bathsheba Benjesse",
                    "resourcetype": 5,
                    "UserId": null
                },
                {
                    "@odata.etag": "W/\"50226239\"",
                    "bookableresourceid": "b8483eda-b6a8-eb11-9442-0022481533e7",
                    "name": "Darrel DCosta",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "bfe696d9-51a2-eb11-b1ac-002248150b30",
                        "systemuserid": "bfe696d9-51a2-eb11-b1ac-002248150b30",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"62286762\"",
                    "bookableresourceid": "3d833dcd-9325-ec11-b6e6-002248153b9c",
                    "name": "Mount Everest SSG",
                    "resourcetype": 5,
                    "UserId": null
                },
                {
                    "@odata.etag": "W/\"45407753\"",
                    "bookableresourceid": "f1e07e6a-d08d-eb11-b1ac-002248155ce7",
                    "name": "Preety Singh",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "09095b86-e577-eb11-a812-002248145319",
                        "systemuserid": "09095b86-e577-eb11-a812-002248145319",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"45407754\"",
                    "bookableresourceid": "ec57b619-068d-eb11-b1ac-002248155d0e",
                    "name": "Grace Boxall",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "35a514e3-058d-eb11-b1ac-002248155ce7",
                        "systemuserid": "35a514e3-058d-eb11-b1ac-002248155ce7",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"48533958\"",
                    "bookableresourceid": "8176013b-078d-eb11-b1ac-002248155d0e",
                    "name": "Qiang Zhang",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "0611442c-068d-eb11-b1ac-002248155d0e",
                        "systemuserid": "0611442c-068d-eb11-b1ac-002248155d0e",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"506599648\"",
                    "bookableresourceid": "1511e95f-078d-eb11-b1ac-002248155d0e",
                    "name": "Hong Liu",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "b7d31101-068d-eb11-b1ac-002248155d0e",
                        "systemuserid": "b7d31101-068d-eb11-b1ac-002248155d0e",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"506599635\"",
                    "bookableresourceid": "7ea72179-078d-eb11-b1ac-002248155d0e",
                    "name": "Hanae Sakuma",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "ef428713-068d-eb11-b1ac-002248155d0e",
                        "systemuserid": "ef428713-068d-eb11-b1ac-002248155d0e",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"506599756\"",
                    "bookableresourceid": "3f008f28-0a8d-eb11-b1ac-002248155d0e",
                    "name": "Rafael Santana",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "63895202-3438-eb11-bf69-00224814f9a4",
                        "systemuserid": "63895202-3438-eb11-bf69-00224814f9a4",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"564984793\"",
                    "bookableresourceid": "cec4bf85-0a8d-eb11-b1ac-002248155d0e",
                    "name": "Emily Teale",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "f6d424ac-098d-eb11-b1ac-002248155ce7",
                        "systemuserid": "f6d424ac-098d-eb11-b1ac-002248155ce7",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"511212754\"",
                    "bookableresourceid": "ad495c22-865c-ec11-8f8f-002248156ca8",
                    "name": "Fabio Phang",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "ff84f3f5-2057-ec11-8f8f-0022481484fb",
                        "systemuserid": "ff84f3f5-2057-ec11-8f8f-0022481484fb",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"506599742\"",
                    "bookableresourceid": "ee203627-6b72-ec11-8942-002248158359",
                    "name": "Matthew Mccrorie",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "1971696a-8338-ec11-8c64-0022481567b9",
                        "systemuserid": "1971696a-8338-ec11-8c64-0022481567b9",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"73625899\"",
                    "bookableresourceid": "c260b0d3-927d-ec11-8d20-0022481589ab",
                    "name": "Harold's SSG",
                    "resourcetype": 5,
                    "UserId": null
                },
                {
                    "@odata.etag": "W/\"60642235\"",
                    "bookableresourceid": "50a3b059-6510-ec11-b6e6-002248158fa3",
                    "name": "Leff's Agency",
                    "resourcetype": 5,
                    "UserId": null
                },
                {
                    "@odata.etag": "W/\"506599621\"",
                    "bookableresourceid": "ef98fcf8-df70-ec11-8f8e-002248159071",
                    "name": "Bhupesh Singal",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "21a8c1b1-7f6f-ec11-8f8e-002248159d64",
                        "systemuserid": "21a8c1b1-7f6f-ec11-8f8e-002248159d64",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"506599700\"",
                    "bookableresourceid": "66b5019e-e070-ec11-8f8e-002248159071",
                    "name": "Karin Piasevoli",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "3b7801c9-806f-ec11-8f8e-0022481595fb",
                        "systemuserid": "3b7801c9-806f-ec11-8f8e-0022481595fb",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"506599727\"",
                    "bookableresourceid": "8d123127-e170-ec11-8f8e-002248159071",
                    "name": "Kylie Dorahy",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "c98657da-806f-ec11-8f8e-002248159d64",
                        "systemuserid": "c98657da-806f-ec11-8f8e-002248159d64",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"506599668\"",
                    "bookableresourceid": "61047d85-e170-ec11-8f8e-002248159071",
                    "name": "Jennifer Crowe",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "ab41aee5-806f-ec11-8f8e-0022481596cd",
                        "systemuserid": "ab41aee5-806f-ec11-8f8e-0022481596cd",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"72695574\"",
                    "bookableresourceid": "26366cb3-e170-ec11-8f8e-002248159071",
                    "name": "Susan Thornhill",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "d49e83f3-806f-ec11-8f8e-0022481595fb",
                        "systemuserid": "d49e83f3-806f-ec11-8f8e-0022481595fb",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"506599537\"",
                    "bookableresourceid": "1254e3ee-e170-ec11-8f8e-002248159071",
                    "name": "Alicia Sandles",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "c36b94fa-806f-ec11-8f8e-0022481595fb",
                        "systemuserid": "c36b94fa-806f-ec11-8f8e-0022481595fb",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"549840636\"",
                    "bookableresourceid": "c7d51342-e270-ec11-8f8e-002248159071",
                    "name": "Joanmar Webster-This is added for testing Name field in BMR TABLE - Testing Again to check max BR na",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "c0cd4d06-816f-ec11-8f8e-0022481596cd",
                        "systemuserid": "c0cd4d06-816f-ec11-8f8e-0022481596cd",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"135742049\"",
                    "bookableresourceid": "07a266d1-a716-ec11-b6e6-0022481834f0",
                    "name": "Ron Lee - SSG Visit",
                    "resourcetype": 5,
                    "UserId": null
                },
                {
                    "@odata.etag": "W/\"46842557\"",
                    "bookableresourceid": "be715d2a-5bc3-eb11-bacc-002248183900",
                    "name": "Medical Staff",
                    "resourcetype": 5,
                    "UserId": null
                },
                {
                    "@odata.etag": "W/\"66535164\"",
                    "bookableresourceid": "bd5f9907-602d-ec11-b6e6-002248183e76",
                    "name": "Ronen Tejaya",
                    "resourcetype": 3,
                    "UserId": {
                        "ownerid": "4a0b5d6d-1015-ec11-b6e6-0022481833e5",
                        "systemuserid": "4a0b5d6d-1015-ec11-b6e6-0022481833e5",
                        "photourl": null
                    }
                },
                {
                    "@odata.etag": "W/\"61880562\"",
                    "bookableresourceid": "2cbb0945-2a20-ec11-b6e6-002248185149",
                    "name": "Vaucluse SSG",
                    "resourcetype": 5,
                    "UserId": null
                },
            ]
        });

    });
}

function getTimeOffRequests() {
    return new Promise((resolve, reject) => {
        resolve({
            entities: [
                {
                    "@odata.etag": "W/\"443886521\"",
                    "vel_leavetype": 285930003,
                    "msdyn_timeoffrequestid": "24d4c737-e0d5-ee11-904c-000d3aca6924",
                    "msdyn_endtime": "2024-03-31T10:00:00Z",
                    "msdyn_name": "Rafael Santana",
                    "_msdyn_resource_value": "b3141cf1-91e1-ee11-904c-000d3aca6924",
                    "msdyn_starttime": "2024-02-28T20:00:00Z",
                },
                {
                    "@odata.etag": "W/\"531941147\"",
                    "vel_leavetype": 285930004,
                    "msdyn_timeoffrequestid": "76e450ce-df64-ef11-a671-000d3acbd62b",
                    "msdyn_endtime": "2024-08-28T11:00:00Z",
                    "msdyn_name": "Alexander Peterson",
                    "_msdyn_resource_value": "bbb97b20-3b82-eb11-a812-0022481522dc",
                    "msdyn_starttime": "2024-08-27T21:00:00Z",
                },
                {
                    "@odata.etag": "W/\"530276456\"",
                    "vel_leavetype": 285930004,
                    "msdyn_timeoffrequestid": "8a9cc9a3-0855-ef11-bfe3-000d3acbd62b",
                    "msdyn_endtime": "2024-08-08T07:00:00Z",
                    "msdyn_name": "Clancy Matthews",
                    "_msdyn_resource_value": "6d616491-a106-ef11-9f89-002248100a21",
                    "msdyn_starttime": "2024-08-07T23:30:00Z",
                },
            ]
        });
    })
}

function mapOverLeaveData(response) {
    return response.entities.map((r) => ({
        id: r?._msdyn_resource_value,
        title: r?.msdyn_name,
        extendedProps: {
            imgUrl: r?.UserId?.entityimage_url ?? "/Assets/profiles/R2.jpg",
            name: r?.msdyn_name,
            resourceType: `${r?.resourcetype}` ?? "0",
        },
    }));
}

function mapOverIntialData(response) {
    return response.entities.map((r) => ({
        id: r?.bookableresourceid,
        title: r?.name,
        extendedProps: {
            imgUrl: r?.UserId?.photourl ?? "/Assets/profiles/R2.jpg",
            name: r.name,
            resourceType: `${r?.resourcetype}`,
        },
    }));
}

// function handleGetResorces(getResources, mapResources) {
//     resorcesState.isLoading = true;
//     resorcesState.isError = false;
//     resorcesState.resourceData = [];

//     window.ecCalendar.setOption("resources", [
//         { id: "loading", title: "Loading..." },
//     ]);

//     getResources()
//         .then((response) => {
//             // Map API response to calendar resources
//             const mappedResources = mapResources(response);

//             resorcesState.isLoading = false;
//             resorcesState.resourceData = mappedResources;

//             resourceData = mappedResources;
//             window.ecCalendar.setOption("resources", mappedResources);
//         })
//         .catch((error) => {
//             console.error("Error fetching resources:", error);
//             resorcesState.isLoading = false;
//             resorcesState.isError = true;

//             // Show error message in calendar
//             window.ecCalendar.setOption("resources", [
//                 { id: "error", title: "Error loading resources" },
//             ]);
//         })
//         .finally(() => refreshCalendarUI());
// }



//Event Data

//THis Function Get the Current Range minimum 10 Dayas From Starting

function handleGetResorces(getResources, mapResources) {
    resorcesState.isLoading = true;
    resorcesState.isError = false;
    resorcesState.resourceData = [];

    window.ecCalendar.setOption("resources", [
        { id: "loading", title: "Loading..." },
    ]);

    return getResources()   // ✅ return this promise
        .then((response) => {
            // Map API response to calendar resources
            const mappedResources = mapResources(response);

            resorcesState.isLoading = false;
            resorcesState.resourceData = mappedResources;

            resourceData = mappedResources;
            window.ecCalendar.setOption("resources", mappedResources);

            return mappedResources; // ✅ pass mapped data forward
        })
        .catch((error) => {
            console.error("Error fetching resources:", error);
            resorcesState.isLoading = false;
            resorcesState.isError = true;

            window.ecCalendar.setOption("resources", [
                { id: "error", title: "Error loading resources" },
            ]);
            throw error; // ✅ rethrow so caller can handle
        })
        .finally(() => refreshCalendarUI());
}


function getAdjustedDateRangeFromCalendar() {
    if (!window.ecCalendar) {
        console.warn("Calendar not found.");
        return null;
    }

    // 1. Get visible start and end from calendar
    const calendarView = window.ecCalendar.view || window.ecCalendar.getView();
    const viewStart = new Date(calendarView.currentStart);
    const viewEnd = new Date(calendarView.currentEnd);

    // 2. Calculate the difference in days
    const msPerDay = 24 * 60 * 60 * 1000;
    const dayDiff = Math.round((viewEnd - viewStart) / msPerDay);

    let startDate = new Date(viewStart);
    let endDate;

    if (dayDiff >= 10) {
        // Use current range
        endDate = new Date(viewEnd);
    } else {
        // Expand to 10 days from start
        endDate = new Date(startDate.getTime() + 9 * msPerDay);
    }

    // Return in ISO string format
    return {
        startDate: startDate.toISOString().split("T")[0] + "T00:00:00Z",
        endDate: endDate.toISOString().split("T")[0] + "T23:59:59Z",
    };
}




function getAgreementBookingDatesBetween() {

    return new Promise((resolve, reject) => {
        resolve({
            entities: [
                {
                    "@odata.etag": "W/\"562523211\"",
                    "_msdyn_agreement_value": "be8120e7-fd9e-4cce-bb41-4cb5c2409976",
                    "_msdyn_resource_value": "b3141cf1-91e1-ee11-904c-000d3aca6924",
                    "msdyn_status": 285930015,
                    "msdyn_name": "00313",
                    "msdyn_agreementbookingdateid": "58cdee5a-d340-f011-8779-000d3a6a1ca6",
                    "msdyn_bookingdate": "2025-07-20T16:00:00Z",
                    "statecode": 0,
                    "msdyn_resource": {
                        "bookableresourceid": "b3141cf1-91e1-ee11-904c-000d3aca6924",
                        "name": "Jamie Higgins"
                    },
                    "msdyn_bookingsetup": {
                        "msdyn_estimatedduration": 975,
                        "msdyn_agreementbookingsetupid": "98fd7d12-c12f-f011-8c4d-00224894331c",
                        "_ang_incidenttype_value": "33c31285-1332-f011-8c4d-0022481174b1"
                    },
                    "msdyn_workorder": {
                        "msdyn_city": "MOUNT RANKIN",
                        "msdyn_address3": null,
                        "_msdyn_serviceterritory_value": "04c74320-0340-eb11-bf70-000d3a795b83",
                        "msdyn_stateorprovince": "NSW",
                        "msdyn_address1": "16 SPRING CL",
                        "msdyn_country": "Australia",
                        "msdyn_workorderid": "cb5547f4-c541-f011-8779-000d3ad28f5c",
                        "msdyn_postalcode": "2795",
                        "msdyn_addres s2": "MINTO"
                    }
                },
                {
                    "@odata.etag": "W/\"563064379\"",
                    "_msdyn_agreement_value": "be8120e7-fd9e-4cce-bb41-4cb5c2409976",
                    "_msdyn_resource_value": "157d1c09-92e1-ee11-904c-000d3aca6924",
                    "msdyn_status": 690970001,
                    "msdyn_name": "00313",
                    "msdyn_agreementbookingdateid": "9dcdee5a-d340-f011-8779-000d3a6a1ca6",
                    "msdyn_bookingdate": "2025-07-27T16:00:00Z",
                    "statecode": 0,
                    "msdyn_resource": {
                        "bookableresourceid": "157d1c09-92e1-ee11-904c-000d3aca6924",
                        "name": "Jamie Higgins"
                    },
                    "msdyn_bookingsetup": {
                        "msdyn_estimatedduration": 975,
                        "msdyn_agreementbookingsetupid": "98fd7d12-c12f-f011-8c4d-00224894331c",
                        "_ang_incidenttype_value": "33c31285-1332-f011-8c4d-0022481174b1"
                    },
                    "msdyn_workorder": {
                        "msdyn_city": "MOUNT RANKIN",
                        "msdyn_address3": null,
                        "_msdyn_serviceterritory_value": "04c74320-0340-eb11-bf70-000d3a795b83",
                        "msdyn_stateorprovince": "NSW",
                        "msdyn_address1": "16 SPRING CL",
                        "msdyn_country": "Australia",
                        "msdyn_workorderid": "3ed39c12-4647-f011-8779-000d3aca5131",
                        "msdyn_postalcode": "2795",
                        "msdyn_address2": "MINTO"
                    },
                }
            ]
        });
    })
}



function handleEventFetch() {
    getAgreementBookingDatesBetween()
        .then((response) => {
            // Create a Set of valid resource IDs from resourceData

            // Map CRM response to calendar events, only including events with valid resourceId
            const statusMap = {
                690970000: "Active",
                690970001: "Processed",
                690970002: "Canceled",
            };
            const mappedEvents = response.entities.map((event) => {
                // Parse start date
                const startDate = new Date(event.msdyn_bookingdate);
                // Calculate end date by adding estimated duration (in minutes)
                const durationMinutes =
                    event.msdyn_bookingsetup.msdyn_estimatedduration || 60; // Default to 60 minutes
                const endDate = new Date(
                    startDate.getTime() + durationMinutes * 60 * 1000
                );
                // Construct address string
                const addressParts = [
                    event?.msdyn_workorder?.msdyn_address1 || " ",
                    event?.msdyn_workorder?.msdyn_address2 || " ",
                    event?.msdyn_workorder?.msdyn_address3 || " ",
                    event?.msdyn_workorder?.msdyn_city || " ",
                    event?.msdyn_workorder?.msdyn_stateorprovince || " ",
                    event?.msdyn_workorder?.msdyn_postalcode || " ",
                    event?.msdyn_workorder?.msdyn_country || " ",
                ]
                    .filter((part) => part)
                    .join(", ");
                return {
                    resourceId: event?._msdyn_resource_value,
                    start: startDate,
                    end: endDate,
                    id: event?.msdyn_agreementbookingdateid,
                    type: "Full",
                    slotEventOverlap: true,
                    editable: false,
                    durationEditable: false,
                    eventStartEditable: false,
                    className: ["ec-event-active"],
                    extendedProps: {
                        bookingID: event?._msdyn_agreement_value,
                        employeeID: event?.msdyn_name,
                        employeeName: event?.msdyn_resource?.name || "N/A",
                        address: addressParts,
                        suburb: event?.msdyn_workorder?.msdyn_city || "N/A",
                        serviceType:
                            event?.msdyn_bookingsetup?._ang_incidenttype_value ||
                            "Care Worker",
                        bookingStatus: statusMap[event?.msdyn_status] || "Unknown",
                        region: event?.msdyn_workorder?._msdyn_serviceterritory_value,
                        agreementBookingSetupId:
                            event?.msdyn_bookingsetup?.msdyn_agreementbookingsetupid,
                    },
                };
            });
            eventStatus.isLoading = false;
            eventStatus.eventData = mappedEvents;
            eventData = mappedEvents; // Update global eventData
            console.log("Events fetched successfully:", mappedEvents);
            // Update calendar with events
            reRenderEvents();
        })
        .catch((error) => {
            console.error("Error fetching events:", error.message);
            eventStatus.isLoading = false;
            eventStatus.isError = true;
            eventData = [];
            reRenderEvents(); // Clear events on error
        });
}



async function colorLeave() {
    const agreementResponse = await getAgreementBookingDatesBetween();
    const timeOffResponse = await getTimeOffRequests();
    mapEvents(agreementResponse, true, timeOffResponse);
    console.log("helloe")
}

// --- INIT ---
window.addEventListener("DOMContentLoaded", function () {
    createCalendar();
    setIntialData();
    handleFilterFetch();
    handleGetResorces(getBookableResources, mapOverIntialData);
    handleEventFetch();
    changeActivetab();
    this.window.refreshCalendarUI = refreshCalendarUI;
    this.window.handleEventFetch = handleEventFetch;
    colorLeave();


});






