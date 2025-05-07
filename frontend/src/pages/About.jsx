import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
     <h1 className='text-center text-4xl font-bold text-gray-600'>ABOUT US</h1>
     <div className='my-7 flex flex-col md:flex-row gap-12'>
      <img className='w-full md:max-w-[600px]' src={assets.about_image}/>
      <div className='flex flex-row justify-center pt-3'>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur rem dolor mollitia, impedit architecto sint doloribus provident vero rerum beatae dignissimos quas adipisci. Pariatur consequuntur, quisquam nemo iure quasi id?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur rem dolor mollitia, impedit architecto sint doloribus provident vero rerum beatae dignissimos quas adipisci. Pariatur consequuntur, quisquam nemo iure quasi id?</p>
      </div>
     </div>
    </div>
  )
}

export default About
