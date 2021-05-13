/*
Question 2
Desc: Write a function in JavaScript that will return the sum of the longest
 streak of consecutive increasing numbers within an array. 
If there are no consecutive numbers in the array, the function will return zero.
If there are multiple instances of the same number of consecutive numbers (increasing by 1)
 in the array, the function will return the largest sum calculated between all instances.
Examples:
[1, 2, 3, 6, 9, 34, 2, 6] would return 6 (1+2+3)
[3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3] would return 27 (8+9+10)
[100, 101, 102, 3, 4, 5, 6, 9] would return 18 (3+4+5+6)

Date: 25 January 2021

Author: Laercio M da Silva Junior - W0433181.
*/

// sumAllValuesArray function sums up all numeric values contained in an array. PS: works only with one-dimensional arrays
function sumAllValuesArray(array) {
    var total = 0;

    // Used "for loop" to take each value contained in each position of the array and add it to the total variable
    for ( var i = 0; i < array.length; i++ ){
        total += array[i];
    }

    return total; // Returns the sum total of the values contained in the array
}


// sumLongestConsecutiveSequence function looks for the longest sequence of consecutive increasing numbers in an array
// and returns the numerical sequence found and the sum of those numbers.
function sumLongestConsecutiveSequence(originalArray) {
    var sequenceIdentified = [];   // Array that will store the numbers in Sequence identified
    var longestStreak = [];   // Array that will store the longest streak of consecutive increasing numbers
    var firstSequenceNumber = true;   // Variable used to check if the next value to be stored in sequenceIdentified is the first number in the sequence

    // Used "for loop" to take each value contained in each position of the array
    for (var i = 1; i < originalArray.length; i++) {

        // if statement used to check if the value is a consecutive number increasing by 1. Note that the check starts with the
        // second value contained in the array (originalArray[1]), since the for loop was started with 1 instead of 0. This is done to
        // prevent an error from occurring when the program tries to compare the last position of the array with the next position that in this case does not exist
        if (originalArray[i] - originalArray[i-1] === 1) {

            // if statement used to check if the next value to be stored in sequenceIdentified is the first number in the sequence
            // If so, the program will store the value contained in the current position and the value contained in the previous position
            if (firstSequenceNumber) {
                sequenceIdentified.push(originalArray[i-1], originalArray[i]);
                firstSequenceNumber = false;
            }
            // If not, the program will store only the value contained in the current position
            else {
                sequenceIdentified.push(originalArray[i]);
            }

        }
        
        // No sequence is identified or the end of a sequence is identified
        else {
            // firstSequenceNumber is set to true again to start the search for a new sequence
            firstSequenceNumber = true;
            // Values contained in sequenceIdentified are deleted
            sequenceIdentified = [];
        }

        // If no longer array is already contained in longestStreak, longestStreak will have its values replaced by the sequenceIdentified array
        if (sequenceIdentified.length > longestStreak.length) {
            longestStreak = sequenceIdentified;
        }

        // If longestStreak and sequenceIdentified already have arrays with the same length, then the criterion of which sequence has the largest total sum of its values is used.
        // If the sum of the values contained in sequenceIdentified is greater than the sum of the values contained in longestStreak, then longestStreak will have its values
        // replaced by the sequenceIdentified array. Otherwise, the values contained in sequenceIdentified will only be deleted.
        else if ((sequenceIdentified.length === longestStreak.length) && (sumAllValuesArray(sequenceIdentified) > sumAllValuesArray(longestStreak))) {
            longestStreak = sequenceIdentified;
        }
        
    }
    
    return sumAllValuesArray(longestStreak) + ' (' + longestStreak + ')';
}

console.log(sumLongestConsecutiveSequence([ 1, 2, 3, 6, 9, 34, 2, 6]));
console.log(sumLongestConsecutiveSequence([ 3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3]));
console.log(sumLongestConsecutiveSequence([ 100, 101, 102, 3, 4, 5, 6, 9]));
console.log(sumLongestConsecutiveSequence([ 4, 8, 16, 18, 100]));
console.log(sumLongestConsecutiveSequence([ 100, 101, 102, 4, 5, 6, 9, 10, 11, 12]));