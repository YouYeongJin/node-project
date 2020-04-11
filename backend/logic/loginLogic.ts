import * as db from '../db_config/mysql_pool';

const index = (req:any, res:any) => {
  let params:any = {nameSpace:'login',
                    sqlId:'index',
                    params: {common:'1'} };
  db.getConn(params,
            (err:any, readyQuery:any, connection:any)=>{
              if(err){
                console.log(err);
                console.log('연결 실패');
              }
              
              console.log('연결 성공');
              connection.query(readyQuery, (err:any, result:any, field:any)=>{
                if(err){
                  console.log(err);
                  console.log('쿼리 실패');
                }

                console.log('쿼리 성공');
                res.json(result);
              });
              
            });
            
  res.json({'하이':'후후'});
}

export {index}