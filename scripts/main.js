//#################################    Element variables    ##########################################\\
// contains text input element with user's habit
const habit = document.getElementById('habitTextInput');
// contains the button that adds the habit to habitTrackerArea
const habitInputButton = document.getElementById('add_habit_btn');
// contains the div that is parent to each habit
const habitTrackerArea = document.getElementById('trackerArea');
// contains the div containing the calendar input element
const calendarArea = document.getElementById('calendar');
// holds the divs that contain the checkboxes for each habit 
const checkboxElements = document.getElementsByClassName("row__checkboxes");
// initializes localStorage object
const userStorage = window.localStorage;

let counter = 1;
//####################################################################################################\\

//#################################    Input Event Listeners    ######################################\\
document.querySelector('input[type="date"]').addEventListener("change", calendarInput);

habitInputButton.addEventListener('click', () => {
    if (habit.value !== "") {
        habitTrackerArea.append(createHabit(habit));
        // add habit to storage--------------------------------------------------------------
        calendarArea.style="display:block;"
    }
});

habit.addEventListener("keydown", event => {
    if (habit.value !== "" && event.key === "Enter") {
        habitInputButton.click();
    }
});
//####################################################################################################\\

//##############################################    Functions    ###################################################\\
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
    userStorage.setItem('chosenDate', input);
    //call function to add # of checkboxes
    addTotalDaysCheckboxes(dateInfo);
    //call function to update local storage
    store();
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => checkbox.addEventListener("change", checked));
}

function createHabit(newHabit) {
    let habitText = newHabit.value;
    let divHabitRow = document.createElement('div');
    divHabitRow.classList.add("habit__row");
    divHabitRow.id = `habit-${counter}`;

    let rowLabelDiv = document.createElement('label');
    rowLabelDiv.classList.add("row__label");
    rowLabelDiv.textContent = habitText;

    let rowCheckboxesDiv = document.createElement('div');
    rowCheckboxesDiv.classList.add("row__checkboxes");

    divHabitRow.append(rowLabelDiv);
    divHabitRow.append(rowCheckboxesDiv);
    newHabit.value = "";
    counter++;
    return divHabitRow;
}

// return the number of days in a month, given user input parameters
let days = (month,year) => {return new Date(year, month, 0).getDate()};

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
            let checkbox = createCheckbox(j+1,i+1, dateInfoObject.dayChosen, dateInfoObject.year, dateInfoObject.month);
            if (typeof checkbox === 'object' && checkbox !== null) {
                checkboxElements[j].append(checkbox);
            }
        }
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

// returns a checkbox object when called
let createCheckbox = (habitNum,num, day, year, month) => {
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
        checkbox.id = `habit-${habitNum}-check-${num}`;
        checkbox.checked = "";
        label.append(checkbox);
        return label;
    }
}

// store trackerArea div to local storage
function store() {
    userStorage.setItem('test', trackerArea.innerHTML);
}

//#####################    loads locally stored habits of user onto the document    ##################\\
if (typeof localStorage['test'] === 'undefined') {
    console.log('User has no locally saved data')
} else {
    habitTrackerArea.innerHTML = localStorage['test'];
    calendarArea.style="display:block;"
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => checkbox.addEventListener("change", checked));
//####################################################################################################\\
}


// document.querySelectorAll("input[type='checkbox']").forEach(checkbox => checkbox.addEventListener("click", checked));

function checked() {
    if (this.checked == true){
        console.log(`checked:${this.id}`);
        this.setAttribute("checked", "");
    }else{
        console.log(`unchecked:${this.id}`)
        this.removeAttribute("checked");
    }
    localStorage['test'] = habitTrackerArea.innerHTML;
}