import express from 'express'
import { registerUser ,loginUser, getProfil,updateProfil } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile',getProfil,authUser)
userRouter.post('/update-profile',upload.single('image'),updateProfil,authUser)

export default userRouter