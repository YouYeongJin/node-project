import express from 'express';
import * as loginLogic from '../logic/loginLogic';
const router = express.Router();

router.post('/checkLogin', (req:any, res:any, next:any)=>{
  loginLogic.checkLogin(req, res, next);
});

router.post('/deleteSession', (req:any, res:any, next:any)=>{
  loginLogic.deleteSession(req, res, next);
});

router.post('/noSessionRequest', (req:any, res:any, next:any)=>{
  loginLogic.noSessionRequest(req, res, next);
});

export default router