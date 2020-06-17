import mysql from "mysql";
import mysql_config from "./config/db_config/mysql_config";
import logger from "./config/log_config/logger";

export default async ({ app }: { app: Express.Application }) => {
    const pool = await mysql.createPool(mysql_config);

    pool.on("acquire", (connection: mysql.Connection) => {
        logger.info(`*커넥션 스레드ID : ${connection.threadId} 연결*`);
    });

    pool.on("enqueue", () => {
        logger.info("*커넥션 대기 중*");
    });

    pool.on("release", (connection: mysql.Connection) => {
        logger.info(`*커넥션 스레드ID : ${connection.threadId} 반환*`);
    });
    return pool;
};
