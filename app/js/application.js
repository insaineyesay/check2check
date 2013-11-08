window.App = Ember.Application.create({
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

// Adapters
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
App.FinancesController = Ember.Controller.extend({
   actions: {
    createBillItem: function() {

    // Get the Bill title set by the new 'New Bill' text field
    var title = this.get('newTitle');
    var amount = this.get('newAmount');
    var date = this.get('newDate');

    if (!title.trim() && !amount.trim() && !date.trim()) { return; }
    console.log('yay1');

    // Create the New Bill Model
    var bill = this.store.createRecord('bill', {
            name: title,
            amount: amount,
            date: date
    });

    
    console.log('yay2');
    // Clear the "New Bill" text field
    this.set('newTitle', '');
    this.set('newAmount', '');
    this.set('newDate', '');

    console.log('yay3');
    // Save it
    this.save();
    console.log('yay4');
      }
    }
});

App.BillController = Ember.ObjectController.extend({
	actions: {
		removeBill: function() {
		// Grab the corresponding bill model
		var bill = this.get('model');
      bill.deleteRecord();
			bill.save();
		},

     editBill: function() {
      //Grab the model
      this.set('isEditing', true);
    },

    doneEditing: function() {
     var bill = this.get('model');
      //set editing back to false
      bill.set('isEditing', false);
      bill.get('model').save();
    }
	}
});

App.BillsController = Ember.ArrayController.extend({
  isEditing: false,

  totalBills: function() {
      return this.getEach('.billItem').length;
      }.property('@each.billItem'),

  inflection: function() {
      var totalBills = this.get('totalBills');
      return totalBills === 1 ? 'bill' : 'bills';
        }.property('@each.billItem'),
  
  sumOfBills: function() {
     var bills = this.getEach('amount');
     console.log(bills);
    var billTotals = bills.reduce(function(previousValue, currentValue, index, array) {
      return parseInt(previousValue) + parseInt(currentValue);
     });
     return billTotals;
    }.property('@each')

});

// Models
App.Bill = DS.Model.extend({
	name: DS.attr('string'),
	amount: DS.attr('number'),
	date: DS.attr('string')
});

App.Bill.FIXTURES = [
{
        id: 1,
        name: 'Bill One',
        amount: '45',
        date: '11/1/13'
},
{
        id: 2,
        name: 'Bill Two',
        amount: '45',
        date: '11/1/13'
},
{
        id: 3,
        name: 'Bill Three',
        amount: '45',
        date: '11/1/13'
}
];




// JSON 


// jQuery UI
