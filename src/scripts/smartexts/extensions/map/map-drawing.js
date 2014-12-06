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
    SE.extension('map-drawing-shape', function () {
        var Map;
        var items;
        var self = this;

        // Map response
        self.sandbox.subscribe("map:created", function (map) {
            Map = map;
        }, this);

        // Map data
        self.sandbox.subscribe("map:data-update", function (data) {
            items = data;
        }, this);

        self.sandbox.subscribe("map:drawing:shape:start", function (data) {
            var object;
            // Off click
            self.sandbox.publish('map:event:off', 'click');

            // Get line
            self.sandbox.subscribe('map:polyline:onAdd', function (polyline) {
                object = polyline;
            });
            // Create line
            self.sandbox.publish('map:polyline:add', data);

            if (!object) {
                return;
            }

            var tempIndex;
            // Create tmp line
            self.sandbox.publish('map:event:on', 'mousemove', function (event) {
                var path = object.getPath();
                // Set tmp index
                if (!tempIndex) {
                    // Add new path
                    path.push(event.latLng);
                    tempIndex = path.getArray().length - 1;
                }

                path.setAt(tempIndex, event.latLng);

            });

            self.sandbox.publish('map:event:on', 'click', object, function (event) {
                var path = object.getPath();
                var allPath = path.getArray();

                // Check if click to temp path
                if (allPath[tempIndex] == event.latLng) {
                    tempIndex = null;
                    return '';
                }

                if (tempIndex)
                    path.setAt(tempIndex, event.latLng);

                // Check to close polygon
                if (allPath[0] == event.latLng) {
                    // Get line paths
                    data.path = object.getPath();
                    // Remove line
                    self.sandbox.publish('map:polyline:remove', object);
                    // Get polygon
                    self.sandbox.subscribe('map:polygon:onAdd', function (polygon) {
                        object = polygon;
                    });
                    // Create polygon
                    self.sandbox.publish('map:polygon:add', data);
                }
                // Get bound
                object.getCenter = function () {
                    var bounds = new google.maps.LatLngBounds();
                    self.utils.each(path.getArray(), function (val) {
                        bounds.extend(val);
                    });

                    return bounds.getCenter();
                };

                self.sandbox.publish('map:event:on', 'dragend', object, function () {
                    // Get bound
                    var bounds = new google.maps.LatLngBounds();
                    self.utils.each(path.getArray(), function (val) {
                        bounds.extend(val);
                    });
                    object.bounds = bounds.getCenter();
                });


                // Off click
                self.sandbox.publish('map:event:off', 'mousemove');
                self.sandbox.publish('map:event:off', 'click');
                self.sandbox.publish('map:drawing:shape:stop', object);
            });
        }, this);
    });
    SE.extension('map-drawing', function () {
        var Map;
        var items;
        var type = 'marker';
        var self = this;

        // Map response
        self.sandbox.subscribe("map:created", function (map) {
            Map = map;
        }, this);

        // Map response
        self.sandbox.subscribe("map:data-update", function (data) {
            items = data;
        }, this);

        self.sandbox.subscribe("map:drawing:setType", function (_type) {
            type = _type;
        }, this);

        self.sandbox.subscribe("map:marker:onAdd", function (marker) {
            self.sandbox.publish('map:event:on', 'click', marker, function () {
                self.sandbox.publish('map:infowindow:open', marker);
            });
        }, this);

        self.sandbox.subscribe("map:drawing:start", function (options) {
            options = {};
            self.sandbox.publish('map:event:on', 'click', function (event) {
                switch (type) {
                    case 'marker':
                        self.sandbox.publish('map:marker:add', {
                            name: 'Undefined name',
                            editable: true,
                            draggable: true,
                            position: event.latLng
                        });
                        break;
                    case 'shape':

                        self.sandbox.publish('map:drawing:shape:start', {
                            name: 'Undefined name',
                            editable: true,
                            draggable: true,
                            position: event.latLng
                        });
                        break;
                }
                self.sandbox.publish('map:drawing:stop');
                self.sandbox.publish('map:event:off', 'click');
            });

        }, this);
    });

}));