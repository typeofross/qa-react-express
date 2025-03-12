import endpoints from '/config.js';

const map = {
    latest: () => { return endpoints.get.latest },
    catalog: () => { return endpoints.get.catalog },
    post: (id) => { return endpoints.get.post + id },
    search: (text) => { return endpoints.get.search + text },
    category: (name, page) => { return endpoints.get.category + name + "/page/" + page },

    login: () => { return endpoints.auth.login },
    register: () => { return endpoints.auth.register },
    logout: () => { return endpoints.auth.logout },

    addPost: () => { return endpoints.post.create },
    updatePost: (id) => { return endpoints.post.base + id },
    deletePost: (id) => { return endpoints.post.base + id },
    ratePost: ({ id, action }) => { return endpoints.post.base + id + "/" + action },
    addComment: () => { return endpoints.comment.create },
    updateComment: (id) => { return endpoints.comment.base + id },
    rateComment: ({ id, action }) => { return endpoints.comment.base + id + "/" + action },
    deleteComment: (id) => { return endpoints.comment.base + id },

    updateProfile: () => { return endpoints.profile.update },
    deleteProfile: () => { return endpoints.profile.delete },

    profilePosts: () => { return endpoints.profile.activity + 'posts' },
    profileComments: () => { return endpoints.profile.activity + 'comments' },
    profileRatings: () => { return endpoints.profile.activity + 'rated' }
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

        if (req.status == 204) {
            return req;
        }

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

        if ((type == "deletePost" ||
            type == "ratePost" ||
            type == "deleteComment" ||
            type == "rateComment" ||
            type == "deleteProfile"
        ) && (req.status === 201 || req.status === 200 || req.status === 204)) {
            return req;
        }

        const res = await req.json();
        return res;
    }
}