import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { login } from '../api';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { login: authLogin } = useAuth();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    // try {
    //   const response = await login({ email, password });
    //   console.log('LOGIN RESPONSE');
    //   console.log(response.data);
    //   const { token, user } = response.data.data;
    //   setMessage('Login successful! Redirecting...');
    //   authLogin(token, user);
    //   setMessage('Login successful! Redirecting...');
    //   setTimeout(() => {
    //     history.push('/challenges');
    //   }, 500);
    // }
    //  catch (error: any) {
    //   setMessage(error.response?.data?.error || 'Login failed');
    // }
    try {
  const response = await login({ email, password });

  console.log('STEP 1', response.data);

  const { token, user } = response.data.data;

  console.log('STEP 2', token);
  console.log('STEP 3', user);

  authLogin(token, user);

  console.log('STEP 4 authLogin done');

  setMessage('Login successful! Redirecting...');

  setTimeout(() => {
    console.log('STEP 5 redirect');
    history.push('/challenges');
  }, 500);

} catch (error: any) {
  console.error('LOGIN ERROR', error);

  setMessage(
    error.response?.data?.error ||
    error.message ||
    'Login failed'
  );
} finally {
      setLoading(false);
    }
  };

  return (
  <div className="auth-container">

    <h1 className="auth-title">
      Welcome Back
    </h1>

    <form onSubmit={handleLogin}>

      <input
        className="auth-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="auth-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="auth-button"
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Login'}
      </button>

    </form>

    {message && <p>{message}</p>}
  </div>
);
};


export default Login;
