let leaveEventColorMap = {};

// New async function to handle fetching resources and events
async function refreshCalendarData(isLeaveTab = false) {
  // Reset mapping object before fetching for initial tab
  if (!isLeaveTab) {
    leaveEventColorMap = {};
  }

  // Step 1: Fetch resources and set to calendar
  const resourceFetchFn = isLeaveTab ? getTimeOffRequests : getBookableResources; //Resources Data
  const resourceMapFn = isLeaveTab ? mapOverLeaveData : mapOverIntialData; //Resources Map
  await handleGetResorces(resourceFetchFn, resourceMapFn);

  // Step 2: Calculate mapping object for leave tab
  if (isLeaveTab) {
    try {
      // const timeOffResponse = await getTimeOffRequests();//Extra Call

      leaveEventColorMap = timeOffResponse.reduce((map, timeOff) => {

        map[timeOff.eventId || "x5v1x54v-4552-df4"] = "ac-pink-event";
        return map;
      }, {});
    } catch (error) {
      console.error("Error fetching time-off requests for mapping:", error);
      leaveEventColorMap = {};
    }
  }

  // Step 3: Fetch events and apply colors
  await handleGetEvents(isLeaveTab);

  // Step 4: Set events to calendar
  window.ecCalendar.setOption("events", eventData);

  // Reset filters
  resetFilters();
}


