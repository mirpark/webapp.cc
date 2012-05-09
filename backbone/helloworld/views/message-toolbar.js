(function(window, undefined) {
	window.Views.MessageToolbar = Backbone.View.extend({
		initialize: function() {
		},
		events: {
			"keypress .textfield" : "textfieldDidKeypress",
	    },
		template: {
			tools:"<h1><input type='text' class='textfield' placeholder='Hello' />"
				+ "<span class='space-5px'></span>"
				+ "World</h1>"
		},
		render: function() {
			$(this.el).html(_.template(this.template.tools));
			this.textfield = this.$(".textfield");			
			return this;
		},
		textfieldDidKeypress:function(e) {
			if (e.charCode == 13) {
				// Pass through keypress event to delegate when user press enter key.
				if (this.options.delegate) {
					this.options.delegate.trigger("message:add"
											, {view:this, message:this.textfield.val()});
				}
				this.textfield.val(null);
				this.textfield.blur();
			}
		}
	});
})(window);