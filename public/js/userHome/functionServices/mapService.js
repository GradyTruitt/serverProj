angular.module('detailApp').service('mapService', function($http){

    this.ln;
    this.la;

    this.userID;
    this.oldlon;
    this.oldlat;

    this.updateUserLocation = function() {
        var coords = {
            lat: this.la,
            lon: this.ln
        };
        var id = this.userID;
        $http.put('/api/users/location', {id: id, location: coords}).then(function(res){
            return;
        });
    };


this.loadMap = function(currentUser) {

    if (!this.ln || !this.la) {
                    var longitude = this.oldlon;
                    var latitude = this.oldlat;
                    
                    mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JhZHl0cnVpdHQiLCJhIjoiY2o3MnZlOGhjMDFlZzMyb2MybWZ0cHVmMiJ9.rFInG0dBQqNlpfxP7sC8MQ';
                    var map = new mapboxgl.Map({
                        container: 'map', // container id
                        style: 'mapbox://styles/gradytruitt/cj79tgrqx8h382ro6buveuueu', // stylesheet location
                        center: [longitude, latitude], // starting position [lng, lat]
                        zoom: 12 // starting zoom 
                    });
                    
                    var lat = latitude;
                    var lon = longitude;
                    
                    map.on('load', function() {
                        map.loadImage('../assets/mapicon.png', function(error, image) {
                            if (error) throw error;
                            map.addImage('cat', image);
                            map.addLayer({
                                "id": "points",
                                "type": "symbol",
                                "source": {
                                    "type": "geojson",
                                    "data": {
                                        "type": "FeatureCollection",
                                        "features": [{
                                            "type": "Feature",
                                            "geometry": {
                                                "type": "Point",
                                                "coordinates": [lon, lat]
                                            }
                                        }]
                                    }
                                },
                                "layout": {
                                    "icon-image": "cat",
                                    "icon-size": 0.15
                                }
                            });
                        });
                    });
            }

    else {
        
        this.updateUserLocation()
        
        mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JhZHl0cnVpdHQiLCJhIjoiY2o3MnZlOGhjMDFlZzMyb2MybWZ0cHVmMiJ9.rFInG0dBQqNlpfxP7sC8MQ';
        var map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/gradytruitt/cj79tgrqx8h382ro6buveuueu', // stylesheet location
            center: [this.ln, this.la], // starting position [lng, lat]
            zoom: 12 // starting zoom 
        });
        
        // 'mapbox://styles/mapbox/streets-v10'
        
        var lat = this.la;
        var lon = this.ln;
        
        map.on('load', function() {
            map.loadImage('../assets/mapicon.png', function(error, image) {
                if (error) throw error;
                map.addImage('cat', image);
                map.addLayer({
                    "id": "points",
                    "type": "symbol",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": [{
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [lon, lat]
                                }
                            }]
                        }
                    },
                    "layout": {
                        "icon-image": "cat",
                        "icon-size": 0.15
                    }
                });
            });
        });

    }
};

});