App.BillController = Ember.ObjectController.extend({
	actions:{
		editBill: function() {
			this.set('isEditing', true);
		},

		editBillAmount: function() {
			this.set('isEditing', true);
		},

		editBillDate: function() {
			this.set('isEditing', true);
		}
	},

	isEditing: false,
});