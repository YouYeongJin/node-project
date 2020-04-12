import mysql from 'mysql';
import mysql_config from './config';
import mybatisMapper from 'mybatis-mapper';
import logger from '../log_config/logger'

const pool = mysql.createPool(mysql_config);

pool.on('acquire', function (connection:any) {
  logger.info(`*커넥션 스레드ID : ${connection.threadId} 연결*`);
});

pool.on('enqueue', function () {
  logger.info('*커넥션 대기 중*');
});

pool.on('release', function (connection:any) {
  logger.info(`*커넥션 스레드ID : ${connection.threadId} 반환*`);
});

const getConn = function(next:any, queryParam:any, callback:any) {
  // 매퍼 로드는 처음에 한번만 하면될꺼같은데 어디다 할까
  mybatisMapper.createMapper(['../mapper/'+queryParam.nameSpace+'.xml']);

  // 디폴트 포멧으로 설정
  const format:any = {language: 'sql', indent: '  '};

  // 파라메타 Namespace, SQL ID, Parameters as a arguments.
  const readyQuery = mybatisMapper.getStatement(queryParam.nameSpace,
                                                queryParam.sqlId,
                                                queryParam.params,
                                                format);
  
  pool.getConnection((err:any, connection:any)=>{
    if(err){
      next(err);
    }else{
      logger.info(readyQuery);
      callback(err, connection, readyQuery);
    }
  });
}

export {pool, getConn}