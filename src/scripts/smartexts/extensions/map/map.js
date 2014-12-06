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
        self.Map = null;

        this.createMap = function (element) {
            var mapOptions = {
                center: { lat: 10.82243095364051, lng: 106.62943840026855},
                zoom: 12,
                mapTypeControl: false,
                panControl: false,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                scaleControl: true,
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                }
            };
            self.Map = new google.maps.Map(element,mapOptions);

            self.sandbox.publish('map:created', self.Map);
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

        // This function allow user set map center
        self.sandbox.subscribe('map:setCenter', function(location){
            self.Map.panTo(location);
        }, {}, this);

        self.sandbox.subscribe('map:getCenter', function(func){
            func(self.Map.getCenter());
        }, {}, this);

        self.sandbox.subscribe('map:setZoom', function(zoom){
            self.Map.setZoom(zoom);
        }, {}, this);
    });
}));