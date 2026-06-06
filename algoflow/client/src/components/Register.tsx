import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../api';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await register({ username, email, password });
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        history.push('/login');
      }, 1500);
    }catch (error: any) {
  console.log(error.response?.data);

  if (error.response?.data?.details) {
    setMessage(
      JSON.stringify(error.response.data.details)
    );
  } else {
    setMessage(
      error.response?.data?.error ||
      'Registration failed'
    );
  }
} finally {
      setLoading(false);
    }
  };
return (
  <div className="auth-container">

    <h1 className="auth-title">
      Create Account
    </h1>

    <form onSubmit={handleRegister}>

      <input
        className="auth-input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="auth-input"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="auth-input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="auth-button"
      >
        Register
      </button>

    </form>

    {message && <p>{message}</p>}
  </div>
);
}
export default Register;
