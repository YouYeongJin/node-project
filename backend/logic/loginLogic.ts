import * as db from "../loaders/config/db_config/mysql_pool";
import logger from "../loaders/config/log_config/logger";

export default {
    checkLogin: async (param: any) => {
        //  파라메터 설정 부분 1. nameSpace = XML의 네임스페이스 2. sqlId = XML의 쿼리명 3. params = 조건파라메터
        let params = {
            nameSpace: "login",
            sqlId: "loginCheck",
            params: {
                USER_ID: param.USER_ID,
                USER_PW: param.USER_PW,
            },
        };
        const conn = await db.getConn();
        let userData = await db.getData(conn, params);
        conn.release();

        return userData;
    },
};
