
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