
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