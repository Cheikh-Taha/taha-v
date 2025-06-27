import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import CancelAppo from '../components/CancelAppo';


const MyAppointment = () => {

  const { backEndUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const months = ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul", "Aut", "Sep", "Oct", "Nov", "Dec"];

 function formatTimestamp(timestamp) {
  const date = new Date(Number(timestamp));
  // Example: "2025-07-27 14:21:20"
  return date.getFullYear() + '-' +
    String(date.getMonth() + 1).padStart(2, '0') + '-' +
    String(date.getDate()).padStart(2, '0') + ' ' +
    String(date.getHours()).padStart(2, '0') + ':' +
    String(date.getMinutes()).padStart(2, '0') + ':' +
    String(date.getSeconds()).padStart(2, '0');
}


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

  const handleGetReceipt = async (appointmentId) => {
  try {
    const response = await axios.get(
      backEndUrl + `/api/user/receipt/${appointmentId}`,
      {
        headers: { token },
        responseType: 'blob', // Important for binary data
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'receipt.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    //toast.error("Erreur lors du téléchargement du reçu");
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
              <p className='text-xs'>{item.docData.addresse}</p>
              <p className='text-xs mt-1'><span className='text-sm font-medium text-neutral-700'>Date & Time: </span> {formatTimestamp(1750963280775)}</p>
            </div>
            <div></div>
            <div className='flex flex-col justify-end gap-2'>
              <button onClick={() => handleGetReceipt(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-600 hover:text-white transition-all duration-150 cursor-pointer'>Obtenir reçu</button>
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
