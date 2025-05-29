import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

  const {docId} = useParams()
  const {doctors,currencySymbol,backEndUrl,token,getDoctorsData} = useContext(AppContext)
  const navigate = useNavigate()
  const [docInfo,setDocInfo] = useState(null)
  const[docSlots,setDocSlots] = useState([])
  const[slotIndex,setSlotIndex] = useState(0)
  const[slotTime,setSlotTime] = useState('')
  const dayOfWeek = ['DIMANCHE','LUNDI','MARDI','MERCREDI','JEUDI','VENDREDI','SAMEDI']

  const fetchDocInfo = async() => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    
  }
  const getAvailabeleSlots = async() => {
    setDocSlots([])
    //-Date courant
    let today = new Date()
    for(let i=0 ; i<7 ;i++ ){
      //-Geting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate()+i)
      //-Setting end time fo the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(18 , 0, 0, 0)
      //-Setting hours
      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 8 ? currentDate.getHours() + 1 : 8 )
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }else{
        currentDate.setHours(8)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while(currentDate <= endTime){
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true 
        });
        let day   = currentDate.getDate();
        let month = currentDate.getMonth()+1;
        let year  = currentDate.getFullYear();

        const slotDate = day +"_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
          //-add slots to array
        timeSlots.push({
          datetime : new Date(currentDate),
          time : formattedTime
        })
        }

        
        //-Increment time by 30mn
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => ([...prev,timeSlots]))
    }
  }

  const bookAppointment = async() => {
    if (!token) {
      toast.warn('login to book an appointment')
      return navigate('/login')
    }
    try {
      const date = docSlots[slotIndex][0].datetime

    let day   = date.getDay()
    let month = date.getMonth()+1
    let year  = date.getFullYear()

    const slotDate = day +"_" + month + "_" + year
    
    const {data} = await axios.post(backEndUrl + '/api/user/book-appointment',{docId, slotDate, slotTime},{headers:{token}})
    if (data.success) {
      toast.success(data.message)
      getDoctorsData()
      navigate('/my-appointment')
    }else{
      toast.error(data.message)
    } 

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
    
  }

  useEffect(() => {
    fetchDocInfo()
  },[doctors,docId])
   
  useEffect(() => {
    if (docInfo) getAvailabeleSlots(); 
  }, [docInfo]);
  
  useEffect(() => {
    console.log(docSlots);
  },[docSlots])


  return docInfo && (
    <div>
      {/*--Information du docteur--*/}
     <div className=" mx-auto bg-white shadow-lg rounded-xl overflow-hidden p-6">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Doctor Image */}
        <img
          src={docInfo.image} // Replace with real image
          alt="Doctor"
          className="bg-blue-400  w-full sm:max-w-72 rounded-lg"
        />

        {/* Doctor Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">Dr. Happy Heya</h2>
          <p className="text-gray-600">spécialité:</p>
          <p className="text-gray-700 font-medium mb-2">
            {docInfo.speciality} Specialist
          </p>

          <p className="text-sm text-gray-500 flex"> À propos &nbsp;<img src={assets.info_icon} alt="" /></p>
          <p className="text-gray-700 font-medium mb-2">
            {docInfo.about}
          </p>

          <div className="border-t pt-2 mt-2 text-sm">
            <span className="font-semibold text-gray-700">Frais de rendez-vous : </span>
            <span className="text-blue-600 font-semibold">{docInfo.fees}{currencySymbol}</span>{" "}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center text-sm text-gray-600">
        <div>
          <p className="font-semibold text-gray-800 text-base">{docInfo.experience} </p>
          <p>Total Experience</p>
        </div>
        
        <div>
          <p className="font-semibold text-gray-800 text-base">{docInfo.ville}</p>
          <p>Ville</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-base">
            Date De Rejoinement
          </p>
          <p> {Date(docInfo.date)} </p>
        </div>
      </div>

     
    </div>

      {/*----Booking slots---*/}

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p className='px-4 py-2'>Boîte de réservation:</p>
         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.map((item, index) => (
              item.length > 0 && ( 
                <div className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-500 text-white py-1 px-1' : 'border border-gray-200'}`}key={index} onClick={() => setSlotIndex(index)}>
                  <p>{dayOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0].datetime.getDate()}</p>
                </div>
              )
            ))
          }
         </div>
         <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item,index) =>(
            <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-medium flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-500 text-white' : 'text-gray-400 border border-gray-300'}`}>
              {item.time.toLowerCase()}
            </p>
          ))}
         </div>
         <button onClick={bookAppointment} className='bg-blue-500 text-white text-sm font-medium px-14 py-3 rounded-full my-6'>Prendre rendez-vous</button>

      </div>
      
    </div>
  )
}

export default Appointment
