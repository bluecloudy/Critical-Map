define(['knockout', 'text!./location-detail.html', 'core'], function(ko, templateMarkup, se) {

  function LocationDetail(params) {

    var self = this;
      //true-> view marker detail
      self.viewdetail = ko.observable(false);
      self.selectedItem = ko.observable();


      self.onClose = function()
      {
          self.viewdetail(false);

      }


      se.sandbox.subscribe('location:detail', function(item){
          self.selectedItem(item);
          self.viewdetail(true);

//            self.items([]);
//            se.utils.each(items, function(item){
//                self.items.push(new marker(item));
//            });

      });


  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  LocationDetail.prototype.dispose = function() { };
  
  return { viewModel: LocationDetail, template: templateMarkup };

});
