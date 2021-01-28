// contains text input element with user's habit
let habit = document.getElementById('habitTextInput');
// contains the button that adds the habit to habitTrackerArea
const habitInputButton = document.getElementById('add_habit_btn');
// contains the div that is parent to each habit
const habitTrackerArea = document.getElementById('trackerArea');


habitInputButton.addEventListener('click', () => {
    if (habit.value !== "") {
        addHabit();
    }
});
habit.addEventListener("keydown", event => {
    if (habit.value !== "" && event.key === "Enter") {
        habitInputButton.click();
    }
});

function addHabit() {
    //habit.value should be a <div class="habit__row"> object
    habitTrackerArea.innerHTML += 
    `<div class='habit__row'>
        <label for='' class='row__label'>${habit.value}:</label>
        <div class='row__checkboxes'>
        </div>
    </div>`;
    habit.value = "";
  }

// holds the divs that contain the checkboxes for each habit 
let checkboxElements = document.getElementsByClassName("row__checkboxes");

// return the number of days in a month, given user input parameters
let days = (month,year) => {
    return new Date(year, month, 0).getDate();
 };

// adds a checkbox object to to div row__checkboxes for ever day in user selected month
// calls the deleteChild function to ensure div is empty before appending checkboxes
let addTotalDaysCheckboxes = (days, checkboxesDiv, day) => {
    // loops through # of habits (parent element), j = div
    for (let j = 0; j < checkboxesDiv.length; j++) {
        // deletes present checkboxes of the div
        deleteChild(checkboxesDiv[j]);
        // loops through # of days, i = day #
        for(let i = 0; i < days; i++) {
            // populates habit with checkbox
            checkboxesDiv[j].append(createCheckbox(i+1, day));
        }
    }
}

// returns a checkbox object when called
let createCheckbox = (num, day) => {
    // creating label element 
    let label = document.createElement('label');     
    label.for = `check-${num}`;
    label.innerText = `Day: ${num}`;
    // creating checkbox element 
    let checkbox = document.createElement('input');     
    // Assigning the attributes to created checkbox 
    checkbox.type = "checkbox"; 
    checkbox.id = `check-${num}`;
    if (num < day) {
        checkbox.disabled = true;
        label.style= "display:none;"
    }


    label.append(checkbox);

    return label;
}

// deletes all the children in parent element (used for checkboxes)
let deleteChild = (parent) => { 
    let child = parent.lastElementChild;  
    while (child) { 
        parent.removeChild(child); 
        child = parent.lastElementChild; 
    } 
} 

document.querySelector('input[type="date"]').addEventListener("change", function() {
    let input = this.value; // "XXXX-XX-XX" Year, Month, Day
    let year = input.slice(0,4)
    let month = input.slice(5,7)
    let day = input.slice(8,10);
    let daysInMonth = parseInt(days(month, year));
    
    //call function to add days(month, year) # of checkboxes
    addTotalDaysCheckboxes(daysInMonth, checkboxElements, day);
    console.log("Days: " + daysInMonth);
    console.log("Day: " + day);
})
