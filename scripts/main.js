document.querySelector('input[type="date"]').addEventListener("change", function() {
    let input = this.value;
    let year = input.slice(0,4)
    let month = input.slice(5,7)

    //call function to add days(month, year) # of checkboxes

    console.log("Days in " + month + ":" +days(month, year));
})
//-------------------------------------------------------------------------------------

let days = function(month,year) {
    return new Date(year, month, 0).getDate();
 };
