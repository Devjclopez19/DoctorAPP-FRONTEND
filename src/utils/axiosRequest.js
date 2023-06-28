import axios from "axios";

const axiosRequest = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export default axiosRequest;