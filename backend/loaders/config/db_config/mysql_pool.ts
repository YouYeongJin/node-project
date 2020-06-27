import mysql from "mysql";
import mysql_config from "./mysql_config";
import mybatisMapper from "mybatis-mapper";
import logger from "../log_config/logger";
import path from "path";

const pool = mysql.createPool(mysql_config);
const mapperDir = path.join(global.__rootPath, "logic", "mapper");

pool.on("enqueue", () => {
    logger.info("Waiting for available connection slot");
});

pool.on("acquire", connection => {
    logger.info(`Connection ${connection.threadId} acquired`);
});

pool.on("release", connection => {
    logger.info(`Connection ${connection.threadId} released`);
});

/**
 * @description DB로부터 커넥션을 받아 callback을 실행
 * @param next 에러처리를 위한 next
 * @param callback connection이 담긴 callback
 */
const getConn: any = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err: Error, connection: mysql.Connection) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
};

/**
 * @description mybatis 에서 세팅한 queryString을 받아온다
 * @param next 에러처리를 위한 next
 * @param queryParam ---오브젝트 타입--
 * nameSpace = XML의 네임스페이스
 * sqlId = XML의 쿼리명
 * params = 쿼리 내에서 사용될 parameters
 */
const getReadyQuery = (queryParam: { nameSpace: string; sqlId: string; params: {} }) => {
    let readyQuery: String = "";
    // 매퍼 로드
    mybatisMapper.createMapper([path.join(mapperDir, queryParam.nameSpace + ".xml")]);
    // 디폴트 포멧으로 설정
    const format: {} = { language: "sql", indent: "  " };
    // 파라메타 Namespace, SQL ID, Parameters as a arguments.
    readyQuery = mybatisMapper.getStatement(queryParam.nameSpace, queryParam.sqlId, queryParam.params, format);
    return readyQuery;
};

/**
 * @description DB에서 데이터를 가져온다
 * @param next 에러처리를 위한 next
 * @param params db parameter Model
 * @param connection DB커넥션
 */
const getData: any = (connection: any, params: { nameSpace: string; sqlId: string; params: {} }) => {
    return new Promise((resolve, reject) => {
        const queryString = getReadyQuery(params);
        logger.info("===============================");
        logger.info("\n" + queryString);
        logger.info("===============================");
        connection.query(queryString, (err: Error, result: {}, field: mysql.FieldInfo) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const asyncGetConn = (callback: Function) => {
    pool.getConnection((err: Error, connection: mysql.Connection) => {
        if (err) {
            throw err;
        } else {
            callback(connection);
        }
    });
};

const asyncGetReadyQuery = (queryParam: { nameSpace: string; sqlId: string; params: {} }, callback: Function) => {
    try {
        // 매퍼 로드
        mybatisMapper.createMapper([path.join(mapperDir, queryParam.nameSpace + ".xml")]);
        // 디폴트 포멧으로 설정
        const format: any = { language: "sql", indent: "  " };
        // 파라메타 Namespace, SQL ID, Parameters as a arguments.
        const readyQuery = mybatisMapper.getStatement(queryParam.nameSpace, queryParam.sqlId, queryParam.params, format);
        if (callback) {
            callback(readyQuery);
        } else {
            return readyQuery;
        }
    } catch (err) {
        throw err;
    }
};

const asyncGetData: any = (connection: any, params: { nameSpace: string; sqlId: string; params: {} }, callback: Function) => {
    const queryString = getReadyQuery(params);
    logger.info("===============================");
    logger.info("\n" + queryString);
    logger.info("===============================");
    connection.query(queryString, (err: Error, result: {}, field: mysql.FieldInfo) => {
        if (err) {
            throw err;
        } else {
            if (callback) {
                callback(result);
            } else {
                return result;
            }
        }
    });
};
export { pool, getConn, getReadyQuery, getData, asyncGetConn, asyncGetReadyQuery, asyncGetData };
