import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import logger from './config/log_config/logger';

import lgoinRouter from './routes/login';

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// CROS DOMAIN 허용
app.use(cors());

app.use('/login', lgoinRouter);

// catch 404 and forward to error handler
app.use(function(req:any, res:any, next:any) {
  next(createError(404));
});

// error handler
app.use(function(err:any, req:any, res:any, next:any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  logger.error('------------------------------------');
  logger.error(err.message);
  logger.error('------------------------------------');

  // 에러처리방식 1번
  // res.status(err.status || 500);
  // res.render('error');

  // 에러처리방식 2번
  res.status(500).send(err.message);
});

export = app;