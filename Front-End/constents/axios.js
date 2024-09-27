import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4040",
});

const getToken = (role) => {
  if (role === "admin") {
    return localStorage.getItem("adminToken");
  } else if (role === "user") {
    return localStorage.getItem("token");
  }
  return null;
};

instance.interceptors.request.use(
  (config) => {
    const role = config.role || "user";
    const token = getToken(role);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
