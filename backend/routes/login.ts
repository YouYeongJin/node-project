import express from "express";
import * as loginLogic from "../logic/loginLogic";
import logger from "../config/log_config/logger";
import { NextFunction } from "connect";

const router = express.Router();

router.post("/checkLogin", async (req: any, res: any, next: NextFunction) => {
    try {
        let userData = await loginLogic.checkLogin(req.body);
        //세션에 추가
        req.session.userId = userData[0].USER_ID;
        res.send(userData);
    } catch (err) {
        next(err);
    }
});

router.post("/deleteSession", (req: any, res: any, next: NextFunction) => {
    req.session.destroy();
    logger.info("deleteSession" + ">> 세션삭제성공");
    res.json({ success: true });
});

router.post("/noSessionRequest", (req: any, res: any, next: NextFunction) => {
    if (req.session.userId) {
        logger.info("noSessionRequest" + ">> 세션 있음 O");
        res.json({ success: true });
    } else {
        logger.info("noSessionRequest" + ">> 세션 없음 X");
        res.json({ success: false });
    }
});

export default router;
