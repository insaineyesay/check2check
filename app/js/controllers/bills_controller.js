App.BillsController = Ember.ArrayController.extend({
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
				billName: title,
				billAmount: '$' + amount,
				billDate: date
			});

			console.log('yay2');
			// Clear the "New Bill" text field
			this.set('newTitle', '');
			this.set('newAmount', '');
			this.set('newDate', '');

			console.log('yay3');
			// Save it
			bill.save();
			console.log('yay4');
		}
	}
});