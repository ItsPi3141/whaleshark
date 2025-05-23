const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "latex",
	cooldown: 1,
	execute(message, args) {
		if (args.length === 0) {
			message.reply({
				embeds: [
					new EmbedBuilder().setDescription(
						"Renders a LaTeX expression\n```\nws latex <text>\n```",
					),
				],
			});
		} else {
			message.reply({
				embeds: args
					.join(" ")
					.split("\n")
					.map((eq) => {
						return new EmbedBuilder()
							.setDescription(
								eq
									.replaceAll("\\", "\\\\")
									.replaceAll("`", "\\`")
									.replaceAll("|", "\\|")
									.replaceAll("~", "\\`")
									.replaceAll("*", "\\*")
									.replaceAll("_", "\\_")
									.replaceAll("#", "\\#"),
							)
							.setImage(
								`https://latex.codecogs.com/gif.image?\\inline&space;\\huge&space;\\dpi{300}\\bg{white}${encodeURIComponent(eq)}`,
							)
							.setColor(0xcfd8dd);
					}),
			});
		}
	},
};
