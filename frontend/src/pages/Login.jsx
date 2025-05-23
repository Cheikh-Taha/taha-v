import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';





const Login = () => {

  const {backEndUrl,token,setToken} = useContext(AppContext)
  const navigate = useNavigate();
  const [state,setState] = useState('Sign in');

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const onSubmitHandler = async(event)=>{
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const {data} = await axios.post(backEndUrl + '/api/user/register',{name,email,password})
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else {
          toast.error(data.message) 
        } 
      }else {
        const {data} = await axios.post(backEndUrl + '/api/user/login',{email,password})
        
          if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
          }else {
          toast.error(data.message) 
          } 
       
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center '>
        <div className='flex flex-col md:flex-row flex-wrap rounded-lg lg:space-x-10'>
              {/*-----Left side------*/}
              <div className='hidden lg:block lg:size-95 xl:size-110'>
                  <img className='rounded-lg  ' src={assets.signinBackground}/>
              </div>
      
              {/*-----Rign side------*/}
              <div className='flex flex-col  m-auto'>
                  {
                    state === "Sign Up"
                    ?<p className='mb-2 text-3xl font-bold md:text-4xl lg:text-5xl'>Créer un nouveau<br/> compte gratuitement</p>
                    :<p className='mb-2 text-3xl font-bold md:text-4xl lg:text-5xl'>login a votre Compte</p>

                  }
                  <div className='flex flex-col'>
                    {
                       state === "Sign Up"
                       && <div><label className='mb-0.5'>Username</label>
                       <input className='w-full mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5' type='text' placeholder="Entrer Username" onChange={(e)=>setName(e.target.value)} required></input>
                      </div>
                    }
                      <label className='mb-0.5'>E-mail</label>
                      <input className='mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' type='email' placeholder="Entrer l'adresse e-mail" onChange={(e)=>setEmail(e.target.value)} required></input>
                      <label className='mb-0.5'>mode passe</label>
                      <input className='mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' type='password' placeholder='Entrer Password' onChange={(e)=>setPassword(e.target.value)} required></input>
                      <button type='submit' className=' text-center gap-2 mt-5 bg-blue-400  border-blue-400 border-3 text-white font-bold py-2 px-30 rounded-xl '>{state == "Sign Up"?"Create account":"Connexion"}</button>
                      {
                        state === "Sign Up"
                        ? <button onClick={()=>setState('login')} className=' text-center gap-2 mt-4 bg-white border-blue-400 border-3 text-blue-400 font-bold py-2 px-30 rounded-xl '>Vous avez deja un compte</button>
                        : <button onClick={()=>setState('Sign Up')} className=' text-center gap-2 mt-4 bg-white border-blue-400 border-3 text-blue-400 font-bold py-2 px-30 rounded-xl '>S'inscrire</button>

                      }

                  </div>
                  
              </div>
      
          </div>
     
    </form>
  )
}

export default Login
