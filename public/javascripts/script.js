console.log("hello");

// Initialize and add the map
function initMap() {
// The location of Uluru
var lon = parseFloat(document.getElementById('lon').textContent);
var latt = parseFloat(document.getElementById('latt').textContent);

var uluru = {lat: latt, lng: lon};
// The map, centered at Uluru
var map = new google.maps.Map(
  document.getElementById('map'), {zoom : 12, center: uluru});
// The marker, positioned at Uluru
var marker = new google.maps.Marker({position: uluru, map: map});
}
