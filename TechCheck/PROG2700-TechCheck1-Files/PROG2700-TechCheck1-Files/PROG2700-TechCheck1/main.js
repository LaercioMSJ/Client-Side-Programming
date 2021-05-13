/*
* PHONEWORDS
* Write a function that will take a phone word (vanity number) and return the correct telephone number.
* The number pad looks like the following:
* https://en.wikipedia.org/wiki/Telephone_keypad#/media/File:Telephone-keypad2.svg
*
* RULES
* Given a phoneword:
* 1. Ignore any non-alphanumeric characters (), -, etc.
* 2. Keep any existing digits
* 3. Resolve a letter to a number according to the keypad image
* 4. All your code must be contained in the section outlined below
*/


var buttons = ["abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"] //DO NOT MODIFY


// YOU CAN ADD TO AND MODIFY THE CODE BELOW THIS LINE
//   |
//   V

function convertPhoneWord(phoneWord) {

    //Enter your code in this function body
    var result = "";
    var char = "";

    if ((phoneWord === null) || (phoneWord === undefined)) {
        return "";
    }

    for ( var i = 0; i < phoneWord.length; i++ ) {

        char = phoneWord[i];

        if (isLetter(char)) {

            for ( var j = 0; j < buttons.length; j++ ) {   

                char = char.toUpperCase();
                groupLetters = buttons[j].toUpperCase();
                if (groupLetters.indexOf(char) != -1) {
                    result += (j + 2);
                } 
            }

        }

        else if (isDigit(char)) {
            result += char;
        }

    }
   
    return result;

}

//    ^
//    |
//YOU CAN ADD TO OR MODIFY THE CODE ABOVE THIS LINE




// DO NOT CHANGE ANY CODE AFTER THIS LINE.
//     |
//     |
//     V

//helper functions...do not modify, but you can use them in your code

function isDigit(character) {
    return "0123456789".indexOf(character) !== -1;
}

function isLetter(character) {
    character = character.toUpperCase();    
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(character) !== -1;
}

testCode();