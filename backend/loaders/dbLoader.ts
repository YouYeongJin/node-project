import mysql from "mysql";
import mysql_config from "./config/db_config/mysql_config";
import logger from "./config/log_config/logger";

export default async ({ app }: { app: Express.Application }) => {
    global.__pool = await mysql.createPool(mysql_config);

    global.__pool.on("acquire", (connection: mysql.Connection) => {
        logger.info(`*커넥션 스레드ID : ${connection.threadId} 연결*`);
    });

    global.__pool.on("enqueue", () => {
        logger.info("*커넥션 대기 중*");
    });

    global.__pool.on("release", (connection: mysql.Connection) => {
        logger.info(`*커넥션 스레드ID : ${connection.threadId} 반환*`);
    });
};
