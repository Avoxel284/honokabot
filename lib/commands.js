/**
 * Exposes commands list
 */
exports.commands = {};

exports.Command = class {
	/**
	 * Creates a new command.
	 *
	 * @param {String} name Name of the command
	 * @param {Array} commands Commands that trigger callback
	 * @param {Function} callback Callback function when the command is used
	 *
	 * @example
	 * ```
	 * let cmd = new Command("Command Name", ["trigger1, trig2"], (message, parameters) => {})
	 * ```
	 */
	constructor(name, commands, callback) {
		if (!name) throw Error("Name must be string");
		if (!commands) throw Error("Commands must be array");
		if (!callback) throw Error("callback must be function");

		this.name = name;
		this.commands = commands;
		this.callback = callback;

		commands.forEach((e) => {
			exports.commands[e] = this;
		});
	}
};
