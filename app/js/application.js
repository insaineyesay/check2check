window.App = Ember.Application.create({
// Log routing transitions and changes
  LOG_TRANSITIONS: true
	});

App.ApplicationAdapter = DS.FixtureAdapter.extend();