/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../config/api';

import AccessibilityPopup from '../components/AccessibilityPopup';
import Background from '../components/Background';
import Navbar from '../layouts/Navbar';
import RandomFacts from '../components/RandomFacts';
import BackgroundAccessible from '../components/BackgroundAccessible';

import avatarBig from '../assets/img/avatarBig.png';
import Popup from 'reactjs-popup';

export default function ProfilePage() {
  const [accessibility, setAccessibility] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    api
      .get('/user/data', {
        headers: {
          'auth-token': token // the token is a variable which holds the token
        }
      })
      .then((response) => {
        setDataUser(response.data);
        setUsername(response.data.data.username);
        setEmail(response.data.data.email);

        // eslint-disable-next-line no-console
        console.log(response.data);
        setLoading(false);
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

  const putUser = () => {
    console.log('masuk');
    const token = localStorage.getItem('token');
    if (password !== confirmPassword) {
      alert('Password tidak sama');
    } else {
      api
        .put(
          '/user/edit',
          {
            username,
            email,
            password
          },
          {
            headers: {
              'auth-token': token // the token is a variable which holds the token
            }
          }
        )
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response.data);
          alert('Berhasil mengubah data');
          window.location.reload();
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
          alert('Gagal mengubah data');
        });
    }
  };

  return (
    <>
      <AccessibilityPopup
        accessibility={accessibility}
        setAccess={setAccessibility}
      />
      <Navbar />
      {renderAccesibility()}
      <div className='container grid-cols-3 grid-rows-1 px-2 mx-auto my-10 lg:grid'>
        <div className='flex flex-col items-center col-span-1'>
          <img src={avatarBig} alt='' />
        </div>
        <div className='col-span-2 mt-5 ml-3'>
          <h2 className='mb-4 text-xl font-semibold text-primary-1'>
            User Information
          </h2>
          {(() => {
            if (loading) {
              return (
                <div className='flex items-center justify-center pt-2'>
                  <i className='text-3xl fa-solid fa-circle-notch animate-spin text-primary-1' />
                </div>
              );
            }

            if (dataUser.status === 'ok') {
              return (
                <div className='mt-2 text-primary-3'>
                  <p className='mb-1'>{`Username : ${
                    dataUser.data.username || 'no username'
                  }`}</p>
                  <p className='mb-1'>{`E-mail : ${
                    dataUser.data.email || 'no email'
                  }`}</p>
                  <p className='mb-1'>{`ID User : ${dataUser.data._id}`}</p>
                  <p className='mt-3 mb-1'>Jumlah Kelas :</p>
                  <p className='mb-1'>{`Dibuat/admin : ${dataUser.data.adminkelas.length}`}</p>
                  <p className='mb-1'>{`Bergabung : ${dataUser.data.pesertakelas.length}`}</p>
                </div>
              );
            }

            return (
              <div>
                <p>Maaf, anda bukan anggota grup ini</p>
              </div>
            );
          })()}
          <div className='flex flex-col items-center gap-3 mb-10 lg:flex-row lg:items-start'>
            <Popup
              trigger={
                <button
                  type='button'
                  className='flex justify-end items-center text-white py-3 px-8 mt-[40px] bg-primary-2 text-[15px] font-medium p-0 rounded-md relative hover:shadow-primary-1 shadow-2xl'>
                  <span className='w-full text-center'>Edit Profile</span>
                </button>
              }
              modal>
              {(close) => (
                <div className='bg-white rounded-[14px] p-8 w-[500px]'>
                  <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-2xl font-semibold text-primary-1'>
                      Edit Profile
                    </h2>
                    <button
                      type='button'
                      className='text-[#FF0000] text-xl font-bold'
                      onClick={close}>
                      &times;
                    </button>
                  </div>
                  <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                      <label
                        htmlFor='username'
                        className='font-semibold text-primary-1'>
                        Username
                      </label>
                      <input
                        type='text'
                        name='username'
                        id='username'
                        className='border border-primary-1 rounded-[14px] p-2'
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <label
                        htmlFor='email'
                        className='font-semibold text-primary-1'>
                        Email
                      </label>
                      <input
                        type='email'
                        name='email'
                        id='email'
                        className='border border-primary-1 rounded-[14px] p-2'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <label
                        htmlFor='password'
                        className='font-semibold text-primary-1'>
                        Password
                      </label>
                      <input
                        type='password'
                        name='password'
                        id='password'
                        className='border border-primary-1 rounded-[14px] p-2'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <label
                        htmlFor='password'
                        className='font-semibold text-primary-1'>
                        Confirm Password
                      </label>
                      <input
                        type='password'
                        name='confirmPassword'
                        id='confirmPassword'
                        className='border border-primary-1 rounded-[14px] p-2'
                        placeholder='Confirm Password'
                        onChange={(e) => setConfirm(e.target.value)}
                      />
                    </div>
                    <div className='flex justify-end'>
                      <button
                        type='button'
                        onClick={() => {
                          putUser();
                          close();
                        }}
                        className='text-white bg-primary-2 rounded-[14px] px-4 py-2'>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
            {/* <button
              onClick={() => {
                navigate('/manage');
              }}
              type='button'
              className='flex justify-end items-center text-white w-[130px] h-[68px] mt-[40px] bg-primary-2 text-[15px] font-medium p-0 rounded-[14px] relative hover:shadow-primary-1 shadow-2xl'>
              <span className='w-full text-center'>Manage Ruang Diskusi</span>
            </button>
            <button
              onClick={() => {
                navigate('/joined');
              }}
              type='button'
              className='flex justify-end items-center text-white w-[160px] h-[68px] mt-[40px] bg-primary-2 text-[15px] font-medium p-0 rounded-[17px] relative hover:shadow-primary-1 shadow-2xl'>
              <span className='w-full text-center'>
                Lihat Ruang Diskusi Yang Diikuti
              </span>
            </button> */}
          </div>
        </div>
        <RandomFacts />
      </div>
    </>
  );
}
