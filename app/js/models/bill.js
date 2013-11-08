<<<<<<< HEAD
App.Bill = DS.Model.extend({
	billName: DS.attr('string'),
	billAmount: DS.belongsTo('billAmount'),
	billDate: DS.attr('string')
});

App.Bill.FIXTURES = [
{
	id: 1,
	billName: 'Bill One',
	billAmount: ('id', 1),
	billDate: '11/1/13'
},
{
	id: 2,
	billName: 'Bill Two',
	billAmount: '45.00',
	billDate: '11/1/13'
},
{
	id: 3,
	billName: 'Bill Three',
	billAmount: '45.00',
	billDate: '11/1/13'
}
=======
App.Bill = DS.Model.extend({
	billName: DS.attr('string'),
	billAmount: DS.belongsTo('billAmount'),
	billDate: DS.attr('string')
});

App.Bill.FIXTURES = [
{
	id: 1,
	billName: 'Bill One',
	billAmount: '45.00',
	billDate: '11/1/13'
},
{
	id: 2,
	billName: 'Bill Two',
	billAmount: '45.00',
	billDate: '11/1/13'
},
{
	id: 3,
	billName: 'Bill Three',
	billAmount: '45.00',
	billDate: '11/1/13'
}
>>>>>>> startover
];