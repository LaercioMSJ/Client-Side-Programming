(function(){

    //create map in leaflet and tie it to the div called 'theMap'
    var map = L.map('theMap').setView([42, -60], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    var planeIcon = L.icon({
        iconUrl: 'plane2.png',
        iconSize: [50,50],
        iconAnchor: [25, 25]
    });

    var firstRefresh = true;

    function formatDate(unformattedDate) {
        var d = new Date(unformattedDate*1000);
        return d.toLocaleString();
    };

    function loadData() {

        fetch('https://opensky-network.org/api/states/all')
        .then(function(response){ 
            return response.json()
        })
        .then(function(json){

            map.eachLayer(function (layer) {
                if (layer.hasOwnProperty('feature')) {
                    map.removeLayer(layer);
                }
            });
    
            var data = json.states.filter(flights => flights[2] === "Canada");
    
            var geojsonFeatures = data.map(flight => ({
                    "type": "Feature",
                    "properties": {
                        "callsign": flight[1],
                        "origin_country": flight[2],
                        "last_contact": formatDate(flight[4]),
                        "baro_altitude": flight[7],
                        "velocity": flight[9],
                        "true_track": flight[10],
                        "vertical_rate": flight[11],
                        "popupContent": "Flight: " + flight[1] + " - Country of Origin: " + flight[2] + " - Last Contact: " + formatDate(flight[4]) + " - Altitude: " + flight[7] + " meters - Velocity: " + flight[9] + " m/s - Vertical Rate: " + flight[11] + " m/s"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [flight[5], flight[6]]
                    }
                })
            );
    
            var addedGeoJson = L.geoJSON(geojsonFeatures, {
                onEachFeature: function(feature, layer) {
                    layer.bindPopup(feature.properties.popupContent);
                    layer.setIcon(planeIcon);
                    layer.setRotationOrigin("center center");
                    layer.setRotationAngle(feature.properties.true_track);
                }
            }).addTo(map);

            if (firstRefresh) {
                map.fitBounds(addedGeoJson.getBounds(), {
                    padding:[30,30]
                });
                firstRefresh = false;
            }
       
            console.log(data);
            console.log(geojsonFeatures);
            console.log(addedGeoJson);
            
        })
    };

    function updateFlights() {

        loadData();
                
        setTimeout(updateFlights, 7000);
    };

    loadData();
    
    updateFlights();
    

})();