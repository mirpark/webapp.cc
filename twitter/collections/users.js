define( ['jquery', 'backbone', 'models/user'], function($, Backbone, User) {

	"use strict";

	// using JSONP to workaround same-origin-policy
	var Users = {
		Lookup: function(screenName) {
			return new (Backbone.Collection.extend({
				url:'https://api.twitter.com/1/users/lookup.json?screen_name=' + screenName + '&include_entities=true&callback=?',
				model:User
			}));
		}
	};
	
	return Users;
})
