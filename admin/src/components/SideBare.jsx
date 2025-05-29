import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import {AdminContext} from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'



const SideBare = () => {
  const {aToken,setAToken} = useContext(AdminContext)
  
      const logout = ()=>{
          navigate('/')
          aToken && setAToken('')
          aToken && localStorage.removeItem('aToken')
      }
      const navigate  = useNavigate()

  return (
    <div className='min-h-screen bg-white border-r'>
      <div className='flex flex-col md:flex-row items-center gap-2 text-xs'>
                  <img className='h-15' src={assets.docBook}/>
                  <p className='font-bold text-gray-500 p-1 border-2 rounded-4xl '>{aToken ? 'Admin Pannel' : 'Doctor Pannel'}</p>
              </div>
      
      {
        aToken && <ul className='text-gray-700 mt-5'>
          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-amber-500':''}`} to={'/admin-dashboard'}>
            <img src={assets.home_icon} />
            <p>DashBoard</p>
          </NavLink>

          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-amber-500':''}`}  to={'/all-appoitement'}>
            <img src={assets.appointment_icon} />
            <p>Rendez-vous</p>
          </NavLink>

          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-amber-500':''}`}  to={'/add-doctor'}>
            <img src={assets.add_icon} />
            <p>Ajouter un médecin</p>
          </NavLink>

          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-amber-500':''}`}  to={'/doctor-list'}>
            <img src={assets.people_icon} />
            <p>Liste des médecins</p>
          </NavLink>
        </ul>
      }
      <div className='flex justify-center items-end mt-10'>
      <button onClick={logout} className='transition delay-100 duration-300 ease-in-out  font-bold text-gray-500 px-10 py-2 border-2 rounded-4xl hover:cursor-pointer hover:bg-black hover:text-orange-50'>Déconnexion</button>

      </div>
    </div>
  )
}

export default SideBare