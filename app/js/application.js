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
  this.resource('bills');
	this.resource('finances');
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
App.Bill = DS.Model.extend({
	name: DS.attr(),
	amount: DS.attr(),
	date: DS.attr()
});

// Views
App.AddBill = Ember.View.extend({

});
// Components

// JSON 
//App.Bill.url = "https://insaineyesay.iriscouch.com/bill";
//App.Bill.collectionKey = "bill";

// jQuery UI
// Namespaces in Ember should be created with Ember.Namespace.create()
JQ = Ember.Namespace.create();

// Create a new mixin for jQuery UI widgets using the Ember
// mixin syntax.
JQ.Widget = Ember.Mixin.create({
    // When Ember creates the view's DOM element, it will call this
    // method.
    didInsertElement: function () {
        "use strict";
        // Make jQuery UI options available as Ember properties
        var options = this._gatherOptions(), ui;

        // Make sure that jQuery UI events trigger methods on this view.
        this._gatherEvents(options);

        // Create a new instance of the jQuery UI widget based on its `uiType`
        // and the current element.
        if (typeof jQuery.ui[this.get('uiType')] === 'function') {
            ui = jQuery.ui[this.get('uiType')](options, this.get('element'));
        } else {
            ui = $(this.get('element'))[this.get('uiType')](options);
        }
        
        // Save off the instance of the jQuery UI widget as the `ui` property
        // on this Ember view.
        this.set('ui', ui);
    },

    // When Ember tears down the view's DOM element, it will call
    // this method.
    willDestroyElement: function () {
        "use strict";
        var ui = this.get('ui'), observers, prop;

        if (ui) {
            // Tear down any observers that were created to make jQuery UI
            // options available as Ember properties.
            observers = this._observers;
            for (prop in observers) {
                if (observers.hasOwnProperty(prop)) {
                    this.removeObserver(prop, observers[prop]);
                }
            }
            ui._destroy();
        }
    },

    // Each jQuery UI widget has a series of options that can be configured.
    // For instance, to disable a button, you call
    // `button.options('disabled', true)` in jQuery UI. To make this compatible
    // with Ember bindings, any time the Ember property for a
    // given jQuery UI option changes, we update the jQuery UI widget.
    _gatherOptions: function () {
        "use strict";
        var uiOptions = this.get('uiOptions'), options = {};

        // The view can specify a list of jQuery UI options that should be treated
        // as Ember properties.
        uiOptions.forEach(function (key) {
            options[key] = this.get(key);

            // Set up an observer on the Ember property. When it changes,
            // call jQuery UI's `setOption` method to reflect the property onto
            // the jQuery UI widget.
            var observer = function () {
                var value = this.get(key);
                this.get('ui')._setOption(key, value);
            };

            this.addObserver(key, observer);

            // Insert the observer in a Hash so we can remove it later.
            this._observers = this._observers || {};
            this._observers[key] = observer;
        }, this);

        return options;
    },

    // Each jQuery UI widget has a number of custom events that they can
    // trigger. For instance, the progressbar widget triggers a `complete`
    // event when the progress bar finishes. Make these events behave like
    // normal Ember events. For instance, a subclass of JQ.ProgressBar
    // could implement the `complete` method to be notified when the jQuery
    // UI widget triggered the event.
    _gatherEvents: function (options) {
        "use strict";
        var uiEvents = this.get('uiEvents') || [], self = this;

        uiEvents.forEach(function (event) {
            var callback = self[event];

            if (callback) {
                // You can register a handler for a jQuery UI event by passing
                // it in along with the creation options. Update the options hash
                // to include any event callbacks.
                options[event] = function (event, ui) { return callback.call(self, event, ui); };
            }
        });
    }
});

// Create a new Ember view for the jQuery UI Button widget
JQ.Button = Em.View.extend(JQ.Widget, {
    uiType: 'button',
    uiOptions: ['disabled', 'text', 'icons', 'label'],
    uiEvents: ['create'],

    tagName: 'button'
});

// Create a new Ember view for the jQuery UI Menu widget (new
// in jQuery UI 1.9). Because it wraps a collection, we extend from
// Ember's CollectionView rather than a normal view.
//
// This means that you should use `#collection` in your template to
// create this view.
JQ.Menu = Em.CollectionView.extend(JQ.Widget, {
    uiType: 'menu',
    uiOptions: ['disabled'],
    uiEvents: ['create', 'focus', 'blur', 'select'],

    tagName: 'ul',

  // Whenever the underlying Array for this `CollectionView` changes,
  // refresh the jQuery UI widget.
    arrayDidChange: function (content, start, removed, added) {
        "use strict";
        this._super(content, start, removed, added);

        var ui = this.get('ui');
        if (ui) {
            // Schedule the refresh for after Ember has completed it's
            // render cycle
            Em.run.schedule('render', function () {
                ui.refresh();
            });
        }
    }
});

// Create a new Ember view for the jQuery UI Datepicker widget
JQ.DatePicker = Em.View.extend(JQ.Widget, {
    uiType: 'datepicker',
    uiOptions: ['disabled', 'altField', 'altFormat', 'appendText', 'autoSize',
    'buttonImage', 'buttonImageOnly', 'buttonText', 'calculateWeek', 'changeMonth', 'changeYear',
    'closeText', 'constrainInput', 'currentText', 'dateFormat', 'dayNames', 'dayNamesMin',
    'dayNamesShort', 'defaultDate', 'duration', 'firstDay', 'gotoCurrent', 'hideIfNoPrevNext',
    'isRTL', 'maxDate', 'minDate', 'monthNames', 'monthNamesShort', 'navigationAsDateFormat',
    'nextText', 'numberOfMonths', 'prevText', 'selectOtherMonths', 'shortYearCutoff', 'showAnim',
    'showButtonPanel', 'showCurrentAtPos', 'showMonthAfterYear', 'showOn', 'showOptions',
    'showOtherMonths', 'showWeek', 'stepMonths', 'weekHeader', 'yearRange', 'yearSuffix'],
    uiEvents: ['create', 'beforeShow', 'beforeShowDay', 'onChangeMonthYear', 'onClose', 'onSelect'],

    tagName: 'input',
    type: "text",
    attributeBindings: ['type', 'value'],
    valueBindings: "newDate"
});

App.Datepicker = JQ.DatePicker.extend({
  dateFormat: 'yy-mm-dd', //ISO 8601
  templateName: 'finances/_datepicker',
  onSelect: function(dateText, inst) {
    alert(dateText);
  },
  beforeShowDay: function(date) {
      if (date.getDay() % 2) {
        return [true, ""];
      } else {
        return [false,"ui-state-active"];
      }
  }
});




