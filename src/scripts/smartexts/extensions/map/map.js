(function (root, factory) {
    'use strict';
    // CommonJS
    if (typeof exports === 'object' && module) {
        module.exports = factory(require('smartexts'));
        // AMD
    } else if (typeof define === 'function' && define.amd) {
        define(['smartexts'], factory);
        // Browser
    } else {
        factory();
    }
}((typeof window === 'object' && window) || this, function (SE) {
    SE.extension('map', function () {
        var self = this;

        this.createMap = function (element) {
            var mapOptions = {
                center: { lat: -34.397, lng: 150.644},
                zoom: 8,
                mapTypeControl: false,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.BOTTOM_CENTER
                },
                panControl: false,
                panControlOptions: {
                    position: google.maps.ControlPosition.TOP_RIGHT
                },
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                scaleControl: true,
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                }
            };
            var map = new google.maps.Map(element,mapOptions);

            self.sandbox.publish('map:created', map);
        };

        var items = [];

        this.addItem = function (item) {
            items.push(item);
            self.sandbox.publish('map:data-update', items);
        };

        this.removeItem = function (item) {
            // todo: filter marker
            items = self.utils.without(items, item);
            self.sandbox.publish('map:data-update', items);
        };

        self.sandbox.subscribe('map:create', self.createMap, {}, this);
        self.sandbox.subscribe('map:removeItem', self.removeItem, {}, this);
        self.sandbox.subscribe('map:addItem', self.addItem, {}, this);
    });
}));