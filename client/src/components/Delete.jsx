import { NavLink, useNavigate, useParams } from "react-router";
import services from '/services/fetch.js';

const styles = {
  div: "text-center mt-30 p-20 border-5 border-red-700 text-2xl text-red-700",
  button1: "bg-red-700 text-white font-bold rounded-sm p-2 mt-10 cursor-pointer",
  button2: "bg-blue-700 text-white font-bold rounded-sm p-2 ml-3 cursor-pointer mt-5 md:mt-0"
}

function Delete() {
  const navigate = useNavigate();
  const params = useParams();

  const deletePost = async (id) => {
    try {
      const response = await services.crud('deletePost', "", id, "DELETE");

      if (response.status !== 204) {
        throw new Error(response.message)
      }

      navigate('/');

    } catch (err) {
      navigate('/404');
      console.error(err)
    }
  }

  return (
    <>
      <NavLink to={`/post/${params.id}`}>↵ BACK TO POST</NavLink>
      <div className={styles.div}>
        <h1>This action is irrevirsible. Are you sure you would like to delete the post?</h1>

        <button className={styles.button1} onClick={() => deletePost(params.id)}>YES, DELETE</button>
        <button className={styles.button2} onClick={() => navigate(-1)}>NO, BACK TO POST</button>
      </div>
    </>
  )
}

export default Delete
