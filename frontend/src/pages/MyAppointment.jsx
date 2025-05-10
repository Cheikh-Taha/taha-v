import React, { useContext } from 'react'
import {AppContext} from '../context/AppContext'

const MyAppointment = () => {

  const {doctors} = useContext(AppContext)

  return (
    <div>
      <p className='pb-3 mt-12 text-zinc-700 border-b font-medium'>My Appointments</p>
      <div>
        {doctors.slice(0,2).map((item,index) =>(
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-700'>
              <p className='text-neutral-800 font-semibold'>{item.name}</p>
              <p>{item.speciality}</p>
              <p className='font-medium text-zinc-700 mt-1'>Address:</p>
              <p className='text-xs'>{item.address.line1}</p>
              <p className='text-xs'>{item.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-sm font-medium text-neutral-700'>Date & Time:</span>25, July, 2025 | 8:30 pm</p>
            </div>
            <div></div>
            <div className='flex flex-col justify-end gap-2'>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-600 hover:text-white transition-all duration-150 cursor-pointer'>Pay Onlign</button>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-150 cursor-pointer'>cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointment
