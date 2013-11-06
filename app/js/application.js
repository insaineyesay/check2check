var App = Ember.Application.create({
// Log routing transitions and changes
  LOG_TRANSITIONS: true,
   // log when Ember generates a controller or a route from a generic class
  LOG_ACTIVE_GENERATION: true,
  // log when Ember looks up a template or a view
  LOG_VIEW_LOOKUPS: true,
  LOG_BINDINGS: true,
  LOG_STACKTRACE_ON_DEPRECATION: true,
  LOG_VERSION: true,
  debugMode: true
	});


// Routes
App.Router.map(function() {

	this.resource('index', {path: '/'});
	this.resource('getting started');
	this.resource('finances', function() {
		this.resource('bills');
	});
	this.resource('reports');
	this.resource('contact');

});

App.IndexRoute = Ember.Route.extend({
	beforeModel: function() {
		this.transitionTo('index');
	}
});

App.BillsIndexRoute = Ember.Route.extend({
	model: function() {
		return bills;
	}
});

// Controllers

// Models
App.Bill = DS.Model.extend({
	id: '',
	name: '',
	amount: '',
	date: '',
	apr: ''
});

// Adapters
App.Bill.adapter = DS.RESTAdapter.create();

// JSON 
App.Bill.url = "api/bill";
App.Bill.collectionKey = "bill";