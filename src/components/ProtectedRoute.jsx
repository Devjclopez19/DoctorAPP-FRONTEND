import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import axiosRequest from "../utils/axiosRequest";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate()

  // get user
  
  const getUser = async () => {
    try {
      const res = await axiosRequest.get("/user/getUserData", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        dispatch(setUser(null));
        localStorage.clear()
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(!user) {
      getUser()
    }
  }, [user, getUser]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
