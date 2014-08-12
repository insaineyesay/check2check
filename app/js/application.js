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
});
//App.ApplicationAdapter = DS.RESTAdapter.extend({
  //host: 'https://insaineyesay.iriscouch.com/'
//});

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

// Objects
App.IncomeItemDeleteButton = Ember.Object.extend({
  
});

App.IncomeItem = Ember.Object.extend({
  incomeName: function(name) {
    this.get(name);
  },
  frequency: function(frequency) {
    this.get(frequency);
  }
});

// Models
App.Income = DS.Model.extend({
  incomeName: DS.attr(),
  incomeAmount: DS.attr(),
  incomeFrequency: DS.attr(),
  incomeDate: DS.attr()
});

App.Bill = DS.Model.extend({
  expenseName: DS.attr(),
  expenseAmount: DS.attr(),
  expenseDate: DS.attr(),
  expenseApr: DS.attr(),
  expensePriority: DS.attr(),
  expenseAssignee: DS.attr()
});

// Controllers
App.ApplicationController = Ember.ArrayController.extend({
  needs: ['income', 'incomeList', 'expenses', 'expenseList'],
  actions: {
    
    createBillItem: function() {

    // Get the Bill title set by the new 'New Bill' text field
    var title = this.get('newExpenseTitle');
    var amount = this.get('newExpenseAmount');
    var date = this.get('newExpenseDate');
    var assignee = this.get('newExpenseAssignee');

    if (!title.trim() && !amount.trim() && !date.trim() && !assignee.trim()) { return; }
       
    // Create the New Bill Model
    var bill = this.store.createRecord('bill', {
            expenseName: title,
            expenseAmount: amount,
            expenseDate: date,
            expenseAssignee: assignee
    });

    // Clear the "New Bill" text field
    this.setProperties({
      'newExpenseTitle': '',
      'newExpenseAmount': '',
      'newExpenseDate': '',
      'newExpenseAssignee': ''
    });

    // Save it
    bill.save();
  },

  createIncomeItem: function() {
      var name = this.get('newIncomeTitle');
      var amount = this.get('newIncomeAmount');
      var payFrequency = document.getElementById("addIncomeFrequency");
      var frequency = payFrequency.options[payFrequency.selectedIndex].value;


      if (!name.trim() && !amount.trim() && !frequency.trim()) { return; }
    

      var income = this.store.createRecord('income', {
        incomeName: name,
        incomeAmount: amount,
        incomeFrequency: frequency
      });

      this.setProperties({
        'newIncomeTitle': '',
        'newIncomeAmount': ''
      });

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
        console.log('applicationControllerCall');
       var bills = this.getEach('expenseAmount');
       if(bills.length > 0) {
        var billTotals = bills.reduce(function (previousValue, currentValue, index, array) {
          return parseInt(previousValue, 10) + parseInt(currentValue, 10);
        });
        return billTotals;
       }
       
      }.property('@each')
});


App.IncomeOverviewController = Ember.ArrayController.extend({
  needs: 'expenses'
});

App.ExpensesOverviewController = Ember.ArrayController.extend({
  needs: ['income', 'incomeList', 'expenses', 'expenseList'],
  totalBills: function() {
    // console.log('yay');
    var bills = this.getEach('controllers.expenseList.expenseAmount');
    // console.log(bills);
    if(bills.length > 0) {
      var totalBills = bills.reduce(function (previousValue, currentValue, index) {
        return parseFloat(previousValue, 10) + parseFloat(currentValue, 10);
      });
      return totalBills;
    }
  }.property('@each')
});

App.IncomeItemListController = Ember.ObjectController.extend({
  actions: {
    frequencyOptions: ["Daily", "Weekly", "Bi-Weekly" , "Monthly", "One-Time"],
    editIncome: function() {
      this.toggleProperty('isEditing');
    },

    editIncomeFrequency: function() {
      this.toggleProperty('isEditingFrequency');
    },

    editIncomeAmount: function() {
      this.toggleProperty('isEditingAmount');
    },

    confirmIncomeDelete: function() {
      this.toggleProperty('deleteMode');
      var income = this.get('model');
      income.deleteRecord();
      income.save();
    },

    cancelIncomeDelete: function() {
      this.set('deleteMode', false);
    },

    acceptIncomeChanges: function() {
      console.log('yay');
      this.set('isEditing', false);
      var income = this.get('model');
      if (Ember.isEmpty(this.get('model.incomeName'))) {
        this.send('cancelIncomeFrequencyIncomeEdit');
      } else {
        income.save();
      }
    },

    
    acceptIncomeAmountChanges: function() {
      console.log('yay');
      this.set('isEditingAmount', false);
      var income = this.get('model');
      if (Ember.isEmpty(this.get('model.incomeAmount'))) {
        this.send('cancelIncomeEdit');
      } else {
        income.save();
      }
    },

    acceptIncomeFrequencyChanges: function(value){
      var payFrequency = document.getElementById("addIncomeFrequency");
      var value = payFrequency.options[payFrequency.selectedIndex].value;
      // var incomeFrequency = value;
      this.set('isEditingFrequency', false);
      var income = this.get('model');
      console.log(income);
      if(Ember.isEmpty(this.get('model.incomeFrequency'))) {
        this.send('cancelIncomeFrequencyEdit');
      } else {
        income.set('incomeFrequency', value).save();
      }
  }

  }
});

App.IncomeListController = Ember.ArrayController.extend({
  needs: ["expenses","incomeItemList"],

  incomeTotal: function() {
    var incomes = this.getEach('incomeAmount');
    console.log(incomes);
    if(incomes.length > 0) {
      var incomeTotal = incomes.reduce(function (previousValue, currentValue, index, array) {
        return parseFloat(previousValue, 10) + parseFloat(currentValue, 10);
      });
      return incomeTotal;
    }
      
    }.property('@each'),

    disposableIncome: function () {
      var incomes = this.getEach('incomeAmount');
      var bills = this.get("controllers.expenses.sumOfBills");

      if(incomes.length > 0) {
      var incomeTotal = incomes.reduce(function (previousValue, currentValue, index, array) {
         return parseFloat(previousValue, 10) + parseFloat(currentValue, 10);
        });
      return incomeTotal - bills;
    }
      
      }.property('@each'),
});

App.IncomeController = Ember.ObjectController.extend({
  needs: 'expenses'
});

App.IncomeItemController = Ember.ArrayController.extend({
  needs: ["expenses", "incomeItemList"],
  incomeTotal: function() {
    var incomes = this.getEach('incomeAmount');

    if(incomes.length > 0) {
      var incomeTotal = incomes.reduce(function (previousValue, currentValue, index, array) {
        return parseFloat(previousValue, 10) + parseFloat(currentValue, 10);
      });
      return incomeTotal;
    }
      
    }.property('@each'),

    disposableIncome: function () {
      var incomes = this.getEach('incomeAmount');
      var bills = this.get("controllers.expenses.sumOfBills");

      if(incomes.length > 0) {
      var incomeTotal = incomes.reduce(function (previousValue, currentValue, index, array) {
         return parseFloat(previousValue, 10) + parseFloat(currentValue, 10);
        });
      return incomeTotal - bills;
    }
      
      }.property('@each')
    
});

App.ExpenseItemListController = Ember.ObjectController.extend({
  deleteMode: false,

	actions: {

    cancelDelete: function() {
      this.set('deleteMode', false);
    },

    confirmExpenseDelete: function() {
      this.toggleProperty('deleteMode');
      var bill = this.get('model');
      bill.deleteRecord();
      bill.save();
    },

    editExpenseName: function() {
      //Grab the model
      this.toggleProperty('isEditing', true);
    },

    editExpenseFrequency: function() {
      //Grab the model
      this.set('isEditing', true);
    },

    editExpenseDate: function() {
      //Grab the model
      this.set('isEditing', true);
    },

    editExpense: function() {
      //Grab the model
      this.set('isEditing', true);
    },

    editExpenseAmount: function() {
      //Grab the model
      this.set('isEditing', true);
    },

    editExpenseAssignee: function() {
      //Grab the model
      this.set('isEditing', true);
    },

		delete: function() {
		// change delete mode to true
    this.set('deleteMode', true);
		
		},

    cancelEdit: function() {
      this.set('isEditing', false);
    },

    doneEditing: function() {
     var bill = this.get('model');
      //set editing back to false
      this.set('isEditing', false);
      this.get('model').save();
    },

    acceptExpenseChanges: function() {
      console.log('yay');
      this.set('isEditing', false);
      var income = this.get('model');
      if (Ember.isEmpty(this.get('model.expenseName'))) {
        this.send('cancelExepenseEdit');
      } else {
        income.save();
      }
    }
  }
});

App.ExpenseListController = Ember.ArrayController.extend({
  needs: ['expenses', 'incomeList'],
  
    sumOfBills: function() {
      console.log('yay');
      var bills = this.getEach('expenseAmount');
      if (bills.length > 0) {
        var billTotals = bills.reduce(function (previousValue, currentValue, index) {
          return parseFloat(previousValue, 10) + parseFloat(currentValue, 10);
        });
        return billTotals;
      }
    
    }.property('@each'),

    // totalIncome: function() {
    //   console.log('yay');
    //   var income = this.getEach('controllers.incomeList.incomeTotal');
    //   console.log(income);
    //   if (income.length > 0) {
    //     var incomeTotals = income.reduce(function (previousValue, currentValue, index) {
    //       return parseFloat(previousValue, 10) + parseFloat(currentValue, 10);
    //     });
    //     return incomeTotals;
    //   }
    // }.property('@each'),

    // disposableIncome: function () {
    //   var incomes = this.getEach('controllers.incomeList.incomeTotal');
    //   console.log(incomes);
    //   console.log(sumOfBills);
    //   var bills = this.get("controllers.expenses.sumOfBills");
    //   console.log(bills);
    //   if(incomes.length > 0) {
    //   var incomeTotal = incomes.reduce(function (previousValue, currentValue, index, array) {
    //      return parseInt(previousValue, 10) + parseInt(currentValue, 10);
    //     });
    //   return incomeTotal - bills;
    // }
      
    //   }.property('@each')
  
});

App.ExpenseController = Ember.ObjectController.extend({

});

App.ExpensesController = Ember.ArrayController.extend({
  isEditing: false,

  actions: {
    
    createBillItem: function() {

    // Get the Bill title set by the new 'New Bill' text field
    var title = this.get('newTitle');
    var amount = this.get('newAmount');
    var date = this.get('newDate');
    var assignee = this.get('newExpenseAssignee');

    if (!title.trim() && !amount.trim() && !date.trim()) { return; }
       
    // Create the New Bill Model
    var bill = this.store.createRecord('bill', {
            expenseName: title,
            expenseAmount: amount,
            expenseDate: date,
            expenseAssignee: assignee
    });

    // Clear the "New Bill" text field
    this.setProperties({
      'newTitle': '',
      'newAmount': '',
      'newDate': '',
      'newExpenseAssignee': ''
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

       var bills = this.getEach('expenseAmount');
       if(bills.length > 0) {
        var billTotals = bills.reduce(function (previousValue, currentValue, index, array) {
          return parseInt(previousValue, 10) + parseInt(currentValue, 10);
        });
        return billTotals;
       }
       
      }.property('@each')

});

App.ReportsController = Ember.ObjectController.extend({
    needs: ['expenses' , 'income']
});


// Views
App.ApplicationView = Ember.View.extend({
  classNames: ['applicationWrap']
});

App.InnerButtonsView = Ember.View.extend({
  templateName: 'innerButtons',
  classNames: ['innerButtons']
});

App.InnerExpenseButtonsView = Ember.View.extend({
  templateName: 'innerExpenseButtons'
});

App.IncomeGraphView = Ember.View.extend({
  templateName: 'incomeGraph'
});

App.IncomeListView = Ember.View.extend({
  templateName: 'incomeList'
});

App.FrequencySelectionView = Ember.View.extend({
  templateName: 'incomeFrequencySelection'
}), 

App.CalendarDatePicker = Ember.TextField.extend({
  _picker: null,
 
  modelChangedValue: function(){
    var picker = this.get("_picker");
    if (picker){
      picker.setDate(this.get("value"));
    }
  }.observes("value"),
 
  didInsertElement: function(){
    currentYear = (new Date()).getFullYear();
    formElement = this.$()[0];
    picker = new Pikaday({
      field: formElement,
      yearRange: [1900,currentYear+2]
    });
    this.set("_picker", picker);
  },
 
  willDestroyElement: function(){
    picker = this.get("_picker");
    if (picker) {
      picker.destroy();
    }
    this.set("_picker", null);
  },

  accept: function(event){
    this.sendAction('action');
  }
});

App.EditIncomeView = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});

Ember.Handlebars.helper('edit-income', App.EditIncomeView);

Ember.Handlebars.helper('edit-expense', App.EditIncomeView);

Ember.Handlebars.helper('edit-frequency', App.EditFrequencyView);

App.EditFrequencyView = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});



App.IncomeItemListView = Ember.View.extend({
});

App.BillsView = Ember.View.extend({
  templateName: 'bills',
  classNames: ['sideNavWrap'],
  billListHeading: 'Your List of Bills',
  didInsertElement: function() {
    $('.tooltip').tooltip();
  }
});

App.IncomeOverviewView = Ember.View.extend({
  templateName: 'incomeOverview',
  incomeListHeading: 'Income',
  
});

App.AddBillView = Ember.View.extend({
  templateName: 'addBill'
});

App.IncomeView = Ember.View.extend({
  templateName: 'income'
});

App.LeftFinancialComponentView = Ember.View.extend({
  templateName: 'leftFinancialComponent',
  didInsertElement: function() {
    var pieChart = $('#leftFinancialComponentPieChart').get(0).getContext("2d");
    var $chart = $('#leftFinancialComponentPieChart');
    var height = $('#leftFinancialComponent').height();
    var width = $('#leftFinancialComponent').width();
    
    $chart.attr({
      width: width,
      height: height
    });
   
     var data = [
      {
        value: 30,
        color:"#F38630"
      },
      {
        value : 50,
        color : "#E0E4CC"
      },
      {
        value : 100,
        color : "#69D2E7"
      }
    ];

      var options = {
          animationEasing: "easeInOutCubic",
        };

    var leftFinancialPieChart = new Chart(pieChart).Pie(data, options);
  }
});

App.CenterFinancialComponentView = Ember.View.extend({
  templateName: 'centerFinancialComponent'
});

App.RightFinancialComponentView = Ember.View.extend({
  templateName: 'rightFinancialComponent'
});

App.LeftIncomeComponentView = Ember.View.extend({
  templateName: 'leftIncomeComponent',
  didInsertElement: function() {
    var pieChart = $('#leftIncomeComponentPieChart').get(0).getContext("2d");
    var $chart = $('#leftIncomeComponentPieChart');
    var h = $('#leftIncomeComponent').height();
    var w = $('#leftIncomeComponent').width();

    $chart.attr({
      width: w ,
      height: h - 30
    });

        var data = [
      {
        value: 30,
        color:"#F38630"
      },
      {
        value : 50,
        color : "#E0E4CC"
      },
      {
        value : 100,
        color : "#69D2E7"
      }
    ];

      var options = {
          animationEasing: "easeInOutCubic",
        };

    var leftIncomePieChart = new Chart(pieChart).Pie(data, options);
  }

});

App.CenterIncomeComponentView = Ember.View.extend({
  templateName: 'centerIncomeComponent',
  didInsertElement: function() {
    var pieChart = $('#centerIncomeComponentPieChart').get(0).getContext("2d");
    var $chart = $('#centerIncomeComponentPieChart');
    var h = $('#centerComponent').height();
    var w = $('#centerComponent').width();

    $chart.attr({
      width: w,
      height: h - 30
    });

        var data = [
      {
        value: 30,
        color:"#F38630"
      },
      {
        value : 50,
        color : "#E0E4CC"
      },
      {
        value : 100,
        color : "#69D2E7"
      }
    ];
    var centerIncomePieChart = new Chart(pieChart).Pie(data);
  }

});

App.RightIncomeComponentView = Ember.View.extend({
  templateName: 'rightIncomeComponent',
  didInsertElement: function() {
    var pieChart = $('#rightIncomeComponentPieChart').get(0).getContext("2d");
    var $chart = $('#rightIncomeComponentPieChart');
    var h = $('#rightComponent').height();
    var w = $('#rightComponent').width();

    $chart.attr({
      width: w,
      height: h - 30
    });

        var data = [
      {
        value: 30,
        color:"#F38630"
      },
      {
        value : 50,
        color : "#E0E4CC"
      },
      {
        value : 100,
        color : "#69D2E7"
      }
    ];
    var rightIncomePieChart = new Chart(pieChart).Pie(data);
  }

});


App.LeftExpenseComponentView = Ember.View.extend({
  templateName: 'leftExpenseComponent',
  didInsertElement: function() {
    var pieChart = $('#leftExpenseComponentPieChart').get(0).getContext("2d");
    var $chart = $('#leftExpenseComponentPieChart');
    var h = $('#leftComponent').height();
    var w = $('#leftComponent').width();

    $chart.attr({
      width: w ,
      height: h - 30
    });

        var data = [
      {
        value: 30,
        color:"#F38630"
      },
      {
        value : 50,
        color : "#E0E4CC"
      },
      {
        value : 100,
        color : "#69D2E7"
      }
    ];

      var options = {
          animationEasing: "easeInOutCubic",
        };

    var newPieChart = new Chart(pieChart).Pie(data, options);
  }

});

App.CenterExpenseComponentView = Ember.View.extend({
  templateName: 'centerExpenseComponent',
  didInsertElement: function() {
    var pieChart = $('#centerExpenseComponentPieChart').get(0).getContext("2d");
    var $chart = $('#centerExpenseComponentPieChart');
    var h = $('#centerComponent').height();
    var w = $('#centerComponent').width();

    $chart.attr({
      width: w,
      height: h - 30
    });

        var data = [
      {
        value: 30,
        color:"#F38630"
      },
      {
        value : 50,
        color : "#E0E4CC"
      },
      {
        value : 100,
        color : "#69D2E7"
      }
    ];
    var centerPieChart = new Chart(pieChart).Pie(data);
  }

});

App.RightExpenseComponentView = Ember.View.extend({
  templateName: 'rightExpenseComponent',
  didInsertElement: function() {
    var pieChart = $('#rightExpenseComponentPieChart').get(0).getContext("2d");
    var $chart = $('#rightExpenseComponentPieChart');
    var h = $('#rightComponent').height();
    var w = $('#rightComponent').width();

    $chart.attr({
      width: w,
      height: h - 30
    });

        var data = [
      {
        value: 30,
        color:"#F38630"
      },
      {
        value : 50,
        color : "#E0E4CC"
      },
      {
        value : 100,
        color : "#69D2E7"
      }
    ];
    var rightPieChart = new Chart(pieChart).Pie(data);
  }

});

App.FinancialOverviewChartsView = Ember.View.extend({
  templateName: "financialOverviewCharts",
  didInsertElement: function() {
    var lineChart = $('#financialLineChart').get(0).getContext("2d");
    var $chart = $('#financialLineChart');
    var height = $('#financialPageCharts').height();
    var width = $('#financialPageCharts').width();
    
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
    };
    var financialLineChart = new Chart(lineChart).Line(data);
  }
});

App.ReportsView = Ember.View.extend({
  templateName: 'reports',
  classNames: 'reports',
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
    };
    var myNewChart = new Chart(lineChart).Line(data);
  }
});

// Components
App.DeleteIncomeComponent = Ember.Component.extend({
  classNamesBindings: ['isDeleting:enabled'],
  isDeleting: true,
  actions: {
    delete: function() {
      this.toggleProperty('deleteMode');
      this.toggleProperty('isDeleting');
    },
    confirm: function(incomeItem) {
      this.sendAction('action','confirmIncomeDelete');
    },
    cancel: function() {
      this.toggleProperty('deleteMode');
      this.toggleProperty('isDeleting');
    }
  }
});

App.DeleteExpenseComponent = Ember.Component.extend({
  classNamesBindings: ['isDeleting:enabled'],
  isDeleting: true,
  actions: {
    delete: function() {
      this.toggleProperty('deleteMode');
      this.toggleProperty('isDeleting');
    },
    confirm: function(expenseItem) {
      this.sendAction('action','confirmExpenseDelete');
    },
    cancel: function() {
      this.toggleProperty('deleteMode');
      this.toggleProperty('isDeleting');
    }
  }
});