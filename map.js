//listeners
google.maps.event.addDomListener(window, 'load', initialize);

//global variables
var pin = 'bootstrap/img/redpin.png';
var numMarkers = 0;
var map;

function initialize() {
    var myOptions = {
        center: new google.maps.LatLng(46.473682, -80.991211),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var stylesArray

    google.maps.event.addListener(map, 'click', function (e) {
        placeMarker(e.latLng, map);
    });
}

function choosePin(color) {
    switch (color)
    {
    case "black":
    pin = 'bootstrap/img/blackpin.png';
    break;
        case "red":
    pin = 'bootstrap/img/redpin.png';
    break;
        case "blue":
    pin = 'bootstrap/img/bluepin.png';
    break;
        case "green":
    pin = 'bootstrap/img/greenpin.png';
    break;
        case "orange":
    pin = 'bootstrap/img/orangepin.png';
    break;
        case "pink":
    pin = 'bootstrap/img/pinkpin.png';
    break;
        case "purple":
    pin = 'bootstrap/img/purplepin.png';
    break;
        case "yellow":
    pin = 'bootstrap/img/yellowpin.png';
    break;
    default:
    pin = 'bootstrap/img/redpin.png';


    }
}

function placeMarker(position, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: pin,
        setTitle: (numMarkers++).toString(),
        draggable: true
    });


    map.panTo(position);
    attachSecretMessage(marker);
}


function attachSecretMessage(marker) {
    var message = document.getElementById("message").value;
    var infowindow = new google.maps.InfoWindow({
        content: message
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(marker.get('map'), marker);
    });

}

//Update Current Position info
updateMarkerPosition(latLng);
geocodePosition(latLng);

//Drag events
google.maps.event.addListener(marker, 'dragstart', function () {
    updateMarkerAddress('Dragging...');
});

google.maps.event.addListener(marker, 'drag', function () {
    updateMarkerStatus('Dragging...');
    updateMarkerPosition(marker.getPosition());
});

google.maps.event.addListener(marker, 'dragend', function () {
    updateMarkerStatus('Drag ended');
    geocodePosition(marker.getPosition());
});

var geocoder = new google.maps.Geocoder();

function geocodePosition(pos) {
    geocoder.geocode({
        latLng: pos
    }, function (responses) {
        if (responses && responses.length > 0) {
            updateMarkerAddress(responses[0].formatted_address);
        } else {
            updateMarkerAddress('Cannot determine address at this location.');
        }
    });
}

function updateMarkerStatus(str) {
    document.getElementById('markerStatus').innerHTML = str;
}

function updateMarkerPosition(latLng) {
    document.getElementById('info').innerHTML = [
    latLng.lat(),
    latLng.lng()
  ].join(', ');
}

function updateMarkerAddress(str) {
    document.getElementById('address').innerHTML = str;
}

function addMarker() {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(46.473682, -80.991211),
        map: map,
        icon: pin,
        setTitle: (numMarkers++).toString(),
        draggable: true
    });

    attachSecretMessage(marker)
    //markersArray.push(marker);
}