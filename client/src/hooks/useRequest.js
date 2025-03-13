import { useEffect, useState } from 'react';
import endpoints from '/config.js';

const map = {
    latest: () => { return endpoints.get.latest },
    catalog: () => { return endpoints.get.catalog },
    search: (text) => { return endpoints.get.search + text },
    category: (name, page) => { return endpoints.get.category + name + "/page/" + page },
    post: (id) => { return endpoints.get.post + id },

    profilePosts: () => { return endpoints.profile.activity + 'posts' },
    profileComments: () => { return endpoints.profile.activity + 'comments' },
    profileRatings: () => { return endpoints.profile.activity + 'rated' }
}

export default function useRequest({ type, data, state }) {
    const [response, setResponse] = useState([]);
    const [content, setContent] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        get()
    }, [type, state])

    async function get() {
        try {
            setResponse([]);
            setError(false);
            setContent(false);

            const req = await fetch(map[type](data?.p1, data?.p2), data?.cred);

            if (req.status == 204) {
                return setContent(false);
            }

            const res = await req.json();

            if (req.status == 200 || req.status == 201) {
                return (
                    setContent(true),
                    setResponse(res)
                );
            }
            else {
                setError(res.message);
            }

        }
        catch (err) {
            console.error(err);
        }
    }

    return [response, content, error]
}