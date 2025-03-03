import { useNavigate } from 'react-router';
import React, { useState } from 'react';
import services from '../../services/fetch.js';

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
            const response = await services.create({ title, body, category });

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

            <form action={handleSubmit} className="max-w-xl mx-auto p-8 bg-white rounded-sm mt-15 border-1 border-gray-200">
                <h2 className="text-2xl font-semibold mb-4">Create</h2>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={data.title}
                        onFocus={() => setError('')}
                        onChange={e => { setData({ "title": e.target.value }) }}
                        required
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                    {error && error.find(x => x.path == "title") ?
                        error.map(x => {
                            if (x.path == "title") {
                                return <p className="text-red-700 text-sm mt-1">{x.error}</p>
                            }
                        })
                        : ""}
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                        Category
                    </label>
                    <input
                        type="category"
                        id="category"
                        name="category"
                        value={data.category}
                        onChange={e => { setData({ "category": e.target.value }) }}
                        onFocus={() => setError('')}
                        required
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                    {error && error.find(x => x.path == "category") ?
                        error.map(x => {
                            if (x.path == "category") {
                                return <p className="text-red-700 text-sm mt-1">{x.error}</p>
                            }
                        })
                        : ""}
                </div>

                <div className="mb-6">
                    <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2">
                        Question
                    </label>
                    <textarea
                        id="body"
                        name="body"
                        rows="10"
                        value={data.body}
                        onFocus={() => setError('')}
                        onChange={e => { setData({ "body": e.target.value }) }}
                        required
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                    {error && error.find(x => x.path == "body") ?
                        error.map(x => {
                            if (x.path == "body") {
                                return <p className="text-red-700 text-sm mt-1">{x.error}</p>
                            }
                        })
                        : ""}
                </div>

                <button
                    type="submit"
                    className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none cursor-pointer w-[100%]">
                    Create
                </button>
            </form>
        </>
    )
}

export default Create
