(function(window, undefined) {
 	window.Views.MessageList = Backbone.View.extend({
		initialize: function() {
		},
		events: {
			"mouseenter li" : "showItems",
			"mouseleave li" : "hideItems",
			"click .button.delete.hidden" : "deleteButtonDidClick",
	    },
		template: {
			item:"<li id=<%= cid %>><div><%= message %> World</div>"
				+ "<input type='button' value='DEL' cid='<%= cid %>' class='button delete hidden'></li>",
		},	
		render: function() {
			$(this.el).html("<ul></ul>");
			this.list = $(this.el).children();
			return this;
		},
		add: function(cid, message) {
			$(this.list).append(_.template(this.template.item, { cid:cid, message:message }));
		},
		remove: function(cid) {
			$(this.list).find("#" + cid).remove();
		},
		deleteButtonDidClick: function(e) {
			if (this.options.delegate) {
				this.options.delegate.trigger("message:delete", { cid:$(e.target).attr("cid") });
			}
		},
		showItems: function(e) {
			$(e.currentTarget).find(".button.delete.hidden").css("display", "block");
		},
		hideItems: function(e) {
			$(e.currentTarget).find(".button.delete.hidden").css("display", "none");
		},
	});
})(window);