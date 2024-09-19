import express from 'express';
import multer from 'multer';
import { 
    getAllUsers, 
    addUserController, 
    getUserByUserNameController, 
    updateUserByUserNameController, 
    deleteUserByUserNameController, 
    loginController,
    getUserCountController
} from '../controllers/User.controller.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/getAllUser', getAllUsers);
router.post('/addUser', upload.single('image'), addUserController);
router.get('/getUserByUserName/:UserName', getUserByUserNameController);
router.put('/updateUserByUserName/:userName', upload.single('image'), updateUserByUserNameController);
router.delete('/deleteUserByUserName/:UserName', deleteUserByUserNameController);
router.post('/login', loginController);
router.get('/getUserCount', getUserCountController);

export default router;
