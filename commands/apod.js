const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");
const apod_module = require("nasa-apod");
const apod = new apod_module.Client({
	apiKey: "523p5hPYHGzafYGLCkqa54kKMTV2vbP0XcPxkcLm",
	conceptTags: true,
});

module.exports = {
	name: "apod",
	cooldown: 3,
	execute(message) {
		apod().then((res) => {
			const embed = new EmbedBuilder()
				.setTitle(res.title)
				.setDescription(res.explanation)
				.setFooter({
					text: `NASA Astronomy Picture of the Day • ${res.date}`,
				})
				.setColor(0x212121);
			let content = "";
			if (res.copyright) {
				embed.setAuthor({
					name: res.copyright?.replaceAll("\n", "") || "",
				});
			}
			if (res.media_type === "image") {
				embed.setImage(res.url);
			} else {
				if (res.url.includes("youtube")) {
					embed.setImage(`https://i.ytimg.com/vi/${res.url.split("?")[0].split("/").slice(-1)[0]}/maxresdefault.jpg`);
					embed.setURL(res.url);
				} else {
					content = res.url;
				}
			}
			message.channel.send({
				content: content,
				embeds: [embed],
			});
		});
	},
};
