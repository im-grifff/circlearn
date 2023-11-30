/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import api from '../config/api';
import Background from '../components/Background';
import AccessibilityPopup from '../components/AccessibilityPopup';
import BackgroundAccessible from '../components/BackgroundAccessible';

export default function LoginPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [responseData, setResponseData] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessibility, setAccessibility] = useState(false);

  const renderAccesibility = () => {
    if (accessibility) {
      return <BackgroundAccessible />;
    }
    return <Background />;
  };

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.setProperty('--color-primary', '#00adb5');
    document.body.style.setProperty('--color-secondary', '#636499');
    document.body.style.setProperty('--color-tertiary', '#121225');
  }, []);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const LoginHandler = async (e) => {
    e.preventDefault();

    await api
      .post('/user/login', {
        username,
        password
      })
      .then((response) => {
        setResponseData(response.data);
        if (response.data.status === 'ok') {
          localStorage.setItem('authenticated', true);
          localStorage.setItem('token', response.data.data);
          if (username === 'admin' && password === 'adminadmin') {
            window.location.href =
              `${process.env.REACT_APP_DASHBOARD_URL}/admin/default?token=` +
              response.data.data;
            return;
          }
          navigate('/ruang');
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        setResponseData({ message: 'Wrong username or password ' });
      });
  };

  const userLogOut = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const userLoggedIn = () => {
    const loggedIn = localStorage.getItem('authenticated');
    if (loggedIn) {
      return true;
    }
    return false;
  };

  return (
    <>
      <AccessibilityPopup
        accessibility={accessibility}
        setAccess={setAccessibility}
      />
      {renderAccesibility()}
      {userLoggedIn() ? (
        <div className='relative flex items-center justify-center h-screen overflow-hidden'>
          <div className='w-[385px] sm:w-[485px] bg-[#dbdbdb] bg-opacity-50 px-[44px] py-[65px] rounded-2xl backdrop-filter backdrop-blur-lg'>
            <h1 className='text-[45px] font-bold text-primary-1'>
              User Logged In
            </h1>
            <p className='font-medium text-[15px]'>
              Kamu sudah masuk ke aplikasi (logged in)
            </p>
            <div className='flex flex-col'>
              <Link className='text-primary-2' to='/'>
                Kembali ke Halaman Utama
              </Link>
              <Link className='text-primary-2' to='/ruang'>
                Telusuri Ruang Diskusi
              </Link>
              <button
                onClick={() => userLogOut()}
                type='button'
                className='w-full py-3 mt-4 text-white rounded-md bg-primary-1'>
                Log Out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='relative flex items-center justify-center h-screen overflow-hidden'>
          <div className='w-[385px] sm:w-[485px] bg-[#dbdbdb] bg-opacity-50 px-[44px] py-[65px] rounded-2xl backdrop-filter backdrop-blur-lg'>
            <h1 className='text-[60px] font-bold text-primary-1'>Login</h1>
            <p className='font-medium text-[15px]'>Login with your account</p>
            <form
              action='#'
              className='login-input mt-[75px]'
              onSubmit={LoginHandler}>
              <div className='flex flex-col mb-3'>
                <input
                  type='text'
                  placeholder='username'
                  name='username'
                  id='username'
                  className=' border-b py-4 px-1 border-[#7a7a7a] focus:outline-none focus:border-primary-1'
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className='relative w-full'>
                <input
                  className='border-b border-[#7a7a7a] w-full py-4 px-1 focus:outline-none focus:border-primary-1 pr-16'
                  id='password'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  type={passwordShown ? 'text' : 'password'}
                  required
                />
                <div className='absolute inset-y-0 right-0 flex items-center px-2'>
                  <button
                    type='button'
                    className='font-mono text-sm underline rounded cursor-pointer js-password-label'
                    htmlFor='toggle'
                    onClick={togglePasswordVisiblity}>
                    {passwordShown ? (
                      <i className='fa-sharp fa-solid fa-eye text-xl text-[#7a7a7a]' />
                    ) : (
                      <i className='fa-sharp fa-solid fa-eye-slash text-xl text-[#7a7a7a]' />
                    )}
                  </button>
                </div>
              </div>
              {responseData.message && (
                <p className='mt-3 text-sm text-red-500'>
                  {responseData.message}
                </p>
              )}
              <button
                type='submit'
                className='flex justify-end items-center text-white w-[80px] h-[80px] mt-[40px] bg-primary-2 text-[20px] font-medium p-0 rounded-[20px] relative hover:w-full transition-all ease-in-out duration-300 shadow-primary-1 shadow-2xl'>
                <span className='w-full text-center'>Login</span>
                <i className='flex justify-center items-center fa-solid fa-arrow-right text-4xl text-white bg-primary-1 z-10 -ml-[80px] rounded-[20px] w-[80px] h-[80px] shadow-sm' />
              </button>
            </form>
            <div>
              <p className='text-[15px] text-center mt-[40px]'>
                Don’t have an account?
                <a
                  href='/register'
                  className='text-primary-2 font-medium ml-[5px]'>
                  Sign Up Now !
                </a>
              </p>
              <p className='text-center'>
                <a className='text-primary-2' href='/'>
                  Back to home page
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
