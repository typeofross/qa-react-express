import { NavLink, useNavigate } from 'react-router';
import React, { useState } from 'react';
import services from '/services/fetch.js';
import CreateUpdateForm from '/src/components/partials/CreateUpdateForm.jsx';

function Create() {
    const [error, setError] = useState([]);
    const [data, setData] = useState({ title: "", body: "", category: "" });
    const navigate = useNavigate();

    async function handleSubmit(formData) {
        const title = await formData.get('title');
        const category = await formData.get('category');
        const body = await formData.get('body');

        setData({ title, category, body });

        try {
            const response = await services.crud('addPost', { title, body, category }, "", "POST");

            if (response.status !== 'success') {
                setError(response.message);
                throw new Error(response.message)
            }

            return navigate(`/post/${response.message}`);

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <title>Create a Post</title>

            <NavLink to='/'>↵ BACK TO HOME</NavLink>
            <CreateUpdateForm
                handleSubmit={handleSubmit}
                data={data}
                setData={setData}
                error={error}
                setError={setError}
                type="Create"
            />
        </>
    )
}

export default Create
