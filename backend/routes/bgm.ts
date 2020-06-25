import { NextFunction } from "express";
import bgmLogic from "../logic/bgmLogic";
import upload from "../common/multerUtils";

const bgm = "/bgm";
const bgmlist = bgm + "/list";
const bgminsert = bgm + "/insert";

export default (app: any) => {
    app.post(bgmlist, async (req: any, res: any, next: NextFunction) => {
        try {
            let params = req.body;
            let bgmData = await bgmLogic.getBgmList(params);
            res.send({ bgmData: bgmData, result: true });
        } catch (err) {
            next(err);
        }
    });

    app.post(bgminsert, upload.array("file", 1), async (req: any, res: any, next: NextFunction) => {
        try {
            console.log(req.files);
            let bgmData = await bgmLogic.insertBGM();
            res.send({ result: true });
        } catch (err) {
            next(err);
        }
    });
};
