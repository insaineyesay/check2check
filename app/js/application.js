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
  this.resource('bills', {path: '/expenses'}, function() {
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
App.IncomeItemController = Ember.ObjectController.extend({
  actions: {
    editIncome: function() {
      this.toggleProperty('isEditing');
    },
    
    deleteIncome: function() {
      this.set('deleteMode', true);
    },

    confirmIncomeDelete: function() {
      this.toggleProperty('deleteMode');
      var income = this.get('model');
      income.deleteRecord();
      income.save();
    },

    cancelIncomeDelete: function() {
      this.set('deleteMode', false);
    }

  }
});

App.IncomeController = Ember.ArrayController.extend({
  needs: "bills",

  actions: {
  createIncomeItem: function() {
      var name = this.get('newIncomeTitle');
      var amount = this.get('newIncomeAmount');
      var frequency = this.get('newIncomeFrequency');

      if (!name.trim() && !amount.trim()) { return; }

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
  },

  incomeTotal: function() {
    var incomes = this.getEach('incomeAmount');

    if(incomes.length > 0) {
      var incomeTotal = incomes.reduce(function (previousValue, currentValue, index, array) {
        return parseInt(previousValue, 10) + parseInt(currentValue, 10); 
      });
    };
      return incomeTotal;
    }.property('@each'),

    disposableIncome: function () {
      var incomes = this.getEach('incomeAmount');
      var bills = this.get("controllers.bills.sumOfBills");

      if(incomes.length > 0) {
      var incomeTotal = incomes.reduce(function (previousValue, currentValue, index, array) {
         return parseInt(previousValue, 10) + parseInt(currentValue, 10); 
        });
    };
      return incomeTotal - bills;
      }.property('@each')
    
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

App.BillsController = Ember.ArrayController.extend({
  isEditing: false,

  actions: {
    
    createBillItem: function() {

    // Get the Bill title set by the new 'New Bill' text field
    var title = this.get('newTitle');
    var amount = this.get('newAmount');
    var date = this.get('newDate');

    if (!title.trim() && !amount.trim() && !date.trim()) { return; }
       
    // Create the New Bill Model
    var bill = this.store.createRecord('bill', {
            name: title,
            amount: amount,
            date: date
    });

    // Clear the "New Bill" text field
    this.setProperties({
      'newTitle': '',
      'newAmount': '',
      'newDate': ''
    });

    // Save it
    bill.save();
    },

    acceptChanges: function() {
    this.set('isEditing', false);

    if(Ember.isEmpty(this.get('model'))) {
      this.send('cancelEdit');
    } else {
      this.get('model').save();
      }
    },

    deleteIncome: function() {
      console.log('wtf');
      this.set('deleteMode', true);
    },

    confirmIncomeDelete: function() {
      this.toggleProperty('deleteMode');
      var income = this.get('model');
      income.deleteRecord();
      income.save();
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
     if(bills.length > 0) {
      var billTotals = bills.reduce(function (previousValue, currentValue, index, array) {
        return parseInt(previousValue, 10) + parseInt(currentValue, 10);
      });
     };
     return billTotals;
    }.property('@each')

});

App.ReportsController = Ember.ObjectController.extend({
    needs: ['bills' , 'income'] 
});

// Objects

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
App.ApplicationView = Ember.View.extend({
  classNames: ['applicationWrap']
});

App.BillsView = Ember.View.extend({
  templateName: 'bills',
  billHeading: 'Bills',
  classNames: ['sideNavWrap'],
  billListHeading: 'Your List of Bills',
  didInsertElement: function() {
    $('.tooltip').tooltip();
  }
});

App.IncomeView = Ember.View.extend({
  templateName: 'income',
  incomeListHeading: 'Income',
  incomeHeading: 'Income'
});


App.ReportsView = Ember.View.extend({
  templateName: 'reports',
  didInsertElement: function() {
    var lineChart = $('#lineChart').get(0).getContext("2d");
    var $chart = $('#lineChart');
    var height = $('#charts').height();
    var width = $('#charts').width();
    
    $chart.attr({
      width: width,
      height: height /2
    });
   
    var data = {
      labels : ["January","February","March","April","May","June","July"],
      datasets : [
        {
          fillColor : "rgba(220,220,220,0.5)",
          strokeColor : "rgba(220,220,220,1)",
          pointColor : "rgba(220,220,220,1)",
          pointStrokeColor : "#fff",
          data : [65,59,90,81,56,55,40]
        },
        {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          data : [28,48,40,19,96,27,100]
        }
      ]
    }
    var myNewChart = new Chart(lineChart).Line(data);
  }
});

// Components

// JSON 
//App.Bill.url = "https://insaineyesay.iriscouch.com/bill";
//App.Bill.collectionKey = "bill";

// jQuery UI