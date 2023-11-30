import { createLogger, format, transports } from "winston";

const { combine, timestamp, label, prettyPrint } = format;

const errFormat = combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    prettyPrint((info) => {
        return `${info.timestamp} [${info.level}] : ${info.message}`;
    })
);

export default createLogger({
    level: "info",
    format: errFormat,
    transports: [
        new transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
    ],
});
