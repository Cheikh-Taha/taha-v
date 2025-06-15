import React from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { useContext } from 'react'

const DoctorAppointement = () => {
  const {dToken, getAppointments, appointments} = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div>DoctorAppointement</div>
  )
}

export default DoctorAppointement