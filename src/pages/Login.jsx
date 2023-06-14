import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/RegisterStyles.css'
import { Form, Input, message } from 'antd'

import axios from 'axios'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("http://localhost:8080/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem("token", res.data.token)
        message.success("Login Successfully!");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("Something Went Wrong");
    }
  }

  return (
    <>
      <div className="form-container">
        <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
          <h3 className='text-center'>Login Form</h3>
          <Form.Item label="Email" name="email">
            <Input type='email' required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type='password' required />
          </Form.Item>
          <button className='btn btn-primary form-control' type='submit'>Login</button>
          <div className='mt-2 text-center'>
          <Link to="/register">Not a user Register here</Link>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Login