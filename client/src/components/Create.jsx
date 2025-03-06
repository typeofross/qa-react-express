import { NavLink, useNavigate } from 'react-router';
import React, { useState } from 'react';
import services from '/services/fetch.js';
import CreateUpdateForm from '/src/components/partials/CreateUpdateForm.jsx';

function Create() {
    const [error, setError] = useState([]);
    const [data, setData] = useState({ title: "", body: "", category: "" });
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await services.crud('addPost', data, "", "POST");

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
