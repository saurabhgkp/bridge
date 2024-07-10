import axios from "axios";

export const customApi = axios.create({
  baseURL: `https://bridgeapi.onrender.com`,
  // baseURL: `http://localhost:4000`,
});

customApi.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("app-token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});



export const getCrypto = async (limit) => {
  try {
    const { data } = await customApi.get(`/tokens`)
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response.data.message || error.message,
    };
  }
};

export const getCryptoDetails = async (values) => {
  try {
    const { data } = await customApi.post(`/quotes`, values);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response.data.message || error.message,
    };
  }
};


export const getCryptoBuy = async (values) => {
  try {
    const { data } = await customApi.post(`/params`, values);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response.data.message || error.message,
    };
  }
};