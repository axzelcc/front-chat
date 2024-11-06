import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!username || !password) {
      setError('Por favor, ingrese ambos campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        
        localStorage.setItem('authorization', data.authorization);
        localStorage.setItem('userId', `${data.userId}`);        
        setError('');
        alert('Login exitoso');

        navigate('/chat');

      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setError('Error en la conexión. Intente de nuevo');
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='login'>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <button type='submit'>Login</button>
          </div>
        </div>
      </form>
      {error && <p className='error'>{error}</p>}
    </div>
  );
};

export default Login;
