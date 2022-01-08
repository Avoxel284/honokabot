// Avoxel284

require("dotenv").config();

const discord = require("discord.js");
const discordVoice = require("@discordjs/voice");
const playdl = require("play-dl");
const cmds = require("./lib/commands");

require("./commands/honoka");
require("./commands/music");

const _prefix = "=";

const client = new discord.Client({
	intents: [
		discord.Intents.FLAGS.GUILDS,
		discord.Intents.FLAGS.GUILD_MESSAGES,
		discord.Intents.FLAGS.GUILD_VOICE_STATES,
	],
	partials: ["CHANNEL", "MESSAGE"],
});

client.login(process.env.DISCORD_TOKEN);

client.on("ready", () => {
	console.log(`Client logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
	if (!msg.content.startsWith(_prefix)) return;

	const splitmsg = msg.content.split(" ");
	const command = splitmsg[0].split(_prefix)[1];
	const params = msg.content.split(/(?<=^\S+)\s/)[1];

	console.log(`#${msg.channel.name} / ${msg.content}`);

	if (cmds.commands[command]) cmds.commands[command].callback(msg, params);
});
