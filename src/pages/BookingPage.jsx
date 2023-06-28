import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import dayjs from "dayjs";
import axiosRequest from "../utils/axiosRequest";

// const format = "HH:mm";
const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  // user data
  const getDoctorData = async () => {
    try {
      const res = await axiosRequest.post("/doctor/getDoctorById", { doctorId: params.doctorId });
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorData();
    // return () => {
    //   setDoctor([]);
    // };
  }, []);

  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if(!date && !time) {
        return alert("Date & Time Required")
      }
      dispatch(showLoading());
      const res = await axiosRequest.post(
        "/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          date: date,
          userInfo: user,
          time: time,
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
    // dispatch(showLoading());
      const res = await axiosRequest.post(
        "/user/booking-availability",
        {
          doctorId: params.doctorId,
          date,
          time,
        },
      );
      // dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        setIsAvailable(false);
        message.error(res.data.message);
      }
    } catch (error) {
      // dispatch(hideLoading());
      console.log(error);
    }
  };

  return (
    <Layout>
      <h2 className="text-center p-2">Booking Page</h2>
      <div className="container">
        {doctor && (
          <div>
            <h4>
              Dr. {doctor.firstName} {doctor.lastName}
            </h4>
            <h4>Fees : {doctor.feesPerConsultation}</h4>
            <h4>
              Timings : {doctor?.timings[0]} - {doctor?.timings[1]}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(dayjs(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                format="HH:mm"
                onChange={(value) => {
                  setTime(dayjs(value).format("HH:mm"));
                }}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>
              <button className="btn btn-dark mt-2" onClick={handleBooking} disabled={!isAvailable}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
