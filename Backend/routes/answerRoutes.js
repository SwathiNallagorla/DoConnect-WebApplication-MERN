const express=require('express');
const router=express.Router();

const {getAnswerById,createAnswer,updateAnswer,deleteAnswer,
    approveAnswer,getApprovedAnswersForQuestion,getUnApprovedAnswersForQuestion,
    likeAnswer,unlikeAnswer, getNumOfLikesForAnswer,getAnswersByQid,unApproveAnswer
}=require('../controllers/answersController.js')

const { protect, admin } = require('../middleware/authMiddleware.js');
console.log("questionid");
router.get('/approved/:qid',protect,getApprovedAnswersForQuestion);
router.get('/unapproved/:qid',protect,admin,getUnApprovedAnswersForQuestion);
router.get('/id/:id',protect,admin,getAnswerById);
router.get('/qid/:qid',protect,admin,getAnswersByQid);
router.post('/:qid',protect,createAnswer);
router.put('/approve/:id',protect,admin,approveAnswer);
router.put('/unapprove/:id',protect,admin,unApproveAnswer);
router.delete('/:id',protect,admin,deleteAnswer);
router.put('/like/:id',protect,likeAnswer);
router.put('/dislike/:id',protect,unlikeAnswer);
router.get('/likescount/:id',getNumOfLikesForAnswer);

router.put('/:id',protect,updateAnswer);

module.exports=router;