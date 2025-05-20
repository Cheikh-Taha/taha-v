import validator from 'validator'
import bycrypt from 'bcrypt'
import userModel from '../models/userModel.js' 
import jwt from 'jsonwebtoken'
// api to s'inscrire

const registerUser = async (req, res) => {

    try {
            const {name, email, password} = req.body
            if (!name || !email || !password) { 
                return res.status(400).json({message: "Please fill all the fields"})
                
            }
            if (!validator.isEmail(email)) {
                 return res.status(400).json({message: "email is not valid"})
            }
            if (password.length < 6) {
                return res.status(400).json({message: "Password must be at least 6 characters"})
            }

            // hash password
            const salt = await bycrypt.genSalt(10)
            const hashedPassword = await bycrypt.hash(password, salt) 
            const userData = {
                name,
                email,
                password: hashedPassword
            }

            const newUser = new userModel(userData)
            const user = await newUser.save()

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

            res.json({success:true,token})
            

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})        
    }
}
// api user to login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        

        if (!email || !password) {
            return res.status(400).json({message: "Please fill all the fields"})
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({message: "email is not valid"})
        }
        if (!user) {
            return res.status(400).json({message: "User not found"})
        }
        const isMatch = await bycrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"})
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})        
    }
}
export {registerUser,loginUser}