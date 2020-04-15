import express from 'express';
import * as loginLogic from '../logic/loginLogic';
const router = express.Router();

router.post('/checkLogin', function(req:any, res:any, next:any) {
  loginLogic.checkLogin(req, res, next);
});

export default router