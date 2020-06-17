import winston from "winston";
import { format } from "logform";

const { combine, timestamp, label, printf, errors } = winston.format;

// log 출력 포맷 정의
const myFormat = printf((info: any) => {
    if (info.message !== undefined) {
        if (info.message.err !== undefined) {
            return `${info.timestamp} [${info.label}] ${info.level}: ${info.message.err.stack}`;
        }
    }
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const options = {
    // log파일
    file: {
        level: "info",
        filename: __dirname + "/logs/project.log", // 로그파일을 남길 경로
        handleExceptions: true,
        json: false, // 로그형태를 json으로도 뽑을 수 있다.
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: combine(
            label({ label: "Logger file" }),
            timestamp(),
            errors({ stack: true }),
            myFormat // log 출력 포맷
        ),
    },
    // 개발 시 console에 출력
    console: {
        level: "debug",
        handleExceptions: true,
        json: false, // 로그형태를 json으로도 뽑을 수 있다.
        colorize: true,
        format: combine(
            label({ label: "Logger message" }),
            timestamp(),
            errors({ stack: true }),
            myFormat // log 출력 포맷
        ),
    },
};

// 중요! 위에서 선언한 option으로 로그 파일 관리 모듈 transport
const logger = winston.createLogger({
    transports: [new winston.transports.File(options.file), new winston.transports.Console(options.console)],
    exitOnError: false,
});

export default logger;
