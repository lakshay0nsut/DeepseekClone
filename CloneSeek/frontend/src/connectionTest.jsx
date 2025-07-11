import React, { useState } from 'react';
import axios from 'axios';

function ConnectionTest() {
  const [backendResponse, setBackendResponse] = useState('');
  const [email, setEmail] = useState('');

  const testConnection = async () => {
    try {
      const res = await axios.get('http://localhost:4002/api/health');
      setBackendResponse(res.data.message);
    } catch (error) {
      setBackendResponse('Connection failed: ' + error.message);
    }
  };

  const testSignup = async () => {
    try {
      const res = await axios.post(
        'http://localhost:4002/api/signup',
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setBackendResponse(res.data.message);
    } catch (error) {
      setBackendResponse(
        error.response?.data?.errors?.[0] || 
        'Signup failed: ' + error.message
      );
    }
  };

  return (
    <div>
      <h1>Connection Test</h1>
      <button onClick={testConnection}>Test Backend Connection</button>
      <div>
        <input 
          type="email" 
          placeholder="Enter email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={testSignup}>Test Signup</button>
      </div>
      <p>Backend says: <strong>{backendResponse}</strong></p>
    </div>
  );
}

export default ConnectionTest;