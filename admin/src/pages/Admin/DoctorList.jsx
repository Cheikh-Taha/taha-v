import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'

const DoctorList = () => {
  const {doctors,aToken,getAllDoctors} = useContext(AdminContext)

  useEffect(()=>{
    if (aToken) {
      getAllDoctors()
    }
  },[aToken])

  return (
    <div className='m-5 max-h-[90vh]  overflow-y-scroll'>
      <h1 className='text-lg font-bold'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item,index)=>(
            <div  className='rounded-xl max-w-56 overflow-hidden cursor-pointer group hover:grayscale-50 hover:brightness-90' key={index}>
             <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white relative" key={index}>
      <img
        className="w-full h-80 object-cover"
        src={item.image} // Replace with actual image path
        alt="John Ramirez"
      />
      <div className="absolute bottom-0 bg-gradient-to-t from-black/70 to-transparent w-full p-4">
        <h2 className="text-white text-xl font-semibold">{item.name} </h2>
        <p className="text-white text-sm">{item.speciality} </p>
        <p className="text-white text-sm">{item.ville} </p>

      </div>
    </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorList

