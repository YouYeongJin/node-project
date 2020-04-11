import * as db from '../db_config/mysql_pool';

const index = (req:any, res:any, next:any) => {

  /*파라메터 설정 부분 
  nameSpace = XML의 네임스페이스
  sqlId = XML의 쿼리명
  params = 조건파라메터
  */
  let params:any = {nameSpace:'login',
                    sqlId:'index',
                    params: {common:'1'} };

  //DB쿼리 보내는 부분                  
  db.getConn(next,
            params,
            (err:any, readyQuery:any, connection:any)=>{
              if(err){
                console.log(err);
              }
              
              connection.query(readyQuery, (err:any, result:any, field:any)=>{
                if(err){
                  console.log(err);
                }
                connection.release();
                res.json(result);
              });
              
            });
}

export {index}