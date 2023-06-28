import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';
import axiosRequest from '../utils/axiosRequest';

const HomePage = () => {

  const [doctors, setDoctors] = useState([])

  // user data
  const getUserData = async () => {
    try {
      const res = await axiosRequest.get("/user/getAllDoctors")
      if(res.data.success) {
        setDoctors(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();

    return () => {
      setDoctors([])
    }
  }, [])

  return (
    <Layout>
      <h2 className='text-center p-3'>Home page</h2>
      <Row>
        {doctors && doctors.map((doctor, index) => (
          <DoctorList doctor={doctor} key={index}/>
        ))}
      </Row>
    </Layout>
  )
}

export default HomePage
