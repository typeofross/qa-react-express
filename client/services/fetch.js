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
        const req = await fetch(endpoints.get.post + id);
        const res = await req.json();
        return res;
    }
}