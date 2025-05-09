const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");
const { AttachmentBuilder } = require("discord.js");

module.exports = {
	name: "image",
	cooldown: 1,
	disabled: true,
	execute(message, args) {
		if (args.length === 0) {
			message.reply({
				embeds: [
					new EmbedBuilder().setDescription(
						"Create an image\n```\nws image <description>\n```",
					),
				],
			});
		} else {
			message
				.reply(
					`${config.emojis.loading} Creating image...\nThis may take a while.`,
				)
				.then((reply) => {
					fetch(process.env.SMYTHOS_DALLE_ENDPOINT, {
						headers: {
							accept: "text/plain",
							"accept-language": "en-US,en;q=0.9",
							"content-type": "application/json",
						},
						body: JSON.stringify({
							prompt: `${args.join(" ")}`,
						}),
						method: "POST",
					})
						.then((r) => r.json())
						.then(async (json) => {
							reply.edit({
								content: "",
								files: [
									new AttachmentBuilder(json.response, {
										name: "image.png",
									}),
								],
							});
						});
				});
		}
	},
};
