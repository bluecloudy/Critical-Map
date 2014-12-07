define(['knockout', 'text!./search.html', 'core'], function (ko, templateMarkup, se) {
    var Map = null;

    // Subscribe event before component start
    se.sandbox.subscribe("map:created", function (map) {

        alert(1);
        var input = /** @type {HTMLInputElement} */(
            document.getElementById('pac-input'));

        var types = document.getElementById('type-selector');
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(types);

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);


        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            se.sandbox.publish("map:anchor:set", {
                position: place.geometry.location,
                draggable: true
            });

            se.sandbox.publish("map:setCenter", place.geometry.location);
        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        function setupClickListener(id, types) {
            var radioButton = document.getElementById(id);
            google.maps.event.addDomListener(radioButton, 'click', function() {
                autocomplete.setTypes(types);
            });
        }

        setupClickListener('changetype-all', []);
        setupClickListener('changetype-address', ['address']);
        setupClickListener('changetype-geocode', ['geocode']);
    });

    function Search() {
        var self = this;







    }

    return { viewModel: Search, template: templateMarkup };

});
