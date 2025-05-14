import React, { useState } from 'react'
import { assets } from '../assets/assets';





const Login = () => {


  const [state,setState] = useState('Sign Up');

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const onSubmitHandler = async(event)=>{
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmitHandler}>
        <div className='flex flex-col md:flex-row flex-wrap rounded-lg'>
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
                       <input className='w-full mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5' type='text' placeholder="Entrer Username" onChange={(e)=>setName(e.target.name)} required></input>
                      </div>
                    }
                      <label className='mb-0.5'>E-mail</label>
                      <input className='mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' type='email' placeholder="Entrer l'adresse e-mail" onChange={(e)=>setEmail(e.target.name)} required></input>
                      <label className='mb-0.5'>mode passe</label>
                      <input className='mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' type='password' placeholder='Entrer Password' onChange={(e)=>setPassword(e.target.name)} required></input>
                      <button className=' text-center gap-2 mt-5 bg-blue-400  border-blue-400 border-3 text-white font-bold py-2 px-30 rounded-xl '>{state == "Sign Up"?"Create account":"Connexion"}</button>
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
