const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");
const apod_module = require("nasa-apod");
const apod = new apod_module.Client({
	apiKey: "523p5hPYHGzafYGLCkqa54kKMTV2vbP0XcPxkcLm",
	conceptTags: true
});

module.exports = {
	name: "apod",
	cooldown: 3,
	execute(message) {
		apod().then((res) => {
			message.channel.send({
				embeds: [
					new EmbedBuilder()
						.setTitle(res.title)
						.setDescription(res.explanation)
						.setImage(res.url)
						.setFooter({
							text: "NASA Astronomy Picture of the Day • " + res.date
						})
						.setAuthor({
							name: res.copyright.replaceAll("\n", "")
						})
						.setColor(0x212121)
				]
			});
		});
	}
};
