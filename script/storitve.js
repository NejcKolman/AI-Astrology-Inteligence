/*
let serviceTypeButtonSwitch_1=false;
let serviceTypeButtonSwitch_2=false;
let serviceTypeButtonSwitch_3=false;

let serviceExplanation1=document.getElementById("services_5")
let serviceExplanation2=document.getElementById("services_6")
let serviceExplanation3=document.getElementById("services_7")

document.querySelector(".serviceTypeButton_1").
  addEventListener('click',()=>{
    serviceExplanation1.style.visibility='';
    serviceExplanation1.style.height='';
    serviceExplanation2.style.visibility='hidden';
    serviceExplanation2.style.height=0;
    serviceExplanation3.style.visibility='hidden';
    serviceExplanation3.style.height=0; 

  })

  document.querySelector(".serviceTypeButton_2").
  addEventListener('click',()=>{
    serviceExplanation2.style.visibility='';
    serviceExplanation2.style.height='';
    serviceExplanation1.style.visibility='hidden';
    serviceExplanation1.style.height=0;
    serviceExplanation3.style.visibility='hidden';
    serviceExplanation3.style.height=0; 

  })

  document.querySelector(".serviceTypeButton_3").
  addEventListener('click',()=>{
    serviceExplanation3.style.visibility='';
    serviceExplanation3.style.height='';
    serviceExplanation2.style.visibility='hidden';
    serviceExplanation2.style.height=0;
    serviceExplanation1.style.visibility='hidden';
    serviceExplanation1.style.height=0; 

  })



if (serviceTypeButtonSwitch_1){
  serviceExplanation1=document.getElementById("services_6")  
  serviceExplanation1.style.visibility='hidden';
  serviceExplanation1.style.height=0;

}
*/
//KOLEDAR START
const calendar = document.getElementById("calendar");
const currentMonthEl = document.getElementById("currentMonth");
const calendarDaysEl = document.getElementById("calendarDays");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentDate = new Date();

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  currentMonthEl.textContent = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarDaysEl.innerHTML = "";

  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyDiv = document.createElement("div");
    calendarDaysEl.appendChild(emptyDiv);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    dayDiv.addEventListener("click", () => selectDate(day));
    calendarDaysEl.appendChild(dayDiv);
  }
}

let selectedYear = false;
let selectedMonth = false;
let selectedDay = false;

function selectDate(day) {
  const selectedDiv = calendarDaysEl.querySelector(".selected");
  if (selectedDiv) {
    selectedDiv.classList.remove("selected");
  }

  const allDays = calendarDaysEl.querySelectorAll("div");
  allDays[day - 1 + new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()].classList.add("selected");
  //alert(`You selected: ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`);
  selectedYear = currentDate.getFullYear();
  selectedMonth = currentDate.getMonth() + 1;
  selectedDay = day;
  console.log(selectedYear, selectedMonth, selectedDay);
  if (selectedTime) {
    document.querySelector(`.${selectedTime}`).classList.remove("selectedTimeButton");
    selectedTime = undefined;
  }
  document.querySelector(".timePicker").classList.remove("disableDiv");
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

//KOLEDAR END

//seznam terminov v celem dnevu
selectedTime = undefined;
let availableSlots = [];
function changeAvailableTimeSlots() {
  console.log("here");
  timeDifference = timeDifferenceElement.value;
  timeDifference = Number(timeDifference.replace(":", "."));

  timeDifferenceMinutes = timeDifference % 1;
  timeDifferenceHours = timeDifference - timeDifferenceMinutes;
  timeDifferenceMinutes = 60 * timeDifferenceMinutes;

  let availableSlots = [];
  document.querySelector(".hourPicker").innerHTML = "";

  for (let i = 9; i <= 19; i++) {
    availableSlots.push(i);
    let button = document.createElement("button");
    button.className = `button${i}`;
    button.classList.add("timeSelectButton");
    button.addEventListener("click", () => {
      if (selectedTime) {
        document.querySelector(`.${selectedTime}`).classList.remove("selectedTimeButton");
      }
      document.querySelector(".personalInfoInput").classList.remove("disableDiv");

      button.classList.add("selectedTimeButton");
      selectedTime = `button${i}`;
      document.querySelector(".sessionDateAndTimeText").innerHTML = `${document.querySelector(`.${selectedTime}`).innerHTML}; ${selectedDay} ${months.slice(selectedMonth - 1, selectedMonth)} ${selectedYear}`;
      document.querySelector(".sessionTimeZoneText").innerHTML = `GMT ${timeDifferenceElement.value}`;
    });

    startTime = i + timeDifference - 1;
    startTimeMinutes = startTime % 1;
    startTimeHours = startTime - startTimeMinutes;
    startTimeMinutes = 60 * startTimeMinutes;

    endTimeMinutes = startTimeMinutes + 20;
    endTimeHours = startTimeHours + 1 + Math.floor(endTimeMinutes / 60);
    endTimeMinutes = endTimeMinutes % 60;

    endTimeMinutes = "0".repeat(2 - String(endTimeMinutes).length) + String(endTimeMinutes);
    endTimeHours = "0".repeat(2 - String(endTimeHours).length) + String(endTimeHours);
    startTimeMinutes = "0".repeat(2 - String(startTimeMinutes).length) + String(startTimeMinutes);
    startTimeHours = "0".repeat(2 - String(startTimeHours).length) + String(startTimeHours);

    if (startTime < 23 && startTime > 5) {
      button.innerHTML = `${startTimeHours}:${startTimeMinutes}-${endTimeHours}:${endTimeMinutes}`;
      //console.log(button)
      document.querySelector(".hourPicker").appendChild(button);
    }
  }
  return availableSlots;
}

timeDifferenceElement = document.getElementById("timezone");
timeDifferenceElement.addEventListener("change", changeAvailableTimeSlots);
changeAvailableTimeSlots();

//JSON za proste termine za celo leto
function resetDates() {
  let prostiTermini = {};
  for (let year = 2025; year <= 2026; year++) {
    prostiTermini[year] = {};
    for (let month = 1; month <= 12; month++) {
      prostiTermini[year][month] = {};
      for (let day = 1; day <= 31; day++) {
        prostiTermini[year][month][day] = {};
        prostiTermini[year][month][day] = availableSlots;
      }
    }
  }
  return prostiTermini;
}

//console.log(prostiTermini)
//const fs = require('fs')

console.log(resetDates());

//final conformation button
//pošiljanje emajla
const finalConformationButton = document.querySelector(".finalConformationButton");
finalConformationButton.addEventListener("click", bookSession);

function bookSession() {
  selectedTimeZone = document.getElementById("timezone").value;
  selectedName = document.querySelector(".nameInput").value;
  selectedDateOfBirth = document.querySelector(".dateInput").value;
  selectedTimeOfBirth = document.querySelector(".timeInput").value;
  selectedPlaceOfBirth = document.querySelector(".placeOfBirthInput").value;
  selectedEmail = document.querySelector(".emailAdressInput").value;
  selectedAditionalText = document.querySelector(".aditionalInformationInput").value;

  if (selectedYear && selectedMonth + 1 && selectedDay && selectedTimeZone && selectedTime && selectedName && selectedDateOfBirth && selectedTimeOfBirth && selectedPlaceOfBirth && selectedEmail) {
    console.log("all clear");
    const formData = { selectedAditionalInformation: selectedAditionalText, name: selectedName, selectedDay: selectedDay, selectedMonth: selectedMonth, selectedYear: selectedYear, selectedTime: selectedTime, selectedTimeZone: selectedTimeZone, selectedPlaceOfBirth: selectedPlaceOfBirth, selectedTimeOfBirth: selectedTimeOfBirth, userEmail: selectedEmail };
    finalConformationButton.textContent = "BOOKING";
    emailjs
      .send(serviceID, templateID, formData)
      .then(() => {
        alert("You have succesfully booked a session.");
      })
      .catch((error) => {
        console.error("nekaj je šlo narobe", error);
      })
      .finally(() => {
        finalConformationButton.textContent = "BOOKED";
        finalConformationButton.classList.add("disableDiv");
      });

    document.querySelector(".finalConformationWarning").innerHTML = "";
  } else {
    document.querySelector(".finalConformationWarning").innerHTML = "Fulfill the above information";
  }
}

document.querySelector(".timePicker").classList.add("disableDiv");
//document.querySelector('.hourPicker').classList.add('disableDiv')

document.querySelector(".personalInfoInput").classList.add("disableDiv");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//emajlJS konstante mojega profila
emailjs.init({
  publicKey: "P7sniMC3QHFYpfuBi",
});

const templateID = "template_hfek0tl";
const serviceID = "service_5uktpvt";
