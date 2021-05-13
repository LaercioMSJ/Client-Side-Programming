(function(){

    //create map in leaflet and tie it to the div called 'theMap'
    var map = L.map('theMap').setView([44.650627, -63.597140], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    var busIcon = L.icon({
        iconUrl: 'bus.png',
        iconSize: [50,51],
        iconAnchor: [25, 25.5]
    });

    var firstRefresh = true;

    function formatDate(unformattedDate) {
        return [unformattedDate.slice(0,4), "/", unformattedDate.slice(4,6), "/", unformattedDate.slice(6)].join('')
    };

    function loadData() {

        fetch('https://hrmbusapi.herokuapp.com/')
        .then(function(response){ 
            return response.json()
        })
        .then(function(json){

            map.eachLayer(function (layer) {
                if (layer.hasOwnProperty('feature')) {
                    map.removeLayer(layer);
                }
            });
    
            var data = json.entity.filter(buses => buses.vehicle.trip.routeId.replace(/([a-zA-Z])/g, "") <= 10);
    
            var geojsonFeatures = data.map(bus => ({
                    "type": "Feature",
                    "properties": {
                        "id": bus.id,
                        "route": bus.vehicle.trip.routeId,
                        "date": formatDate(bus.vehicle.trip.startDate),
                        "bearing": bus.vehicle.position.bearing,
                        "popupContent": "Bus: " + bus.id + " - Route: " + bus.vehicle.trip.routeId + " - Date: " + formatDate(bus.vehicle.trip.startDate)
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [bus.vehicle.position.longitude, bus.vehicle.position.latitude]
                    }
                })
            );
    
            var addedGeoJson = L.geoJSON(geojsonFeatures, {
                onEachFeature: function(feature, layer) {
                    layer.bindPopup(feature.properties.popupContent);
                    layer.setIcon(busIcon);
                    layer.setRotationOrigin("center center");
                    layer.setRotationAngle(feature.properties.bearing);
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

    function updateBuses() {

        loadData();
                
        setTimeout(updateBuses, 7000);
    };

    loadData();
    
    updateBuses();
    

})();