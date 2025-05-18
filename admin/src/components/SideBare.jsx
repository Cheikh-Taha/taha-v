import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import {AdminContext} from '../context/AdminContext'


const SideBare = () => {

  const {aToken} = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r'>
      {
        aToken && <ul className='text-gray-700 mt-5'>
          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-amber-500':''}`} to={'/admin-dashboard'}>
            <img src={assets.home_icon} />
            <p>DashBoard</p>
          </NavLink>

          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-amber-500':''}`}  to={'/all-appoitement'}>
            <img src={assets.appointment_icon} />
            <p>Appoitement</p>
          </NavLink>

          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-amber-500':''}`}  to={'/add-doctor'}>
            <img src={assets.add_icon} />
            <p>AddDoctor</p>
          </NavLink>

          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-amber-500':''}`}  to={'/doctor-list'}>
            <img src={assets.people_icon} />
            <p>Doctor List</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default SideBare