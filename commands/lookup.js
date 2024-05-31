const fetch = require("node-fetch").default;
const { EmbedBuilder } = require("discord.js");

// https://api.duckduckgo.com/?q=dog&format=json&skip_disambig=1

const config = require("../config.json");

module.exports = {
	name: "lookup",
	cooldown: 5,
	execute(message, args) {
		message.reply(`${config.emojis.loading} Searching...`).then((reply) => {
			try {
				fetch(`https://api.duckduckgo.com/?q=${args.join(" ")}&format=json&skip_disambig=1`).then((res) => {
					res.json().then((json) => {
						if (json.AbstractText) {
							reply.edit({
								content: "",
								embeds: [
									new EmbedBuilder()
										.setTitle(`Search result for ${args.join(" ")}`)
										.setDescription(`${json.AbstractText}\n\n*Read more on [Wikipedia](${json.AbstractURL})*`),
								],
							});
						} else {
							fetch(`https://api.urbandictionary.com/v0/define?term=${args.join(" ")}`).then((ubres) => {
								ubres.json().then((ubjson) => {
									if (ubjson.list.length === 0) {
										reply.edit("❌ No results found");
									} else {
										console.log(ubjson.list[0].definition);
										reply.edit({
											content: "",
											embeds: [
												new EmbedBuilder()
													// biome-ignore lint/style/useTemplate: <explanation>
													.setTitle("Search result for " + args.join(" "))
													.setDescription(
														`### Definition\n${ubjson.list[0].definition
															.replaceAll("[", "")
															.replaceAll("]", "")}\n\n### Usage\n${ubjson.list[0].example
															.replaceAll("[", "")
															.replaceAll("]", "")}\n\n*Read more on [Urban Dictionary](${ubjson.list[0].permalink})*`
													)
													.setFooter({
														text: (ubjson.list[0].author
															? [
																	ubjson.list[0].word,
																	ubjson.list[0].author,
																	`👍 ${ubjson.list[0].thumbs_up}`,
																	`👎 ${ubjson.list[0].thumbs_down}`,
															  ]
															: [ubjson.list[0].word, `👍 ${ubjson.list[0].thumbs_up}`, `👎 ${ubjson.list[0].thumbs_down}`]
														).join(" • "),
													}),
											],
										});
									}
								});
							});
						}
					});
				});
			} catch {
				reply.edit("❌ No results found");
			}
		});
	},
};
