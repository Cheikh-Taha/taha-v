import validator from "validator"
import bycrypt, { hash } from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from "../models/userModel.js"

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

// API to get all appointments
const appointmentAdmin = async (req,res)=>{
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//api to delete doctor

export const deleteDoctor = async (req, res) => {
  try {
    const { docId } = req.params; // <-- get from params, not body
    await doctorModel.findByIdAndDelete(docId);
    res.json({ success: true, message: "Doctor deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to cancel an appointment for admin
const appointmentCancel = async (req, res) => {

    try {
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndDelete(appointmentId,{cancelled : true});
        // Releasing the slot
        const {docId,slotDate,slotTime} = appointmentData
        const docData = await doctorModel.findById(docId);
        let slots_booked = docData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        res.json({ success: true, message: "Appointment cancelled successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}
// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {
        const Doctors = await doctorModel.find();
        const appointments = await appointmentModel.find({});

        const patientIds = [...new Set(appointments.map(a => a.userId.toString()))];
        const users = await userModel.find({ _id: { $in: patientIds } });


        const dashData = {
            doctors : Doctors.length,
            patients : users.length,
            appointments : appointments.length,
            latestAppointments : appointments.slice(0,5).reverse() 
        }

        res.json({success: true,dashData});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export{addDoctor,loginAdmin,allDoctors,appointmentAdmin,appointmentCancel,adminDashboard}