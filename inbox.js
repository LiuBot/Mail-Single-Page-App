//We'll have separate modules (called COMPONENTS) that will be responsible 
//for returning a DOM Node to display
let Inbox = {
	render: function(){
		const ul = document.createElement('ul');
		ul.className = "messages";  // Set the class name of the container to messages using the className 
// property. This puts our CSS styles onto the node.
		ul.innerHTML = "An Inbox Message";
		return ul;
	}
}




// For now, set the innerHTML of the container to "An Inbox Message" so 
// we can test that the component works.
// Return the <ul> container.


module.exports = Inbox;