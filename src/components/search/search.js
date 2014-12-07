define(['knockout', 'text!./search.html', 'core'], function (ko, templateMarkup, se) {
    function Search() {
        se.sandbox.subscribe("map:created", function(map){
            var input = document.getElementById('pac-input');
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
        });

        se.sandbox.publish("component:loaded", 'search');
    }

    return { viewModel: Search, template: templateMarkup };
});
