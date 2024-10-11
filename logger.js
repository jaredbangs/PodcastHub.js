var moment = require('moment');
var winston = require('winston');

var logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.printf(function (info) {
			return info.timestamp + " " + info.level  + " : " + info.message;
		})
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({filename: "logs/" + moment().format("YYYYMMDDhhmmss") + ".log"})
	]
});

module.exports = logger;
