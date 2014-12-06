define(['knockout', 'text!./filter-form.html', 'core'], function (ko, templateMarkup, se) {
    var Map = null;

    // Subscribe event before component start
    se.sandbox.subscribe("map:created", function (map) {
        Map = map;
    });

    function FilterForm(params) {
        var self = this;

        this.filterActive = ko.observable(false);

        this.toggleFilter = function () {
            self.filterActive(!self.filterActive());
        };

        se.sandbox.subscribe('map:created', function () {
            se.sandbox.publish('map:event:on', 'click', function () {
                self.filterActive(false);
            });

        });
    }

    return { viewModel: FilterForm, template: templateMarkup };

});
