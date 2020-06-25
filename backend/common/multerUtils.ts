import multer from "multer";
import fs from "fs";
import path from "path";
import logger from "../loaders/config/log_config/logger";

const uploadDir = "uploads";

const storage = multer.diskStorage({
    // multipart로 보낼때는 parameter 순서가 중요함
    // file 객체가 변수 위에있을 경우 multer 에서 file 객체를  먼저읽어서 밑에있는 변수를 못가져올 경우가 생김
    // ex( { ... file: file, fileDir: "Upload" }) XX   == 이경우 fileDir 을 못읽음
    // ex( { ... fileDir: "Upload", file: file }) OO
    destination(req, file, callback) {
        const fileDir = path.join(uploadDir, req.body.fileDir);
        !fs.existsSync(fileDir) ? fs.mkdirSync(fileDir, { recursive: true }) : true;
        logger.info("fileDir =>> ", fileDir);
        callback(null, fileDir);
    },
    filename(req, file, callback) {
        let array = file.originalname.split(".");
        array[0] = array[0] + "_";
        array[1] = "." + array[1];
        array.splice(1, 0, Date.now().toString());
        const result = array.join("");
        logger.info("filename =>> ", result);
        callback(null, result);
    },
});
const upload = multer({ storage, limits: { files: 10, fileSize: 1024 * 1024 * 1024 } });

export default upload;
