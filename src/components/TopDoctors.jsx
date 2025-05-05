import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

  const navigate = useNavigate();

  const {doctors} = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Les meilleurs médcins à réserver</h1>
      <div className='w-full grid [grid-template-columns:repeat(auto-fill,_minmax(200px,_1fr))] gap-4 pt-5 gap-y-6 sm:px-0 '>
        {doctors.slice(0,10).map((item,index)=>(
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
        ))}
      </div>
      <button onClick={()=>{navigate('/doctors') ; scrollTo(0,0)}} className='bg-blue-100 text-gray-600 px-12 py-3 rounded-full mt-10 transition-all duration-100 ease-in-out transform hover:bg-blue-200 hover:scale-105'>Plus</button>
    </div>
  )
}

export default TopDoctors
