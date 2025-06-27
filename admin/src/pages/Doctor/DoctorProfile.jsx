import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { useEffect } from 'react'
import { useState } from 'react'


const DoctorProfile = () => {
  const { dToken, getProfileData,profileData,setProfileData, } = useContext(DoctorContext)
  const {backendUrl} = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(()=>{
    if(dToken){
      getProfileData()
    }

  },[dToken])

   
  return profileData && (
   <div className="p-4 md:p-8 m-5">
      <h1 className="text-2xl font-bold mb-6">Doctor profile</h1>
     
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={profileData.image} 
            alt="Doctor"
            className="w-45 h-45 rounded-full object-cover border"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{profileData.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{profileData.speciality}</p>
            <div className="flex items-center gap-2 text-xl text-gray-600 mb-1">
              <span className="font-medium">Adresse:</span>
             {isEdit ? <input className='text-center border border-gray-700 rounded-xl' type="text" onChange={(e)=>setProfileData(prev => ({...prev,addresse : e.target.value}))} value={profileData.addresse} />: profileData.addresse}
            </div>
            <div className="flex items-center  gap-2 text-xl text-gray-600 mb-1">
              <span className="font-medium">Email:</span>
             {isEdit ? <input className=' text-center border border-gray-700 rounded-xl' type="email" onChange={(e)=>setProfileData(prev => ({...prev,email : e.target.value}))} value={profileData.email} />: profileData.email}
            </div>
            <div className="flex items-center mb-1 gap-2 text-xl text-gray-600">
              <span className="font-medium">experience:</span>
              {isEdit ? <input className='text-center border border-gray-700 rounded-xl' type="text" onChange={(e)=>setProfileData(prev => ({...prev,experience : e.target.value}))} value={profileData.experience} />: profileData.experience} 
            </div>
            <div className="flex items-center mb-1 gap-2 text-xl text-gray-600">
              <span className="font-medium">Frais de rendez-vous:</span>
              {isEdit ? <input className='text-center border border-gray-700 rounded-xl' type="number" onChange={(e)=>setProfileData(prev => ({...prev,fees : e.target.value}))} value={profileData.fees} />: profileData.fees}
            </div>
            <div className="flex items-center mb-1 gap-2 text-xl text-gray-600">
              <span className="font-medium">Ville:</span>
              {isEdit ? <input className='text-center border border-gray-700 rounded-xl' type="text" onChange={(e)=>setProfileData(prev => ({...prev,ville : e.target.value}))} value={profileData.ville} />: profileData.ville}
            </div>
           
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-2">À propos</h3>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            <li>
              
              {isEdit ? <textarea  rows="4" cols="50" className='border rounded px-3 py-2' placeholder='....' type="text" onChange={(e)=>setProfileData(prev => ({...prev,about : e.target.value}))} value={profileData.about} />: profileData.about}
            </li>
            
          </ul>
        </div>
        {
          isEdit
          ? <button onClick={()=>setIsEdit(false)} className='mt-4 transition delay-100 duration-300 ease-in-out  font-bold text-gray-500 px-10 py-2 border-2 rounded-4xl hover:cursor-pointer hover:bg-black hover:text-orange-50'>save</button>
          :
            <button onClick={()=>setIsEdit(true)} className='mt-4 transition delay-100 duration-300 ease-in-out  font-bold text-gray-500 px-10 py-2 border-2 rounded-4xl hover:cursor-pointer hover:bg-black hover:text-orange-50'>Edite</button>

        }
        

     
    </div>
  )
}

export default DoctorProfile