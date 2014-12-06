define(['knockout', 'text!./list-locations.html'], function(ko, templateMarkup) {

  function ListLocations(params) {
    this.message = ko.observable('Hello from the list-locations component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ListLocations.prototype.dispose = function() { };
  
  return { viewModel: ListLocations, template: templateMarkup };

});
