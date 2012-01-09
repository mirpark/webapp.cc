define(['jquery', 'backbone', 'underscore', 'models/status'], function($, Backbone, _, Status) {
	"use strict";
	
	// using JSONP to workaround same-origin-policy
	var Statuses = {
		PublicTimeline: function() {
			return new (Backbone.Collection.extend({
				parse: function(res) {
					if (res["error"]) {
						alert(res["error"]);
						return null;
					}
					
					var parsedResults = [];
					for (var i = 0, len = res.length; i < len; ++i) {
						var result = {
							profile_image_url: res[i].user.profile_image_url,
							screen_name: res[i].user.screen_name,
							name: res[i].user.name,
							text: res[i].text,
							created_at: res[i].created_at,
							source: res[i].source,
							id: res[i].id
						}
						parsedResults.push(result);
					}
    				return parsedResults;
  				},
				url: 'https://api.twitter.com/1/statuses/public_timeline.json?count=3&include_entities=true&callback=?',
				model: Status,
			}));
		},
		Status: function(statusid) {
			return new (Backbone.Collection.extend({
				url:'https://api.twitter.com/1/statuses/show.json?id=' + statusid + '&include_entities=true&callback=?',
				model: Status
			}));
		},
		Search: function(query) {
			return new (Backbone.Collection.extend({
				parse: function(res) {
					if (res["error"]) {
						alert(res["error"]);
						return null;
					}
					
					var res = res.results;
					var parsedResults = [];
					for (var i = 0, len = res.length; i < len; ++i) {
						var result = {
							profile_image_url: res[i].profile_image_url,
							screen_name: res[i].from_user,
							name: res[i].from_user_name,
							text: res[i].text,
							created_at: res[i].created_at,
							source: res[i].source,
							id: res[i].id
						}
						parsedResults.push(result);
					}
    				return parsedResults;
  				},
				url: 'http://search.twitter.com/search.json?q=' + query + '&rpp=5&include_entities=true&result_type=mixed&callback=?',
				model: Status,
			}));
		}
	}
	
	return Statuses;
})
