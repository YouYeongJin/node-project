import * as db from "../loaders/config/db_config/mysql_mybatis";
import logger from "../loaders/config/log_config/logger";

export default {
    signIn: async (param: any) => {
        const conn = await db.getConn();
        try {
            await conn.beginTransaction();
            //  파라메터 설정 부분 1. nameSpace = XML의 네임스페이스 2. sqlId = XML의 쿼리명 3. params = 조건파라메터
            let userData = await db.getData(conn, {
                nameSpace: "login",
                sqlId: "signIn",
                params: {
                    USER_ID: param.eMail,
                    USER_PW: param.password
                }
            });
            await conn.commit();

            return userData;
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    },

    signUp: async (param: any) => {
        const conn = await db.getConn();
        try {
            await conn.beginTransaction();
            let res = await db.getData(conn, {
                nameSpace: "login",
                sqlId: "signUn",
                params: {
                    USER_ID: param.eMail,
                    USER_PW: param.password
                }
            });
            if (res.affectedRows > 0) {
                conn.commit();
                return { success: true };
            } else {
                conn.rollback();
                return { success: false };
            }
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }
};
