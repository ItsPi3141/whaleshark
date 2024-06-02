const config = require("../config.json");
const encode3y3 = require("../3y3.js");

module.exports = {
	name: "chat",
	cooldown: 1,
	execute(message, args) {
		if (args.length === 0) {
			message.reply({
				embeds: [new EmbedBuilder().setDescription("Talk to WhaleShark\n```\nws chat <text>\n```")],
			});
		} else {
			message.reply(`${config.emojis.loading}⠀`).then((reply) => {
				fetch(process.env.SMYTHOS_GPT_ENDPOINT, {
					headers: {
						accept: "text/plain",
						"accept-language": "en-US,en;q=0.9",
						"content-type": "application/json",
					},
					body: JSON.stringify({
						prompt: `${message.author.tag}: ${args.join(" ")}`,
						channelId: `${message.channel.id}`,
					}),
					method: "POST",
				})
					.then((r) => r.json())
					.then((json) => {
						reply.edit(json.response + encode3y3.encode("ai"));
					});
			});
		}
	},
};
