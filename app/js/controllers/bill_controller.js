<<<<<<< HEAD
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

		acceptChangesForBillName: function() {
			this.set('isEditingName', false);

			if(this.get('model').get('isSaving')) return;

			if (Ember.isEmpty(this.get('model.billName'))) {
				this.send('removeBill');
			} else {
				this.get('model').save();
			}
		},

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
		}

		
	},

	isEditing: false,
=======
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
>>>>>>> startover
});