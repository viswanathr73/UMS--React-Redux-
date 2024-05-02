
import  express from 'express'
import { authUser, createUser, getUser, loginUser, logoutUser, updateProfile, updateUser } from '../controllers/useController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../multer/multer.js';
const router=express();


router.post('/auth',authUser)
router.post('/createUser',createUser)
router.post('/loginUser',loginUser)
router.post('/updateUser',protect,updateUser)
router.post('/logout',logoutUser)
router.get('/getUser',protect,getUser)
router.post('/updateProfile',upload.single('file'),protect,updateProfile)
export default router