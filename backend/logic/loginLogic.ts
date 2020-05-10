import * as db from '../config/db_config/mysql_pool';
import logger from '../config/log_config/logger';

const checkLogin:Function = async (req: any, res: any, next: any)=>{
  try {

    //  파라메터 설정 부분 1. nameSpace = XML의 네임스페이스 2. sqlId = XML의 쿼리명 3. params = 조건파라메터
    let params:any = {
      nameSpace: 'login',
      sqlId: 'loginCheck',
      params: {
              USER_ID : req.body.USER_ID,
              USER_PW : req.body.USER_PW
              }
    };

    const conn = await db.getConn(next);

    const queryStr = await db.getReadyQuery(params);

    let userData = await db.getData(conn, queryStr);
    
    conn.release();
    
    //세션에 추가
    req.session.userId = userData[0].USER_ID;
    res.send(userData);

  } catch (err) {
    logger.error("-checkLogin-")
    logger.error(err);
    next(err);
  }

}
  
const deleteSession:Function = (req:any, res:any, next:any)=>{
  
  req.session.destroy();
  logger.info('deleteSession' + '>> 세션삭제성공');
  
  res.json({success : true});
}

const noSessionRequest:Function = (req:any, res:any, next:any)=>{
  
  if(req.session.userId){
    logger.info('noSessionRequest' + '>> 세션 있음 O');
    res.json({success : true});
  }
  else{
    logger.info('noSessionRequest' + '>> 세션 없음 X');
    res.json({success : false});
  }
}

export { checkLogin, deleteSession, noSessionRequest }