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
      const res = await axiosRequest.get("/user/getUserData");
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        window.location.reload();
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    if(user === null) {
      getUser()
    }
  }, [user]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    console.log("No existe token, redireccionando a login");
    return <Navigate to="/login" />;
  }
}
