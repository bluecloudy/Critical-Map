define(['knockout', 'text!./list-locations.html', 'core'], function (ko, templateMarkup, se) {

    var marker = function (data) {
        this.title      = data.title || '';
        this.level      = data.level || '';
        this.photo        = data.photo || '';
        this.position   = data.position || '';
        this.latitude   = data.latitude || '';
        this.longitude   = data.longitude || '';
    };

    function ListLocations() {
        var self = this;
        self.selectedItem = ko.observable();
        self.items = ko.observableArray([]);


        se.sandbox.subscribe('map:data-update', function(items){
            self.items(items);
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
            self.selectedItem(null);
            self.viewdetail(false);
        });


        se.sandbox.publish("component:loaded", 'list-locations');
    }

    ListLocations.prototype.dispose = function () {};

    return {
        viewModel: ListLocations,
        template: templateMarkup
    };

});