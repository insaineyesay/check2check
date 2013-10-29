App.Router.map(function () {
  this.resource('bills', { path: '/' });
});

App.BillsRoute = Ember.Route.extend({
	model: function() {
		return this.get('store').find('bill');
	}
});