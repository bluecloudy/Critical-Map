(function (root, factory) {
    'use strict';
    // CommonJS
    if (typeof exports === 'object' && module) {
        module.exports = factory(require('smartexts'), require('jquery'), require('config'));
        // AMD
    } else if (typeof define === 'function' && define.amd) {
        define(['smartexts', 'jquery', 'config'], factory);
        // Browser
    } else {
        factory(root.SE, root.jQuery, root.Config);
    }
}((typeof window === 'object' && window) || this, function (SE, $, config) {
    SE.extension('datacontext', function () {
        var self = this;
        self.loadedItems = [];


        // This function allow people find all location base on current location or address
        function find(condition, locations){
            return $.getJSON(config.rest.locations, condition).then(querySuccess).fail(queryFail);

            function querySuccess (result){
                locations(result);
            }

            function queryFail (error){
                alert(error)
            }
        }


        // This function allow people find all location base on current location or address
        function create(data, item){
            return $.ajax({
                url: config.rest.locations,
                type: 'post',
                dataType: 'json',
                data: data
            }).then(querySuccess).fail(queryFail);

            function querySuccess (result){
                console.log(result);
                item(result);
            }

            function queryFail (error){
                alert(error)
            }
        }


        function getLocations(filter, func){

        }

        function createNew(data){
			console.log(data);
			
			

        }

        self.sandbox.subscribe('map:datacontext:find', find, {}, this);
        self.sandbox.subscribe('map:datacontext:getLocations', getLocations, {}, this);
        self.sandbox.subscribe('map:datacontext:createNew', create, {}, this);
    });
}));