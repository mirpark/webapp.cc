define(['jquery', 'backbone'], function($, Backbone) {
	
	"use strict";
	
	var Navigation = Backbone.View.extend({
		initialize: function() {
		},
		subviews:[],
		navigate: function(hash, view, options) {
			var cached = false,
				max = this.subviews.length - 1;
			
			if (this.subviews.length > 1) {
				for (var i = max; i >= 0; --i) {
					if (this.subviews[i].hash == hash) {
						var nav = this,
							width = (this.options.width * (max - i)),
							removeViews = nav.subviews.splice(i + 1, max);
						
						cached = true;
						this.superview.animate({left:this.superview.offset().left + width}, 300, 'linear', function() {
							nav.superview.css('width', nav.superview.width() - width);
							$.each(removeViews, function(i, v) {
								var view = removeViews[i];
								$(view.el).hide();
							});
							removeViews = [];
						});
						break;
					}
				}
			}

			if (!cached)
				this.push(hash, view, options);
			
		},
		push: function(hash, type, options) {
			var view = new type(options);
				view.hash = hash;
				view.render();
			
			this.subviews.push(view);
			this.superview.css('width', this.options.width * this.subviews.length);
			this.superview.append(view.el);
			$(view.el).css('left', this.options.width * (this.subviews.length - 1))
					.css('position', 'absolute')
					.css('z-index', 100);
			if (this.subviews.length > 1) {
				this.superview.animate({left:this.superview.offset().left - this.options.width}, 300);
			}
		},
		render: function() {
			$(this.el).css('overflow', 'hidden');
			$(this.el).append('<div class="view navigation"></div>');
			this.superview = $(this.el).find('.navigation')
							.css('position', 'relative')
							.css('width', this.options.width)
							.css('height', this.options.height);
			return this;
		}
	});

	return Navigation;
});
