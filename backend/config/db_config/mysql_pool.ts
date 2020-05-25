import mysql from 'mysql';
import mysql_config from './config';
import mybatisMapper from 'mybatis-mapper';
import logger from '../log_config/logger'

const pool = mysql.createPool(mysql_config);

pool.on('acquire', (connection:any) => {
  logger.info(`*커넥션 스레드ID : ${connection.threadId} 연결*`);
});

pool.on('enqueue', () => {
  logger.info('*커넥션 대기 중*');
});

pool.on('release', (connection:any) => {
  logger.info(`*커넥션 스레드ID : ${connection.threadId} 반환*`);
});

/**
 * @description DB로부터 커넥션을 받아 callback을 실행
 * @param next 에러처리를 위한 next
 * @param callback connection이 담긴 callback
 */
const getConn:Function = () => {

  return new Promise((resolve, reject) => {
    
    pool.getConnection((err:any, connection:any) => {
      if(err){
        logger.error("-getConnection-");
        logger.error(err);
        reject(err);
      }else{
        resolve(connection);
      }
    });

  });
  
}

/**
 * @description mybatis 에서 세팅한 queryString을 받아온다
 * @param next 에러처리를 위한 next
 * @param queryParam ---오브젝트 타입--          
 * nameSpace = XML의 네임스페이스            
 * sqlId = XML의 쿼리명           
 * params = 쿼리 내에서 사용될 parameters
 */
const getReadyQuery:Function = (queryParam:any) => {

  return new Promise((resolve, reject) => {

    let readyQuery:String = "";

    try {
      // 매퍼 로드는 처음에 한번만 하면될꺼같은데 어디다 할까
      mybatisMapper.createMapper([__dirname+'/../../mapper/'+queryParam.nameSpace+'.xml']);
      
      // 디폴트 포멧으로 설정
      const format:any = {language: 'sql', indent: '  '};
      
      // 파라메타 Namespace, SQL ID, Parameters as a arguments.
      readyQuery = mybatisMapper.getStatement(queryParam.nameSpace,
                                              queryParam.sqlId,
                                              queryParam.params,
                                              format);
        
      } catch (err) {
        logger.error("-getReadyQuery-");
        logger.error(err);
        reject(err);
      }
      
      logger.info("\n" + readyQuery);
      resolve(readyQuery);
  });
}

/**
 * @description DB에서 데이터를 가져온다
 * @param next 에러처리를 위한 next
 * @param queryString mybatis에서 받아온 queryString
 * @param connection DB커넥션 
 */
const getData:any = (connection:any, queryString:String) => {

  return new Promise((resolve, reject) => {

    connection.query(queryString, (err:any, result:any, field:any)=>{
      
      if (err) {
        logger.error("-getData-");
        logger.error(err);
        reject(err);
      }else{
        resolve(result);
      }
      
    });
    
  });

}

export {pool, getConn, getReadyQuery, getData}