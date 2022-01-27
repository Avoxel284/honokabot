const os = require("os");
const processStartTime = new Date();

const _refreshRate = 500; // Milliseconds
const _enabled = false;
const _statLoggingIncrease = true;

function stats() {
	mem = process.memoryUsage();
	console.log(
		[
			`Running ${process.version}`,
			`Memory usage: ${formatBytes(mem.heapUsed)}/${formatBytes(mem.heapTotal)}`,
		].join(" | ")
	);

	setTimeout(stats, _refreshRate);
}

if (_enabled) stats();

exports.statloggers = {};

/**
 * Logs a message with time since group was made.
 *
 * e.g. `[4.3ms] LOG FROM GROUP <id> :: <message>`
 *
 * @example
 * ```
 * l(1, "Started function");
 * // [0ms] LOG FROM GROUP 1 :: Starting function
 * foo(); // A function that takes 4 milliseconds
 * l(1, "Finished function");
 * // [0.4ms] LOG FROM GROUP 1 :: Finished function
 * ```
 *
 * @param {Number=} id ID used to group loggers together
 * @param {String=} msg Additional message
 */
exports.l = function (id, msg) {
	if (isNaN(id)) {
		msg = id;
		id = 0;
	}
	if (!exports.statloggers[id]) exports.statloggers[id] = new Date();

	console.log(
		`[${_statLoggingIncrease ? "+" : ""}${
			new Date().getTime() - exports.statloggers[id].getTime()
		}ms] LOG FROM GROUP ${id} ${msg ? `:: ${msg}` : " --- "}`
	);

	if (_statLoggingIncrease) exports.statloggers[id] = new Date();
};
