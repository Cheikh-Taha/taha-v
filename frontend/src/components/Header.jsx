import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const Header = () => {
  const navigate =useNavigate();
  const {backEndUrl,token,setToken} = useContext(AppContext)
  const [state,setState] = useState('');

  

  
  return (
       <section
      className="relative bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-cover bg-center h-screen flex items-center justify-center"
    >
       <img
    src={assets.background} // Dynamic image source
    alt="Background"
    className="hidden md:block absolute inset-0 w-full h-full object-cover"
  />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white pt-50 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
         Reservation En Ligne <br />Avec Meilleur Doctors
        </h1>
        <p className="text-lg mb-6">
          Parcourez simplement notre vaste liste de médecins de confiance et prenez rendez-vous en toute simplicité.
        </p>
        {
          token ?
            <button onClick={()=>{navigate('/doctors');window.scrollTo(0,0)}} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-md transition">
          CONSULTEZ NOS SERVICES
        </button>
           : 
            <button onClick={()=>{navigate('/login');window.scrollTo(0,0)}} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-md transition">
          CONSULTEZ NOS SERVICES
        </button>
           
        }
        
      </div>
    </section>
  )
}

export default Header
