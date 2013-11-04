App.BillController = Ember.ObjectController.extend({
	actions: {
		removeBill: function() {
			var bill = this.get('model');
			bill.deleteRecord();
			bill.save();
		},
		
		editBillName: function() {
			this.set('isEditingName', true);
		},
<<<<<<< HEAD

		editBillAmount: function() {
			this.set('isEditingAmount', true);
		},

		acceptChangesForBillAmount: function() {
			this.set('isEditingAmount', false);

			if(this.get('model').get('isSaving')) return;

			if (Ember.isEmpty(this.get('model.billAmount'))) {
				this.send('removeBill');
			} else {
				this.get('model').save();
			}
		},

		editBillDate: function() {
			this.set('isEditing',true);
		},

		acceptChangesForBillName: function() {
=======
		acceptChangesForName: function() {
>>>>>>> ff2f5821e0d40c4a25985a0e2ca34bb80135d0bc
			this.set('isEditingName', false);

			if(this.get('model').get('isSaving')) return;

			if (Ember.isEmpty(this.get('model.billName'))) {
				this.send('removeBill');
			} else {
				this.get('model').save();
			}
		}
	},

	isEditing: false,
});