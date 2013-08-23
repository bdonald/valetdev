var geocoder;
     var map;

     var myDataRef = new Firebase('https://valet-event-map.firebaseio.com');
     var childRef = myDataRef.child('Events');

     function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(40.7142, -74.0064);
  var mapOptions = {
    zoom: 12,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

childRef.on('value', function(snapshot) {
        var events = snapshot.val();
        alert(events);
      });


}

google.maps.event.addDomListener(window, 'load', initialize);
    
     
      function add() {
          var eventName = document.getElementById('eventName').value;
           var address = document.getElementById('address').value;
          childRef.push({eventName: eventName, address: address});



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
          $('#messageInput').val('');


          childRef.on('child_added', function(snapshot) {
        var eventEntry = snapshot.val();
        tableFill(eventEntry.eventName, eventEntry.address);
      });
      function tableFill(name, address) {
        $("#tablebody").append("<tr><td>" + name + "</td><td>" + address + "</td></tr>");
      };

          
        };


        
      