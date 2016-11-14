const MessageStore = require("./message_store");


//We'll have separate modules (called COMPONENTS) that will be responsible 
//for returning a DOM Node to display
let Inbox = {
	renderMessage(message){
		let li = document.createElement('li');
		li.className = "message";
		li.innerHTML = `<span class="from">${message.from}</span>
										<span class="subject">${message.subject}</span>
										<span class="body">${message.body}</span>`
		return li;
	},
	render: function(){
		let ul = document.createElement('ul');
		ul.className = "messages";  // Set the class name of the container to messages using the className 
		let inboxMessages = MessageStore.getInboxMessages();

		inboxMessages.forEach(message => {
	// property. This puts our CSS styles onto the node.
			ul.appendChild(this.renderMessage(message));
		});
		return ul;
	}
};




// For now, set the innerHTML of the container to "An Inbox Message" so 
// we can test that the component works.
// Return the <ul> container.


module.exports = Inbox;