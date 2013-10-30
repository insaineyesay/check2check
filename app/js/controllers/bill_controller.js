App.BillController = Ember.ObjectController.extend({
	actions: {
		editBill: function() {
			this.set('isEditing', true);
		},
		acceptChanges: function() {
			this.set('isEditing', false);

			if (Ember.isEmpty(this.get('model.billName'))) {
				this.send('removeBill');
			} else {
				this.get('model').save();
			}
		}
	},

	isEditing: false,
});