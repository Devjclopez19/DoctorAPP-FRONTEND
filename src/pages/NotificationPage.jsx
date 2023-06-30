import React from "react";
import Layout from "../components/Layout";
import { Tabs, message, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axiosRequest from "../utils/axiosRequest";

const NotificationPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axiosRequest.post("/user/get-all-notification", { userId: user._id }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };

  const handleDeletedAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axiosRequest.post("/user/delete-all-notification",{ userId: user._id });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/notification");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong in notifications");
    }
  };

  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs className="p-3">
        <Tabs.TabPane tab="unRead" key={0}>
          {user?.notification.map((notificationMgs) => (
            <div className="card">
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-end p-4">
            <button className="btn-notification" onClick={handleMarkAllRead}>
              Mark All Read
            </button>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          {user?.seennotification.map((seennotificationMgs) => (
            <div className="card">
              <div className="card-text" onClick={() => console.log("click")}>
                {seennotificationMgs.message}
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-end">
            <button className="btn-notification" onClick={handleDeletedAllRead}>
              Deleted All Read
            </button>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
