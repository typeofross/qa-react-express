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
        create: serverBaseUrl + "/post/add",
        base: serverBaseUrl + "/post/"
    },
    comment: {
        create: serverBaseUrl + "/comment/add",
        base: serverBaseUrl + "/comment/"
    },
    auth: {
        logout: serverBaseUrl + "/auth/logout",
        login: serverBaseUrl + "/auth/login",
        register: serverBaseUrl + "/auth/register"
    },
    profile: {
        delete: serverBaseUrl + "/profile/delete",
        update: serverBaseUrl + "/profile/update",
        activity: serverBaseUrl + "/profile/activity/"
    },
    getCookie() {
        const cookies = document.cookie.split(";");
        const accessToken = cookies.find(x => x.includes('access_token'));

        if (!accessToken) {
            return false;
        }

        return accessToken.replace('access_token=');
    }
}