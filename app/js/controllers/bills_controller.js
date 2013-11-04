App.BillsController = Ember.ArrayController.extend({
	totalBills: function() {
		return this.getEach('.billItem').length;
	}.property('@each.billItem'),

	inflection: function() {
		var totalBills = this.get('totalBills');
		return totalBills === 1 ? 'bill' : 'bills';
	}.property('@each.billItem'),

	// Not working yet
	billSum: function() {
<<<<<<< HEAD
		console.log(this);
		return this.getEach('billAmount');
=======
		var bills = this.getEach('.billItem').length;
		console.log(this.getEach(''));
		this.mapBy('billAmount');
		return bills;
		//return this.getEach('.billItem').length;
>>>>>>> ff2f5821e0d40c4a25985a0e2ca34bb80135d0bc
	}.property('@each.billItem'),

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
				billAmount: amount,
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