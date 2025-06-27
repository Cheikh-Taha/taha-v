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
          <p onClick={()=>speciality === 'Médecine générale'? navigate('/doctors') : navigate('/doctors/Médecine générale')} className='mb-2 p-2 border border-gray-600 rounded-3xl text-center hover:cursor-pointer hover:bg-gray-200'>Médecine générale</p>
          <p onClick={()=>speciality === 'Gynécologie et obstétrique'? navigate('/doctors') : navigate('/doctors/Gynécologie et obstétrique')} className='mb-2 p-2 border border-gray-600 rounded-3xl text-center hover:cursor-pointer hover:bg-gray-200'>Gynécologie et obstétrique</p>
          <p onClick={()=>speciality === 'Dermatologie'? navigate('/doctors') : navigate('/doctors/Dermatologie')} className='mb-2 p-2 border border-gray-600 rounded-3xl text-center hover:cursor-pointer hover:bg-gray-200'>Dermatologie</p>
          <p onClick={()=>speciality === 'Pédiatrie'? navigate('/doctors') : navigate('/doctors/Pédiatrie')} className='mb-2 p-2 border border-gray-600 rounded-3xl text-center hover:cursor-pointer hover:bg-gray-200'>Pédiatrie</p>
          <p onClick={()=>speciality === 'Neurologue'? navigate('/doctors') : navigate('/doctors/Neurologue')} className='mb-2 p-2 border border-gray-600 rounded-3xl text-center hover:cursor-pointer hover:bg-gray-200'>Neurologue</p>
          <p onClick={()=>speciality === 'Gastro-entérologue'? navigate('/doctors') : navigate('/doctors/Gastro-entérologue')} className='mb-2 p-2 border border-gray-600 rounded-3xl text-center hover:cursor-pointer hover:bg-gray-200'>Gastro-entérologue</p>
  
        </div>
        <div className='w-full grid [grid-template-columns:repeat(auto-fill,_minmax(200px,_1fr))] gap-4 gap-y-6'>
          {
            filterDoc.map((item,index)=>(
              <div onClick={()=>navigate(`/appointment/${item._id}`)} className='overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-200' key={index}>
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
              </div>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors
