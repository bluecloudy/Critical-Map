define(['knockout', 'text!./list-locations.html'], function(ko, templateMarkup) {

    var marker = function(happen, level, img) {


        this.happen = happen;
        this.level = level;
        this.img = img;
    }

    function ListLocations(params) {
        var self = this;

        //list marker
		self.selectedItem = ko.observable();
        self.items = ko.observableArray([
            new marker('nguoi dep', 'Notice', 'http://s.f10.img.vnexpress.net/2014/12/06/nguoi-dep-duoi-17m-de-tao-bat-ngo-dem-chung-ket-hoa-hau-vn-1417842674_180x108.jpg'),
            new marker('ngoi choi', 'Notice', 'http://l.f26.img.vnecdn.net/2014/12/06/giaxanggiam-1417849350_490x294.jpg'),
            new marker('ngoi choi', 'Notice', 'http://l.f26.img.vnecdn.net/2014/12/06/giaxanggiam-1417849350_490x294.jpg'),
            new marker('ngoi choi', 'Notice', 'http://l.f26.img.vnecdn.net/2014/12/06/giaxanggiam-1417849350_490x294.jpg'),
        ]);

        


        //true-> view marker detail
        self.viewdetail = ko.observable(false);
			
			
		self.onViewDetail = function(item) {

			self.selectedItem(item);
			self.viewdetail(true);

		}

    }
   
    ListLocations.prototype.dispose = function() {};

    return {
        viewModel: ListLocations,
        template: templateMarkup
    };

});