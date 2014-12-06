define(['knockout', 'text!./marker-creator.html', 'core'], function (ko, templateMarkup, se) {
    
	
	
	var Map = null;

	var cLevel = function(name, id) {
        this.name = name;
        this.id = id;
    };
	
    // Subscribe event before component start
    se.sandbox.subscribe("map:created", function (map) {
        Map = map;
    });

	
	
	  
	  
    function Markercreator(params) {
		
		var self = this;
		
		self.happen = ko.observable('');
		self.level = ko.observable(0);
		
		self.selectedLevel = ko.observable();
		
		self.levels = ko.observableArray([
            new cLevel("Notice", 1),
            new cLevel("Warning", 2),
            new cLevel("Emergency", 3),
			new cLevel("Critical", 3),
			new cLevel("High damage", 4)
        ]),
			
		
        se.sandbox.subscribe("map:datacontext:location-update", {

        });
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    Markercreator.prototype.dispose = function () {
    };
	
	Markercreator.prototype.onSubmit = function(){
		var self = this;
		
		
        se.sandbox.publish("map:datacontext:createNew", {
            happen: self.happen(),
            level: self.selectedLevel.name,
			image: 'image/url',
			lat: '20',
			lon: '114'
        });
	}


    return { viewModel: Markercreator, template: templateMarkup };

});
