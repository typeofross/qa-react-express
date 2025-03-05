import { NavLink, useNavigate, useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import services from '/services/fetch.js';
import CreateUpdateForm from '/src/components/partials/CreateUpdateForm.jsx';

function Update() {
    const [error, setError] = useState([]);
    const [data, setData] = useState({ title: "", body: "", category: "" });
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await services.get('post', params.id, "", { credentials: 'include' });

            if (response.status !== 'success') {
                throw new Error(response.message)
            }


            setData({
                title: response.message.title,
                category: response.message.category,
                body: response.message.body
            });

        } catch (err) {
            console.error(err)
        }

    }

    async function handleSubmit(formData) {
        const title = await formData.get('title');
        const category = await formData.get('category');
        const body = await formData.get('body');

        setData({ title, category, body });

        try {
            const response = await services.crud('updatePost', { title, body, category }, params.id, "PATCH");

            if (response.status !== 'success') {
                setError(response.message);
                throw new Error(response.message)
            }

            return navigate(`/post/${params.id}`);

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <title>Update a Post</title>

            <NavLink to='/'>↵ BACK TO HOME</NavLink>
            <CreateUpdateForm
                handleSubmit={handleSubmit}
                data={data}
                setData={setData}
                error={error}
                setError={setError}
                type="Update"
            />
        </>
    )
}

export default Update
