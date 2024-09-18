const express = require('express');
const router = express.Router();

const {
    getAllUsers,getUserById,
    deleteUserById,registerUser,loginUser,getUserProfile,
    deactivateUser,
    activateUser,
    logoutUser
}=require('../controllers/usersController.js')

const {protect,admin}=require('../middleware/authMiddleware.js');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',protect,getUserProfile);
router.put("/deactivate/:id",deactivateUser);
router.put('/activate/:id',activateUser);
router.post('/logout',logoutUser);


router.get("/",getAllUsers);
router.get("/:id",getUserById);
router.delete("/:id",deleteUserById);

module.exports=router;