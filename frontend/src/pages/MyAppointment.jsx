import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import CancelAppo from '../components/CancelAppo';


const MyAppointment = () => {

  const { backEndUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const months = ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul", "Aut", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return '';
    const dateArray = slotDate.split('_');
    return dateArray[0] + ' ' + months[Number(dateArray[1]) - 1] + ' ' + dateArray[2];
  };


  const getUserAppointments = async () => {

    try {

      const { data } = await axios.get(backEndUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backEndUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
  }
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const handleCancelClick = (id) => {
    setSelectedAppointmentId(id);
    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    await cancelAppointment(selectedAppointmentId);
    setShowModal(false);
    setSelectedAppointmentId(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAppointmentId(null);
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 text-zinc-700 border-b font-medium'>Mes Rendez-vous</p>
      <div>
        {appointments.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' >
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-700'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='font-medium text-zinc-700 mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address}</p>
              <p className='text-xs mt-1'><span className='text-sm font-medium text-neutral-700'>Date & Time: </span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col justify-end gap-2'>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-600 hover:text-white transition-all duration-150 cursor-pointer'>Obtenir reçu</button>
              <button onClick={() => handleCancelClick(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-150 cursor-pointer'>Annuler la reservation</button>
            </div>
          </div>
        ))}
        <CancelAppo
          show={showModal}
          onCancel={handleModalClose}
          onConfirm={handleConfirmCancel}
          message="Are you sure you want to cancel this appointment?"
        />
      </div>
    </div>
  )
}

export default MyAppointment
