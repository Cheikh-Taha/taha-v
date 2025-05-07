import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Appointment = () => {

  const {docId} = useParams()
  const {doctors,currencySymbol} = useContext(AppContext)
  const [docInfo,setDocInfo] = useState(null)

  const fetchDocInfo = async() => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    
  }

  useEffect(() => {
    fetchDocInfo()
  },[doctors,docId])


  return docInfo && (
    <div>
      {/*--Information du docteur--*/}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-blue-500 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1  border border-gray-400 rounded-lg p-8 py-7 bg-wight mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
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
      
    </div>
  )
}

export default Appointment
