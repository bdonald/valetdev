

function MapCtrl($scope) {
  $scope.maps = [];

  var geocoder;
  var map;
 
  var mapRef = new Firebase("https://valetmap.firebaseio.com");
  var eventRef = mapRef.child('Event');
  

  $scope.addMap = function() {
    $scope.maps.push({text:$scope.mapText}, {location:$scope.mapLocation});
    var address = document.getElementById('address').value;
  var name = document.getElementById('name').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

    var newPushRef = eventRef.push();

    newPushRef.set({Name : $scope.mapText, Address : $scope.mapLocation}); 


    $scope.mapText = '';
    $scope.mapLocation = '';

      };
 

function initialize() {
  geocoder = new google.maps.Geocoder();
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(40.7142, -74.0064),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}


google.maps.event.addDomListener(window, 'load', initialize);
 
}