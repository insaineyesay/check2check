var App = Ember.Application.create({

// log when Ember generates a controller or a route from a generic class
  LOG_ACTIVE_GENERATION: true,
// log when Ember looks up a template or a view
  LOG_VIEW_LOOKUPS: true

});

App.ApplicationAdapter = DS.FixtureAdapter.extend();