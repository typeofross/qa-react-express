import endpoints from '../config.js';

const map = {
    latest: () => { return endpoints.get.latest },
    catalog: () => { return endpoints.get.catalog },
    post: (id) => { return endpoints.get.post + id },
    search: (text) => { return endpoints.get.search + text },
    category: (name, page) => { return endpoints.get.category + name + "/page/" + page },

    login: () => { return endpoints.auth.login },
    register: () => { return endpoints.auth.register },
    logout: () => { return endpoints.auth.logout },

    addPost: () => { return endpoints.crud.create },
    updatePost: (id) => { return endpoints.crud.post + id },
    deletePost: (id) => { return endpoints.crud.post + id },
    ratePost: ({ id, action }) => { return endpoints.crud.post + id + "/" + action },
    addComment: () => { return endpoints.comment.add }
}

const requestOptions = (method, data) => {
    const result = {
        method,
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    method == "DELETE" || method == "GET" || !data ? delete result.body : "";
    return result
}

export default {
    async get(type, p1, p2, cred) {
        const req = await fetch(map[type](p1, p2), cred);
        const res = await req.json();
        return res;
    },
    async auth(type, data) {
        const method = type == "logout" ? "GET" : "POST";
        const req = await fetch(map[type](), requestOptions(method, data));
        const res = await req.json();
        return res;
    },
    async crud(type, data, p1, method) {
        const req = await fetch(map[type](p1), requestOptions(method, data));

        if (type == "deletePost" || type == "ratePost") {
            return req;
        }

        const res = await req.json();
        return res;
    }
}