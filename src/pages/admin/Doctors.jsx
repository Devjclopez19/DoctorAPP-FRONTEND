import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Table, message } from 'antd'
import axiosRequest from '../../utils/axiosRequest'

const Doctors = () => {
  const [doctors, setDoctors] = useState([])

  const getDoctors= async () => {
    try {
      const res = await axiosRequest.get("/admin/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      if(res.data.success) {
        setDoctors(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axiosRequest.post("/admin/changeAccountStatus", {doctorId: record._id, userId: record.userId, status: status}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      if(res.data.success) {
        message.success(res.data.message)
      }
    } catch (error) {
      message.error('Something Went Wrong')
    }
  }

  useEffect(() => {
    getDoctors();
  }, [])

  // antd table col
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => <span>{record.firstName} {record.lastName}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'phone',
      dataIndex: 'phone'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          {record.status ==='pending' ? (<button className="btn btn-success" onClick={() => handleAccountStatus(record, "approved")}>Approve</button>) : (<button className="btn btn-danger">Reject</button>)}
        </div>
      )
    },
  ]
  return (
    <Layout>
      <h3 className="text-center p-2">All Doctors</h3>
      <Table columns={columns} dataSource={doctors}/>
    </Layout>
  )
}

export default Doctors
