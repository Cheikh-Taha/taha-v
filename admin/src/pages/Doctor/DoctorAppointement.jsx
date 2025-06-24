import React from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointement = () => {
  const { dToken, getAppointments, appointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-7xl m-5'>
      <p className='text-4xl font-bold mb-3'>Tous les Reservation</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[50vh]'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] bg-gray-100 text-gray-600 font-medium p-3'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date et Heure</p>
          <p>Frais de rendez-vous</p>
          <p>Action</p>

        </div>
        {
          appointments.map((item, index) => (
            <div className='pt-2 pb-2 flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] gap-1 items-center text-gray-500 px-6 border-b hover:bg-gray-50' key={index}>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-9 rounded-full' src={item.userData.image} alt="" />
                <p>{item.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)} ,{item.slotTime} </p>
              <p>{item.amount} {currency} </p>
              {

                item.cancelled
                  ? <p>Reservation est annulee</p>
                  : item.isCompleted
                    ? <p>Reservation est Complete</p>
                    : <div className='flex'>
                      <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                      <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                    </div>
              }

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default DoctorAppointement