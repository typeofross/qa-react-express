export default function CommentForm({ handleSubmitComment, data, setData, error }) {
    return (
        <>
            <form action={handleSubmitComment}>
                <div className="mb-2 mt-10">
                    <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2">
                        Your comment
                    </label>
                    <textarea
                        id="body"
                        name="body"
                        rows="5"
                        value={data.body}
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
                    className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none cursor-pointer w-[25%]">
                    Submit
                </button>
            </form>
        </>
    )
}