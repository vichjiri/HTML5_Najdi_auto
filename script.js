 

// inicializace mapy
function initMap() {
  var mapOptions = {
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  geoLocation();

  // vytvoreni mapy
  mapa = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  // vytvoreni znacky auta
  var car_marker = new google.maps.Marker({
    position: car,
    map:      mapa,
    icon:     'car.png',
    title:    'Auto!'
  });
  markers.push(car_marker);

  // casovac
  var myVar = setInterval(function(){refreshMap();}, 1500);
}

// ziskani gps souradnic
function geoLocation(){
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    }, function() {
      handleNoGeolocation(true);
    });      
  } else {
    handleNoGeolocation(false);
  }
}

// nacte gps, vytvori znacku pozice a nastavi pohled mapy
function refreshMap(){
  geoLocation();

  //vytvoreni znacky me polohy
  var my_marker = new google.maps.Marker({
    position: pos,
    map:      mapa,
    icon:     'my.png',
    title:    'Tady jsem!'
  });
  markers.push(my_marker);

  cleanMarker();

  setCenter();           
}

// vycisti pole od zbytecnych markeru
function cleanMarker(){
  for (var i = 1; i < markers.length-2; i++) {
    markers[i].setMap(null);
  }
}

// nastaveni stredu mapy a zoomu
function setCenter(){
  var bounds = new google.maps.LatLngBounds(car, pos);
  mapa.setCenter(bounds.getCenter());
  mapa.fitBounds(bounds); 
}

function getLocalStorrage(variable){
  if(localStorage.getItem(variable)){
      return localStorage.getItem(variable);
  }else{
      return false;
  }
}
