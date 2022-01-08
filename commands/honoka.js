const cmds = require("../lib/commands");
const util = require("../lib/util");

new cmds.Command(
	"Send help information (this)",
	["help", "cmds", "honoka"],
	async (msg, params) => {
		msg.reply(
			`Avoxel284 testing bot. Latency: \`${
				Date.now() - msg.createdTimestamp
			}ms\`\n**Installed commands:**\n` +
				util
					.undupeArray(
						Object.entries(cmds.commands).map((v) => `\`${v[1].commands[0]}\` ${v[1].name}`)
					)
					.join("\n")
		);
	}
);
