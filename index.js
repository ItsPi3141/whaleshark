require("./server.js");
const fs = require("node:fs");
const path = require("node:path");
const encode3y3 = require("./3y3.js");
const {
	Client,
	GatewayIntentBits,
	ActivityType,
	MessageMentions,
	Collection,
} = require("discord.js");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

const chatCommand = require("./commands/chat.js");

// UTIL FUNCTIONS
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// LOAD COMMANDS
client.commands = new Collection();
const commandFiles = fs
	.readdirSync(path.join(__dirname, "commands"))
	.filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	if (command.disabled) continue;
	client.commands.set(command.name, command);
}

const cooldowns = new Collection();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
	if (!message.guild) return;
	if (message.author.bot) return;

	if (message.reference) {
		const repliedTo = await message.channel.messages.fetch(
			message.reference.messageId,
		);
		if (repliedTo.content.endsWith(encode3y3.encode("ai"))) {
			return chatCommand.execute(message, message.content.split(" "));
		}
	}

	const prefixRegex = new RegExp(
		`^(<@!?${client.user.id}>|${escapeRegex("ws")})\\s*`,
		"i",
	);
	if (!prefixRegex.test(message.content)) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);

	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command =
		client.commands.get(commandName) ||
		client.commands.find((cmd) => cmd.aliases?.includes(commandName));
	if (!command) return;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 1) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.react("🐢");
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
	}
});

client.login(process.env.TOKEN);

// dont crash
process.on("unhandledRejection", (...args) => {
	console.error(...args);
});
process.on("uncaughtException", (...args) => {
	console.error(...args);
});
process.on("uncaughtExceptionMonitor", (...args) => {
	console.error(...args);
});
process.on("multipleResolves", (...args) => {
	console.error(...args);
});
