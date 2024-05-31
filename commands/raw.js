const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "raw",
	cooldown: 1,
	execute(message, args) {
		message.reply("⚠️ This command is not finished yet!");
	},
};
