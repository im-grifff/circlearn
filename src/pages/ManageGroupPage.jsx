/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import api from '../config/api';

import AccessibilityPopup from '../components/AccessibilityPopup';
import Navbar from '../layouts/Navbar';
import Background from '../components/Background';
import BackgroundAccessible from '../components/BackgroundAccessible';

import MyGroupCard from '../components/MyGroupCard';

export default function ManageGroupPage() {
  const [accessibility, setAccessibility] = useState(false);
  const [discussionAdmin, setDiscussionAdmin] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    api
      .get('/runding/admined', {
        headers: {
          'auth-token': token // the token is a variable which holds the token
        }
      })
      .then((response) => {
        setDiscussionAdmin(response.data.data);
        setLoading(false);
        // eslint-disable-next-line no-console
        console.log(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    document.body.style.setProperty('--color-primary', '#00adb5');
    document.body.style.setProperty('--color-secondary', '#636499');
    document.body.style.setProperty('--color-tertiary', '#121225');
  }, []);

  const renderAccesibility = () => {
    if (accessibility) {
      return <BackgroundAccessible noBig />;
    }
    return <Background noBig />;
  };

  return (
    <>
      <AccessibilityPopup
        accessibility={accessibility}
        setAccess={setAccessibility}
      />
      <Navbar />
      {renderAccesibility()}
      <div className='container mx-auto px-2 mt-4 mb-10'>
        <Link to='/profile' className='py-3'>
          {'< Kembali'}
        </Link>
        <span className='text-primary-1 font-medium'> | Ruang diskusiku</span>
        <button
          onClick={() => {
            navigate('/create');
          }}
          type='button'
          className='flex justify-end items-center text-white w-[120px] h-[55px] ml-2 mt-2 bg-primary-2 text-[15px] font-medium p-0 rounded-[17px] relative hover:shadow-primary-1 shadow-2xl'>
          <span className='text-center w-full'>Buat Ruang Diskusi Baru</span>
        </button>
        <div>
          {loading ? (
            <div className='flex justify-center items-center ml-auto pt-20'>
              <i className='fa-solid fa-circle-notch animate-spin text-3xl text-primary-1' />
            </div>
          ) : (
            discussionAdmin.map((discussionRoom) => (
              <MyGroupCard
                key={discussionRoom._id}
                discussionRoom={discussionRoom}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
