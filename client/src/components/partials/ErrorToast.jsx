import { useState } from "react";

const styles = {
    div: "fixed top-10 w-full left-15",
    p: "w-[350px] bg-red-200 border-1 border-red-300 p-5 shadow-lg rounded-lg text-center",
}

function ErrorToast({ error, setError }) {
    const [status, setStatus] = useState(true);

    setTimeout(() => {
        setStatus(false)
        if(setError) { 
            setError('');
        }
    }, 3000)

    return (
        <>
            {status && !Array.isArray(error) &&
                <div className={styles.div}>
                    <p className={styles.p}>{error}</p>
                </div>
            }
        </>
    )
}

export default ErrorToast
