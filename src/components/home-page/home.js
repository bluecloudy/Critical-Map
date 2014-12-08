define(["knockout", "text!./home.html", "core"], function (ko, homeTemplate, se) {
    function HomeViewModel(route) {
        var self = this;
        self.items = ko.observableArray([]);
        self.Map = null;
        self.ready = ko.observable(false);

        self.loadCompleted = ko.observable(false);
        var componentToload = ['filter-form', 'list-locations', 'marker-creator', 'search', 'user-location'];

        se.sandbox.subscribe("component:loaded", function(component){
            componentToload = se.utils.without(componentToload, component);
            if(!componentToload.length){
                self.loadCompleted(true);

//                self.ready(true);
            }
        });


        var loaded = [];
        self.loadData = function(conditions){
            var items = ko.observableArray([]);
            items.subscribe(function(items){
                se.utils.each(items, function(item){
                    if(!se.utils.contains(loaded, item.id)){

                        loaded.push(item.id);

                        var data = item;
                        data.position = new google.maps.LatLng(item.latitude, item.longitude);
                        se.sandbox.publish('map:marker:add', data);
                    }
                });
            });

            console.log(conditions);
            se.sandbox.publish('map:datacontext:find', conditions, items, this);
        };

        se.sandbox.subscribe("map:created", function(map){
            setTimeout(function(){
                self.ready(true);
            }, 400);

            self.Map = map;

            se.sandbox.publish("map:anchor:set", {
                position: map.getCenter(),
                draggable: true
            });

            se.sandbox.publish("map:geolocation:get", function(position){
                se.sandbox.publish("map:anchor:set", {
                    position: position,
                    draggable: true
                });
                se.sandbox.publish("map:setCenter", position);
                se.sandbox.publish("map:setZoom", 14);

                // Load data first time
                self.loadData({
                    latitude: position.lat(),
                    longitude: position.lng(),
                    radius: 5
                });

            });

            se.sandbox.publish("map:event:on", 'dragend', function(){
                se.sandbox.publish("map:getCenter", function(position){
                    self.loadData({
                        latitude: position.lat(),
                        longitude: position.lng(),
                        radius: 5
                    });
                });


//                se.sandbox.publish("map:setCenter", event.latLng);

//                alert(event.latLng.lat() + ',' + event.latLng.lng());
            });

            // Click to set anchor
//            se.sandbox.publish("map:event:on", 'click', function(event){
//                se.sandbox.publish("map:anchor:set", {
//                    position: event.latLng,
//                    draggable: true
//                });
//
//                se.sandbox.publish("map:setCenter", event.latLng);
//
////                alert(event.latLng.lat() + ',' + event.latLng.lng());
//            });
        });
    }

    return { viewModel: HomeViewModel, template: homeTemplate };

});
