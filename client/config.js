const serverBaseUrl = 'http://localhost:3000';

export default {
    get: {
        latest: serverBaseUrl + "/get/latest",
        catalog: serverBaseUrl + "/get/catalog",
        post: serverBaseUrl + "/get/post/",
        category: serverBaseUrl + "/get/category/",
        search: serverBaseUrl + "/get/search/"
    },
    post: {
        create: serverBaseUrl + "/post/add"
    },
    auth: {
        logout: serverBaseUrl + "/auth/logout",
        login: serverBaseUrl + "/auth/login",
        register: serverBaseUrl + "/auth/register"
    },
    getCookie() {
        return document.cookie.replace('accessToken=');
    }
}