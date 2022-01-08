const cmds = require("../lib/commands");
const playdl = require("play-dl");
const discordVoice = require("@discordjs/voice");
let connections = {};

new cmds.Command("Play a video from YouTube", ["play", "p"], async (msg, params) => {
	if (!msg.member.voice?.channel) return msg.reply("Connect to a voice channel!");
	msg.channel.send("Connecting to voice channel");

	const connection = discordVoice.joinVoiceChannel({
		channelId: msg.member.voice.channel.id,
		guildId: msg.guild.id,
		adapterCreator: msg.guild.voiceAdapterCreator,
	});

	let ytInfo = (await playdl.search(params, { limit: 1 }))[0];
	if (!ytInfo) return msg.channel.send("Cannot find YouTube video.");

	let stream = await playdl.stream(ytInfo.url);
	msg.channel.send("Recieved stream from YouTube playdl");
	let resource = discordVoice.createAudioResource(stream.stream, {
		inputType: stream.type,
	});
	let player = discordVoice.createAudioPlayer({
		behaviors: {
			noSubscriber: discordVoice.NoSubscriberBehavior.Play,
		},
	});

	player.on("error", (v) => msg.channel.send(`Audio player debug: \`${v}\``));
	player.on("stateChange", (v) => msg.channel.send(`Audio player debug: \`${v}\``));
	connection.on("error", (v) => msg.channel.send(`Voice connection error: \`${v}\``));
	connection.on("stateChange", (v) => msg.channel.send(`Voice connection state change: \`${v}\``));

	player.play(resource);
	msg.channel.send("Playing audio resource " + ytInfo.url);

	connection.subscribe(player);
});

new cmds.Command("Returns Discord.js Voice dependency report", ["musicdebug"], (msg) => {
	msg.reply(discordVoice.generateDependencyReport());
});
