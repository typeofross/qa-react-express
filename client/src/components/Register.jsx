import { NavLink, useNavigate } from 'react-router';
import React, { useState } from 'react';
import services from '../../services/fetch.js';

function Register() {
  const [error, setError] = useState([]);
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    const password = await formData.get('password');
    const repassword = await formData.get('repassword');
    const email = await formData.get('email');
    const username = await formData.get('username');

    setData({ username, email });

    try {
      const response = await services.register({ username, email, password, repassword });

      if (response.status !== 'success') {
        setError(response.message);
        throw new Error(response.message)
      }

      localStorage.setItem('accesstoken', response.message);

      return navigate('/');

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <title>Register</title>

      <form action={handleSubmit} className="max-w-md mx-auto p-8 bg-white rounded-sm shadow-2xl mt-30">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={data.username}
            onFocus={() => setError('')}
            onChange={e => { setData({ "username": e.target.value }) }}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {error && error.find(x => x.path == "username") ?
            error.map(x => {
              if (x.path == "username") {
                return <p className="text-red-700 text-sm mt-1">{x.error}</p>
              }
            })
            : ""}
        </div>

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
          {error && error.find(x => x.path == "email") ?
            error.map(x => {
              if (x.path == "email") {
                return <p className="text-red-700 text-sm mt-1">{x.error}</p>
              }
            })
            : ""}
        </div>

        <div className="mb-4">
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
          {error && error.find(x => x.path == "password") ?
            error.map(x => {
              if (x.path == "password") {
                return <p className="text-red-700 text-sm mt-1">{x.error}</p>
              }
            })
            : ""}
        </div>

        <div className="mb-6">
          <label htmlFor="repassword" className="block text-gray-700 text-sm font-bold mb-2">
            Confirm password
          </label>
          <input
            type="password"
            id="repassword"
            name="repassword"
            onFocus={() => setError('')}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none cursor-pointer w-[100%]">
          Register
        </button>
        <p className="mt-3 text-center text-sm text-gray-600">Already have an account? <NavLink to='/login' className="underline text-indigo-600">Login!</NavLink></p>
      </form>
    </>
  )
}

export default Register
