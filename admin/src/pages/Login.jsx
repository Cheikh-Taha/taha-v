import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets' 
import {AdminContext} from '../context/AdminContext'
import axios from 'axios'
import {toast} from 'react-toastify'

const Login = () => {

  const [state,setState] = useState('Admin')
  const {setAToken,backendUrl} = useContext(AdminContext)

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const onSubmitHandler = async(event)=>{
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
        if (data.success) {
          localStorage.setItem('aToken',data.token)
          setAToken(data.token)


        }else{
          toast.error(data.message)
        }
        
      }else{

      }
    } catch (error) {
      
    }
  }
  return (
    <form onSubmit={onSubmitHandler}>
        <div className='flex flex-col md:flex-row flex-wrap rounded-lg'>
              {/*-----Left side------*/}
              <div className='hidden lg:block lg:'>
                  <img className='rounded-lg h-screen ' src={assets.signinBackground}/>
              </div>
      
              {/*-----Right side------*/}
              <div className='flex flex-col items-center justify-center  md:m-auto'>
                  {
                    state === "Admin"
                    ?<p className='mb-2 mt-20 text-3xl font-bold md:text-4xl md:mt-0 lg:text-5xl'><span className='text-amber-500'>Admin</span> Login</p>
                    :<p className='mb-2 mt-20 text-3xl font-bold md:text-4xl md:mt-0 lg:text-5xl'><span className='text-cyan-500'>Doctor</span> Login</p>

                  }
                  <div className='flex flex-col'>
                   
                      <label className='mb-0.5'>E-mail</label>
                      <input className='mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' type='email' placeholder="Entrer l'adresse e-mail" onChange={(e)=>setEmail(e.target.value)} value={email} required></input>
                      <label className='mb-0.5'>mode passe</label>
                      <input className='mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' type='password' placeholder='Entrer Password' onChange={(e)=>setPassword(e.target.value)} value={password} required></input>
                      <button className=' text-center gap-2 mt-5 bg-blue-400  border-blue-400 border-3 text-white font-bold py-2 px-30 rounded-xl hover:cursor-pointer hover:bg-blue-500 '>Connexion</button>
                      

                  </div>

                  {
                    state === "Admin"
                    ? <p className='mt-2'>Doctor Login? <span className='hover:cursor-pointer underline' onClick={()=>setState('Doctor')}>Click here</span></p>
                    : <p className='mt-2'>Admin Login? <span className='hover:cursor-pointer underline' onClick={()=>setState('Admin')}>Click here</span></p>
                  }
                  
              </div>
      
          </div>
     
    </form>
  )
}

export default Login