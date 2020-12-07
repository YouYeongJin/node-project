// import app from "../app";
import express from "express";
//const loaders = require("./loaders");
import loaders from "./loaders/index";
import debug from "debug";
import http, { Server } from "http";
import os from "os";
import cluster from "cluster";
import logger from "./loaders/config/log_config/logger";

let port: string | number;
let server: Server;

global.__rootPath = __dirname;

const serverStart = async () => {
    const app = express();
    await loaders.init({ expressApp: app });
    port = normalizePort(process.env.PORT || "5000");
    app.set("port", port);
    server = http.createServer(app);
    server.on("error", onError);
    server.on("listening", onListening);
    server.listen(port);
};

function normalizePort(val: any) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

function onError(error: any) {
    if (error.syscall !== "listen") {
        throw error;
    }
    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            logger.info(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            logger.info(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    let addr = server.address();
    let bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    logger.info("서버 올라갔습니다. " + bind);
}

//서버 시작부

const cpuLength: number = os.cpus().length;
if (cluster.isMaster) {
    logger.info("cluster 마스터");
    for (let index = 0; index < cpuLength; index++) {
        cluster.fork();
    }
} else {
    logger.info("cluster slave 생성 PID = " + process.pid);
    serverStart();
}

// serverStart();
