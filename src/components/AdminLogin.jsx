import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from './ForgotPasswordModal';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setErrorMessage('Please enter username and password.');
      return;
    }

    localStorage.setItem('token', 'admin-token');
    navigate('/admin');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-brand">
          <div className="login-logo">BA</div>
          <span>Boxing Avenue</span>
        </div>
        <h2>Admin Login</h2>
        <p>Sign in to manage bookings and view today’s sessions.</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage('');
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage('');
          }}
        />

        <button type="button" onClick={handleLogin}>
          Login
        </button>

        {errorMessage && <p className="error-text">{errorMessage}</p>}

        <div className="login-footer">
          <span onClick={() => setShowModal(true)}>Forgot Password?</span>
        </div>
      </div>

      {showModal && <ForgotPasswordModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AdminLogin;
