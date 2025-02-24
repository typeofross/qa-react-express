import endpoints from '../config.js';

export default {
    async getLatest() {
        const req = await fetch(endpoints.get.latest);
        const res = await req.json();
        return res;
    }
}