const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "help",
	execute(message) {
		message.reply({
			embeds: [
				new EmbedBuilder().setTitle("Help").addFields(
					{
						name: "General",
						value: "`ping`, `info`",
					},
					{
						name: "Fun",
						value: "`say`, `apod`, `xkcd`, `f`",
					},
					{
						name: "AI",
						value: "`chat`, `image`",
					},
					{
						name: "Utility",
						value: "`lookup`, `latex`, `escape`",
					}
				),
			],
		});
	},
};
