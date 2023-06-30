import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/RegisterStyles.css'
import { Form, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import axiosRequest from '../utils/axiosRequest'
import { setUser } from '../redux/features/userSlice'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)

  // form handler
  const onFinishHandler = async (values) => {
    try {
      const res = await axiosRequest.post("/user/login", values);
      // window.location.reload();
      if (res.data.success) {
        localStorage.setItem("token", res.data.token)
        const user = await axiosRequest.get("/user/getUserData",{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        if(user.data.success) {
          dispatch(setUser(user.data.data))
        } else {
          console.log(user.data);
        }
        message.success("Login Successfully!");
        navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
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
          <div className="access-data">
            <div className="item">
              <b>Email: </b> user@gmail.com
              <b> - Password: </b> 123456
            </div>
            <div className="item">
              <b>Email: </b> admin@gmail.com
              <b> - Password: </b> 123456
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Login
