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
App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'bills-emberjs'
});
//App.ApplicationAdapter = DS.RESTAdapter.extend({
  //host: 'https://insaineyesay.iriscouch.com/'
//});

// Routes
App.Router.map(function() {

	this.resource('index', {path: '/'});
	this.resource('getting started');
  this.resource('bills', function() {
    this.resource('income');
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

App.IncomeRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('income');
  }
});

// Controllers
App.FinancesController = Ember.Controller.extend({
   actions: {
    
    }
});

App.BillController = Ember.ObjectController.extend({
  deleteMode: false,

	actions: {

    cancelDelete: function() {
      this.set('deleteMode', false);
    },

    confirmDelete: function() {
      this.toggleProperty('deleteMode');
      var bill = this.get('model');
      bill.deleteRecord();
      bill.save();
    },

		delete: function() {
		// change delete mode to true
    this.set('deleteMode', true);
		
		},

     editBill: function() {
      //Grab the model
      this.set('isEditing', true);
    },

    cancelEdit: function() {
      this.set('isEditing', false);
    },

    doneEditing: function() {
     var bill = this.get('model');
      //set editing back to false
      this.set('isEditing', false);
      this.get('model').save();
    }
  }
});

App.IncomeController = Ember.ObjectController.extend({

});

App.IncomeController = Ember.ArrayController.extend({
  actions: {
    createIncomeItem: function() {
      var name = this.get('newIncomeTitle');
      var amount = this.get('newIncomeAmount');
      var frequency = this.get('newIncomeFrequency');

      if (!name.trim() && !amount.trim() && frequency.trim()) { return; }

      var income = this.store.createRecord('income', {
        incomeName: name,
        incomeAmount: amount,
        frequency: frequency
      });

      this.setProperties({
        'newIncomeTitle': '',
        'newIncomeAmount': '',
        'newIncomeFrequency':  ''
      });

      income.save();
    }

  }
});

App.BillsController = Ember.ArrayController.extend({
  isEditing: false,

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
    this.setProperties({
      'newTitle': '',
      'newAmount': '',
      'newDate': ''
    });

    console.log('yay3');
    // Save it
    bill.save();
    console.log('yay4');
    },

    acceptChanges: function() {
    this.set('isEditing', false);

    if(Ember.isEmpty(this.get('model'))) {
      this.send('cancelEdit');
    } else {
      this.get('model').save();
      }
    }

  },

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
     if(bills.length > 0) {
      var billTotals = bills.reduce(function(previousValue, currentValue, index, array) {
        return parseInt(previousValue, 10) + parseInt(currentValue, 10);
      });
     };
     return billTotals;
    }.property('@each')

});


// Models
App.Income = DS.Model.extend({
  incomeName: DS.attr(),
  incomeAmount: DS.attr(),
  frequency: DS.attr()
});

App.Bill = DS.Model.extend({
	name: DS.attr(),
	amount: DS.attr(),
	date: DS.attr(),
  apr: DS.attr(),
  priority: DS.attr()
});

// Views
App.BillsView = Ember.View.extend({
  templateName: 'bills',
  incomeHeading: 'Enter Income Below',
  billHeading: 'Enter Bills Below'
});

App.IncomeView = Ember.View.extend({
  templateName:"income"
});
// Components

// JSON 
//App.Bill.url = "https://insaineyesay.iriscouch.com/bill";
//App.Bill.collectionKey = "bill";

// jQuery UI