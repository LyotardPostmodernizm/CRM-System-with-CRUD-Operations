import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await AuthService.login({ username, password });
      console.log("Login successful:", response);

      if (response && response.accessToken) {
        localStorage.setItem("user", JSON.stringify({
          id: response.id,
          username: response.username,
          role: response.role,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        }));

        localStorage.setItem("token", response.accessToken);
        console.log("Navigating to /customers");
        navigate('/customers'); 
      } else {
        setError('Invalid login credentials');
        console.error('No access token in response:', response);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login failed', error);
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </Container>
  );
};

export default LoginComponent;
