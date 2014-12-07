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
    SE.extension('map-markers', function (){
        var Map;
        var items;
        var self = this;

        // Map response
        self.sandbox.subscribe("map:created", function(map){
            Map = map;
        }, this);

        // Map response
        self.sandbox.subscribe("map:data-update", function(data){
            items = data;
        }, this);

        // Add marker
        self.sandbox.subscribe("map:marker:add", function(data, callback){
            data.type = 'marker';
            data.map = Map;
            var marker = new google.maps.Marker(data);

            // Notify item added
            self.sandbox.publish('map:marker:onAdd', marker);

            // Add marker to map object
            self.sandbox.publish('map:addItem', marker);

            if(callback && callback.constructor != Object){
                callback(marker);
            }

        }, this);

        // Remove marker
        self.sandbox.subscribe("map:marker:remove", function(condition){
            condition.type = 'marker';
            // Find marker
            var marker = self.utils.findWhere(items, condition);

            // Notify item removed
            self.sandbox.publish('map:marker:onRemove', marker);

            if(marker){
                self.sandbox.publish('map:removeItem', marker);
                marker.setMap(null);
            }
        }, {}, this);

        // Find marker
        self.sandbox.subscribe("map:marker:findWhere", function(condition, callback){
            condition.type = 'marker';
            // Find marker
            callback(self.utils.findWhere(items, condition));
        }, {}, this);


    });
}));
