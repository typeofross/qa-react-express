import { useState } from "react";
import services from '/services/fetch.js';
import FormError from '/src/components/partials/FormError.jsx';

export default function ChangePasswordForm() {

    const [data, setData] = useState({ "currentpassword": "", "password": "", "repassword": "" });
    const [error, setError] = useState('');
    const [success, setSuccessMsg] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await services.crud('updateProfile', data, "", "PATCH");

            if (response.status !== 'success') {
                setError(response.message);
                throw new Error(response.message)
            }

            setSuccessMsg(true);

        } catch (err) {
            console.error(err)
        }
    }

    const styles = {
        div: "text-emerald-900 text-center",
        span: "inline-block m-3 pt-1 text-white bg-emerald-300 rounded-full w-10 h-10",
        form: "w-fit mx-auto p-5 bg-white rounded-lg",
        label: "block text-gray-700 text-sm font-bold mb-2",
        input: "border rounded w-[300px] py-2 px-3 text-gray-700 border-1 border-gray-300 rounded-lg",
        p1: "text-red-700 text-sm mt-1 w-[300px]",
        button: "cursor-pointer w-full text-xs md:text-md p-2 border-3 rounded-lg border-emerald-200 text-emerald-700 font-medium bg-emerald-200 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white",
    }

    return (
        <>
            {success &&
                <div className={styles.div}><span className={styles.span}>✓</span>
                    You have successfully changed your password.</div>
            }
            {!success &&
                <form onSubmit={handleSubmit} className={styles.form}>

                    <div className="mb-4">
                        <label htmlFor="currentpassword" className={styles.label}>
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="currentpassword"
                            name="currentpassword"
                            onFocus={() => setError('')}
                            onChange={e => { setData({ ...data, "currentpassword": e.target.value }) }}
                            required
                            className={styles.input}
                        />
                        <FormError error={error} field="currentpassword" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className={styles.label}>
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onFocus={() => setError('')}
                            onChange={e => { setData({ ...data, "password": e.target.value }) }}
                            required
                            className={styles.input}
                        />
                        <FormError error={error} field="password" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="repassword" className={styles.label}>
                            Repeat New Password
                        </label>
                        <input
                            type="password"
                            id="repassword"
                            name="repassword"
                            onFocus={() => setError('')}
                            onChange={e => { setData({ ...data, "repassword": e.target.value }) }}
                            required
                            className={styles.input}
                        />
                        <FormError error={error} field="repassword" />
                        {error && !Array.isArray(error) && <p className={styles.p1}>{error}</p>}
                    </div>

                    <button
                        type="submit"
                        className={styles.button}>
                        Change password
                    </button>
                </form>
            }
        </>
    )
}