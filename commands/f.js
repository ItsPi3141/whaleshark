const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");
const apod_module = require("nasa-apod");
const apod = new apod_module.Client({
	apiKey: "523p5hPYHGzafYGLCkqa54kKMTV2vbP0XcPxkcLm",
	conceptTags: true,
});

module.exports = {
	name: "f",
	cooldown: 1,
	execute(message) {
		message.channel.send("🇫").then((newmsg) => {
			setTimeout(() => {
				newmsg
					.edit(`**${message.author.tag}** has paid their respects`)
					.then((res) => {
						res.react("🇫");
					});
			}, 1000);
		});
	},
};
