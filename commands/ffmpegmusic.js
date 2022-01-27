const { Command } = require("../lib/commands");
const playdl = require("play-dl");
const discordVoice = require("@discordjs/voice");
const prism = require("prism-media");
const stats = require("../lib/stats");
const kache = require("kache.js");

const FFMPEG_OPUS_ARGUMENTS = [
	"-analyzeduration",
	"0",
	"-loglevel",
	"0",
	"-acodec",
	"libopus",
	"-f",
	"opus",
	"-ar",
	"48000",
	"-ac",
	"2",
];

const FFMPEG_FILTERS = [
	//`atempo=${1.06}`,
	//`asetrate=${44100 * 1.25}`,
	//`bass=g=30`,
	//`aecho=1.0:0.7:20:0.5`,
	//`volume=10`,
];
let statId = 1;

new Command("Play a YouTube video via FFmpeg", ["fp"], async (msg, params) => {
	statId++;
	const connection = discordVoice.joinVoiceChannel({
		channelId: msg.member.voice.channel.id,
		guildId: msg.guild.id,
		adapterCreator: msg.guild.voiceAdapterCreator,
	});
	stats.l(statId, "Joined VC");

	const info = await kache.a(params, playdl.video_info, params);

	stats.l(statId, "Recieved video info");
	const audioUrl = info.format[info.format.length - 1].url;
	const finalArgs = [];

	finalArgs.push("-i", audioUrl);
	finalArgs.push(...FFMPEG_OPUS_ARGUMENTS);
	//finalArgs.push("-af", FFMPEG_FILTERS.join(","));

	// console.log(finalArgs);

	stats.l(statId, "Creating FFmpeg instance");
	const ffmpeg_instance = new prism.FFmpeg({
		args: finalArgs,
	});
	stats.l(statId, "Created FFmpeg instance");

	let resource = discordVoice.createAudioResource(ffmpeg_instance, {
		inputType: discordVoice.StreamType.OggOpus,
	});
	stats.l(statId, "Created audio resource");

	msg.channel.send(`Playback duration: ${resource.playbackDuration / 1000}`);
	// console.log("Created status message");

	// setInterval(() => {
	// 	statusMsg.edit(`Playback duration: ${resource.playbackDuration / 1000}`);
	// 	console.log(`Playback duration: ${resource.playbackDuration / 1000}`);
	// }, 1000);

	let player = discordVoice.createAudioPlayer({
		behaviors: {
			noSubscriber: discordVoice.NoSubscriberBehavior.Play,
		},
	});
	stats.l(statId, "Created audio player");
	connection.subscribe(player);
	stats.l(statId, "Subscribed to audio player");

	player.play(resource);
	stats.l(statId, "Playing resource");
	msg.channel.send(
		`Playing audio resource [FFmpeg]: \`${info.video_details.title}\` with \`${FFMPEG_FILTERS.length}\` filters`
	);
});
