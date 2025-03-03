import endpoints from '../config.js';

export default {
    async getLatest() {
        const req = await fetch(endpoints.get.latest);
        const res = await req.json();
        return res;
    },
    async getCatalog() {
        const req = await fetch(endpoints.get.catalog);
        const res = await req.json();
        return res;
    },
    async getPost(id) {
        const req = await fetch(endpoints.get.post + id, { credentials: 'include' });
        const res = await req.json();
        return res;
    },
    async getCategory(name, page) {
        const req = await fetch(endpoints.get.category + name + "/page/" + page);
        const res = await req.json();
        return res;
    },
    async search(text) {
        const req = await fetch(endpoints.get.search + text);
        const res = await req.json();
        return res;
    },
    async login(data) {
        const requestOptions = {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const req = await fetch(endpoints.auth.login, requestOptions);
        const res = await req.json();
        return res;
    },
    async register(data) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const req = await fetch(endpoints.auth.register, requestOptions);
        const res = await req.json();
        return res;
    },
    async logout() {
        const req = await fetch(endpoints.auth.logout, { credentials: 'include' });
        const res = await req.json();
        return res;
    },
    async create(data) {
        const requestOptions = {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        };

        const req = await fetch(endpoints.crud.create, requestOptions);
        const res = await req.json();
        return res;
    },
    async delete(id) {
        const requestOptions = {
            method: "DELETE",
            credentials: 'include'
        };

        const req = await fetch(endpoints.crud.delete + id, requestOptions);
        return req;
    }
}