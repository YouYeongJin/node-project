import mysql from 'mysql';
import mysql_config from './config';
import mybatisMapper from 'mybatis-mapper';

const pool = mysql.createPool(mysql_config);

pool.on('acquire', function (connection:any) {
  console.log(`Connection ${connection.threadId} acquired`);
});

pool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});

pool.on('release', function (connection:any) {
  console.log(`Connection ${connection.threadId} released`);
});

const getConn = function(queryParam:any, callback:any) {
  // 매퍼 로드는 처음에 한번만 하면될꺼같은데 어디다 할까
  // mybatisMapper.createMapper(['']);
  mybatisMapper.createMapper(['../mapper/login.xml']);

  // 디폴트 포멧으로 설정
  const format:any = {language: 'sql', indent: '  '};

  // 파라메타 Namespace, SQL ID, Parameters as a arguments.
  const readyQuery = mybatisMapper.getStatement(queryParam.nameSpace,
                                                queryParam.sqlId,
                                                queryParam.params,
                                                format);
  
  console.log(readyQuery);                  

  pool.getConnection(function(err:any, connection:any) {
    if(err){
      throw new Error('에러입니다.');
    }else{
      callback(err, readyQuery, connection);
    }
  });
}

export {pool, getConn}