import { useNavigate, useParams } from 'react-router';
import React, { useState } from 'react';
import services from '/services/fetch.js';
import CreateUpdateForm from '/src/components/partials/CreateUpdateForm.jsx';
import useRequest from '/src/hooks/useRequest.js';

function Update() {
    const params = useParams();

    const request = {
        "type": "post",
        data: {
            p1: params.id,
            cred: { credentials: 'include' }
        }
    }

    const [response, content, error] = useRequest(request);

    const [formError, setFormError] = useState([]);

    const [data, setData] = useState({ title: "", body: "", category: "" });
    const navigate = useNavigate();

    if (response.message && !data.title && !data.body && !data.category) {
        setData({
            title: response.message.title,
            category: response.message.category,
            body: response.message.body
        })
    }

    if (error) {
        setFormError(error);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await services.crud('updatePost', data, params.id, "PATCH");

            if (response.status !== 'success') {
                setFormError(response.message);
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
            <CreateUpdateForm
                handleSubmit={handleSubmit}
                data={data}
                setData={setData}
                error={formError}
                setError={setFormError}
                type="Update"
            />
        </>
    )
}

export default Update
