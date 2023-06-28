import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axiosRequest from "../utils/axiosRequest";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axiosRequest.post("/user/register", values);
      dispatch(hideLoading())
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register Form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <button className="btn btn-primary form-control" type="submit">
            Register
          </button>
          <div className="mt-2 text-center">
            <Link to="/login">Already user login here</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
