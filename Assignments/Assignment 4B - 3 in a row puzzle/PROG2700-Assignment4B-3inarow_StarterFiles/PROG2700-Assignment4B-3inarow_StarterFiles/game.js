(function(){

    fetch('https://threeinarowpuzzle.herokuapp.com/sample')
    .then(function(response){ 
        return response.json()
    })
    .then(function(json){

        var table = document.createElement("TABLE");
        table.setAttribute("id", "theTable");
        document.getElementById("theGame").appendChild(table);

        console.log(json.rows.length);
        console.log(json);

        for (let i = 0; i <= json.rows.length; i++) {
            
            let row = document.createElement("TR");
            row.setAttribute("id", "theRow"+i);
            document.getElementById("theTable").appendChild(row);

            for (let j = 0; j <= json.rows.length; j++) {
                            
                let cell = document.createElement("TD");
                cell.setAttribute("id","theCell"+i+"x"+j);
                /*if ((i === 0 && j !== 0) || (i !== 0 && j === 0)) {
                    cell.setAttribute("class","indexes");
                }*/
                document.getElementById("theRow"+i).appendChild(cell);

            }

        }

        for (let i = 0; i < json.rows.length; i++) {
            
            for (let j = 0; j < json.rows[i].length; j++) {

                var square = document.getElementById("theCell"+(i+1)+"x"+(j+1));

                if (json.rows[i][j].canToggle) {
                    square.addEventListener("click", function(){
                        newState = json.rows[i][j].currentState === 2 ? 0 : json.rows[i][j].currentState + 1;
                        json.rows[i][j].currentState = newState;
                        this.setAttribute("attr",newState);
                        updateIndex();
                    });
                }

                square.setAttribute("attr",json.rows[i][j].currentState);

            }

        }

        function updateIndex() {
            for (let i = 0; i < json.rows.length; i++) {

                let state1 = 0;
                let state2 = 0;
                let index = document.getElementById("theCell0x"+(i+1));
            
                for (let j = 0; j < json.rows.length; j++) {
                    if (json.rows[j][i].currentState === 1) {
                        state1 += 1;
                    }
                    if (json.rows[j][i].currentState === 2) {
                        state2 += 1;
                    }
                }

                index.textContent = state1+"/"+state2;
            }

            for (let i = 0; i < json.rows.length; i++) {

                let state1 = 0;
                let state2 = 0;
                let index = document.getElementById("theCell"+(i+1)+"x0");
            
                for (let j = 0; j < json.rows.length; j++) {
                    if (json.rows[i][j].currentState === 1) {
                        state1 += 1;
                    }
                    if (json.rows[i][j].currentState === 2) {
                        state2 += 1;
                    }
                }

                index.textContent = state1+"/"+state2;
            }
        };

        var button = document.createElement("BUTTON");
        button.textContent = "Check Puzzle";
        button.addEventListener("click", function(){
            let puzzleIsComplete = true;
            let allColoredSquaresAreCorrect  = true;

            for (let i = 0; i < json.rows.length; i++) {
                for (let j = 0; j < json.rows[i].length; j++) {  

                    if (json.rows[i][j].currentState !== json.rows[i][j].correctState) {
                        puzzleIsComplete = false;

                        if (json.rows[i][j].currentState !== 0) {
                            allColoredSquaresAreCorrect = false;

                            if (document.getElementById('theCheckbox').checked) {
                                document.getElementById("theCell"+(i+1)+"x"+(j+1)).innerHTML = "X";
                            }

                        }

                    }
                    else {
                        document.getElementById("theCell"+(i+1)+"x"+(j+1)).innerHTML = "";
                    }

                    if (!document.getElementById('theCheckbox').checked) {
                        document.getElementById("theCell"+(i+1)+"x"+(j+1)).innerHTML = "";
                    }
                }
            }

            let text = "";
            if (puzzleIsComplete) {
                text = "You did it!!!"
                alert("You did it!!!")
            }
            else if (allColoredSquaresAreCorrect) {
                text = "So far so good"
            }
            else {
                text = "Something is wrong"
            }

            document.getElementById("theParagraph").textContent = text;
        });
        document.getElementById("theGame").appendChild(button);

        var paragraph = document.createElement("P");
        paragraph.setAttribute("id", "theParagraph");
        document.getElementById("theGame").appendChild(paragraph);

        var checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "theCheckbox");
        document.getElementById("theGame").appendChild(checkbox);

        var label = document.createElement("LABEL");
        label.setAttribute("for", "theCheckbox");
        label.textContent = "Display any incorrect squares";
        document.getElementById("theGame").appendChild(label);

        updateIndex();

    })

})();