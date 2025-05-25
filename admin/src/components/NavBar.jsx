import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'

const NavBar = () => {
    const {aToken,setAToken} = useContext(AdminContext)

    const logout = ()=>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
    }
    const navigate  = useNavigate()

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img className='h-15' src={assets.docBook}/>
            <p className='font-bold text-gray-500 p-1 border-2 rounded-4xl '>{aToken ? 'Admin Pannel' : 'Doctor Pannel'}</p>
        </div>
        <button onClick={logout} className='transition delay-100 duration-300 ease-in-out  font-bold text-gray-500 px-10 py-2 border-2 rounded-4xl hover:cursor-pointer hover:bg-black hover:text-orange-50'>Logout</button>
    </div>
  )
}

export default NavBar