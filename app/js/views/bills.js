billsView = Ember.CollectionView.create({
	classNames: ['billItem'],
	content: ['billName','billAmount','billDate'],
	itemViewClass: Ember.View.extend({
		template: Ember.Handlebars.compile("{{view.content}}")
		})
	});

billsView.appendTo('body');