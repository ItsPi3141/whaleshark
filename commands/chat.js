const config = require("../config.json");
const encode3y3 = require("../3y3.js");
const { GoogleGenAI } = require("@google/genai");

const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT.replaceAll(
	"\\n",
	"\n",
).replaceAll('\\"', '"');

let uniqueId = Date.now();
/** @type {Record<string, import("@google/genai").Content[]>} */
let conversations = {};

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
});

module.exports = {
	name: "chat",
	cooldown: 1,
	async execute(message, args) {
		if (args.length === 0) {
			message.reply({
				embeds: [
					new EmbedBuilder().setDescription(
						"Talk to WhaleShark\n```\nws chat <text>\n```",
					),
				],
			});
		} else {
			const reply = await message.reply(`${config.emojis.loading}⠀`);
			try {
				const cId = `${message.channel.id}-${uniqueId}`;
				if (!conversations[cId]) {
					conversations[cId] = [];
					conversations[cId].push({
						role: "user",
						parts: [
							{
								text: SYSTEM_PROMPT,
							},
						],
					});
				}
				conversations[cId].push({
					role: "user",
					parts: [
						{
							text: `${message.author.username}: ${args.join(" ")}`,
						},
					],
				});
				const { text } = await ai.models.generateContent({
					model: "gemma-3-27b-it",
					contents: conversations[cId],
				});
				let response = text;
				for (const r of ["<start_of_turn>", "<end_of_turn>"]) {
					response = response.replaceAll(r, "");
				}
				response = response.trim();
				conversations[cId].push({
					role: "model",
					parts: [
						{
							text: response,
						},
					],
				});

				if (conversations[cId].length > 100) {
					conversations[cId] = conversations[cId].slice(-100);
				}

				await reply.edit(response + encode3y3.encode("ai"));
			} catch (e) {
				console.error(e);
				try {
					await reply.edit("❌ Something went wrong.");
				} catch {
					await message.reply("❌ Something went wrong.");
				}
			}
		}
	},
	reloadUniqueId: () => {
		uniqueId = Date.now();
		conversations = {};
	},
};
