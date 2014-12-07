define(["knockout", "text!./home.html", "core"], function (ko, homeTemplate, se) {
    function HomeViewModel(route) {
        var self = this;
        self.items = ko.observableArray([]);
        self.Map = null;
        self.ready = ko.observable(false);
        self.userLocation = ko.observable(null);

        //
        self.loadCompleted = ko.observable(false);
        var componentToload = ['filter-form', 'list-locations', 'marker-creator', 'search', 'user-location'];

        se.sandbox.subscribe("component:loaded", function(component){
            componentToload = se.utils.without(componentToload, component);
            if(!componentToload.length){
                self.loadCompleted(true);

//                self.ready(true);
            }
        });


        self.loadData = function(conditions){
            var items = ko.observableArray([]);
            items.subscribe(function(items){
                se.utils.each(items, function(item){
                    var data = item;
                    data.position = new google.maps.LatLng(item.latitude, item.longitude);
                    se.sandbox.publish('map:marker:add', data);
                });
            });

            se.sandbox.publish('map:datacontext:find', conditions, items, this);
        };

        se.sandbox.subscribe("map:created", function(map){

            // Load map data
            self.loadData({});


            setTimeout(function(){
                self.ready(true);
            }, 400);

            self.Map = map;

            se.sandbox.publish("map:anchor:set", {
                position: map.getCenter(),
                draggable: true
            });

            se.sandbox.publish("map:geolocation:get", self.userLocation);

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


        self.userLocation.subscribe(function(position){

            se.sandbox.publish("map:anchor:set", {
                position: position,
                draggable: true
            });
            se.sandbox.publish("map:setCenter", position);
            se.sandbox.publish("map:setZoom", 14);
        });
    }

    return { viewModel: HomeViewModel, template: homeTemplate };

});
