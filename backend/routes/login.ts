import express from "express";
import * as loginLogic from "../logic/loginLogic";
import logger from "../loaders/config/log_config/logger";
import { NextFunction } from "express";
import commonUtils from "../common/commonUtils";

const login = "/login";

export default (app: any) => {
    app.post(login + "/checkLogin", async (req: any, res: any, next: NextFunction) => {
        try {
            let userData = await loginLogic.checkLogin(req.body);
            if (!commonUtils.isEmptyObject(userData)) {
                //세션에 추가
                req.session.userId = userData[0].USER_ID;
                res.send({ userData: userData[0], result: true });
            } else {
                res.send({ result: false });
            }
        } catch (err) {
            next(err);
        }
    });

    app.post(login + "/deleteSession", (req: any, res: any, next: NextFunction) => {
        try {
            req.session.destroy();
            logger.info("deleteSession" + ">> 세션삭제성공");
            res.json({ success: true });
        } catch (err) {
            next(err);
        }
    });

    app.post(login + "/noSessionRequest", (req: any, res: any, next: NextFunction) => {
        try {
            if (req.session.userId) {
                logger.info("noSessionRequest" + ">> 세션 있음 O");
                res.json({ success: true });
            } else {
                logger.info("noSessionRequest" + ">> 세션 없음 X");
                res.json({ success: false });
            }
        } catch (err) {
            next(err);
        }
    });
};
