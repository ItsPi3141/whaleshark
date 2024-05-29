const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");
const xkcd = require("xkcd-api");

module.exports = {
	name: "xkcd",
	cooldown: 3,
	execute(message) {
		xkcd.random((err, res) => {
			if (err) return message.reply("Error fetching xkcd comic.");
			message.channel.send({
				embeds: [
					new EmbedBuilder()
						.setTitle(res.safe_title)
						.setDescription(res.alt)
						.setImage(res.img)
						.setFooter({
							text: "xkcd • Comic #" + res.num + " • " + [res.month, res.day, res.year].join("/")
						})
						.setColor(0xecf0f1)
				]
			});
		});
	}
};
