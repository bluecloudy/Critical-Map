define(['knockout', 'text!./list-locations.html', 'core'], function (ko, templateMarkup, se) {

    var marker = function (data) {
        this.title      = data.title || '';
        this.level      = data.level || '';
        this.img        = data.img || '';
        this.position   = data.position || '';
        this.latitude   = data.latitude || '';
        this.longitude   = data.longitude || '';
    };

    function ListLocations() {
        var self = this;
        self.selectedItem = ko.observable();
        self.items = ko.observableArray([]);

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


        se.sandbox.subscribe('map:data-update', function(items){
            self.items([]);
            se.utils.each(items, function(item){
                self.items.push(new marker(item));
            });

        });

        //true-> view marker detail
        self.viewdetail = ko.observable(false);

        self.onViewDetail = function (item) {
            self.selectedItem(item);
            self.viewdetail(true);

            // Panto marker
            se.sandbox.publish('map:setCenter', item.position, this);
        };

        se.sandbox.publish('map:event:on', 'click', function () {
            self.viewdetail(false);
        });

       self.loadData({});

    }

    ListLocations.prototype.dispose = function () {};

    return {
        viewModel: ListLocations,
        template: templateMarkup
    };

});