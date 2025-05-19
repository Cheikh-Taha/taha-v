import validator from "validator"
import bycrypt, { hash } from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'

// Api for adding doctor
const addDoctor = async (req,res)=>{
    try{
        const {name,email,password,speciality,degree,experience,about,fees,addresse}= req.body
        const imageFile = req.file
        // cheking for all data to add doctor

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !addresse) {
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
            image : imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            addresse,
            date : Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({success:true,message:"Doctor added"})

    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export{addDoctor}