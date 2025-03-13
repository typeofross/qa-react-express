import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import services from '/services/fetch.js';
import { AuthContext } from '/src/contexts/AuthContext.js';

function Logout() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    logout()
  }, [])

  const logout = async () => {
    try {
      const response = await services.auth('logout');

      if (response.status !== 'success') {
        throw new Error(response.message)
      }

      setAuth({ email: "", isLogged: false })

      navigate('/');

    } catch (err) {
      console.error(err)
    }
  }

  return null;
}

export default Logout
