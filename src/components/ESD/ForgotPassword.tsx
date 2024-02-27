import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      await axios.post('http://localhost:8080/forgot-password', { email });
      setMessage('Email sent successfully');
    } catch (error) {
      setMessage('Error sending email');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleForgotPassword}>Send Email</button>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
