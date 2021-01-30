//#################################    Element variables    #################################\\
// contains text input element with user's habit
let habit = document.getElementById('habitTextInput');
// contains the button that adds the habit to habitTrackerArea
const habitInputButton = document.getElementById('add_habit_btn');
// contains the div that is parent to each habit
const habitTrackerArea = document.getElementById('trackerArea');
let calendarArea = document.getElementsByClassName('container__calendar');
// holds the divs that contain the checkboxes for each habit 
let checkboxElements = document.getElementsByClassName("row__checkboxes");
//#############################################################################################\\



//#################################    loads locally stored habits of user onto the document    #################################\\
if (typeof localStorage['test'] === 'undefined') {
    console.log('User has no locally saved data')
} else {
    habitTrackerArea.innerHTML = localStorage['test'];
    calendarArea[0].style="display:block;"
}
//#############################################################################################\\



//#################################    Input Event Listeners    #################################\\
habitInputButton.addEventListener('click', () => {
    if (habit.value !== "") {
        habitTrackerArea.append(createHabit(habit));
        calendarArea[0].style="display:block;"
    }
});
habit.addEventListener("keydown", event => {
    if (habit.value !== "" && event.key === "Enter") {
        habitInputButton.click();
    }
});

document.querySelector('input[type="date"]').addEventListener("change", calendarInput);

//#######################################################################################\\



//#################################    Functions    #################################\\

function calendarInput() {
    let input = this.value; // "XXXX-XX-XX" Year, Month, Day
    let year = parseInt(input.slice(0,4));
    let month = parseInt(input.slice(5,7));
    let day = parseInt(input.slice(8,10));
    let daysInMonth = parseInt(days(month, year));
    
    let dateInfo = {"dayChosen": day,
                    "days": daysInMonth,
                    "month": month,
                    "year": year 
                };
    //call function to add # of checkboxes
    addTotalDaysCheckboxes(dateInfo);
    //call function to update local storage
    store();
}
// adds a checkbox object to to div row__checkboxes for ever day in user selected month
// calls the deleteChild function to ensure div is empty before appending checkboxes
let addTotalDaysCheckboxes = (dateInfoObject) => {
// let addTotalDaysCheckboxes = (days, day, year, month) => {
    // loops through # of habits (parent element), j = div
    for (let j = 0; j < checkboxElements.length; j++) {
        // deletes present checkboxes of the div
        deleteChild(checkboxElements[j]);
        // loops through # of days, i = day #
        for(let i = 0; i < dateInfoObject.days; i++) {
            // populates habit with checkbox
            let checkbox = createCheckbox(i+1, dateInfoObject.dayChosen, dateInfoObject.year, dateInfoObject.month);
            if (typeof checkbox === 'object' && checkbox !== null) {
                checkboxElements[j].append(checkbox);
            }
        }
    }
}


// store trackerArea div to local storage
function store() {
    let userStorage = window.localStorage;
    userStorage.setItem('test', trackerArea.innerHTML);
}

// return the number of days in a month, given user input parameters
let days = (month,year) => {
return new Date(year, month, 0).getDate();
};


// returns a checkbox object when called
let createCheckbox = (num, day, year, month) => {
    if (num >= day) {
        let checkBoxDate = new Date(year+1,month,num);
        let options = { weekday: 'long'};
        let stringCurrentDate = new Intl.DateTimeFormat('en-US', options).format(checkBoxDate);
        // creating label element 
        let label = document.createElement('label');     
        label.for = `check-${num}`;
        label.innerText = `${month}/${num} ${stringCurrentDate}:`;
        // creating checkbox element 
        let checkbox = document.createElement('input');     
        // Assigning the attributes to created checkbox 
        checkbox.type = "checkbox"; 
        checkbox.id = `check-${num}`;
        checkbox.checked = true;
        checkbox.addEventListener('click', function() {
            if (this.checked === true) {
                this.setAttribute('checked', this.checked);
                let userStorage = window.localStorage;
                userStorage.setItem('test', trackerArea.innerHTML);
                console.log("checked")
            } else {
                console.log("unchecked")
            }
        })

        label.append(checkbox);
        return label;
    }
}

// deletes all the children in parent element (used for checkboxes)
let deleteChild = (parent) => { 
    let child = parent.lastElementChild;  
    while (child) { 
        parent.removeChild(child); 
        child = parent.lastElementChild; 
    } 
} 

function createHabit(newHabit) {
    let habitText = newHabit.value;
    let divHabitRow = document.createElement('div');
    divHabitRow.classList.add("habit__row");

    let rowLabelDiv = document.createElement('label');
    rowLabelDiv.classList.add("row__label");
    rowLabelDiv.textContent = habitText;

    let rowCheckboxesDiv = document.createElement('div');
    rowCheckboxesDiv.classList.add("row__checkboxes");

    divHabitRow.append(rowLabelDiv);
    divHabitRow.append(rowCheckboxesDiv);
    newHabit.value = "";
    return divHabitRow;
}