const config = require("../config.json");

module.exports = {
	name: "ping",
	cooldown: 1,
	execute(message) {
		const placeholders = [
			"Where do you get off?",
			"Forsake everything.",
			"There is nothing out there.",
			"Existence is a lie.",
			"Your existence is pitiful.",
			"Truth is false.",
			"You are all alone in an infinite void.",
			"Nothing matters.",
			"You're going to die some day, perhaps soon.",
			"Existence is a lie.",
			"We are all already dead.",
		];
		message
			.reply(
				`${config.emojis.loading} ${placeholders[Math.floor(Math.random() * placeholders.length)]}`,
			)
			.then((res) => {
				const roundtrip = Math.round(
					res.createdTimestamp - message.createdTimestamp,
				);
				let ping = Math.round(message.client.ws.ping);
				if (ping === -1) {
					ping = "unknown ";
				}
				res.edit(
					`ws latency: \`${ping}ms\` | round trip: \`${roundtrip}ms\` | Pong`,
				);
			});
	},
};
