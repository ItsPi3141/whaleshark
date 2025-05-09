const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
	name: "say",
	cooldown: 3,
	execute(message, args) {
		message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setDescription(args.join(" "))
					.setThumbnail(
						args.join(" ").length < 24
							? "https://cdn.discordapp.com/attachments/1152644249997824053/1153048338187419820/placeholder.png"
							: null,
					),
			],
		});
		message.channel.send(config.emojis.whaleshark + config.emojis.says);
	},
};
