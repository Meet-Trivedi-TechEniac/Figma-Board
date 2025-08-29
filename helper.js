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

// Track which tab is active to decide coloring logic during fetches
let isLeaveTabActive = false;

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
       
    ];

    reRenderEvents();
}



function reRenderEvents() {
    //Rerender new Events
    window.ecCalendar.setOption("events", eventData);
    window.ecCalendar.setOption("resources", resourceData);
    resetFilters();
}

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
        isLeaveTabActive = false;
        // Change UI
        initalTabBtn.children[0].classList.add("active-tab-btn");
        leaveTabBtn.children[0].classList.remove("active-tab-btn");

        await handleGetResorces(getBookableResources, mapOverIntialData);
        const agreementResponse = await getAgreementBookingDatesBetween();
        mapEvents(agreementResponse, false); // No leave colors for initial tab
        resetFilters();
    });

    leaveTabBtn.addEventListener("click", async (el) => {
        isLeaveTabActive = true;
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


const handleRefresh = async () => {
    console.log("here");
    if (!isLeaveTabActive) {
        // Initial tab logic
        await handleGetResorces(getBookableResources, mapOverIntialData);
        const agreementResponse = await getAgreementBookingDatesBetween();
        mapEvents(agreementResponse, false); // No leave colors for initial tab
        resetFilters();
    } else {
        // Leave tab logic
        await handleGetResorces(getTimeOffRequests, mapOverLeaveData);
        const agreementResponse = await getAgreementBookingDatesBetween();
        const timeOffResponse = await getTimeOffRequests();
        mapEvents(agreementResponse, true, timeOffResponse); // Apply leave colors for Leave Conflicts tab
        resetFilters();
    }
};

const refreshBtn = document.getElementById("refresh-btn");
refreshBtn.addEventListener("click", handleRefresh);


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

// 
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



function upadateResources(data) {
    if (window.ecCalendar) {
        disposeAllTooltips();

        window.ecCalendar.setOption("resources", data);

        setTimeout(() => {
            refreshCalendarUI();
        }, 0);
    }
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

       .finally(() => refreshCalendarUI());
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


// Waits until resources have been loaded successfully before continuing
function waitForResourcesReady(timeoutMs = 5000) {
    const start = Date.now();
    return new Promise((resolve, reject) => {
        function check() {
            if (!resorcesState.isLoading && resourceData && resourceData.length > 0) {
                return resolve(true);
            }
            if (Date.now() - start > timeoutMs) {
                // Resolve anyway to avoid blocking forever; downstream will handle empty resources
                return resolve(false);
            }
            setTimeout(check, 50);
        }
        check();
    });
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
    waitForResourcesReady()
        .then(() => getAgreementBookingDatesBetween())
        .then(async (agreementResponse) => {
            if (isLeaveTabActive) {
                const timeOffResponse = await getTimeOffRequests();
                mapEvents(agreementResponse, true, timeOffResponse);
            } else {
                mapEvents(agreementResponse, false);
            }
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
    console.log("called");
    await handleGetResorces(getBookableResources, mapOverIntialData);
    const agreementResponse = await getAgreementBookingDatesBetween();
    mapEvents(agreementResponse, false);
}

// --- INIT ---
window.addEventListener("DOMContentLoaded", function () {
    console.log("hellwdh")
    createCalendar();
    setIntialData();
    handleFilterFetch();
    // Ensure resources are loaded before first event fetch
    handleGetResorces(getBookableResources, mapOverIntialData)
        .then(() => handleEventFetch());
    changeActivetab();
    this.window.refreshCalendarUI = refreshCalendarUI;
    this.window.handleEventFetch = handleEventFetch;
    // Removed initial forced leave-coloring to avoid overriding initial tab colors

});






