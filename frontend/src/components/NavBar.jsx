import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const NavBar = () => {

  const navigate = useNavigate();

  const {token,setToken,userData} = useContext(AppContext)

  const [ShowMenu,setShowMenu]=useState(false);

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    navigate('/')
  }


  return (
    <div className='flex items-center justify-between text-sm py-2 border-b border-b-gray-400'>
      <img onClick={()=>navigate('/')} className='w-35 cursor-pointer' src={assets.BookDoc} alt="" />
      <ul className='hidden md:flex items-start gap-7 font-medium'>
        <NavLink to='/'>
            <li className='py-1'>Accueil</li>
            <hr className='border-none outline-none h-0.5 bg-blue-800 w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to = '/doctors/'>
            <li className='py-1'>Médecins</li>
            <hr className='border-none outline-none h-0.5 bg-blue-800 w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to = '/about'>
            <li className='py-1'>À propos</li>
            <hr className='border-none outline-none h-0.5 bg-blue-800 w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to = '/contact'>
            <li className='py-1'>Chat Ai</li>
            <hr className='border-none outline-none h-0.5 bg-blue-800 w-3/5 m-auto hidden' />
        </NavLink>
      </ul>
    <div className='flex items-center gap-4'>
      {
        token  && userData
        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
          <img className='w-8 rounded-full' src={userData.image}/>
          <img className='w-2.5 ' src={assets.dropdown_icon}/>
          <div className='absolute top-0 right-0 pt 14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
            <div className='min-w-48 bg-stone-100 mt-12 rounded flex flex-col gap-4 p-4'>
              <p onClick={()=>navigate("my-profil")} className='hover:text-black cursor-pointer'>Mon profil</p>
              <p onClick={()=>navigate("my-appointment")} className='hover:text-black cursor-pointer'>Mes rendez-vous</p>
              <p onClick={logout} className='hover:text-black cursor-pointer'>Déconnexion</p>           
            </div>
          </div>
        </div>
        :<button onClick={()=>navigate("/login")} className='bg-blue-700 text-white px-8 py-3 rounded-full font-medium hedden transition-all duration-100 ease-in-out transform hover:bg-blue-900 hover:scale-105 '>Connexion</button>

      }
      <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} />
      {/*----------------Mobile Menu------------------ */}
      <div className={`${ShowMenu ? 'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
        <div className='flex items-center justify-between px-5 py-6'>
          <img className='w-50' src={assets.BookDoc} alt="" />
          <img className='w-9' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
        </div>
        <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-2xl font-medium'>
          <NavLink className="py-2 border-b-2 border-amber-500" to='/'  onClick={()=>setShowMenu(false)}>Home</NavLink>
          <NavLink className="py-2 border-b-2 border-amber-500" to='/doctors' onClick={()=>setShowMenu(false)}>All doctors</NavLink>
          <NavLink className="py-2 border-b-2 border-amber-500" to='/about' onClick={()=>setShowMenu(false)}>About</NavLink>
          <NavLink className="py-2 border-b-2 border-amber-500" to='/' onClick={()=>setShowMenu(false)}>Chat Ai</NavLink>
        </ul>
      </div>
    </div>  
    </div>
  )
}

export default NavBar