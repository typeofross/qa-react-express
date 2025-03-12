function FormError({
    error,
    field
}) {

    const styles = {
        p1: "text-red-700 text-sm mt-1 mb-5",
    }

    return (
        <>
            {error && Array.isArray(error) && error.find(x => x.path == field) &&
                error.map(x => {
                    if (x.path == field) {
                        return <p className={styles.p1}>{x.error}</p>
                    }
                })
            }
        </>
    )
}

export default FormError
