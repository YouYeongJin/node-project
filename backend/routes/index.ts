import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req:any, res:any, next:any) {
  res.json({'안녕' : 'hi'});
});

export = router;