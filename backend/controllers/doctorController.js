import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import doc from 'pdfkit'
import appointmentModel from '../models/appointmentModel.js'


const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
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
        res.json({ success: false, message: error.message })
    }
}


// API logi in doctor
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })
        if (!doctor) {
            return res.json({ success: false, message: 'Doctor not found' })
        }
        const isMatch = await bcrypt.compare(password, doctor.password)
        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)

            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: 'Password Pas Correct' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to check complete appointment for doctor pannel
const appointmentComplete = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const docId = req.docId;
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })

            return res.json({ success: true, message: 'Rendez-vous terminé avec succès' })
        } else {
            return res.json({ success: false, message: 'Rendez-vous non trouvé ou non autorisé' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//api to get dashboard data for doctor pannel
const doctorDashboard = async (req, res) => {
    try {
        const docId = req.docId;
        const appointements = await appointmentModel.find({ docId })
        let earnings = 0
        appointements.map((item) => {
            if (item.isCompleted) {
                earnings += item.amount
            }
        })
        let patients = []
        appointements.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointements:appointements.length,
            patients:patients.length,
            latestAppointments : appointements.reverse().slice(0,5)

        }

        res.json({success:true,dashData})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for doctor profile pannel 
const doctorProfile = async (req, res) => {
    try {
         const docId = req.docId;
         const profileData = await doctorModel.findById(docId).select('-password')
         if (!profileData) {
            return res.json({ success: false, message: "Doctor not found" });
        }
        res.json({ success: true, profileData })
        
    } catch (error) {
         console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api to update doctor profile
const updateDoctorProfile = async (req, res) => {
    const {fees,adrees} = req.body
    const docId = req.docId;

    await doctorModel.findByIdAndUpdate(docId, { fees, adrees })
    res.json({ success: true, message: "Profile updated successfully" })

    try {

    } catch (error) {
         console.log(error)
        res.json({ success: false, message: error.message })    
    }
}

// api for doctor to cancel appointment docror pannel
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const docId = req.docId;
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }
        console.log(`{docId} ${docId} appointmentData.docId ${appointmentData.docId}`);


        if (appointmentData.docId !== docId) {
            return res.json({ success: false, message: "You are not authorized to cancel this appointment" });
        }

        await appointmentModel.findByIdAndDelete(appointmentId, { cancelled: true });
        const { slotDate, slotTime } = appointmentData
        const docData = await doctorModel.findById(docId);
        let slots_booked = docData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        res.json({ success: true, message: "Appointment cancelled successfully" });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { doctorList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentComplete ,doctorDashboard,updateDoctorProfile,doctorProfile}