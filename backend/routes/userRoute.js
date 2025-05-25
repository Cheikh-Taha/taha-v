import express from 'express'
import { registerUser ,loginUser, getProfil,updateProfil,bookAppointment,listAppointment,cancelAppointment } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile',getProfil,authUser)
userRouter.post('/update-profile',upload.single('image'),updateProfil,authUser)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)

export default userRouter