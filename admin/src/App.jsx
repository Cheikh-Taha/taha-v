import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import {AdminContext} from './context/AdminContext'
import NavBar from './components/NavBar';
import SideBare from './components/SideBare';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard'
import AllApoitement from './pages/Admin/AllApoitement'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorList from './pages/Admin/DoctorList'
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import DoctorAppointement from './pages/Doctor/DoctorAppointement';

const App = () => {

  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return aToken || dToken? (
    <div>
      <ToastContainer/>
     
      <div className='flex items-start'>
        <SideBare/>
        <Routes>
          {/* admin routes */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appoitement' element={<AllApoitement/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorList/>}/>
           {/* admin routes */}
           <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
           <Route path='/doctor-profile' element={<DoctorProfile/>}/>
           <Route path='/doctor-Appointement' element={<DoctorAppointement/>}/>
        </Routes>
      </div>
    </div>
  ):(
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App