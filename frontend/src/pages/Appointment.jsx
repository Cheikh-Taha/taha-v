import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Appointment = () => {

  const {docId} = useParams()
  const {doctors} = useContext(AppContext)
  const [docInfo,setDocInfo] = useState(null)

  const fetchDocInfo = async() => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    console.log(docInfo);
    
  }

  useEffect(() => {
    fetchDocInfo()
  },[doctors,docId])


  return (
    <div>
      {/*--Information du docteur--*/}
      <p>{docInfo.name}</p>
      <img src={docInfo.image} alt="" />
    </div>
  )
}

export default Appointment
