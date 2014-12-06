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
    SE.extension('map-polylines', function (){
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

        // Add polyline
        self.sandbox.subscribe("map:polyline:add", function(data){
            data.type = 'polyline';
            data.map = Map;
            var polyline = new google.maps.Polyline(data);
            // Add polyline to map object
            self.sandbox.publish('map:addItem', polyline);
            // Notify item added
            self.sandbox.publish('map:polyline:onAdd', polyline);

        }, this);

        // Remove polyline
        self.sandbox.subscribe("map:polyline:remove", function(condition){
            condition.type = 'polyline';
            // Find polyline
            var polyline = self.utils.findWhere(items, condition);
            if(polyline){
                self.sandbox.publish('map:removeItem', polyline);
                polyline.setMap(null);
            }
            // Notify item removed
            self.sandbox.publish('map:polyline:onRemove', polyline);
        }, this);

        // Find polyline
        self.sandbox.subscribe("map:polyline:all", function(condition, callback){
            condition.type = 'polyline';
            // Find polyline
            callback(self.utils.where(items, condition));
        }, this);

        // Find polyline
        self.sandbox.subscribe("map:polyline:findWhere", function(condition, callback){
            condition.type = 'polyline';
            // Find polyline
            callback(self.utils.findWhere(items, condition));
        }, this);


    });
}));
