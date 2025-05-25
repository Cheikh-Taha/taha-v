import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllApoitement = () => {

  const {appointments, aToken, getAllAppointment, cancelAppointment} = useContext(AdminContext)
  const {calculateAge,slotDateFormat,currency} = useContext(AppContext)

  
  useEffect(() => {
    if (aToken) {
      getAllAppointment()
    }
  },[aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grig-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div key={item.id || index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-400 py-3 px-6 border-b hover:bg-gray-200 transition-all duration-150'>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-10 h-10 rounded-full' src={item.userData.image} alt="" />
              <p className='text-gray-800'>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{item.userData.dob ? calculateAge(item.userData.dob) : '--'}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-10 h-10 rounded-full bg-gray-200' src={item.docData.image} alt="" />
              <p className='text-gray-800'>{item.docData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
            
          </div>
        ))}

      </div>

    </div>
  )
}

export default AllApoitement