(function(){

	fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then(function(response){
        return response.json();
    })
    .then(function(json){

        var castHeight = 450;
        var castWidth = 450;
        var genderHeight = 730;
        var genderWidth = 730;

        var gender = json._embedded.cast.reduce((gender, cast) => {

            if (typeof gender[cast.person.gender] === "undefined") {
                gender[cast.person.gender] = [];
            }

            gender[cast.person.gender].push([cast.person.name]);

            return gender;
        }, {});


        var allCast = Object.keys(gender).reduce((array, g) => {

            if (g == "Female") {
                gender[g].map(c => array.push([c, 1]));
            }
            else if (g == "Male") {
                gender[g].map(c => array.unshift([c, 1]));
            }

            return array;
        }, []);

        var chart1 = c3.generate({
            bindto: '#cast',
            size: {
                height: castHeight,
                width: castWidth
            },
            data: {
                columns: allCast,
                type: 'donut'
            },
            donut: {
                label: {
                    format: function (value, ratio, id) {
                        return id;
                    }
                }
            },
            legend: {
                show: false
            }
        });



        var allGender = Object.keys(gender).reduce((array, g) => {

            if (g == "Male") {
                array[0] = [g, 0];
                gender[g].map(c => array[0][1] = array[0][1] + 1);
            }
            else if (g == "Female") {
                array[1] = [g, 0];
                gender[g].map(c => array[1][1] = array[1][1] + 1);
            }

            return array;
        }, []);

        var chart2 = c3.generate({
            bindto: '#gender',
            size: {
                height: genderHeight,
                width: genderWidth
            },
            data: {
                columns: allGender,
                type: 'donut'
            },
            donut: {
                title: "Cast by Gender"
            }
        });

        var svg = document.querySelectorAll("svg");

        svg[0].style.position = "absolute";
        svg[0].style.top = "490px";
        svg[0].style.left = "50%";
        svg[0].style.transform = "translate(-"+ (castWidth/2) + "px,-"+ (castHeight/2) + "px)";

        svg[1].style.position = "absolute";
        svg[1].style.top = "500px";
        svg[1].style.left = "50%";
        svg[1].style.transform = "translate(-"+ (genderWidth/2) + "px,-"+ (genderHeight/2) + "px)";

        document.querySelector("#cast").style.zIndex = "10";

        /*document.querySelectorAll("#cast g.c3-chart-arc.c3-target.c3-target text").forEach(target => target.style.fontSize = "10px");*/

    })
})();