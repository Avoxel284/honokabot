const { Command } = require("../lib/commands");
const playdl = require("play-dl");
const discordVoice = require("@discordjs/voice");

new Command("Play a video from YouTube", ["play", "p"], async (msg, params) => {
	if (!msg.member.voice?.channel) return msg.reply("Connect to a voice channel!");
	msg.channel.send("Connecting to voice channel");

	const connection = discordVoice.joinVoiceChannel({
		channelId: msg.member.voice.channel.id,
		guildId: msg.guild.id,
		adapterCreator: msg.guild.voiceAdapterCreator,
	});
	console.log("Joined VC");

	let ytInfo = (await playdl.search(params, { limit: 1 }))[0];
	if (!ytInfo) return msg.channel.send("Cannot find YouTube video.");
	console.log("Recieved YouTube video info");

	let stream = await playdl.stream(ytInfo.url);
	console.log(stream);
	console.log("Recieved stream");
	let resource = discordVoice.createAudioResource(stream.stream, {
		inputType: stream.type,
	});
	console.log("Created audio resource");
	let player = discordVoice.createAudioPlayer({
		behaviors: {
			noSubscriber: discordVoice.NoSubscriberBehavior.Play,
		},
	});
	console.log("Created audio player");

	player.play(resource);
	console.log("Playing resource");
	msg.channel.send("Playing audio resource " + ytInfo.url);

	connection.subscribe(player);
	console.log("Subscribed to audio player");
});

new Command("Returns Discord.js Voice dependency report", ["musicdebug"], (msg) => {
	msg.reply(discordVoice.generateDependencyReport());
});

new Command("Destroy voice connection", ["dc", "leave"], (msg) => {
	const connection = discordVoice.getVoiceConnection(msg.guild.id);
	if (connection) {
		msg.reply("Destroying voice connection");
		discordVoice.getVoiceConnection(msg.guild.id).destroy();
	} else {
		msg.reply("Failed to destroy voice connection");
	}
});

new Command("Join voice channel", ["join"], (msg) => {
	const connection = discordVoice.joinVoiceChannel({
		channelId: msg.member.voice.channel.id,
		guildId: msg.guild.id,
		adapterCreator: msg.guild.voiceAdapterCreator,
	});
});

new Command("Apply bass boost filter", ["bb"], (msg) => {
	const connection = discordVoice.getVoiceConnection(msg.guild.id);
});
