define(['knockout', 'text!./filter-form.html', 'core'], function (ko, templateMarkup, se) {
    var Map = null;

    // Subscribe event before component start
    se.sandbox.subscribe("map:created", function (map) {
        Map = map;
    });

    var flevel = function(id, name, check)
    {
        var self = this;

        self.id = ko.observable(id);
        self.name = ko.observable(name);
        self.selected = ko.observable(check);
    }

    function FilterForm(params) {
        var self = this;



        self.associatedItemIds = ko.observableArray();


        self.levels = ko.observableArray([
            new flevel(1, 'Notice', true),
            new flevel(2, 'Warning', true),
            new flevel(3, 'Emergency', true),
            new flevel(4, 'Critical', true),
            new flevel(5, 'High damage', true)
        ]);

        self.toggleAssociation = function (item) {
            if (item.selected() === true) console.log("dissociate item " + item.id());
            else console.log("associate item " + item.id());
            item.selected(!(item.selected()));





            return true;
        };

    /*    self.onFilter = function(item)
        {
         //   item.check(!item.check());
            item.selected = !item.selected;
            console.log(item.selected);

            if(item.selected) console.log(item.name);
        }

*/



        this.filterActive = ko.observable(false);

        this.toggleFilter = function () {
            self.filterActive(!self.filterActive());
        };

        se.sandbox.subscribe('map:created', function () {
            se.sandbox.publish('map:event:on', 'click', function () {
                self.filterActive(false);
            });

        });

        se.sandbox.publish("component:loaded", 'filter-form');
    }

    return { viewModel: FilterForm, template: templateMarkup };

});
