import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Table } from "antd";

const Appointments = () => {
  const [appointments, setAppointments] = useState();
  const { user } = useSelector((state) => state.user);

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/user/user-appointments",
        {
          userId: user._id,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span>
          {record.doctorInfo[0].firstName} {record.doctorInfo.lastName}
        </span>
      )
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: (text, record) => (
        <span>
          {record.doctorInfo[0].phone}
        </span>
      )
    },
    {
      title: 'Date & Time',
      dataIndex: 'date',
      render: (text, record) => (
        <span>
          {dayjs(record.date).format('DD-MM-YYYY')} &nbsp;
          {dayjs(record.time).format('HH:mm')}

        </span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
  ]

  return (
    <Layout>
      <h2 className="text-center p-3">Appointments</h2>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default Appointments;
