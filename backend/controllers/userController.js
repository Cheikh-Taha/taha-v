import validator from 'validator'
import bycrypt from 'bcrypt'
import userModel from '../models/userModel.js' 
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'


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

// api to get user data
const getProfil = async (req, res) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const userData = await userModel.findById(userId).select("-password");
        res.json({ success: true, userData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
// api to update user data
const updateProfil = async (req, res) => {
    try {
        
        const {userId,name,phone,address,dob,gender} = req.body
        const imageFile = req.file
        if (!name || !phone || !gender || !dob ) {
            return res.json({ success: false, message: "Data Missing" });
        }
        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            addresse: address,
            dob,
            gender
        })
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
            const imageURL = imageUpload.secure_url ;
            await userModel.findByIdAndUpdate(userId, {image:imageURL});
        }
        res.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
} 

//API to book an appointment
const bookAppointment = async(req, res) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Use slotDate, not slotData
        const { docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select('-password');
        let slots_booked = docData.slots_booked;

        // Check slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'slot not available' });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');
        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate, 
            date: Date.now()
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: 'Appointment booked' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//API to get user appointments for frentent my-appointment page
const listAppointment = async(req,res) => {
    try {

        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const appointments = await appointmentModel.find({userId})
        res.json({success:true , appointments})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
// API to cancel an appointment
const cancelAppointment = async (req, res) => {

    try {
        const {userId,appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // Verify if the appointment belongs to the user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "You are not authorized to cancel this appointment" });
        }

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

export {registerUser,getProfil,loginUser,updateProfil,bookAppointment,listAppointment,cancelAppointment}