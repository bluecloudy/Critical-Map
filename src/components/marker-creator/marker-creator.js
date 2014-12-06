define(['knockout', 'text!./marker-creator.html', 'core'], function (ko, templateMarkup, se) {
    var Map = null;

    // Subscribe event before component start
    se.sandbox.subscribe("map:created", function (map) {
        Map = map;
    });

    function Markercreator(params) {
        se.sandbox.subscribe("map:datacontext:location-update", {

        });
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    Markercreator.prototype.dispose = function () {
    };
	
	Markercreator.prototype.onSubmit = function(){
        se.sandbox.publish("map:datacontext:createNew", {
            a: '1',
            b: '2'
        });
	}


    return { viewModel: Markercreator, template: templateMarkup };

});
