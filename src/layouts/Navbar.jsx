import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logoImg from '../assets/img/logoImg.svg';
import avatar from '../assets/img/avatar.png';

/* Navbar di tiap halaman aplikasi yang berisi navigasi ke halaman beranda, ruang diskusi,
   tentang kami, profile, dan notifikasi */
export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const navigate = useNavigate();

  const userLogOut = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className='relative flex flex-wrap items-center justify-between mb-3 bg-white border-b-2 shadow-lg lg:shadow-none '>
      <div className='container p-2 mx-auto'>
        <div className='flex flex-wrap items-center justify-between'>
          <div className='relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start'>
            <a className='flex font-bold font-logo text-[36px] ' href='/'>
              <img src={logoImg} alt='R' className='mr-2' />
              Circlearn
            </a>
            <button
              className='block px-4 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}>
              <i className='fas fa-bars' />
            </button>
          </div>
          <div
            className={
              // eslint-disable-next-line prefer-template, operator-linebreak
              'flex-col-reverse lg:flex-row lg:flex flex-grow items-start lg:items-center' +
              (navbarOpen ? ' flex' : ' hidden')
            }>
            <ul className='flex flex-col-reverse justify-center w-full list-none lg:items-center lg:flex-row lg:ml-auto lg:w-auto'>
              <li className='flex'>
                <Link
                  className='w-full px-1 py-3 text-lg font-medium leading-snug lg:mr-3 text-primary-3 hover:bg-slate-200'
                  to='/'>
                  Home
                </Link>
              </li>
              <li className='flex'>
                <Link
                  className='w-full px-1 py-3 text-lg font-medium leading-snug lg:mr-3 text-primary-3 hover:bg-slate-200'
                  to='/ruang'>
                  Discussion Room
                </Link>
              </li>
              <li className='flex'>
                <Link
                  className='w-full px-1 py-3 text-lg font-medium leading-snug lg:mr-3 text-primary-3 hover:bg-slate-200'
                  to='/about'>
                  About
                </Link>
              </li>
              <li className='flex'>
                <Link
                  className='w-full px-1 py-3 text-lg font-medium leading-snug text-red-400 lg:mr-3 hover:bg-slate-200'
                  onClick={() => userLogOut()}
                  to='/login'>
                  Logout
                </Link>
              </li>
            </ul>
            <div className='flex items-center justify-between w-full gap-2 border-b-2 lg:w-auto lg:border-none'>
              <Link
                className='flex items-center gap-3 py-2 font-medium leading-snug text-md text-primary-3 hover:opacity-75'
                to='/profile'>
                <img src={avatar} alt='' className='w-10 h-10' />
                <span className='lg:hidden'>Your Profile</span>
              </Link>
              {/* <Link
                className='font-medium leading-snug text-md text-primary-3 hover:opacity-75'
                to='/notifications'>
                <i className='text-3xl fa-regular fa-bell lg:text-xl' />
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
