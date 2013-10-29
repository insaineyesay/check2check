App.BillsController = Ember.ArrayController.extend({
	actions: {
		createBillItem: function() {

		// Get the Bill title set by the new 'New Bill' text field
			var title = this.get('newTitle');
			if (!title.trim()) { return; }
			console.log('yay1');

			// Create the New Bill Model
			var bill = this.store.createRecord('bill', {
				billName: title,
				billAmount: '$35.00',
				billDate: '11/13/13'
			});

			console.log('yay2');
			// Clear the "New Bill" text field
			this.set('newTitle', '');
			console.log('yay3');
			// Save it
			bill.save();
			console.log('yay4');
		},

		/*createAmount: function() {
			// Get the Bill title set by the new 'New Bill' text field
			var amount = this.get('newAmount');
	
			if (!amount.trim()) {return;}

			// Create the New Bill Model
			bill.set('amount', amount);
			

			// Clear the "New Bill" text field
			this.set('newAmount', '');

			// Save i
			bill.save();
		},

		createDate: function() {
			// Get the Bill title set by the new 'New Bill' text field
			var date = this.get('newAmount');
	

			if (!date.trim()) {return;}

			// Create the New Bill Model
			var bill = this.store.createRecord('bill', {
				billDate: date,
			});

			// Clear the "New Bill" text field

			this.set('newDate', '');

			// Save it
			date.save();
		}*/
	}
});