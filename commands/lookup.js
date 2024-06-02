const { EmbedBuilder } = require("discord.js");

// https://api.duckduckgo.com/?q=dog&format=json&skip_disambig=1

const config = require("../config.json");

module.exports = {
	name: "lookup",
	cooldown: 5,
	execute(message, args) {
		if (args.length === 0) {
			message.reply({
				embeds: [new EmbedBuilder().setDescription("Search something up on the internet\n```\nws lookup <query>\n```")],
			});
		} else {
			message.reply(`${config.emojis.loading} Searching...`).then((reply) => {
				try {
					fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(args.join(" "))}&format=json&skip_disambig=1`).then((res) => {
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
								fetch(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(args.join(" "))}`).then((ubres) => {
									ubres.json().then((ubjson) => {
										if (ubjson.list.length === 0) {
											reply.edit("❌ No results found");
										} else {
											reply.edit({
												content: "",
												embeds: [
													new EmbedBuilder()
														.setTitle(`Search result for ${args.join(" ")}`)
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
		}
	},
};
