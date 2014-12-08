define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections'], function($, ko, router) {

  // Components can be packaged as AMD modules, such as the following:
  ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
  ko.components.register('home-page', { require: 'components/home-page/home' });

  // ... or for template-only components, you can just point to a .html file directly:
  ko.components.register('about-page', {
    template: { require: 'text!components/about-page/about.html' }
  });

  ko.components.register('map', { require: 'components/map/map' });

  ko.components.register('marker-creator', { require: 'components/marker-creator/marker-creator' });

  ko.components.register('filter-form', { require: 'components/filter-form/filter-form' });

  ko.components.register('list-locations', { require: 'components/list-locations/list-locations' });

  ko.components.register('user-location', { require: 'components/user-location/user-location' });

  ko.components.register('search', { require: 'components/search/search' });

  ko.components.register('location-detail', { require: 'components/location-detail/location-detail' });


  // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

  // Start the application
  ko.applyBindings({ route: router.currentRoute });
});
