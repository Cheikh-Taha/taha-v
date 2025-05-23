import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';

const MyProfil = () => {


const {userData,setUserData}= useContext(AppContext)

  const [isEdite,setIsEdite] = useState(false);
  return (
    <div className='flex flex-col md:flex-row justify-start'>
      <div className='m-auto md:m-3'>
      <img className='mt-3 mb-3 rounded-full' src={userData.image}/>
      </div>
      <div className='m-auto md:mx-9'>
      
      
      <div>
        <p>User Information :</p>
        <hr className='mb-5'/>
        <p>Username :</p>
      
        {
        isEdite
        ?<input className='font-bold w-full max-w-70 mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 ' type='text' value={userData.name} onChange={e =>setUserData(prev =>({...prev,name:e.target.value}))}/>
        :<p className='font-bold max-w-70 mb-1 bg-white border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 '>{userData.name}</p>
        }
        <div>
          <p>Email :</p>
          <p className='font-bold max-w-70 mb-1 bg-white border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 '>{userData.email}</p>
          <p>Phone :</p>
          {
            isEdite
            ?<input className='font-bold w-full max-w-70 mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 ' type='text' value={userData.phone} onChange={e =>setUserData(prev =>({...prev,phone:e.target.value}))}/>
            :<p className='font-bold max-w-70 mb-1 bg-white border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 '>{userData.phone}</p>
          }
          
          
        </div>
      </div>
      <div>
        <p>Basic info :</p>
        <hr className='mb-5'/>
        <div>
          <p>Gender :</p>
          {
            isEdite 
            ? <select className='border border-gray-400' onChange={(e)=>setUserData(prev => ({...prev,gender:e.target.value}))} value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : <p>{userData.gender}</p>
          }

          <p>Annee :</p>
          {
            isEdite 
            ? <input type="date" onChange={(e)=>setUserData(prev => ({...prev,dob:e.target.value}))} value={userData.dob}/>
            : <p>{userData.dob}</p>
          }

        </div>
      </div>
      <div>
        {
          isEdite
          ? <button className='text-center gap-2 mt-4 bg-white border-blue-400 border-3 text-blue-400 font-bold py-2 px-30 rounded-xl hover:cursor-pointer hover:bg-blue-400 hover:text-white' onClick={()=>setIsEdite(false)}>Save</button>
          : <button className='text-center gap-2 mt-4 bg-white border-blue-400 border-3 text-blue-400 font-bold py-2 px-30 rounded-xl hover:cursor-pointer hover:bg-blue-400 hover:text-white' onClick={()=>setIsEdite(true)}>Edite</button>
        }
      </div>
      </div>
    </div>
  )
}

export default MyProfil
