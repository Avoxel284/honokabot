const commandsList = require(__dirname + "/index").commands;

exports.Command = class {
	/**
	 * Creates a new command.
	 *
	 * @param {String} name Name of the command
	 * @param {Function} callback Callback function when the command is used
	 * @param {Sring} information Additional information about the command
	 */
	constructor(name, information, callback) {
		if (!name) throw Error("Name must be string");
		if (!callback) throw Error("callback must be function");

		this.name = name;
		this.information = information;
		this.callback = callback;

		commandsList[name] = this;
	}
};
