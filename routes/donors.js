const express=require('express');
const {donors,createdonors}=require('../controllers/donors');
const app=express();
const router=express.Router();
router.get('/',donors);
router.post('/',createdonors);
module.exports=router;

