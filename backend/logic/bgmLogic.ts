import * as db from "../loaders/config/db_config/mysql_mybatis";
import logger from "../loaders/config/log_config/logger";

export default {
    getBgmList: async (param: any) => {
        //  파라메터 설정 부분 1. nameSpace = XML의 네임스페이스 2. sqlId = XML의 쿼리명 3. params = 조건파라메터
        let params = {
            nameSpace: "bgm",
            sqlId: "getBgmList",
            params: {
                keyword: param.keyword
            }
        };
        const conn = await db.getConn();
        let bgmData = await db.getData(conn, params);
        conn.release();

        return bgmData;
    },
    insertBGM: async () => {}
};
