import { NavLink, useNavigate } from 'react-router';
import React, { useContext, useState } from 'react';
import services from '/services/fetch.js';
import { styles } from '/src/components/layouts/AuthLayout.jsx';
import FormError from '/src/components/partials/FormError.jsx';
import { AuthContext } from '/src/contexts/AuthContext.js';

function Register() {
  const { setAuth } = useContext(AuthContext);
  const [error, setError] = useState([]);
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const response = await services.auth('register', data);

      if (response.status !== 'success') {
        setError(response.message);
        throw new Error(response.message)
      }

      setAuth({ email: data.email, isLogged: true })

      return navigate('/');

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <title>Register</title>

      <form onSubmit={submitHandler} className={styles.form}>
        <NavLink to="/" className={styles.navLink2}>↵ BACK TO HOME</NavLink>
        <h2 className={styles.h2}>Register</h2>
        <div className="mb-4">
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={data.username}
            onFocus={() => setError('')}
            onChange={e => { setData({ ...data, "username": e.target.value }) }}
            required
            className={styles.input}
          />
          <FormError error={error} field="username" />
        </div>

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
          <FormError error={error} field="email" />
        </div>

        <div className="mb-4">
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
          <FormError error={error} field="password" />
        </div>

        <div className="mb-6">
          <label htmlFor="repassword" className={styles.label}>
            Confirm password
          </label>
          <input
            type="password"
            id="repassword"
            name="repassword"
            onFocus={() => setError('')}
            onChange={e => { setData({ ...data, "repassword": e.target.value }) }}
            required
            className={styles.input}
          />
          <FormError error={error} field="repassword" />
          {!Array.isArray(error) && <p className={styles.p1}>{error}</p>}
        </div>

        <button
          type="submit"
          className={styles.button}>
          Register
        </button>
        <p className={styles.p2}>Already have an account? <NavLink to='/login' className={styles.navLink}>Login!</NavLink></p>
      </form>
    </>
  )
}

export default Register
