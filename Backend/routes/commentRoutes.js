const express=require('express');
const router=express.Router();

const { createComment, getAllCommentsForAnswer,deleteComment }=require('../controllers/commentsController.js');

const { protect,admin } = require('../middleware/authMiddleware.js')

router.post('/comment/:ansid',protect,createComment);
router.get('/answer/:ansid',protect,getAllCommentsForAnswer);
router.delete('/:id',protect,admin,deleteComment);

module.exports=router;