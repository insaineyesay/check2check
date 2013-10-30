App.BillController = Ember.ObjectController.extend({
	actions: {
		removeBill: function() {
			var bill = this.get('model');
			bill.deleteRecord();
			bill.save();
		},
		
		editBill: function() {
			this.set('isEditing', true);
		},
		acceptChanges: function() {
			this.set('isEditing', false);

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