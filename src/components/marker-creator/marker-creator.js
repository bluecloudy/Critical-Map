define(['knockout', 'text!./marker-creator.html', 'core'], function (ko, templateMarkup, se) {
    
	
	
	var Map = null;
	var Anchor = null;

	var cLevel = function(name, id) {
        this.name = name;
        this.id = id;
    };
	
    // Subscribe event before component start
    se.sandbox.subscribe("map:created", function (map) {
        Map = map;
    });

    se.sandbox.subscribe("map:anchor:location-update", function(location){
        Anchor = location;
    });
	
	  
	  
    function Markercreator(params) {
		
		var self = this;
		
		self.happen = ko.observable('');
		self.level = ko.observable(0);
		self.lat = ko.observable(0);
		self.lon = ko.observable(0);
		
		
		
		self.selectedLevel = ko.observable();
		
		self.levels = ko.observableArray([
            new cLevel("Notice", 1),
            new cLevel("Warning", 2),
            new cLevel("Emergency", 3),
			new cLevel("Critical", 3),
			new cLevel("High damage", 4)
        ]);


        se.sandbox.publish("component:loaded", 'marker-creator');
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    Markercreator.prototype.dispose = function () {
    };
	
	Markercreator.prototype.onSubmit = function(){
		var self = this;
        var item = ko.observable();
		
        se.sandbox.publish("map:datacontext:createNew", {
            title: self.happen(),
            level: self.selectedLevel().name,
			photo: 'photo/url',
			latitude: Anchor.lat(),
			longitude: Anchor.lng()
        }, item);

        item.subscribe(function(item){
            var data = item;
            data.position = new google.maps.LatLng(item.latitude, item.longitude);

            se.sandbox.publish('map:marker:add', data);
        });
	}


    return { viewModel: Markercreator, template: templateMarkup };

});
