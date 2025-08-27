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
}

function chnageActivetab() {
  const initalTabBtn = document.getElementById("intial-tab-btn");
  const leaveTabBtn = document.getElementById("leave-tab-btn");

  initalTabBtn.addEventListener("click", (el) => {
    //Chnage Ui
    initalTabBtn.children[0].classList.add("active-tab-btn");
    leaveTabBtn.children[0].classList.remove("active-tab-btn");

    handleGetResorces(getBookableResources, mapOverIntialData);
    resetFilters();
  });

  leaveTabBtn.addEventListener("click", (el) => {
    //Chnage Ui
    leaveTabBtn.children[0].classList.add("active-tab-btn");
    initalTabBtn.children[0].classList.remove("active-tab-btn");

    handleGetResorces(getTimeOffRequests, mapOverLeaveData);
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
        <p><a href="/agreement-booking/${
          arg.event.extendedProps.agreementBookingSetupId
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
            <p>${
              arg.event.extendedProps.suburb || "N/A"
            }</p> <!-- Display suburb -->
            <!-- Display type of service -->
            <p>${formatEventTime(start)} - ${
      arg.event.extendedProps.duration
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
    const valA = a.extendedProps.name.toLowerCase();
    const valB = b.extendedProps.name.toLowerCase();
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
  return window.parent.Xrm.WebApi.retrieveMultipleRecords(
    "territory",
    "?$select=territoryid,name"
  );
}

function getCareType() {
  return window.parent.Xrm.WebApi.retrieveMultipleRecords(
    "stringmap",
    "?$select=attributename,attributevalue,value&$filter=attributename eq 'msdyn_resourcetype'"
  );
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
  return window.parent.Xrm.WebApi.retrieveMultipleRecords(
    "bookableresource",
    "?$select=name,resourcetype&$expand=UserId($select=entityimage_url)"
  );
}

function getTimeOffRequests() {
  return window.parent.Xrm.WebApi.retrieveMultipleRecords(
    "msdyn_timeoffrequest",
    "?$select=msdyn_endtime,vel_leavetype,msdyn_name,_msdyn_resource_value,msdyn_starttime"
  );
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

function handleGetResorces(getResources, mapResources) {
  resorcesState.isLoading = true;
  resorcesState.isError = false;
  resorcesState.resourceData = [];

  window.ecCalendar.setOption("resources", [
    { id: "loading", title: "Loading..." },
  ]);

  getResources()
    .then((response) => {
      // Map API response to calendar resources
      const mappedResources = mapResources(response);

      resorcesState.isLoading = false;
      resorcesState.resourceData = mappedResources;

      resourceData = mappedResources;
      window.ecCalendar.setOption("resources", mappedResources);
    })
    .catch((error) => {
      console.error("Error fetching resources:", error);
      resorcesState.isLoading = false;
      resorcesState.isError = true;

      // Show error message in calendar
      window.ecCalendar.setOption("resources", [
        { id: "error", title: "Error loading resources" },
      ]);
    })
    .finally(() => refreshCalendarUI());
}

function handleGetResorces(getResources, mapResources) {
  const requestToken = ++currentRequestToken; // Create a unique token for this call

  resorcesState.isLoading = true;
  resorcesState.isError = false;
  resorcesState.resourceData = [];

  window.ecCalendar.setOption("resources", [
    { id: "loading", title: "Loading..." },
  ]);

  getResources()
    .then((response) => {
      // If this is not the latest request, ignore the result
      if (requestToken !== currentRequestToken) return;

      const mappedResources = mapResources(response);

      resorcesState.isLoading = false;
      resorcesState.resourceData = mappedResources;

      resourceData = mappedResources;
      window.ecCalendar.setOption("resources", mappedResources);
    })
    .catch((error) => {
      // Ignore error if not latest request
      if (requestToken !== currentRequestToken) return;

      console.error("Error fetching resources:", error);
      resorcesState.isLoading = false;
      resorcesState.isError = true;

      window.ecCalendar.setOption("resources", [
        { id: "error", title: "Error loading resources" },
      ]);
    })
    .finally(() => {
      // Refresh UI only for the latest request
      if (requestToken === currentRequestToken) {
        refreshCalendarUI();
      }
    });
}

//Event Data

//THis Function Get the Current Range minimum 10 Dayas From Starting
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
  const { startDate, endDate } = getAdjustedDateRangeFromCalendar();
  const query = [
    "?$select=msdyn_agreementbookingdateid,_msdyn_agreement_value,msdyn_bookingdate,msdyn_name,_msdyn_resource_value,msdyn_status,statecode",
    "&$filter=msdyn_bookingdate ge " +
      startDate +
      " and msdyn_bookingdate le " +
      endDate,
    "&$expand=",
    "msdyn_resource($select=name),",
    "msdyn_bookingsetup($select=msdyn_agreementbookingsetupid,msdyn_estimatedduration,_ang_incidenttype_value),",
    "msdyn_workorder($select=msdyn_workorderid,msdyn_city,msdyn_country,msdyn_postalcode,_msdyn_serviceterritory_value,msdyn_stateorprovince,msdyn_address1,msdyn_address2,msdyn_address3)",
  ].join("");

  return window.parent.Xrm.WebApi.retrieveMultipleRecords(
    "msdyn_agreementbookingdate",
    query
  );
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

// --- INIT ---
window.addEventListener("DOMContentLoaded", function () {
  createCalendar();
  setIntialData();
  handleFilterFetch();
  handleGetResorces(getBookableResources, mapOverIntialData);
  handleEventFetch();
  chnageActivetab();
  this.window.refreshCalendarUI = refreshCalendarUI;
  this.window.handleEventFetch = handleEventFetch;
});
