import React from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import MyProfil from './pages/MyProfil'
import MyAppointment from './pages/MyAppointment'
import NavBar from './components/NavBar'
import Appointment from './pages/Appointment'

const App = () => {

  return (
    <div className="mx-4 sm:mx-[10%]" >
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profil' element={<MyProfil />} />
        <Route path='/my-appointment' element={<MyAppointment />} />
        <Route path='/appointment/:docId' element={<Appointment/>}/>

      

      </Routes>
    </div>
  )
}

export default App
