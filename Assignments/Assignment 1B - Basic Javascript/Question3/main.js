/*
Question 3
Desc: Write a JavaScript program to calculate the number of weeks, days, hours, minutes and seconds left until midnight on your birthday.
•	The script does not have to prompt for your birthdate. Simply assign it to a variable and start from there.
o	Ex: var myNextBirthday = …your code here
•	Expected sample output (console.log()):
o	There are 35 weeks, 3 days, 13 hours, 25 minutes, and 12 seconds until my next birthday!

Date: 25 January 2021

Author: Laercio M da Silva Junior - W0433181.
*/


// JavaScript closure used to protect variables from global context
// while allowing code execution at least once
(function(){

    // currentDate variable is declared and receives the current date in milliseconds
    var currentDate = new Date();

    // The birthday is passed as a string in the format MM-DD-YYYY
    // NOTE: Put your birthday inside the brackets
    var myNextBirthdate = new Date('03-09-2021');

    // Calculated the difference in milliseconds between the current date and the date of the next birthday. IMPORTANT: dateDifference is in milliseconds
    var dateDifference = myNextBirthdate - currentDate;

    // One day (24 hours) is 86400000 milliseconds, so 7 days multiplied by 86400000 is the number of weeks
    var dateDifferenceInWeeks = Math.floor(dateDifference / (7 * 86400000));

    var totalInDays = Math.floor(dateDifference / 86400000);
    var dateDifferenceInDays = totalInDays - (dateDifferenceInWeeks * 7);

    var totalInHours = Math.floor(dateDifference / (86400000 / 24));
    var dateDifferenceInHours = totalInHours - (totalInDays * 24);

    var totalInMinutes = Math.floor(dateDifference / (86400000 / 1440));
    var dateDifferenceInMinutes = totalInMinutes - (totalInHours * 60);
  
    var totalInSeconds = Math.floor(dateDifference / (86400000 / 86400));
    var dateDifferenceInSeconds = totalInSeconds - (totalInMinutes * 60);

    console.log("There are " +  dateDifferenceInWeeks + " weeks, " + dateDifferenceInDays + " days, " + dateDifferenceInHours + 
    " hours, " + dateDifferenceInMinutes + " minutes, " + dateDifferenceInSeconds + " seconds until my next birthday!");

})();