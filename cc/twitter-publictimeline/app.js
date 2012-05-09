define([
	'jquery', 'underscore', 'backbone', 
	'views/navigation', 'views/topbar', 'views/statuses', 'views/status', 'views/users-lookup', 
	'collections/statuses', 'collections/users'
	], 
	function($, _, Backbone, Navigation, 
			TopBarView, StatusesView, StatusView, UsersLookupView, 
			Statuses, Users) {

	"use strict";
	
	var App = Backbone.Router.extend({
		routes: {
			'statuses/public_timeline':		'showPublicTimeline',
			'statuses/show/:id': 			'showStatus',
			'users/lookup/:screenname':		'lookupUser',
			'search/:query': 				'search',
			'*action': 						'root',
		},
		rootview:null,
		subviews:{},
		initialize: function() {
			this.rootview = $("#app");
			
			this.topbar = new TopBarView();
			this.rootview.append(this.topbar.render().el);
			
			this.navigation = new Navigation({width:320, height:440});
			this.rootview.append(this.navigation.render().el);
			
			Backbone.history.start({});
		},
		showStatus: function(statusid) {
			this.navigation.navigate(location.hash, StatusView, {
				collection:Statuses.Status(statusid),
				width:320, height:440
			});
		},
		lookupUser: function(screenName) {
			this.navigation.navigate(location.hash, UsersLookupView, {
				collection:Users.Lookup(screenName),
				width:320, height:440
			});
		},
		showPublicTimeline: function() {
			var v = this.navigation.navigate(location.hash, StatusesView, {
				collection:Statuses.PublicTimeline(),
				width:320, height:440
			});
		},
		search: function(query) {
			var v = this.navigation.navigate(location.hash, StatusesView, {
				collection:Statuses.Search(query),
				width:320, height:440
			});
		},
		root: function() {
			// Redirect to default action
			location.hash = '#statuses/public_timeline';
		}
	});
	return App;
});
