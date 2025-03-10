import { useState } from "react";
import { useNavigate } from "react-router";
import services from '/services/fetch.js';
import ChangePasswordForm from "./partials/ChangePasswordForm";

function ProfileSettings() {
    const navigate = useNavigate();
    const [deleteConfirmationModal, toggleDeleteConfirmationModal] = useState(false);
    const [changePasswordModal, toggleChangePasswordModal] = useState(false);

    const styles = {
        div: "max-w-xl h-[50vh] mx-auto p-8 bg-white rounded-lg mt-15 border-1 border-gray-200",
        div2: "grid grid-cols-[1fr_1fr] gap-3 cursor-pointer",
        div3: "justify-self-start text-center border-1 border-gray-200 w-full p-15 hover:bg-slate-100 hover:font-medium",
        div4: "justify-self-end text-center border-1 border-rose-200 text-red-900 w-full p-15 hover:bg-rose-100 hover:font-medium",
        div5: "absolute top-0 left-0 w-full h-full [background-color:rgba(0,0,0,0.5)] ",
        div6: "mt-[40%] w-[400px] md:mt-[10%] md:w-[500px]  grid justify-self-center bg-white rounded-lg p-5 border-1 border-gray-800 text-lg",
        navLink: "block p-2 border-1 border-gray-200 rounded-lg mb-5 w-fit text-xs hover:bg-stone-100 cursor-pointer",
        span1: "text-xs md:text-md p-2 border-1 rounded-md tracking-widest border-red-200 bg-red-200 text-red-700 hover:bg-red-500 hover:border-red-500 hover:text-white cursor-pointer",
        span2: "ml-3 text-xs md:text-md p-2 border-1 rounded-md tracking-widest border-gray-200 bg-stone-50 text-gray-800 hover:bg-stone-100 cursor-pointer",
    }

    const goBack = () => {
        navigate(-1);
    }

    const toggleDeleteModal = () => {
        toggleDeleteConfirmationModal(deleteConfirmationModal => !deleteConfirmationModal);
    }

    const togglePasswordChangeModal = () => {
        toggleChangePasswordModal(changePasswordModal => !changePasswordModal);
    }

    const deleteAccountHandler = async () => {
        try {
            const response = await services.crud('deleteProfile', "", "", "DELETE");

            if (response.status !== 204) {
                throw new Error(response.message)
            }

            navigate('/');

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div className={styles.div}>
                <h1 onClick={goBack} className={styles.navLink}>↵ GO BACK</h1>

                <div className={styles.div2}>
                    <div className={styles.div3}>
                        <span onClick={togglePasswordChangeModal}>CHANGE PASSWORD</span>
                    </div>
                    <div className={styles.div4}>
                        <span onClick={toggleDeleteModal}>DELETE ACCOUNT</span>
                    </div>
                </div>
            </div>

            {deleteConfirmationModal &&
                <div className={styles.div5} onClick={toggleDeleteModal}>
                    <div className={styles.div6}>
                        Do you want to delete this account and all associated data?

                        <div className="text-center mt-5">
                            <span className={styles.span1} onClick={deleteAccountHandler}>CONFIRM</span> <span className={styles.span2}>CANCEL</span>
                        </div>
                    </div>
                </div>
            }

            {changePasswordModal &&
                <div className={styles.div5} onClick={togglePasswordChangeModal}>
                    <div className={styles.div6} onClick={e => e.stopPropagation()}>
                        <ChangePasswordForm />
                    </div>
                </div>
            }
        </>
    )
}

export default ProfileSettings
