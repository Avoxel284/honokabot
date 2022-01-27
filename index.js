// Avoxel284

require("dotenv").config();

const discord = require("discord.js");
const cmds = require("./lib/commands");
const fs = require("fs");
const path = require("path");

fs.readdir(path.join(process.cwd(), "commands"), (err, files) => {
	if (err) return console.warn(err);

	files.forEach((file) => {
		require(path.join(process.cwd(), "commands", file));
	});
});

const _prefix = "~";

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
	console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
	if (!msg.content.startsWith(_prefix)) return;

	const splitmsg = msg.content.split(" ");
	const command = splitmsg[0].split(_prefix)[1];
	const params = msg.content.split(/(?<=^\S+)\s/)[1];

	console.log(`#${msg.channel.name} / ${msg.content}`);

	if (cmds.commands[command]) cmds.commands[command].callback(msg, params);
});
