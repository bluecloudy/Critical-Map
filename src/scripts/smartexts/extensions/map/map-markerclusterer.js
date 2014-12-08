(function (root, factory) {
    'use strict';
    // CommonJS
    if (typeof exports === 'object' && module) {
        module.exports = factory(require('smartexts'), require('MarkerClusterer'));
        // AMD
    } else if (typeof define === 'function' && define.amd) {
        define(['smartexts', 'MarkerClusterer'], factory);
        // Browser
    } else {
        factory();
    }
}((typeof window === 'object' && window) || this, function (SE) {
    SE.extension('map-markerclusterer', function () {
        var Map;
        var markerCluster;



        // Map response
        this.sandbox.subscribe("map:created", function (map) {
            Map = map;

            markerCluster = new MarkerClusterer(map);
//            /markerCluster.setMaxZoom(14);
//
            this.sandbox.subscribe('map:marker:onAdd', function (marker) {
                markerCluster.addMarker(marker);
            });

            this.sandbox.subscribe('map:marker:onRemove', function (marker) {
                markerCluster.removeMarker(marker);
            });

        }, this);


    });
}));