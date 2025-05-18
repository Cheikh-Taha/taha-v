import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const [docImg,setDocImg] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [experience,setExperience] = useState('1 Ans')
  const [fees,setFees] = useState('')
  const [about,setAbout] = useState('')
  const [speciality,setSpeciality] = useState('Médecine générale')
  const [ville,setVille] = useState('Taroudant')
  const [addresse,setAddresse] = useState('')

  const {backendUrl,aToken} = useContext(AdminContext)

  const onSubmitHandler = async (event)=>{
    event.preventDefault()

    try {
      if (!docImg) {
        return toast.error('Image not selected')
      }
      const formData = new FormData()
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('speciality',speciality)
      formData.append('experience',experience)
      formData.append('ville',ville)
      formData.append('about',about)
      formData.append('fees',Number(fees))
      formData.append('addresse',addresse)

      formData.forEach((value,key)=>{
        console.log(`${key} : ${value}`)
      })
      const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}})
     if (data.success) {
        toast.success(data.message)
     }else{
      toast.error(data.message)
     }
      
    } catch (error) {
      
    }

  }
  

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border rounded w-full maw-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-25 h-25 border rounded-full hover:cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=> setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>{docImg ? 'Change picture profile' :'Upload Doctor Picture'}</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full  lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2' type='text' placeholder='Name' />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input  onChange={(e)=>setEmail(e.target.value)} value={email}  className='border rounded px-3 py-2' type='email' placeholder='Email' />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input  onChange={(e)=>setPassword(e.target.value)} value={password}  className='border rounded px-3 py-2' type='password' placeholder='Password' />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select  onChange={(e)=>setExperience(e.target.value)} value={experience}   className='border rounded px-3 py-2'>
                <option value="1 Ans">1 Ans</option>
                <option value="2 Ans">2 Ans</option>
                <option value="3 Ans">3 Ans</option>
                <option value="4 Ans">4 Ans</option>
                <option value="5 Ans">5 Ans</option>
                <option value="6 Ans">6 Ans</option>
                <option value="7 Ans">7 Ans</option>
                <option value="8 Ans">8 Ans</option>


              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e)=>setFees(e.target.value)} value={fees}  className='border rounded px-3 py-2' type='number' placeholder='Fees' />
            </div>


          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div  className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select  onChange={(e)=>setSpeciality(e.target.value)} value={speciality}   className='border rounded px-3 py-2'>
                <option value="Médecine générale">Médecine générale</option>
                <option value="Chirurgie">Chirurgie</option>
                <option value="Cardiologie">Cardiologie</option>
                <option value="Pédiatrie">Pédiatrie</option>
                <option value="Gynécologie et obstétrique">Gynécologie et obstétrique</option>
                <option value="Dermatologie">Dermatologie</option>

              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Ville</p>
              <select  onChange={(e)=>setVille(e.target.value)} value={ville}   className='border rounded px-3 py-2'>
                <option value="Taroudant">Taroudant</option>
                <option value="Errachidia">Errachidia</option>
                <option value="Tingher">Tingher</option>
                <option value="Fes">Fes</option>

              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Addresse</p>
              <input  onChange={(e)=>setAddresse(e.target.value)} value={addresse}   className='border rounded px-3 py-2' type='text' placeholder='Addresse' />
            </div>

          </div>
        </div>
        <div className='flex-1 flex flex-col gap-1'>
          <p>About</p>
          <textarea  onChange={(e)=>setAbout(e.target.value)} value={about}   className='border rounded px-3 py-2' placeholder='About Doctor' rows={5}></textarea>
        </div>
        <button type='submit' className=' text-white bg-amber-500 px-7 py-2 mt-5 border border-amber-500 rounded-4xl hover:cursor-pointer hover:bg-white hover:text-gray-700'>Add Doctor</button>

      </div>
    </form>
  )
}

export default AddDoctor