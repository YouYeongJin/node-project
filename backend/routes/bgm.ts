import { NextFunction } from "express";
import bgmLogic from "../logic/bgmLogic";

const bgm = "/bgm";

export default (app: any) => {
    app.post(bgm + "/list", async (req: any, res: any, next: NextFunction) => {
        try {
            let params = req.body;
            let bgmData = await bgmLogic.getBgmList(params);
            res.send({ bgmData: bgmData, result: true });
        } catch (err) {
            next(err);
        }
    });
};
