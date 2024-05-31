const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
	name: "info",
	cooldown: 2,
	execute(message) {
		message.channel.send({
			embeds: [
				new EmbedBuilder().setDescription(
					"Hey! I'm [WhaleShark](https://discord.com/api/oauth2/authorize?client_id=1152635836484038826&permissions=274878285888&scope=bot), a lightweight bot with custom features.\n\n" +
						"The original WhaleShark bot by `Guardian#0004` was discontinued, so my goal is to recreate the functionality of the original bot."
				),
			],
		});
		message.channel.send(config.emojis.whaleshark + config.emojis.says);
	},
};
