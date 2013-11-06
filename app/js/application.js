var App = Ember.Application.create({
// Log routing transitions and changes
  LOG_TRANSITIONS: true,
   // log when Ember generates a controller or a route from a generic class
  LOG_ACTIVE_GENERATION: true,
  // log when Ember looks up a template or a view
  LOG_VIEW_LOOKUPS: true
	});


// Routes
App.Router.map(function() {

	this.resource('index');
	this.resource('getting started');
	this.resource('finances');
	this.resource('bills');
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
		return App.Bill.find();
	}
});

// Controllers
App.FinancesController = Ember.ArrayController.extend({

});

// Models
App.Bill = Ember.Object.extend({
	id: 1,
	name: '',
	amount: '',
	date: '',
	apr: ''
});

console.log(App.bills);
// Adapters
// App.Bill.adapter = Ember.Adapter.create();

// JSON 
App.Bill.url = "api/bill";
App.Bill.collectionKey = "bill";