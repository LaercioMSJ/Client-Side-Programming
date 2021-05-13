/*
Question 1
Desc: Write a function in JavaScript that will receive a string as a parameter and then perform the following:

• You don’t have to prompt for a string. Simply assign a string to a variable in your code as your starting
 point to use as an argument for your function.
• If the first and last characters of the string are the same (ignoring case), the function will return
 the string in reverse order. Otherwise, the function will return the string with the first and last letters removed.
• Example: “Triscuit” returns “tiucsirT” but “Cracker” returns “racke”.

Date: 25 January 2021

Author: Laercio M da Silva Junior - W0433181.
*/


function changeString(originalString) {

    // if statement to check if the string has the same first and last characters
    if (originalString[0].toUpperCase() === originalString[originalString.length-1].toUpperCase()) {

        var reverseString = "";
        var i = originalString.length -1;

        // while loop is used to get each character from the originalString from the last to the first, and add it to the reverseString variable 
        while ( i >= 0) {
            reverseString = reverseString + originalString[i];
            i--;
        }

        return reverseString;

    }

    // f the first and last characters are not the same, then the string is returned without the first and last characters
    else {
        return originalString.substr(1, originalString.length-2);
    }

}

console.log(changeString('Triscuit'));
console.log(changeString('Cracker'));
console.log(changeString('TriscuiT'));
console.log(changeString('tRISCUIt'));