import * as db from '../config/db_config/mysql_pool';
import logger from '../config/log_config/logger';

const checkLogin = (req: any, res: any, next: any)=>{

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
  db.getConn(next, (connection:any)=>{

      //getReadyQuery > 1. next고정 2. params(line 11) 3. callbackFunction자리 null이면 호출 x
      connection.query(db.getReadyQuery(next, params, null), (err:any, result:any, field:any)=>{
        if (err) {
          logger.error(err);
          next(err);
        }
        connection.release();
        
        //로그인 처리 세션 처리
        if(result[0]){
          req.session.userId = result[0].USER_ID;
        }
        res.send(result);
      });
      
    });
    
  }
  
const deleteSession = (req:any, res:any, next:any)=>{
  
  req.session.destroy();
  logger.info('deleteSession' + '>> 세션삭제성공');
  
  res.json({success : true});
}

const noSessionRequest = (req:any, res:any, next:any)=>{
  
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