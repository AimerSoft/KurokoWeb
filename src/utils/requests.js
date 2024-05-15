import axios from "axios";

const service = axios.create({
  baseURL: "https://umb.ink/",
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response;
    return res;
  },
  (error) => {
    console.log("axios err:" + error);
    return Promise.reject(error);
  }
);

export default service;
