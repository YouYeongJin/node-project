import express from 'express';
import * as loginLogic from '../logic/loginLogic';
const router = express.Router();

/* GET home page. */
router.get('/', function(req:any, res:any, next:any) {
  loginLogic.index(req, res, next);
});

export = router;