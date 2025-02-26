const serverBaseUrl = 'http://localhost:3000';

export default {
    get: {
        latest: serverBaseUrl + "/get/latest",
        catalog: serverBaseUrl + "/get/catalog",
        post: serverBaseUrl + "/get/post/"
    }
}