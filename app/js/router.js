App.Router.map(function () {
  this.resource('application', { path: '/' });
});

App.BillsRoute = Ember.Route.extend({
	model: function() {
		return this.get('store').find('bill');
	}
});