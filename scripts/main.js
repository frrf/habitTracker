let days = (month,year) => {
    // return the number of days in a month, given user input parameters
    return new Date(year, month, 0).getDate();
 };

let checkboxElements = document.getElementsByClassName("row__checkboxes");

document.querySelector('input[type="date"]').addEventListener("change", function() {
    let input = this.value;
    let year = input.slice(0,4)
    let month = input.slice(5,7)
    let daysInMonth = parseInt(days(month, year));
    //call function to add days(month, year) # of checkboxes
    addTotalDaysCheckboxes(daysInMonth, checkboxElements)
    console.log("Days: " + daysInMonth);
})

// adds a checkbox object to to div row__checkboxes for ever day in user selected month
let addTotalDaysCheckboxes = (days, checkboxesDiv) => {
    // loops through # of habits, j = div
    for (let j = 0; j < checkboxesDiv.length; j++) {
        // loops through # of days, i = day #
        for(let i = 0; i < days; i++) {
            // populates habit with checkbox
            checkboxesDiv[j].append(createCheckbox());
            console.log("Hello");
        }
    }
}

// returns a checkbox object when called
let createCheckbox = () => {
    // creating checkbox element 
    let checkbox = document.createElement('input');     
    // Assigning the attributes to created checkbox 
    checkbox.type = "checkbox"; 
    checkbox.name = ""; 
    checkbox.id = ""; 
    return checkbox;
}