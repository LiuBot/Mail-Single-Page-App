/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Router = __webpack_require__(1);
	const Inbox = __webpack_require__(2);
	const Sent = __webpack_require__(4);
	const Compose = __webpack_require__(5);

	let routes = {
		inbox: Inbox,
		sent: Sent,
		compose: Compose
	};

	document.addEventListener("DOMContentLoaded", () => {
		let content = document.querySelector(".content");
		router = new Router(content, routes);
		router.start();
		location.hash = "#inbox"; // 

		let sidebarItems = Array.from(document.querySelectorAll(".sidebar-nav li"));
		sidebarItems.forEach(sidebarItem => {
			sidebarItem.addEventListener("click", () => {
				//innerText sets or gets the text between the start and end tags of the object
				let itemText = sidebarItem.innerText.toLowerCase();
				location.hash = itemText;
			})
		})
	})





/***/ },
/* 1 */
/***/ function(module, exports) {

	
	class Router {
		constructor(node, routes){
			this.node = node;
			this.routes = routes;
		}

		start(){
			this.render(); // calling this immediately so that if someone
			// opens a link to a URL with a hash fragment, or if they refresh
			// with a hash fragment, the router will still update the DOM.
			window.addEventListener("hashchange", this.render.bind(this))
		}

		activeRoute(){ // should now return the COMPONENT that matches the current route
			// instead of just the name of the route 
			let hashFrag = window.location.hash.substring(1);
			return this.routes[hashFrag];
		}

		render(){ // this function will update the DOM by changing the content of this.node
			this.node.innerHTML = ""; // clear this.node in both cases 
			let component = this.activeRoute(); // save in component variable

			if (component){
				this.node.appendChild(component.render());
			}
		}

	}



	module.exports = Router;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);


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

/***/ },
/* 3 */
/***/ function(module, exports) {

	
	const user = "sliu3@wellesley.edu";

	class Message{
	constructor (from = user, to= "", subject="", body="") {
		this.from = from;
		this.to = to;
		this.subject = subject;
		this.body = body;
		}
	}

	let messageDraft = new Message();

	let messages = { 
		sent:[
		{to: "connorlmurphy@gmail.com", 
		subject: "Where u at?", 
		body: "Miss you"},
		{to: "temmiechang@gmail.com", 
		subject: "zzzz", 
		body: "hoi1!!!"}
		],
		inbox: [
		{from: "connorlmurphy@gmail.com", 
		subject: "Tickets for hamilton!", 
		body: "Can you buy them from me pretty plzzzzzz"},
		{from: "temmiechang@gmail.com", 
		subject: "Hoiii!?!?!", 
		body: "hoOOOoOoooi!!!!"}
		]
	};

	let MessageStore = {
		getInboxMessages: function(){
			return messages.inbox;
			},
		getSentMessages: function(){
			return messages.sent;
			},
		updateDraftField: function(field, value){
			messageDraft[field] = value;
		},
		getMessageDraft(){
			return messageDraft;
		},
		sendDraft: function(){
			messages.sent.push(messageDraft);
			messageDraft = new Message();
		}
	}

	module.exports = MessageStore;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// The Sent component should be almost identical to the Inbox component. 
	// It should look exactly the same, but make the following changes:

	// render
	// Retrieve the sent messages instead of the inbox by calling 
	// MessageStore.getSentMessages.

	// renderMessage
	// Replace <span class="from">${message.from}</span> with <span 
	// class="to">To: ${message.to}</span>, so we display the recipient 
	// instead of the sender in the sent folder.

	const MessageStore = __webpack_require__(3);


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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	let Compose = {
		renderForm: function(){
			let currDraft = MessageStore.getMessageDraft();

			let formString = 
			`<p class="new-message=header">New Message</p>
				<form class="compose-form">
				<input type="text" placeholder="Recipient" name="to" value="${currDraft.to}">		

					<input type="text" placeholder="Subject" name="subject" value="${currDraft.subject}">

				<textarea name="body" rows=20>${currDraft.body}</textarea>

				<button 
					type="submit" 
					class="btn btn-primary submit-message">Send</button>								
				</form>
				`;
			return formString;
		},
			render: function() {
			let div = document.createElement('div');
			div.className = "new-message";
			div.innerHTML = this.renderForm();

			div.addEventListener("change", (event) => {
				let target = event.target; // this is the el that fired event
				let fieldName = target.name;
				let fieldValue = target.value;
				MessageStore.updateDraftField(fieldName, fieldValue);
			});

			div.addEventListener("submit", (event) =>{
				event.preventDefault();

				MessageStore.sendDraft();
				window.location.hash = 'inbox'; // so you return to #inbox once you've submitted
			})
			return div;
		}
	};


	module.exports = Compose; 

/***/ }
/******/ ]);