const { reloadUniqueId } = require("./chat.js");

module.exports = {
	name: "reloadchat",
	cooldown: 5,
	execute(message, args) {
		if (message.author.id === process.env.OWNER_ID) {
			reloadUniqueId();
			message.react("✅");
		}
	},
};
