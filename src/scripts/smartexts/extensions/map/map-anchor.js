(function (root, factory) {
    'use strict';
    // CommonJS
    if (typeof exports === 'object' && module) {
        module.exports = factory(require('smartexts'), require('knockout'));
        // AMD
    } else if (typeof define === 'function' && define.amd) {
        define(['smartexts', 'knockout'], factory);
        // Browser
    } else {
        factory();
    }
}((typeof window === 'object' && window) || this, function (SE, ko) {
    SE.extension('map-anchor', function () {
        var Map;
        var self = this;
        /**
         * @type google.maps.Marker
         */
        self.anchorPoint = ko.observable(null);

        // Map response
        self.sandbox.subscribe("map:created", function (map) {
            Map = map;
        }, this);


        // This function allow people create/edit an anchor marker in map
        self.sandbox.subscribe("map:anchor:set", function (data, callback) {
            if (!self.anchorPoint()) {
                data.map = Map;
                data.icon = './images/markers/male-2.png';
                data.title = "Where we go?";

                var marker = new google.maps.Marker(data);
                self.anchorPoint(marker);

                self.sandbox.publish('map:event:on', 'dragend', marker, function(event){
                    self.sandbox.publish("map:anchor:location-update", event.latLng);
                });
            } else {
                self.anchorPoint().setPosition(data.position);
            }

            self.sandbox.publish("map:anchor:location-update", data.position);

            if (callback && callback.constructor != Object) {
                callback(marker);
            }
        }, this);

        // This function allow people get anchor point
        self.sandbox.subscribe("map:anchor:get", function (func) {
            func(self.anchorPoint().getPosition());
        }, this);

    });

}));