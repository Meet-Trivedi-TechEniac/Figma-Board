function getElement(id) {
  return document.querySelector(id);
}

// Custom Dropdown
var dropdowns = document.querySelectorAll(".custom-dropdown");
console.log("dropdowns", dropdowns);
if (dropdowns.length) {
  // Only one global click listener for closing dropdowns
  document.addEventListener("click", function (e) {
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  });

  dropdowns.forEach(function (dropdown) {
    var disp = dropdown.querySelector(".value-display");
    var selected = dropdown.querySelector(".dropdown-selected");
    var options = dropdown.querySelectorAll(".dropdown-option");
    if (selected) {
      selected.addEventListener("click", function (e) {
        e.stopPropagation();

        // Close all other dropdowns before toggling this one
        dropdowns.forEach(function (dd) {
          if (dd !== dropdown) {
            dd.classList.remove("open");
          }
        });

        // Toggle current dropdown
        dropdown.classList.toggle("open");
      });
    }
    options.forEach(function (option) {
      option.addEventListener("click", function (e) {
        e.stopPropagation();
        if (disp) disp.textContent = option.textContent;
        dropdown.classList.remove("open");
      });
    });
  });
}

// Reset Filter Option
document.getElementById("reset").addEventListener("click", function () {
  const dropdowns = document.querySelectorAll(".custom-dropdown");

  dropdowns.forEach(function (dropdown) {
    const disp = dropdown.querySelector(".value-display");
    if (disp) {
      disp.textContent = "Select an option";
    }

    // Optional: Close dropdown if open
    dropdown.classList.remove("open");
  });
});

// Filter Controller
var gridContainerEl = getElement(".grid-container");
var filterBtn = getElement("#filter-btn");
var filterClose = getElement("#filter-close");
var ecHolderEl = getElement(".ec-holder");

if (filterBtn && gridContainerEl) {
  filterBtn.addEventListener("click", function () {
    gridContainerEl.classList.toggle("hide-filter");
    // ecHolderEl.classList.toggle("p-2");
  });
}

if (filterClose && gridContainerEl) {
  filterClose.addEventListener("click", function () {
    gridContainerEl.classList.add("hide-filter");
    // ecHolderEl.classList.add("p-2");
  });
}

// Date Range Picker (jQuery)
if (typeof $ !== "undefined" && typeof $.fn.daterangepicker !== "undefined") {
  $(function () {
    var $dateInput = $('input[name="datefilter"]');
    if ($dateInput.length) {
      $dateInput.daterangepicker({
        autoUpdateInput: true,
        locale: {
          cancelLabel: "Cancel",
          format: "DD/MM/YYYY",
        },
        startDate: moment(),
        endDate: moment(),
        applyButtonClasses: "date-apply-btn",
        cancelButtonClasses: "date-cancel-btn",
      });
      $dateInput.on("apply.daterangepicker", function (ev, picker) {
        $(this).val(
          picker.startDate.format("DD/MM/YYYY") +
            " - " +
            picker.endDate.format("DD/MM/YYYY")
        );

        if (window.ecCalendar) {
          var start = picker.startDate.clone().startOf("day");
          window.ecCalendar.setOption("date", start.toDate());
          window.ecCalendar.setOption("duration", { days: 10 });
        }
      });
    }
  });
} else {
  console.warn("jQuery or daterangepicker not loaded.");
}

$("#calPrev").on("click", function () {
  const picker = $('input[name="datefilter"]').data("daterangepicker");
  if (!picker) return;

  const rangeDays = picker.endDate.diff(picker.startDate, "days");
  const newStart = picker.startDate.clone().subtract(rangeDays + 1, "days");
  const newEnd = picker.endDate.clone().subtract(rangeDays + 1, "days");

  picker.setStartDate(newStart);
  picker.setEndDate(newEnd);
  $('input[name="datefilter"]').val(
    `${newStart.format("DD/MM/YYYY")} - ${newEnd.format("DD/MM/YYYY")}`
  );
  $('input[name="datefilter"]').trigger("apply.daterangepicker", [picker]);
});

$("#calNext").on("click", function () {
  const picker = $('input[name="datefilter"]').data("daterangepicker");
  if (!picker) return;

  const rangeDays = picker.endDate.diff(picker.startDate, "days");
  const newStart = picker.startDate.clone().add(rangeDays + 1, "days");
  const newEnd = picker.endDate.clone().add(rangeDays + 1, "days");

  picker.setStartDate(newStart);
  picker.setEndDate(newEnd);
  $('input[name="datefilter"]').val(
    `${newStart.format("DD/MM/YYYY")} - ${newEnd.format("DD/MM/YYYY")}`
  );
  $('input[name="datefilter"]').trigger("apply.daterangepicker", [picker]);
});

// Today BTN
var todayBtn = document.getElementById("today-btn");
if (todayBtn) {
  todayBtn.addEventListener("click", function () {
    if (window.ecCalendar) {
      window.ecCalendar.setOption("date", new Date());
      window.ecCalendar.setOption("duration", { days: 8 });
    }
    // Sync daterangepicker to today
    if (
      typeof $ !== "undefined" &&
      typeof $.fn.daterangepicker !== "undefined"
    ) {
      var $dateInput = $('input[name="datefilter"]');
      if ($dateInput.length && $dateInput.data("daterangepicker")) {
        var today = moment();
        $dateInput.data("daterangepicker").setStartDate(today);
        $dateInput.data("daterangepicker").setEndDate(today);
        $dateInput.val(
          today.format("DD/MM/YYYY") + " - " + today.format("DD/MM/YYYY")
        );
      }
    }
  });
}

function formatTo24HourTime(dateObj) {
  const pad = (n) => String(n).padStart(2, "0");
  const hours = pad(dateObj.getHours());
  const minutes = pad(dateObj.getMinutes());
  const seconds = pad(dateObj.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

// Start Time Picker
$(".starttime").timepicker({
  timeFormat: "h:mm p",
  interval: 30,
  startTime: "08:00",
  maxTime: "4:00pm",
  defaultTime: "08",
  dynamic: false,
  dropdown: true,
  scrollbar: false,
  change: function (time) {
    const fullTime = formatTo24HourTime(time);
    if (window?.ecCalendar) {
      window.ecCalendar.setOption("slotMinTime", fullTime);
      setTimeout(() => {
        window.refreshCalendarUI();
      }, 0);
    }
  },
});

// End Time Picker
$(".endtime").timepicker({
  timeFormat: "h:mm p",
  interval: 30,
  startTime: "09:00",
  maxTime: "4:00pm",
  defaultTime: "16",
  dynamic: false,
  dropdown: true,
  scrollbar: false,
  change: function (time) {
    const fullTime = formatTo24HourTime(time);
    if (window?.ecCalendar) {
      window.ecCalendar.setOption("slotMaxTime", fullTime);
    }
  },
});

$(".time-conatainer img").on("click", function (e) {
  e.preventDefault();
  e.stopPropagation(); // Prevent event bubbling

  // Find the input (either .starttime or .endtime) in the same container
  const $input = $(this).siblings("input.starttime, input.endtime");

  // Delay focus to avoid immediate close
  setTimeout(() => {
    $input.focus();
  }, 10);
});

// New Function to Get Start and End Dates from Calendar
function getCalendarDateRange() {
  if (window.ecCalendar) {
    const options = window.ecCalendar.getOptions();
    const startDate = new Date(options.date);
    const duration = options.duration?.days || 10; // Default to 10 days if not set
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + duration - 1); // Adjust for inclusive range

    return {
      start: startDate,
      end: endDate,
    };
  } else {
    console.warn("ecCalendar is not available.");
    return null;
  }
}