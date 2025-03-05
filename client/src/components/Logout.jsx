import { useEffect } from "react";
import { useNavigate } from "react-router";
import services from '../../services/fetch.js';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    logout()
  }, [])

  const logout = async () => {
    try {
      const response = await services.auth('logout');

      if (response.status !== 'success') {
        throw new Error(response.message)
      }

      navigate('/');

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
    </>
  )
}

export default Logout
