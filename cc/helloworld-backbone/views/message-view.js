(function(window, undefined) {
 	window.Views.MessageView = Backbone.View.extend({
		initialize: function() {
			this.messages = new Collections.Message;
			this.render();
		},
		template: "<div id='message-view'></div>",
		render: function() {
			$(this.el).html(this.template);

			this.messageToolbarView = new Views.MessageToolbar({
				id:"message-toolbar",
				delegate:this
			});
			this.$("#message-view").append(this.messageToolbarView.render().el);
				
			this.messageListView = new Views.MessageList({
				id:"message-list",
				delegate:this
			});
			this.$("#message-view").append(this.messageListView.render().el);	
			
			// Binding keypress event with textfield.
			this.bind("message:add", this.addMessage);
			this.bind("message:delete", this.deleteMessage);

			// Add dummy items						
			this.addMessage({message:"Hello"});
			this.addMessage({message:"안녕"});
			this.addMessage({message:"Hi"});
		},
		addMessage: function(args) {
			// Create, add, save the model
			var m = this.messages.create({ message:args.message });
			this.messages.add(m);
			m.save();
			
			// Using cid of the model, on mockup (Using no storage), we can't 
			// get any id of the model.
			this.messageListView.add(m.cid, args.message);
		},
		deleteMessage: function(args) {
			var m = this.messages.getByCid(args.cid);
			this.messages.remove(m);
			this.messageListView.remove(m.cid);
		}
	});
})(window);