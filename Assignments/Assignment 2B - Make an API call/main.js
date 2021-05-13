// IIFE
(function(){
    fetch("https://rickandmortyapi.com/api/character/")
    .then(function(response){ 
        return response.json()
    })
    .then(function(data){ 

        document.write("<h1>The Rick and Morty API</h1>");

        for (var i in data.results) {

            for (var j of Object.keys(data.results[i])) {

                if (typeof(data.results[i][j]) == "object") {

                    document.write("<h4>" + j + ":</h4>");

                    for (var k of Object.keys(data.results[i][j])) {
                        document.write("<h4>&emsp;" + k + ": " + data.results[i][j][k] + "</h4>");
                    }
                }
                else {
                    document.write("<h4>" + j + ": " + data.results[i][j] + "</h4>");
                }

            }

            document.write("<br />");
        }
    });
})();
