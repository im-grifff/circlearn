/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import Background from '../components/Background';
import avatar from '../assets/img/avatar.png';
import AccessibilityPopup from '../components/AccessibilityPopup';
import BackgroundAccessible from '../components/BackgroundAccessible';

import api from '../config/api';

export default function DiscussionDetails() {
  const [accessibility, setAccessibility] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    api
      .get(`/runding/${params.id}`, {
        headers: {
          'auth-token': token // the token is a variable which holds the token
        }
      })
      .then((response) => {
        setData(response.data);
        // eslint-disable-next-line no-console
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  const userJoin = () => {
    const token = localStorage.getItem('token');
    api
      .put(`/runding/join/${params.id}`, 'mytoken', {
        headers: {
          'auth-token': token // the token is a variable which holds the token
        }
      })
      .then(() => {
        // eslint-disable-next-line no-console
        // console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const userLeave = () => {
    const token = localStorage.getItem('token');
    api
      .put(`/runding/leave/${params.id}`, 'mytoken', {
        headers: {
          'auth-token': token // the token is a variable which holds the token
        }
      })
      .then(() => {
        // eslint-disable-next-line no-console
        // console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  return (
    <>
      <AccessibilityPopup
        accessibility={accessibility}
        setAccess={setAccessibility}
      />
      <Navbar />
      {renderAccesibility()}
      <div className='container px-2 mx-auto mt-4'>
        <Link to='/ruang' className='py-3'>
          {'< Back'}
        </Link>
        {loading ? (
          <div className='flex items-center justify-center pt-20'>
            <i className='text-3xl fa-solid fa-circle-notch animate-spin text-primary-1' />
          </div>
        ) : (
          <div className='p-3 mt-3 bg-white border-2 rounded-lg shadow-lg'>
            <div className='flex flex-col items-center justify-between w-full gap-3 lg:flex-row lg:items-start '>
              <div className='flex items-center justify-center w-24'>
                <img
                  src={
                    data.data.logo_grup !== undefined
                      ? data.data.logo_grup
                      : avatar
                  }
                  alt=''
                />
              </div>
              <div className='flex flex-col items-center justify-center flex-grow lg:items-start lg:block'>
                <h3 className='mb-2 font-semibold'>{data.data.subject}</h3>
                <div className='flex items-center mb-1'>
                  <i className='flex items-center justify-center w-5 h-5 mr-3 text-xl fa-solid fa-user' />
                  <span className='font-medium text-primary-1'>
                    {`${
                      data.data.peserta !== undefined
                        ? data.data.peserta.length
                        : '0'
                    } Member`}
                  </span>
                </div>
                <div className='flex items-center mb-1'>
                  <i className='flex items-center justify-center w-5 h-5 mr-3 text-xl fa-solid fa-users' />
                  <span className='font-medium'>
                    Made by
                    <span className='text-primary-1'>
                      {' '}
                      {data.data.admin_username}
                    </span>
                  </span>
                </div>
              </div>
              {data.member || data.author ? (
                <div className='flex justify-center w-full lg:block lg:w-auto'>
                  <span>
                    <i className='mr-2 fa-solid fa-calendar' />
                    {data.data.createdAt.slice(0, 10)}
                  </span>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='mt-5'>
              <p>{data.data.deskripsi || ''}</p>
            </div>
            <div className='mt-5'>
              {(() => {
                if (data.member || data.author) {
                  return (
                    <p>{`Meeting : ${data.data.meetTime || 'Coming Soon'}`}</p>
                  );
                }

                return <div />;
              })()}
            </div>
            <div className='mt-5 text-end'>
              <button
                type='button'
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.REACT_APP_MAIN_URL}/ruang/${params.id}`
                  );

                  // eslint-disable-next-line no-alert
                  alert('Link Copied');
                }}
                className='flex-grow px-6 py-3 mb-2 ml-2 mr-2 font-semibold text-white rounded-lg shadow-lg bg-primary-1 shadow-primary-1'>
                Share
              </button>
              <button
                type='button'
                onClick={() => navigate(`/ruang/admininfo/${params.id}`)}
                className='flex-grow px-6 py-3 mb-2 ml-2 mr-2 font-semibold text-white rounded-lg shadow-lg bg-primary-1 shadow-primary-1'>
                Contact Admin
              </button>
              {(() => {
                if (data.member || data.author) {
                  if (data.data.meetLink) {
                    return (
                      <button
                        type='button'
                        onClick={() => {
                          window.open(
                            `${data.data.meetLink}`,
                            '_blank',
                            'noopener,noreferrer'
                          );
                        }}
                        className='flex-grow px-6 py-3 mr-3 font-semibold text-white rounded-lg shadow-lg bg-primary-1 shadow-primary-1'>
                        Open Meeting
                      </button>
                    );
                  }
                  if (!data.data.meetLink) {
                    return (
                      <button
                        disabled
                        type='button'
                        className='flex-grow px-6 py-3 mr-3 font-semibold border-2 rounded-lg border-primary-1 text-primary-1'>
                        No Meeting
                      </button>
                    );
                  }

                  return <div />;
                }

                return <div />;
              })()}
              {data.member || data.author ? (
                <Link
                  to={`/ruang/question/${params.id}`}
                  className='flex-grow px-6 py-3 mr-3 font-semibold text-white rounded-lg shadow-lg bg-primary-1 shadow-primary-1'>
                  Questions
                </Link>
              ) : (
                <button
                  disabled
                  type='button'
                  className='flex-grow px-6 py-3 mr-3 font-semibold text-black bg-white rounded-lg shadow-lg shadow-primary-1'>
                  Not a Member
                </button>
              )}
              {(() => {
                if (data.author) {
                  return (
                    <button
                      type='button'
                      onClick={() => {
                        navigate(`/ruang/administrator/${params.id}`);
                      }}
                      className='flex-grow px-6 py-3 font-semibold text-green-400 rounded-lg shadow-lg bg-primary-1 shadow-primary-1'>
                      Admin
                    </button>
                  );
                }
                if (!data.member) {
                  return (
                    <button
                      type='button'
                      className='flex-grow px-6 py-3 font-semibold text-white rounded-lg shadow-lg bg-primary-1 shadow-primary-1'
                      onClick={userJoin}>
                      Join
                    </button>
                  );
                }
                if (data.member) {
                  return (
                    <button
                      type='button'
                      className='flex-grow px-6 py-3 font-semibold text-white rounded-lg shadow-lg bg-primary-1 shadow-primary-1'
                      onClick={userLeave}>
                      Exit
                    </button>
                  );
                }

                return <div />;
              })()}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
