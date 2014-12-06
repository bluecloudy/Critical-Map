define(['knockout', 'text!./user-location.html', 'core'], function (ko, templateMarkup, se) {
    var Map = null;

    // Subscribe event before component start
    se.sandbox.subscribe("map:created", function (map) {
        Map = map;
    });

    function Userlocation() {
        var self = this;

        self.items = ko.observableArray([]);

        self.gotoCurrentLocation = function () {
            se.sandbox.publish("map:geolocation:get", function (position) {
                if (Map)
                    Map.panTo(position);
            });
        };


    }

    return { viewModel: Userlocation, template: templateMarkup };

});
