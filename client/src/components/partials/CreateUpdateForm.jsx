export default function CreateUpdateForm(
    {
        handleSubmit,
        data,
        setData,
        error,
        setError,
        type
    }) {

    const styles = {
        form: "max-w-xl mx-auto p-8 bg-white rounded-sm mt-15 border-1 border-gray-200",
        h2: "text-2xl font-semibold mb-4",
        label: "block text-gray-700 text-sm font-bold mb-2",
        input: "border rounded w-full py-2 px-3 text-gray-700",
        p1: "text-red-700 text-sm mt-1",
        button: "bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none cursor-pointer w-[100%]"
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.h2}>{type}</h2>
                <div className="mb-4">
                    <label htmlFor="title" className={styles.label}>
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={data.title}
                        onFocus={() => setError('')}
                        onChange={e => { setData({ ...data, "title": e.target.value }) }}
                        required
                        className={styles.input}
                    />
                    {error && error.find(x => x.path == "title") ?
                        error.map(x => {
                            if (x.path == "title") {
                                return <p className={styles.p1}>{x.error}</p>
                            }
                        })
                        : ""}
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className={styles.label}>
                        Category
                    </label>
                    <input
                        type="category"
                        id="category"
                        name="category"
                        value={data.category}
                        onChange={e => { setData({ ...data, "category": e.target.value }) }}
                        onFocus={() => setError('')}
                        required
                        className={styles.input}
                    />
                    {error && error.find(x => x.path == "category") ?
                        error.map(x => {
                            if (x.path == "category") {
                                return <p className={styles.p1}>{x.error}</p>
                            }
                        })
                        : ""}
                </div>

                <div className="mb-6">
                    <label htmlFor="body" className={styles.label}>
                        Question
                    </label>
                    <textarea
                        id="body"
                        name="body"
                        rows="10"
                        value={data.body}
                        onFocus={() => setError('')}
                        onChange={e => { setData({ ...data, "body": e.target.value }) }}
                        required
                        className={styles.input}
                    />
                    {error && error.find(x => x.path == "body") ?
                        error.map(x => {
                            if (x.path == "body") {
                                return <p className={styles.p1}>{x.error}</p>
                            }
                        })
                        : ""}
                </div>

                <button
                    type="submit"
                    className={styles.button}>
                    {type}
                </button>
            </form>
        </>
    )
}