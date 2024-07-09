import {
    deleteApi, getApi, postApi, getApiWithoutToken,
    postApiWithoutToken, putApi, getApiAWS
} from "./api-interface";

export const getAllPostBycat = () => {
    return getApiAWS("get-all-posts");
};
export const getAllcash = () => {
    return getApiWithoutToken("all-data-cash");
};
export const getDaly = () => {
    return getApiWithoutToken(`getPostByList?List=certificate`);
};

export const searchsPost = (page) => {
    return getApiWithoutToken(`searchs-post?search=${page}`);
};

export const getPostByIdApi = (id) => {
    return getApiWithoutToken(`getPostById?id=${id}`);
};

export const getPostBySlug = (id) => {
    return getApiWithoutToken(`get-post-by-slug?id=${id}`);
};
export const getPostBytype = (type, currentPage) => {
    return getApiWithoutToken(`get-all-post-by-cat?cat=${type}&page=${currentPage}`);
};
// export const getApiWithoutToken = (path, payload) => {
//     return getApi(path, payload);
// };



// users api

export const userLogin = (payload) => {
    return postApiWithoutToken(`users/login`, payload);
};

export const postsAdd = (userId, id) => {
    return putApi(`users/addItems?id=${id}&userId=${userId}`);
};

export const getJobListApi = (userId) => {
    return getApi(`users/getItem?userId=${userId}`);
}
export const removeJobApi = (id) => {
    return postApi(`users/removeItem?id=${id}`);
}
export const deleteUserApi = (id) => {
    return deleteApi(`/api/deleteUser/${id}`, id);
};

export const suspendUserApi = (id) => {
    return deleteApi(`/api/suspenedUserById?id=${id}`);
};
export const getAllPagesApi = () => {
    return getApi('getAllPost');
}
export const loginApi = (payload) => {

    return postApiWithoutToken("/users/adminLogin", payload);
};
