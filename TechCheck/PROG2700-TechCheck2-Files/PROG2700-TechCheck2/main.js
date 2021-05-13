(function(tests){

    var DATA_URL = "https://prog2700.netlify.app/json/dnaMap.json";
    var DNA_SEQUENCE = "GTGCCAATGTTACTGCTAAATCTCTATATACAGTGGCTTAAGGATGGGGGGCCCAGCAGCGGCCGACCCCCCCCCTCAGTGTGGAATCAACCGGAATTGAGG";
    
    // Extract Codons as JavaScript Array from the DNA Sequence String.
    var extractCodonsFromDNA = function(dnaSequence)
    {
      var codons = [];
      var temp = "";
  
      // TODO: ADD CODE TO COMPLETE THE FUNCTION HERE...
      // you'll get an error notification in the console until the function is completed correctly

      for (let i = 0; dnaSequence[i] != undefined; i++) {

        if (temp[2] === undefined) {
          temp += dnaSequence[i];
        }
        else {
          codons.push(temp);
          temp = "";
          temp += dnaSequence[i];
        }

      }

      codons.push(temp);

      return codons;
    }
    
    // Compare the Codons array with the map of Amino Acids found in the json data.
    // Add any matches to the aminos array.
    var translateCodonsToAminos = function(codons, jsonData) 
    {
      var aminos = [];
      
      // TODO: ADD CODE TO COMPLETE THE FUNCTION HERE...
      // you'll get an error notification in the console until the function is completed correctly

      for (let i = 0; codons[i] != undefined; i++) {
        for (let j = 0; jsonData[j] != undefined; j++) {
            if (Object.values(jsonData[j].codons).indexOf(codons[i]) > -1) {

              aminos.push(jsonData[j].abbr)

            }
        }
      }      
      return aminos;
    }
    
    var runProgram = function () {
      var codons = extractCodonsFromDNA(DNA_SEQUENCE); //DO NOT MODIFY
      var aminos; //DO NOT MODIFY
      

      // TODO: ENTER CODE TO LOAD DATA FROM API HERE.

      fetch(DATA_URL)
      .then(function(response){ 
          return response.json()
      })
      .then(function(data){ 
  
        json = data;
 
      //ONCE YOU HAVE YOUR API CALL WORKING, UNCOMMENT THE LINE ABOVE THE runTests line AND APPLY 
      //BOTH LINES (including the test line) WITHIN THE CODE ABOVE WHERE YOU RECEIVE YOUR JSON DATA FROM YOUR API CALL...
      //DO NOT MODIFY THE LINES EXCEPT FOR UNCOMMENTING THEM AND MOVING THEM TO THE CORRECT LOCATION ABOVE IN CODE

      aminos = translateCodonsToAminos(codons, json); //DO NOT MODIFY...but you can uncomment and move when ready
      tests.runTests(codons, aminos) //DO NOT MODIFY...but you can move when ready

      });
    }

    runProgram(); // DO NOT MODIFY
  
  })(tests);