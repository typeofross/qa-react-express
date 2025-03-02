const serverBaseUrl = 'http://localhost:3000';

export default {
    get: {
        latest: serverBaseUrl + "/get/latest",
        catalog: serverBaseUrl + "/get/catalog",
        post: serverBaseUrl + "/get/post/",
        category: serverBaseUrl + "/get/category/",
        search: serverBaseUrl + "/get/search/"
    },

    color(n) {
        return n == 3 ? "green" :
            n == 4 ? "yellow" : "blue"
    }
}