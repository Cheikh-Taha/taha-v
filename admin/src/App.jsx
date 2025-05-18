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

const App = () => {

  const {aToken} = useContext(AdminContext)

  return aToken? (
    <div className='bg-[#fffbeb]'>
      <ToastContainer/>
      <NavBar/>
      <div className='flex items-start'>
        <SideBare/>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appoitement' element={<AllApoitement/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorList/>}/>
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