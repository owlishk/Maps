//can't get leaflet to work without digging tinot mapbox. Switching gears to google maps

//default map location to site outside of Taos, NM. Spot for finding 'star garnet' stones.
var lat = 36.301658;
var long = -105.735086;
var stone = "Staurolite";

var googleMap = new google.maps.Map( $('#garnet-location')[0] );

//marker for star garnet
var marker = new google.maps.Marker( {
        position: { lat: lat, lng: long }
    } );

var infoWindow = new google.maps.InfoWindow( {
        content: stone + " site"
    } );

initMap();
markers();


//================================

$('#submit').on( 'click', formValidate );
$('#submit').on( 'click', updateMap );
$('#submit').on( 'click', hideTitle );


//==============================

function markers(){
 
  marker.setMap( googleMap );
  marker.addListener( 'click', function( ) {
          infoWindow.open( googleMap, marker );
      } );
}

//centered at closest town of Taos
function initMap( ) {
   googleMap.setCenter( { lat: 36.407249, lng: -105.573067 } );
   googleMap.setZoom( 10 );
   googleMap.setMapTypeId(google.maps.MapTypeId.TERRAIN);

 } 

//validates that the lat and long coordinates are AOK
function formValidate( evt ) {
    var valLat = $('#lat').val();
    var valLong = $('#long').val();
 
    //boolean variable to test parameters of lat and long variables
    var boolean = (valLat <=-90 || valLat>=90 || valLong >= 180 || valLong <= -180);
    //console.log(boolean);
 
   //error message handling
    if(boolean === true){
       evt.preventDefault( );
       document.getElementById('error').innerHTML = 'Please enter valid lat and long coordinates';
     } else {
        document.getElementById('error').innerHTML = '';
      }
}

//updates the map by walking through all the variable assignments and operators with new values from form

function updateMap( evt ) {
  var newStone = $('#stone').val();
  var newLat = parseFloat($('#lat').val());
  var newLong = parseFloat($('#long').val());
 
  //console.log(newStone, newLat, newLong);
  
  googleMap = new google.maps.Map( $('#garnet-location')[0] );
 
  googleMap.setCenter( { lat: newLat, lng: newLong } );
  googleMap.setZoom( 13 );
  googleMap.setMapTypeId(google.maps.MapTypeId.TERRAIN);
 
  infoWindow = new google.maps.InfoWindow( {
        content: newStone + " site"
    } );
 
// unlike original map, the center and marker are the same.
  marker = new google.maps.Marker( {
        position: { lat: newLat, lng: newLong }
    } );
 
  marker.setMap( googleMap );
  marker.addListener( 'click', function( ) {
          infoWindow.open( googleMap, marker );
      } );
 
// resets form
  document.getElementById("form").reset();

}

//hides "Staurolite title" when map is changed
function hideTitle( evt) {
    $("h1").hide();
}

  