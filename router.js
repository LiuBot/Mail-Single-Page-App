
class Router {
	constructor(node, routes){
		this.node = node;
		this.routes = routes;
	}

	start(){
		this.render(); // calling this immediately so that if someone
		// opens a link to a URL with a hash fragment, or if they refresh
		// with a hash fragment, the router will still update the DOM.
		window.addEventListener("hashchange", this.render.bind(this));
		//This will make the Router update the DOM every time the 
// hash fragment changes.
	}

	activeRoute(){
		let hash = window.location.hash.substring(1);
		let component =  this.routes[hash]; 
		return component;
	}

	render(){ // this function will update the DOM by changing the content of this.node
		this.node.innerHTML = "";
		let component = this.activeRoute(); // save in component variable

		if (component){
			//adds a node to the end of the list of children of a specified parent node. 
			this.node.appendChild(component.render());
		}
	}
}



module.exports = Router;