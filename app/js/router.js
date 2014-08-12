// Routes
App.Router.map(function() {
	this.resource('index', {path: '/'});
	this.resource('getting started');
  this.resource('financial');
  this.resource('income');
  this.resource('incomeOverview', {path: '/income'});
  this.resource('incomeList');
  this.resource('incomeGraph');
  this.resource('expensesOverview' , {path: '/expenses'});
  this.resource('expenseList');
  this.resource('expenseGraph');
  this.resource('bills');
	this.resource('reports');
	this.resource('contact');

});


App.IndexRoute = Ember.Route.extend({
	beforeModel: function() {
		this.transitionTo('index');
	}
});

App.ExpensesOverviewRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('bill');
  }
});

App.ExpenseListRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('bill');
	}
});

App.IncomeListRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('income');
  }
});