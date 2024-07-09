
const REACT_APP_API_BASE_URL = "https://ndri.onrender.com/v1/ndri/";
import axios from "axios";

export const getApiWithoutToken = (path) => {
    return axios.get(REACT_APP_API_BASE_URL + path, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};


export const postApiWithoutToken = (path, data) => {
    return axios.post(REACT_APP_API_BASE_URL + path, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// export const putApiWithoutToken = (path, data) => {
//     return axios.put(REACT_APP_API_BASE_URL + path, data, {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
// };

export const getApi = (path, data) => {
    const token = localStorage.getItem("token");
    return axios.get(REACT_APP_API_BASE_URL + path, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteApi = (path, data) => {
    const token = localStorage.getItem("token");


    return axios.delete(REACT_APP_API_BASE_URL + path, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};
export const postApi = (path) => {
    const token = localStorage.getItem("token");

    return axios.post(REACT_APP_API_BASE_URL + path, {}, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const putApi = (path) => {
    const token = localStorage.getItem("token");

    return axios.put(REACT_APP_API_BASE_URL + path, {}, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};