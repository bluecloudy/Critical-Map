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
    SE.extension('map-events', function (){
        var Map;
        var self = this;
        this.on = function(event_name, object, handler){
            if(arguments.length > 3){
                return google.maps.event.addListener(object, event_name, handler);
            }else{
                return google.maps.event.addListener(Map, event_name, object);
            }
        };
        this.off = function(event_name, object){
            if(arguments.length > 2){
                return google.maps.event.clearListeners(object, event_name);
            }else{
                return google.maps.event.clearListeners(Map, event_name);
            }
        };
        // Method to add/remove event
        self.sandbox.subscribe('map:event:on', this.on);
        self.sandbox.subscribe('map:event:off', this.off);

        // Map response
        self.sandbox.subscribe("map:created", function(map){
            Map = map;
        }, this);
    });
}));
