import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Appointment = () => {

  const {docId} = useParams()
  const {doctors,currencySymbol} = useContext(AppContext)
  const [docInfo,setDocInfo] = useState(null)
  const[docSlots,setDocSlots] = useState([])
  const[slotIndex,setSlotIndex] = useState(0)
  const[slotTime,setSlotTime] = useState('')
  const dayOfWeek = ['SUN','MON','TUE','WED','THU','FRE','SAT']

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
        //-add slots to array
        timeSlots.push({
          datetime : new Date(currentDate),
          time : formattedTime
        })
        //-Increment time by 30mn
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => ([...prev,timeSlots]))
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
      <div className='flex flex-col sm:flex-row  gap-4'>
        <div>
          <img className='bg-blue-400  w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1  border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 '>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name} 
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            {docInfo.degree} - {docInfo.speciality}
            <button className='px-1 py-1 border text-xs rounded-full '>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee  <span className='text-gray-700'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
      {/*----Booking slots---*/}

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p className='px-4 py-2'>Booking slot</p>
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
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-medium flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-500 text-white' : 'text-gray-400 border border-gray-300'}`}>
              {item.time.toLowerCase()}
            </p>
          ))}
         </div>
         <button className='bg-blue-500 text-white text-sm font-medium px-14 py-3 rounded-full my-6'>Book an appointment</button>

      </div>

     
      
    </div>
  )
}

export default Appointment
