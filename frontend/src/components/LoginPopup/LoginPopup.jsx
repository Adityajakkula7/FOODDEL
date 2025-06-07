import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState('Sign Up');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    const endpoint =
      currState === 'Login'
        ? `${url}/api/user/login`
        : `${url}/api/user/register`;

    try {
      const response = await axios.post(endpoint, data, {
        headers: { 'Content-Type': 'application/json' },
      });

      const resData = response.data;

      if (!resData.success) {
        alert(resData.message || 'Something went wrong.');
        return;
      }

      // Successful login/register
      setToken(resData.token);
      localStorage.setItem('token', resData.token);
      setShowLogin(false);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'Network/server error occurred';
      alert(message);
      console.error('Login/Register Error:', err);
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt='close'
          />
        </div>

        <div className='login-popup-inputs'>
          {currState === 'Sign Up' && (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              placeholder='Name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            placeholder='Email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Password'
            required
          />
        </div>

        <button type='submit'>
          {currState === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>
            By continuing you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {currState === 'Login' ? (
          <p>
            Create a New Account?
            <span onClick={() => setCurrState('Sign Up')}> Click here</span>
          </p>
        ) : (
          <p>
            Existing user?
            <span onClick={() => setCurrState('Login')}> Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
