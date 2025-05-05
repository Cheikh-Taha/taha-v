import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';


const Doctors = () => {
  const navigate = useNavigate();
  const {speciality} = useParams();

  const [filterDoc,setFilterDoc] = useState([]);
  const {doctors} = useContext(AppContext);

  
  
  const applyFilter = ()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setFilterDoc(doctors)
    }
  }
  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])
  return (
    <div>
      
      <p className='text-gray-600'>Recherches par spécialité</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        
        <div className='flex-col w-50 gap-4  text-gray-600'>
          <p onClick={()=>speciality === 'General physician'? navigate('/doctors') : navigate('/doctors/physician')} className='mb-2 p-2 border border-gray-600 rounded-3xl text-center hover:cursor-pointer hover:bg-gray-200'>Médecin généraliste</p>
          <p onClick={()=>speciality === 'Gynecologist'? navigate('/doctors') : navigate('/doctors/Gynecologist')} className='mb-2 p-2 border border-gray-600 rounded-3xl text-center hover:cursor-pointer hover:bg-gray-200'>Gynécologue</p>
          <p onClick={()=>speciality === 'Dermatologist'? navigate('/doctors') : navigate('/doctors/Dermatologist')} className='mb-2 p-2 border border-gray-600 rounded-3xl text-center hover:cursor-pointer hover:bg-gray-200'>Dermatologue</p>
          <p onClick={()=>speciality === 'Pediatricians'? navigate('/doctors') : navigate('/doctors/Pediatricians')} className='mb-2 p-2 border border-gray-600 rounded-3xl text-center hover:cursor-pointer hover:bg-gray-200'>Pédiatres</p>
          <p onClick={()=>speciality === 'Neurologist'? navigate('/doctors') : navigate('/doctors/Neurologist')} className='mb-2 p-2 border border-gray-600 rounded-3xl text-center hover:cursor-pointer hover:bg-gray-200'>Neurologue</p>
          <p onClick={()=>speciality === 'Gastroenterologist'? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className='mb-2 p-2 border border-gray-600 rounded-3xl text-center hover:cursor-pointer hover:bg-gray-200'>Gastro-entérologue</p>
  
        </div>
        <div className='w-full grid [grid-template-columns:repeat(auto-fill,_minmax(200px,_1fr))] gap-4 gap-y-6'>
          {
            filterDoc.map((item,index)=>(
              <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-200' key={index}>
                  <img className='bg-blue-100' src={item.image} alt="" />
                  <div className='p-4'>
                      <div className='flex items-center text-sm gap-2 text-center text-green-500'>
                          <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                      </div>
                      <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                      <p className='text-gray-600 text-sm'>{item.speciality}</p>
                  </div>
              </div>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors
