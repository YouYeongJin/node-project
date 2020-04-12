import winston from 'winston';

const { combine, timestamp, label, printf } = winston.format;

// log 출력 포맷 정의
const myFormat = printf(({ level, message, label, timestamp }:any)=>{
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const options = {
  // log파일
  file: {
    level: 'info',
    filename: __dirname+`/logs/project.log`, // 로그파일을 남길 경로
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(
      label({ label: 'Logger file' }),
      timestamp(),
      myFormat    // log 출력 포맷
    )
  },
  // 개발 시 console에 출력
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false, // 로그형태를 json으로도 뽑을 수 있다.
    colorize: true,
    format: combine(
      label({ label: 'Logger message' }),
      timestamp(),
      myFormat
    )
  }
}

// 중요! 위에서 선언한 option으로 로그 파일 관리 모듈 transport
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, 
});

// 개발 시 console로도 출력
// if(process.env.NODE_ENV !== 'production'){
//   logger.add(new winston.transports.Console(options.console))
// }
 
export default logger