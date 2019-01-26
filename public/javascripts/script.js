var map, places, infoWindow;
var markers = [];
var autocomplete;
var countryRestrict = {'country': 'all'};

//clic sur bouton
document.getElementById('btnSubmit').addEventListener('click',function(){
  initMap();
  PostNew();
})

var list = $('.list-group-item');

list.each(
  function() {
    $(this).click(
      function(){
        list.each(
          function(){
            $(this).removeClass('actif')
          });
        $(this).addClass('actif')
        document.getElementById('longitude').value =  parseFloat($(this).data("lon"));
        document.getElementById('lattitude').value =  parseFloat($(this).data("latt"));
        initMap();
      }
    )
  }
)


// Initialize and add the map
function initMap() {
// The location of Uluru
var lon = parseFloat(document.getElementById('longitude').value);
var latt = parseFloat(document.getElementById('lattitude').value);


//Ou est ce qu'on se positionne
var uluru = {lat: latt, lng: lon};

// The map, centered at Uluru
var map = new google.maps.Map(
  document.getElementById('map'), {zoom : 12, center: uluru});
// The marker, positioned at Uluru
var marker = new google.maps.Marker({position: uluru, map: map});




//AUTOCOMPLETE
autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')), {
              types: ['(cities)']
            });

autocomplete.addListener('place_changed', function() {

          var place = autocomplete.getPlace();
          if(place.geometry==undefined){return}
          else{
          var lat = place.geometry.location.lat();
          var lng = place.geometry.location.lng();

          document.getElementById('lattitude').value = lat;
          document.getElementById('longitude').value = lng



//Ou est ce qu'on se positionne
uluru = {lat: lat, lng: lng};

// The map, centered at Uluru
var map = new google.maps.Map(
  document.getElementById('map'), {zoom : 12, center: uluru});
// The marker, positioned at Uluru
var marker = new google.maps.Marker({position: uluru, map: map});

}
}
)

};


//fonction formulaire
function PostNew() {

  var lat = document.getElementById('lattitude').value
  var lon = document.getElementById('longitude').value
  var newCity = document.getElementById('autocomplete').value

  var form = document.createElement('form');
  form.setAttribute('action', '/add-city');
  form.setAttribute('method', 'post');

    var inputvar = document.createElement('input');
    inputvar.setAttribute('type', 'hidden');
    inputvar.setAttribute('name', 'longitude');
    inputvar.setAttribute('value', lon);
    form.appendChild(inputvar);

    var inputvar = document.createElement('input');
    inputvar.setAttribute('type', 'hidden');
    inputvar.setAttribute('name', 'lattitude');
    inputvar.setAttribute('value', lat);
    form.appendChild(inputvar);

    var inputvar = document.createElement('input');
    inputvar.setAttribute('type', 'hidden');
    inputvar.setAttribute('name', 'newCity');
    inputvar.setAttribute('value', newCity);
    form.appendChild(inputvar);

document.body.appendChild(form);

form.submit();

}
