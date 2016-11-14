// The Sent component should be almost identical to the Inbox component. 
// It should look exactly the same, but make the following changes:

// render
// Retrieve the sent messages instead of the inbox by calling 
// MessageStore.getSentMessages.

// renderMessage
// Replace <span class="from">${message.from}</span> with <span 
// class="to">To: ${message.to}</span>, so we display the recipient 
// instead of the sender in the sent folder.

const MessageStore = require("./message_store");


//We'll have separate modules (called COMPONENTS) that will be responsible 
//for returning a DOM Node to display
let Sent = {
	renderMessage(message){
		let li = document.createElement('li');
		li.className = "message";
		li.innerHTML = `<span class="to">To: ${message.to}</span>
										<span class="subject">${message.subject}</span>
										<span class="body">${message.body}</span>`
		return li;
	},
	render: function(){
		let ul = document.createElement('ul');
		ul.className = "messages";  // Set the class name of the container to messages using the className 
		let sentMessages = MessageStore.getSentMessages();

		sentMessages.forEach(sentMsg => {
	// property. This puts our CSS styles onto the node.
			ul.appendChild(this.renderMessage(sentMsg));
		});
		return ul;
	}
};




// For now, set the innerHTML of the container to "An Inbox Message" so 
// we can test that the component works.
// Return the <ul> container.


module.exports = Sent;