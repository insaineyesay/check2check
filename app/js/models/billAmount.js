<<<<<<< HEAD
App.BillAmount = DS.Model.extend({
	bill: DS.belongsTo('bill'),
	billAmount: DS.attr('string')
});

App.BillAmount.FIXTURES = [
{
	id: 1,
	billAmount: '45.00'
}
];
=======
App.BillAmount = DS.Model.extend({
	billAmount: DS.attr('string')
});
>>>>>>> startover
