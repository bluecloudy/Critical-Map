define(["knockout", "text!./home.html", "core"], function (ko, homeTemplate, se) {
    function HomeViewModel(route) {
        var self = this;
        self.items = ko.observableArray([]);
        self.Map = null;
        self.ready = ko.observable(false);

        self.userLocation = ko.observable(null);

        se.sandbox.subscribe("map:created", function(map){
            setTimeout(function(){
                self.ready(true);
            }, 100);

            self.Map = map;
            se.sandbox.publish("map:geolocation:get", self.userLocation);
        });


        self.userLocation.subscribe(function(position){

            se.sandbox.publish("map:marker:add", {
                position: position,
                draggable: true

            });
            se.sandbox.publish("map:setCenter", position);
            se.sandbox.publish("map:setZoom", 14);
        });

    }



    return { viewModel: HomeViewModel, template: homeTemplate };

});
