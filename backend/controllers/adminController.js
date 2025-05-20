import validator from "validator"
import bycrypt, { hash } from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'

// Api for adding doctor
const addDoctor = async (req,res)=>{
    try{
        const {name,email,password,speciality,ville,experience,about,fees,addresse}= req.body
        const imageFile = req.file
        // cheking for all data to add doctor

        if (!name || !email || !password || !speciality || !ville || !experience || !about || !fees || !addresse) {
            return res.json({success:false,message:"missing details"})
        }

        // validate email format
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"email not valide"})
        }

        // hashing doctor password
        const salt =  await bycrypt.genSalt(7)
        const hashedPassword = await bycrypt.hash(password,salt)

        // upload image to clidinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            password:hashedPassword,
            image : imageUrl,
            speciality,
            ville,
            experience,
            about,
            fees,
            date : Date.now(),
            addresse
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({success:true,message:"Doctor added"})

    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// api for admin login 
const loginAdmin = async (req,res) =>{
    try {
        const {email,password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token}) 
        }else{
           res.json({success:false,message:"invalide info admin"}) 
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// api pour prendre tous les Doctor

    const allDoctors = async (req,res)=>{
        try {
            const doctors = await doctorModel.find({}).select('-password')
            res.json({success:true,doctors})
            
        } catch (error) {
            console.log(error)
            res.json({success:false,message:error.message})
        }
    } 

export{addDoctor,loginAdmin,allDoctors}