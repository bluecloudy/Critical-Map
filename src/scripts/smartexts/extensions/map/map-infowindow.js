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
    SE.extension('map-infowindow', function (){
        var Map = null;
        var self = this;
        var infoWindow = new google.maps.InfoWindow();
        this.title = ko.observable();
        this.content = ko.observable();
        this.sandbox.subscribe('map:created', function(map) {Map = map;});

        //
        this.sandbox.subscribe('map:infowindow:open', function(data, event){
            infoWindow.close();
            // Render template in module template file
            var element = document.createElement('div');
            ko.renderTemplate('infowindow', this, null, element);

            // set content from knockout template
            infoWindow.setContent(element);

            this.title(data.title);
            this.content(data.content);
            if(data.getCenter){
                infoWindow.setPosition(data.getCenter());
                infoWindow.open(Map);
            }else{
                infoWindow.open(Map, data);
            }

            // Publish event on open info-window
            self.sandbox.publish('map:infowindow:onOpen', infoWindow, event);
        }, this);


        this.sandbox.subscribe('map:infowindow:close', function(data, event){
            infoWindow.close();
            self.sandbox.publish('map:infowindow:onClose', infoWindow, event);
        }, this);

        // Publish event close info-window
        this.sandbox.publish('map:event:on', 'closeclick', infoWindow, function(event){
            self.sandbox.publish('map:infowindow:onClose', infoWindow, event);
        });

    });
}));
