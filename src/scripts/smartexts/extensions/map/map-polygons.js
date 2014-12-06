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
    SE.extension('map-polygons', function (){
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

        // Add polygon
        self.sandbox.subscribe("map:polygon:add", function(data){
            data.type = 'polygon';
            data.map = Map;
            var polygon = new google.maps.Polygon(data);
            // Add polygon to map object
            self.sandbox.publish('map:addItem', polygon);
            // Notify item added
            self.sandbox.publish('map:polygon:onAdd', polygon);

        }, this);

        // Remove polygon
        self.sandbox.subscribe("map:polygon:remove", function(condition){
            condition.type = 'polygon';
            // Find polygon
            var polygon = self.utils.findWhere(items, condition);
            if(polygon){
                self.sandbox.publish('map:removeItem', polygon);
                polygon.setMap(null);
            }
            // Notify item removed
            self.sandbox.publish('map:polygon:onRemove', polygon);
        }, this);

        // Find polygon
        self.sandbox.subscribe("map:polygon:all", function(condition, callback){
            condition.type = 'polygon';
            // Find polygon
            callback(self.utils.where(items, condition));
        }, this);

        // Find polygon
        self.sandbox.subscribe("map:polygon:findWhere", function(condition, callback){
            condition.type = 'polygon';
            // Find polygon
            callback(self.utils.findWhere(items, condition));
        }, this);


    });
}));
