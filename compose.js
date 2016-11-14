const MessageStore = require("./message_store");

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