(function (root, factory) {
    'use strict';
    // CommonJS
    if (typeof exports === 'object' && module) {
        module.exports = factory(require('smartexts'), require('OverlappingMarkerSpiderfier'));
        // AMD
    } else if (typeof define === 'function' && define.amd) {
        define(['smartexts', 'OverlappingMarkerSpiderfier'], factory);
        // Browser
    } else {
        factory();
    }
}((typeof window === 'object' && window) || this, function (SE) {
    SE.extension('map-oms', function () {
        var Map;
        var oms;
        var self = this;

        // Map response
        this.sandbox.subscribe("map:created", function (map) {
            Map = map;
            oms = new OverlappingMarkerSpiderfier(map, {markersWontMove: true, markersWontHide: true});
            oms.addListener('spiderfy', function (markers) {
                self.sandbox.publish("map:oms:spiderfy", markers);
            });
            oms.addListener('unspiderfy', function (markers) {
                self.sandbox.publish("map:oms:unspiderfy", markers);
            });

            oms.addListener('click', function(marker) {
                self.sandbox.publish("map:oms:click", marker);
            });
        }, this);

        this.sandbox.subscribe('map:marker:onAdd', function (marker) {
            oms.addMarker(marker);
        });
    });
}));