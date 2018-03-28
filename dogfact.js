module.exports = function (Doorman) {
	return {
		commands: [
			'dogfact'
		],
		'dogfact': {
			usage: '<Question>',
			description: 'Gives a Random Dog Fact.',
			process: (msg, suffix, isEdit, cb) => {
				request('https://dog-api.kinduff.com/api/facts',
					function (err, res, body) {
						try {
							if (err) throw err;
							var data = JSON.parse(body);
							if (data && data.facts && data.facts[0]) {
								cb({
									embed: {
										color: Doorman.Config.discord.defaultEmbedColor,
										title: 'Dog Fact',
										description: data.facts[0]
									}
								}, msg);
							}
						} catch (err) {
							var msgTxt = `command dog_fact failed :disappointed_relieved:`;
							if (Doorman.Config.debug) {
								msgTxt += `\n${err.stack}`;

								Doorman.logError(err);
							}
							cb(msgTxt, msg);
						}
					});
			}
		}
	}
}