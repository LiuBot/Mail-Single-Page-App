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