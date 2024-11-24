import moment from 'moment';
import winston from 'winston';

const loggerInstance = winston.createLogger({
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

export class Logger {
	public static readonly logger = loggerInstance;
}