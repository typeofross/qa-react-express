export default function CommentForm(
    {
        handleSubmitComment,
        comment,
        setComment,
        error,
        setError
    }) {

    const styles = {
        label: "block text-gray-700 text-sm font-bold mb-2",
        textarea: "border rounded w-full py-2 px-3 text-gray-700",
        p: "text-red-700 text-sm mt-1",
        button: "text-xs md:text-md p-2 border-3 rounded-md tracking-widest border-blue-200 bg-blue-200 text-blue-700 hover:bg-blue-500 hover:border-blue-500 hover:text-white focus:outline-none cursor-pointer w-[35%]"
    }

    return (
        <>
            <form onSubmit={handleSubmitComment}>
                <div className="mb-2 mt-10">
                    <label htmlFor="body" className={styles.label}>
                        Your comment
                    </label>
                    <textarea
                        id="body"
                        name="body"
                        rows="5"
                        value={comment.body}
                        onFocus={() => setError('')}
                        onChange={e => { setComment({ "body": e.target.value }) }}
                        required
                        className={styles.textarea}
                    />
                    {error && error.find(x => x.path == "body") ?
                        error.map(x => {
                            if (x.path == "body") {
                                return <p className={styles.p}>{x.error}</p>
                            }
                        })
                        : ""}
                </div>

                <button
                    type="submit"
                    className={styles.button}>
                    SUBMIT
                </button>
            </form>
        </>
    )
}