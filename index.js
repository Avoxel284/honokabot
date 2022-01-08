// Avoxel284

const discord = require("discord.js");
const discordVoice = require("@discordjs/voice");
const playdl = require("play-dl");
const { Command } = require("./lib/classes");

const _prefix = "=";

const client = new discord.Client({
	intents: [
		discord.Intents.FLAGS.GUILDS,
		discord.Intents.FLAGS.GUILD_MESSAGES,
		discord.Intents.FLAGS.GUILD_VOICE_STATES,
	],
	partials: ["CHANNEL", "MESSAGE"],
});

exports.commands = {};

client.on("messageCreate", async (msg) => {
	let params = msg.content.split(/(?<=^\S+)\s/)[1];

	if (msg.content.toLowerCase() == _prefix + "play") {
	}
});
