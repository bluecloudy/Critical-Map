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
    SE.extension('datacontext', function () {
        var self = this;


        function getLocations(func){

        }

        function createNew(data){
			console.log(data);
			
			
			$.ajax({
                type: 'POST',
                data: data,
                url: '/api/v1/locations',
                cache:false,

                success: function(response) { 
                   
                },
                error: function(){  },
            });
			
			
			
        }

        self.sandbox.subscribe('map:datacontext:getLocations', getLocations, {}, this);
        self.sandbox.subscribe('map:datacontext:createNew', createNew, {}, this);
    });
}));