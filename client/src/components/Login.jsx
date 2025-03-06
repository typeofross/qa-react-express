import { NavLink, useNavigate } from 'react-router';
import React, { useState } from 'react';
import services from '/services/fetch.js';

const styles = {
  form: "max-w-md mx-auto p-8 bg-white rounded-sm shadow-2xl mt-30",
  h2: "text-2xl font-semibold mb-4",
  label: "block text-gray-700 text-sm font-bold mb-2",
  input: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
  p1: "text-red-600 text-center mb-5",
  button: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none cursor-pointer w-[100%]",
  p2: "mt-3 text-center text-sm text-gray-600",
  navLink: "underline text-indigo-600"
}

function Login() {
  const [error, setError] = useState('');
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const response = await services.auth('login', data);

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

      <form onSubmit={submitHandler} className={styles.form}>
        <h2 className={styles.h2}>Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onFocus={() => setError('')}
            onChange={e => { setData({ ...data, "email": e.target.value }) }}
            required
            className={styles.input}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className={styles.label}>
            Password
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
        </div>

        {error ? <p className={styles.p1}>{error.message}</p> : ""}

        <button
          type="submit"
          className={styles.button}>
          Login
        </button>
        <p className={styles.p2}>Don't have an account? <NavLink to='/register' className={styles.navLink}>Sign up!</NavLink></p>
      </form>
    </>
  )
}

export default Login
