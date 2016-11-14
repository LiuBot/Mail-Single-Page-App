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
/***/ function(module, exports) {

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

/***/ }
/******/ ]);