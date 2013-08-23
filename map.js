$(document).ready(function() {
	var eventsRef = new Firebase('https://valet-event-map.firebaseio.com/events');
	var total = 0;
	var eventMap = {
		parseForm: function(selector) {
			var event = {};
			event.name = $(selector).find('#eventName').first().val();
			event.address = $(selector).find('#address').first().val();
			event.amount = $(selector).find('#amount').first().val();
			return event;
		},
		resetForm: function() {
			$('#addEvent').children('input[type="text"]').each(function(i, input) {
				$(input).val('');
			});
		},
		addEvent: function(event) {
			eventsRef.push(event);
		},
		addTableEntry: function(event) {
			$('#eventsTable tbody').append("<tr><td>" + event.name + "</td><td>" + event.address + "</td><td>" + event.amount + "</td></tr>");
		},
		computeTotal: function(event){
			total = total + parseInt(event.amount);
			document.getElementById('totals').innerHTML = "<h3>$" + total + " raised!</h3>";
			return total;
		},
		addPin: function(event) {
			eventMap.geocoder.geocode({address: event.address}, function(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
						var location = results[0].geometry.location;
						eventMap.map.setCenter(location);
						new google.maps.Marker({
							map: eventMap.map,
							position: location
						});
				}
				else {
					alert('Geocode failed!');
					return false;
				}
			})
		},
		initMap: function() {
			var options = {
				zoom: 12,
				center: new google.maps.LatLng(40.7142, -74.0064),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			return new google.maps.Map($('#map-canvas')[0], options);
		},
		geocoder: new google.maps.Geocoder()
	};

	eventMap.map = eventMap.initMap();

	eventsRef.on('child_added', function(snapshot) {
		var event = snapshot.val();
		eventMap.addTableEntry(event);
		eventMap.addPin(event);
		eventMap.computeTotal(event);
	});

	$('#addEvent').submit(function(e) {
		e.preventDefault();
		var event = eventMap.parseForm(this);
		eventMap.addEvent(event);
		eventMap.resetForm();
	});
});