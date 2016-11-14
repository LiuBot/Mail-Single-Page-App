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

	let routes = {
		inbox: Inbox
	};

	document.addEventListener("DOMContentLoaded", () => {
		let content = document.querySelector(".content");
		router = new Router(content, routes);
		router.start();

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

	// Create a local variable in this file called messages. This variable 
	// will store all of the e-mail messages for our application. Instead of 
	// directly exporting messages itself, we are going to export a separate 
	// MessageStore object that closes around messages. This way, code in 
	// other modules will not be able to directly change messages; instead, 
	// they will have to go through MessageStore, which will act as our API 
	// for accessing messages.

	// Format the messages so they have the following properties: to, from, 
	// subject, and body

	let messages = { 
		sent:[ // these two properties will store na array of message for
		// their particular folder
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
		getInboxMessages: ()=>{
			return messages.inbox;
			},
		getSentMessages: ()=>{
			messages.sent;
			}
	}

	module.exports = MessageStore;

/***/ }
/******/ ]);