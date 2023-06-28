import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import axiosRequest from "../utils/axiosRequest";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // get user
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axiosRequest.post(
        "/user/getUserData",
        { token: localStorage.getItem("token") },
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        // localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      dispatch(hideLoading());
      // localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
