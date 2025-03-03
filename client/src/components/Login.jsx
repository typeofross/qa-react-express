import { NavLink, useNavigate } from 'react-router';
import React, { useState } from 'react';
import services from '../../services/fetch.js';

function Login() {
  const [error, setError] = useState(0);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    const password = await formData.get('password');
    const email = await formData.get('email');

    setData({ password, email });

    try {
      const response = await services.login({ password, email });

      if (response.status !== 'success') {
        throw new Error(response.message)
      }

      return navigate('/');

    } catch (err) {
      setError(err);
      console.error(err)
    }
  }

  return (
    <>
      <title>Login</title>

      <form action={handleSubmit} className="max-w-md mx-auto p-8 bg-white rounded-sm shadow-2xl mt-30">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onFocus={() => setError('')}
            onChange={e => { setData({ "email": e.target.value }) }}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onFocus={() => setError('')}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {error ? <p className="text-red-600 text-center mb-5">{error.message}</p> : ""}

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none cursor-pointer w-[100%]">
          Login
        </button>
        <p className="mt-3 text-center text-sm text-gray-600">Don't have an account? <NavLink to='/register' className="underline text-indigo-600">Sign up!</NavLink></p>
      </form>
    </>
  )
}

export default Login
