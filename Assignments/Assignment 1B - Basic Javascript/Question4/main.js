/*
Question 4
Desc: Write a JavaScript program to iterate through an array of ten(10) positive randomly generated numbers.
 Each number will then be checked to see if it’s a primary prime number.

•	Sample Expected output (console.log()).

23-yes, 15-no, 22-no, 124-no, 11-yes, 9-no, 2-yes, 13-yes, 5-yes, 1-no

Date: 25 January 2021

Author: Laercio M da Silva Junior - W0433181.
*/


// JavaScript closure used to protect variables from global context
// while allowing code execution at least once
(function(){

    var randomNumberArray = [];

    var divisors = 0;

    var result = [];

    for (var i = 0; i < 10; i++) {

        randomNumberArray.push(Math.ceil(Math.random() * 200));

    }

    for (var j = 0; j < randomNumberArray.length; j++) {

        for (var count = 1; count <= randomNumberArray[j]; count++) {

            if (randomNumberArray[j] % count == 0) {

                divisors++;

            }

        }
        
        if (divisors === 2) {

            result.push(randomNumberArray[j] + "-yes"); 

        }
        else {

            result.push(randomNumberArray[j] + "-no"); 

        }

        divisors = 0;

    }

    console.log(result);

})();