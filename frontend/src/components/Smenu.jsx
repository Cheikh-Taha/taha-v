import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const Smenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800 bg-gray-100' id='speciality'>
        <h1 className='text-xl font-medium'>Rechercher par spécialité</h1>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
            {specialityData.map((item,index)=>(
                <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-200' key={index} to={`/doctors/${item.speciality}`}>
                    <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                    <p>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Smenu
