import express from "express";
import loginLogic from "../logic/loginLogic";
import logger from "../loaders/config/log_config/logger";
import { NextFunction } from "express";
import objectUtils from "../common/objectUtils";

const login = "/login";
const loginSignIn = login + "/signIn";
const loginSignUp = login + "/signUp";
const loginDeleteSession = login + "/deleteSession";
const loginNoSessionRequest = login + "/noSessionRequest";

export default (app: any) => {
    app.post(loginSignIn, async (req: any, res: any, next: NextFunction) => {
        try {
            let params = req.body;
            let userData = await loginLogic.signIn(params);
            if (!objectUtils.isEmptyObject(userData)) {
                req.session.userId = userData[0].USER_ID;
                res.send({ userData: userData[0], result: true });
            } else {
                res.send({ result: false });
            }
        } catch (err) {
            next(err);
        }
    });

    app.post(loginSignUp, async (req: any, res: any, next: NextFunction) => {
        try {
            let params = req.body;
            let bool = await loginLogic.signUp(params);

            if (bool.success) {
                req.session.userId = params.eMail;
                res.json({ result: true });
            } else {
                res.json({ result: false });
            }
        } catch (err) {
            next(err);
        }
    });

    app.post(loginDeleteSession, (req: any, res: any, next: NextFunction) => {
        try {
            req.session.destroy();
            logger.info("deleteSession" + ">> 세션삭제성공");
            res.json({ success: true });
        } catch (err) {
            next(err);
        }
    });

    app.post(loginNoSessionRequest, (req: any, res: any, next: NextFunction) => {
        try {
            if (req.session.userId) {
                logger.info("noSessionRequest" + ">> 세션 있음 O");
                logger.info(req.session.userId);
                logger.info("---------------------");
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
