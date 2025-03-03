import { NavLink, useNavigate, useParams } from "react-router";
import services from '../../services/fetch.js';

function Delete() {
  const navigate = useNavigate();
  const params = useParams();

  const deletePost = async (id) => {
    try {
      const response = await services.delete(id);

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
      <NavLink to={`/post/${params.id}`}>↵ BACK TO POST</NavLink>
      <div className="text-center mt-30 p-20 border-5 border-red-700 text-2xl text-red-700">
        <h1>This action is irrevirsible. Are you sure you would like to delete the post?</h1>

        <button className="bg-red-700 text-white font-bold rounded-sm p-2 mt-10 cursor-pointer" onClick={() => deletePost(params.id)}>YES, DELETE</button>
        <button className="bg-blue-700 text-white font-bold rounded-sm p-2 ml-3 cursor-pointer" onClick={() => navigate(-1)}>NO, BACK TO POST</button>
      </div>
    </>
  )
}

export default Delete
