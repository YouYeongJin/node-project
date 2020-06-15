import createError from "http-errors";
import express, { Router } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import redis from "./config/redis_config/redis";
import session from "express-session";

import logger from "./config/log_config/logger";
import lgoinRouter from "./routes/login";
import { NextFunction } from "express";

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// CROS DOMAIN 허용
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// 쿠키 설정
app.use(cookieParser("yjhj0729"));
// 세션 설정
app.use(session(redis));
app.use(express.static(path.join(__dirname, "public")));
// 보안
app.disable("x-powered-by");

// 세선 없으면 튕김
app.use("(?!/login/checkLogin)", (req: any, res: any, next: NextFunction) => {
    if (!req.session.userId) {
        res.json({ code: "999", msg: "noSession" });
        // res.status(500).send('errorrrrr');
    } else {
        next();
    }
});

// 라우터 위치
app.use("/login", lgoinRouter);

// 뒤로가기 대응 index.html호출
app.get("*", (req: any, res: any) => {
    logger.info(path.join(__dirname + "/index.html"));
    res.sendFile(path.join(__dirname + "/index.html"));
});

// catch 404 and forward to error handler
app.use(function(req: any, res: any, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use(function(err: any, req: any, res: any, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    logger.error("------------------------------------");
    logger.error(err.message);
    logger.error("------------------------------------");

    // 에러처리방식 1번
    // res.status(err.status || 500);
    // res.render('error');

    // 에러처리방식 2번
    res.status(500).send(err.message);
});

export = app;
