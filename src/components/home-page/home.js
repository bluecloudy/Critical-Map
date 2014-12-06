define(["knockout", "text!./home.html", "core"], function (ko, homeTemplate, se) {
    function HomeViewModel(route) {
        var self = this;
        self.items = ko.observableArray([]);
        self.Map = null;

        self.userLocation = ko.observable(null);

        se.sandbox.subscribe("map:created", function(map){
            self.Map = map;
            se.sandbox.publish("map:geolocation:get", self.userLocation);
        });


        self.userLocation.subscribe(function(position){

            se.sandbox.publish("map:marker:add", {
                position: position,
                title: 'Hello World!',
                draggable: true

            });
            self.Map.panTo(position);
        });

    }



    return { viewModel: HomeViewModel, template: homeTemplate };

});
