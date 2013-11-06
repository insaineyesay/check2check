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

App.ApplicationAdapter = DS.FixtureAdapter.extend();

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

App.BillsRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('bill');
	}
});

// Controllers
App.BillController = Ember.ArrayController.extend({

});
// Models
App.Bill = DS.Model.extend({
	name: DS.attr('string'),
	amount: DS.attr('string'),
	date: DS.attr('string'),
	apr: DS.attr('string')
});

App.Bill.FIXTURES = [
{
        id: 1,
        name: 'Bill One',
        amount: '45.00',
        date: '11/1/13'
},
{
        id: 2,
        name: 'Bill Two',
        amount: '45.00',
        date: '11/1/13'
},
{
        id: 3,
        name: 'Bill Three',
        amount: '45.00',
        date: '11/1/13'
}
];

// Adapters
App.Bill.adapter = DS.RESTAdapter.create();

// JSON 
App.Bill.url = "api/bill";
App.Bill.collectionKey = "bill";