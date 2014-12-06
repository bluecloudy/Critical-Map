define(['knockout', 'text!./user-location.html', 'core'], function (ko, templateMarkup, se) {
    var Map = null;
    var GeoMarker = null;

    // Subscribe event before component start
    se.sandbox.subscribe("map:created", function (map) {
        Map = map;
    });

    function Userlocation() {
        var self = this;

        self.gotoCurrentLocation = function () {
            se.sandbox.publish("map:geolocation:get", function (position) {
                se.sandbox.publish("map:setCenter", position);
                se.sandbox.publish("map:setZoom", 14);

                se.sandbox.publish("map:anchor:set", {
                    position: position,
                    draggable: true
                });

            });
        };
    }

    return { viewModel: Userlocation, template: templateMarkup };

});
