import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const DashBoard = () => {
  const { aToken, getDashData, dashData, getAllAppointment, cancelAppointment, slotDateFormat } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])


  return dashData && (
    <div className='m-5 items-center space-y-5 '>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-3xl border-2 border-gray-100 cursor-pointer hover:bg-gray-100 '>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
          <p className='text-gray-400 '>Doctors</p>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-3xl border-2 border-gray-100 cursor-pointer hover:bg-gray-100 '>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
          <p className='text-gray-400 '>Appointments</p>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-3xl border-2 border-gray-100 cursor-pointer hover:bg-gray-100 '>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
          <p className='text-gray-400 '>Patients</p>
        </div>
      </div>
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-xl border border-gray-100'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Booking</p>
        </div>
      </div>
      <div className='pt-4 border border-gray-100 rounded-xl bg-white'>
        {
          dashData.latestAppointments.map((item, index) => (
            <div key={index} className='flex items-center justify-between px-4 py-3 border-b border-gray-100'>
              <div className='flex items-center gap-3'>
                <img className='rounded-full w-10' src={item.docData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                </div>
              </div>
              <img onClick={async () => { await cancelAppointment(item._id); getDashData(); getAllAppointment() }} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DashBoard