let days = (month,year) => {
    // return the number of days in a month, given user input parameters
    return new Date(year, month, 0).getDate();
 };

let checkboxElements = document.getElementsByClassName("row__checkboxes");

document.querySelector('input[type="date"]').addEventListener("change", function() {
    let input = this.value; // "XXXX-XX-XX" Year, Month, Day
    let year = input.slice(0,4)
    let month = input.slice(5,7)
    let daysInMonth = parseInt(days(month, year));
    
    //call function to add days(month, year) # of checkboxes
    addTotalDaysCheckboxes(daysInMonth, checkboxElements)
    console.log("Days: " + daysInMonth);
})

// adds a checkbox object to to div row__checkboxes for ever day in user selected month
// calls the deleteChild function to ensure div is empty before appending checkboxes
let addTotalDaysCheckboxes = (days, checkboxesDiv) => {
    // loops through # of habits (parent element), j = div
    for (let j = 0; j < checkboxesDiv.length; j++) {
        // deletes present checkboxes of the div
        deleteChild(checkboxesDiv[j]);
        // loops through # of days, i = day #
        for(let i = 0; i < days; i++) {
            // populates habit with checkbox
            checkboxesDiv[j].append(createCheckbox());
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

// deletes all the children in parent element (used for checkboxes)
let deleteChild = (parent) => { 
    let child = parent.lastElementChild;  
    while (child) { 
        parent.removeChild(child); 
        child = parent.lastElementChild; 
    } 
} 