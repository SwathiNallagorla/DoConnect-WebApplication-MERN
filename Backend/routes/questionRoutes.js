const express = require('express');
const router = express.Router();

const {
    getAllQuestions,getQuestionById,getQuestionByCategory,getQuestionByText,
    deleteQuestionById,createQuestion,getAllApprovedQuestions,approveQuestion,resolveQuestion,getAllUnApprovedQuestions,
    getAllQuestionsByUser,
    updateQuestion,
    getAllApprovedQuestionsOfUser
}=require('../controllers/questionsController.js')

const { protect, admin } = require('../middleware/authMiddleware.js')

router.get('/category/:category',getQuestionByCategory);
router.get('/approved',getAllApprovedQuestions);
router.get('/id/:id',getQuestionById);
router.get('/approved/user',protect,getAllApprovedQuestionsOfUser);
router.get('/unapproved',protect,admin,getAllUnApprovedQuestions);
router.put('/approve/:id',protect,admin,approveQuestion);
router.put('/resolve/:id',protect,admin,resolveQuestion);
router.get('/questiontext/:text',protect,getQuestionByText);
router.put('/updatequestion/:qid',protect,updateQuestion);
router.post('/',protect,createQuestion);

router.get('/',protect,admin,getAllQuestions);
router.get('/user',protect,getAllQuestionsByUser);
router.delete('/:id',protect,admin,deleteQuestionById);


module.exports=router;