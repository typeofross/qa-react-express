import { useNavigate } from "react-router"
import FormError from '/src/components/partials/FormError.jsx';

export default function CreateUpdateForm(
    {
        handleSubmit,
        data,
        setData,
        error,
        setError,
        type
    }) {

    const navigate = useNavigate();

    const styles = {
        form: "max-w-xl mx-auto p-8 bg-white rounded-lg mt-2 border-1 border-gray-200",
        h2: "text-2xl font-semibold mb-4",
        label: "block text-gray-700 text-sm font-bold mb-2",
        input: "border rounded w-full py-2 px-3 text-gray-700 border-1 border-gray-300 rounded-lg",
        p1: "text-red-700 text-sm mt-1",
        button: "cursor-pointer w-full text-xs md:text-md p-2 border-3 rounded-lg border-emerald-200 text-emerald-700 font-medium bg-emerald-200 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white",
        navLink: "block p-2 border-1 border-gray-200 rounded-lg mb-5 w-fit text-xs hover:bg-stone-100 cursor-pointer"
    }

    const goBack = () => {
        navigate(-1);
    }
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 onClick={goBack} className={styles.navLink}>↵ GO BACK</h1>

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
                    <FormError error={error} field="title" />

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
                    <FormError error={error} field="category" />

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
                    <FormError error={error} field="body" />
                    {error && !Array.isArray(error) && <p className={styles.p1}>{error}</p>}
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