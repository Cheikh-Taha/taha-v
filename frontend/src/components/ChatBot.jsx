import React from 'react'
import { assets } from '../assets/assets'

const chatBot = () => {
  return (
    <div className='flex-col xl:flex flex-row pt-0 pr-0 space-x-60 '>
       <div className='md:w-1/2 flex flex-col items-center  gap-4 py-10 '>
         <img className='w-100 pt-20 pl-12 ' src={assets.chatLogo} alt="" />
         <h2 className="text-xl text-center md:text-6xl font-bold pl-2  text-gray-800 mb-2">Aide Instantanée <span className="text-blue-600 pl-25 text-center">Avec AI</span></h2>
         <p className="text-sm text-center text-gray-500 mb-4 pl-10 ">Discutez avec notre assistant intelligent pour trouver le bon médecin.</p>
        </div>
        <div className="flex justify-end pt-0 pr-0">
          <img src={assets.chat} className="w-55 md:w-120 pt-0 pr-0 rounded" />
        </div>
    </div>
  )
}

export default chatBot
