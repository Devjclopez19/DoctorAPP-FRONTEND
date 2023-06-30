import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, Row, TimePicker, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axiosRequest from '../utils/axiosRequest'

const ApplyDoctor = () => {

  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axiosRequest.post("/user/apply-doctor",
      {
        ...values, 
        userId: user._id,
        timings: [
          moment(values.timings[0]).format("HH:mm"),
          moment(values.timings[1]).format("HH:mm")
        ],
      },{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      dispatch(hideLoading())
      if(res.data.success) {
        message.success(res.data.message)
        navigate('/')
      } else {
        message.success(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error('Something went wrong')
    }
  }

  return (
    <Layout>
      <h3 className='text-center'>Apply Doctor</h3>
      <Form layout='vertical' onFinish={handleFinish} className='m-3'>
        <h5>Personal Details: </h5>
        <Row gutter={20}>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="First Name" name="firstName" required rules={[{required: true}]}>
                <Input type='text' placeholder='your name' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Last Name" name="lastName" required rules={[{required: true}]}>
                <Input type='text' placeholder='your lastname' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
               <Form.Item label="Phone" name="phone" required rules={[{required: true}]}>
                <Input type='text' placeholder='your phone' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Email" name="email" required rules={[{required: true}]}>
                <Input type='email' placeholder='your email' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Website" name="website">
                <Input type='text' placeholder='your website' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Address" name="address" required rules={[{required: true}]}>
                <Input type='text' placeholder='your address' />
              </Form.Item>
            </Col>
        </Row>
        <h5>Professional Details: </h5>
        <Row gutter={20}>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Specialization" name="specialization" required rules={[{required: true}]}>
                <Input type='text' placeholder='your specialization' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Experience" name="experience" required rules={[{required: true}]}>
                <Input type='text' placeholder='your experience' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Fees Per Consultation" name="feesPerConsultation" required rules={[{required: true}]}>
                <Input type='text' placeholder='your contact no' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Timings " name="timings">
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
            <button className='btn btn-primary form-control' type='submit'>Submit</button>
            </Col>
        </Row>
      </Form>
    </Layout>
  )
}

export default ApplyDoctor
