import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import doc from 'pdfkit'
import appointmentModel from '../models/appointmentModel.js'


const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success: true, doctors})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
//API to get all doctor appointment
const appointmentsDoctor = async (req, res) => {

    try {
         const doctorId = req.docId;
         const appointments = await appointmentModel.find({ docId: doctorId });
         res.json({ success: true, appointments })
         
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// API logi in doctor
const loginDoctor = async (req, res) => {
    try {
        const   { email, password } = req.body
        const doctor = await doctorModel.findOne({ email})
        if (!doctor) {
            return res.json({ success: false, message: 'Doctor not found' })
        }
        const isMatch = await bcrypt.compare(password ,doctor.password)
        if (isMatch){
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)

            res.json({success:true ,token})

        }else{
            res.json({ success: false, message: 'Password Pas Correct' })
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export {doctorList,loginDoctor,appointmentsDoctor}