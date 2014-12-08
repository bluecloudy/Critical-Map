define(['knockout', 'text!./loading.html'], function(ko, templateMarkup) {

  function Loading(params) {
    this.message = ko.observable('Hello from the loading component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Loading.prototype.dispose = function() { };
  
  return { viewModel: Loading, template: templateMarkup };

});
