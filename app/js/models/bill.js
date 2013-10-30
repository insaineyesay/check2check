App.Bill = DS.Model.extend({
	billName: DS.attr('string'),
	billAmount: DS.attr('string'),
	billDate: DS.attr('string')
});

App.Bill.FIXTURES = [
{
	id: 1,
	billName: 'Bill One',
	billAmount: '45.00',
	billDate: 'fdas'
},
{
	id: 2,
	billName: 'Bill Two',
	billAmount: '45.00',
	billDate: 'fdas'
},
{
	id: 3,
	billName: 'Bill Three',
	billAmount: '45.00',
	billDate: 'fdas'
}
];