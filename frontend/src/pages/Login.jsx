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
    <form>
      <p>hahahh</p>
      <img src= {assets.signinBackground} />
     
    </form>
  )
}

export default Login
