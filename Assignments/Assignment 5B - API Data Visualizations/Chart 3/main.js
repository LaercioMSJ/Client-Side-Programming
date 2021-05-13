(function(){

	fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then(function(response){
        return response.json();
    })
    .then(function(json){

        var friends = ["Joey", "Chandler", "Monica", "Rachel", "Phoebe", "Ross" , "Ursula", "Gunther"];

        var newFriendsObj = {};

        friends.map(
            character => newFriendsObj[character] = json._embedded.episodes.reduce((season, ep) => {
                if (typeof season[ep.season] === "undefined") {
                    season[ep.season] = 0;
                }

                if ((ep.name.indexOf(character) != -1) || (ep.summary.indexOf(character) != -1)) {
                    season[ep.season] = season[ep.season] + 1;
                }

                return season;
            }, {})
        );

        var chart = c3.generate({
            bindto: '#chart',
            data: {
                columns: []
            },
            axis: {
                x: {
                    type: 'category',
                    categories: Object.keys(newFriendsObj[friends[0]]).map(season => season)
                }
            }
        });

        var delay = 0;

        friends.map(character => {

            let temp = Object.keys(newFriendsObj[character]).map(season => newFriendsObj[character][season]);
            temp.unshift(character);

            setTimeout(function () {
                chart.load({
                    columns: [temp]
                });
            }, delay);

            delay += 1500;

        });

    })
})();