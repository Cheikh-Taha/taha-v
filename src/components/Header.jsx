import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-red-600 rounded-lg px-6 md:px-10 lg:px-20'>
        {/*----left----*/}
       <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
          <h1 className="text-4xl font-bold text-white mb-2 ">Reservation En Ligne <br />Avec Meilleur Doctors</h1>
          <p className="flex flex-col md:flex-row items-center gap-3 font-semibold text-white text-base mb-6 max-w-xl mx-auto">
            Parcourez simplement notre vaste liste de médecins de confiance et prenez rendez-vous en toute simplicité.
          </p>
          <a href='#speciality' className="bg-white text-blue-500 px-8 py-3 rounded-full font-medium hedden transition-all duration-100 ease-in-out transform hover:bg-gray-200 hover:scale-105" >
          Réserver en Ligne
          </a>
       </div>
       <div className='md:w-1/2 relative'>
        {/*-----right-----*/}
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.doc1}/>

       </div>
      

    </div>
  )
}

export default Header
