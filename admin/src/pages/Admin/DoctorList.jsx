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
              <img className='bg-amber-200 group-hover:bg-amber-500 transition-all duration-500' src = {item.image}/>  
              <div className='text-center'>
                <p className='text-lg font-bold mt-1'>{item.name}</p>
                <p className='text-gray-600'>{item.speciality}</p>
                <p className='text-gray-600'>{item.ville}</p>
                
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorList