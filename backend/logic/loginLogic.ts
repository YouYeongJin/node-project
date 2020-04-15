import * as db from '../config/db_config/mysql_pool';
import logger from '../config/log_config/logger'

const checkLogin = (req: any, res: any, next: any) => {

  /*파라메터 설정 부분 
  nameSpace = XML의 네임스페이스
  sqlId = XML의 쿼리명
  params = 조건파라메터
  */
  let params: any = {
    nameSpace: 'login',
    sqlId: 'index',
    params: req.body
  };

  //DB쿼리 보내는 부분
  db.getConn(next,
    params,
    (err: any, connection: any, readyQuery: any) => {
      if (err) {
        logger.error(err);
      }

      connection.query(readyQuery, (err: any, result: any, field: any) => {
        if (err) {
          logger.error(err);
        }
        connection.release();
        res.json(result);
      });

    });

}

export { checkLogin }