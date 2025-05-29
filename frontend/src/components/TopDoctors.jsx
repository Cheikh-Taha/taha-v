import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

  const navigate = useNavigate();

  const {doctors} = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900'>
      <section className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div>
<span className="inline-block bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
          Nos experts
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
         RENCONTREZ NOTRE ÉQUIPE D'EXPERTS MÉDECINS
        </h2>
        </div>
        
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Notre équipe de médecins qualifiés est dédiée à offrir des soins accessibles et personnalisés grâce à notre site de réservation de rendez-vous. Avec des compétences dans divers domaines médicaux, nous garantissons une prise en charge fiable et humaine. Ensemble, nous plaçons votre santé au cœur de nos priorités.
        </p>
      </div>
    </section>
      
      <div className='w-full grid [grid-template-columns:repeat(auto-fill,_minmax(200px,_1fr))] gap-4 pt-5 gap-y-6 sm:px-0 '>
        {doctors.slice(0,10).map((item,index)=>(
            <div onClick={()=>navigate(`/appointment/${item._id}`)} className='cursor-pointer hover:translate-y-[-10px] transition-all duration-200' key={index}>
                <div  className='rounded-xl md:max-w-56 overflow-hidden cursor-pointer group ' key={index}>
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
        ))}
      </div>
      <button onClick={()=>{navigate('/doctors') ; scrollTo(0,0)}} className='bg-blue-100 text-gray-600 px-12 py-3 rounded-full mt-10 transition-all duration-100 ease-in-out transform hover:bg-blue-200 hover:scale-105'>Plus</button>
    </div>
  )
}

export default TopDoctors
