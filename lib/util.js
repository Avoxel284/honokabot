/**
 * Filters through a given array and removes duplicate elements
 *
 * @param {Array} arr
 */
exports.undupeArray = (arr) => {
	var seen = {};
	return arr.filter(function (item) {
		return seen.hasOwnProperty(item) ? false : (seen[item] = true);
	});
};

exports.getClientUptime = (client) => {
	let totalSeconds = client.uptime / 1000;
	let days = Math.floor(totalSeconds / 86400);
	totalSeconds %= 86400;
	let hours = Math.floor(totalSeconds / 3600);
	totalSeconds %= 3600;
	let minutes = Math.floor(totalSeconds / 60);
	let seconds = Math.floor(totalSeconds % 60);
	return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
};
