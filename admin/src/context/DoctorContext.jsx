import { useState } from "react"
import { createContext } from "react"
import axios from "axios"
import {toast} from 'react-toastify'


export const DoctorContext = createContext()

const DoctorContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken,setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)
    const [profileData,setProfileData] = useState(false)

    const getAppointments = async () => {

        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/appointments',{headers:{dToken}})
            
            if (data.success) {
                setAppointments(data.appointments.reverse())
                console.log('data')
                console.log(data.appointments);
                
                
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong while fetching appointments')
            
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
            if (data.success) {
                toast.success('Appointment completed successfully')
                getAppointments() // Refresh appointments after completion
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong while completing appointment')
            
        }

    }
     const cancelAppointment = async (appointmentId) => {
        try {
            console.log(appointmentId);
            const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
            if (data.success) {
                toast.success('Appointment cancel successfully')
                getAppointments() // Refresh appointments after completion
            } else {
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong while completing appointment')
            
        }

    }
    const getDashdata = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dToken } })

            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData);
                
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } })
            if (data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData);
            } else {
                toast.error(data.message)
            }
            
        } catch (error) {
           onsole.log(error);
            toast.error(error.message) 
        }
    }


    const value = {
        dToken,setDToken,
        backendUrl,
        getAppointments,
        appointments,setAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,getDashdata,setDashData,
        getProfileData,profileData,setProfileData,
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
} 

export default DoctorContextProvider