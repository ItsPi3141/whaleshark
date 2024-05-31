const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "escape",
	cooldown: 1,
	execute(message, args) {
		if (args.length == 0) {
			message.reply({
				embeds: [new EmbedBuilder().setDescription("Returns the text after escaping special characters with a backslash\n```\nws escape <text>\n```")],
			});
		} else {
			message.reply({
				embeds: [
					new EmbedBuilder().addFields(
						{
							name: "Escaped text",
							value: args
								.join(" ")
								.replaceAll("\\", "\\\\")
								.replaceAll("`", "\\`")
								.replaceAll("|", "\\|")
								.replaceAll("~", "\\~")
								.replaceAll("*", "\\*")
								.replaceAll("_", "\\_")
								.replaceAll("#", "\\#"),
						},
						{
							name: "Rendered",
							value: args.join(" "),
						}
					),
				],
			});
		}
	},
};
