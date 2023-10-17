/* eslint-disable no-unused-vars */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';

import AccessibilityPopup from '../components/AccessibilityPopup';
import Navbar from '../layouts/Navbar';
import Background from '../components/Background';
import DiscussionRoomCard from '../components/DiscussionRoomCard';
import BackgroundAccessible from '../components/BackgroundAccessible';

import api from '../config/api';

export default function RuangPage() {
  const [discussionRooms, setDiscussionRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [accessibility, setAccessibility] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const renderAccesibility = () => {
    if (accessibility) {
      return <BackgroundAccessible noBig />;
    }
    return <Background noBig />;
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    api
      .get('/runding', {
        headers: {
          'auth-token': token // the token is a variable which holds the token
        }
      })
      .then((response) => {
        setDiscussionRooms(response.data.data);
        setSearchResults(response.data.data);
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

  // search function for discussion rooms

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchResults(discussionRooms);
    const newResults = discussionRooms.filter((discussion) =>
      discussion.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(newResults);

    setSearchTerm('');
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // filter is sains,teknologi,other separated by comma (,) in the database

    if (filter === 'all') {
      setSearchResults(discussionRooms);
    } else {
      const newResults = discussionRooms.filter((discussion) =>
        discussion.jenisRunding.toLowerCase().includes(filter.toLowerCase())
      );
      setSearchResults(newResults);
    }
  }, [discussionRooms, filter]);

  console.log(discussionRooms);

  return (
    <>
      <AccessibilityPopup
        accessibility={accessibility}
        setAccess={setAccessibility}
      />
      <Navbar />
      {renderAccesibility()}
      <div className='container mx-auto px-2 mt-4'>
        <div className='flex flex-col lg:flex-row mb-4'>
          <form
            onSubmit={handleSubmit}
            className='flex-grow flex flex-col sm:flex-row'>
            <input
              type='text'
              placeholder='Search Rooms'
              className='border-2 border-primary-1 rounded-lg flex-grow py-1 px-2 ml-1 sm:ml-auto'
              value={searchTerm}
              onChange={handleChange}
            />
            <button
              type='submit'
              className='py-2 px-6 sm:px-10 bg-primary-1 rounded-md mt-2 sm:mt-auto ml-2 text-white hover:shadow-primary-1 shadow-lg'>
              Search
            </button>
          </form>
        </div>
      </div>
      <div className='container mx-auto px-2 mt-4'>
        <div className='flex justify-between mb-3'>
          <h2 className='font-semibold mt-auto mb-auto'>
            List
            <span className='text-primary-1'> My Rooms</span>
          </h2>
          <div className='flex flex-row-reverse'>
            <button
              onClick={() => {
                navigate('/create');
              }}
              type='button'
              className='flex justify-center items-center text-center text-white ml-[7px] w-[120px] h-[40px] bg-primary-2 text-[15px] font-medium p-0 rounded-lg hover:shadow-primary-1 shadow-lg'>
              NEW
            </button>
            <Popup
              trigger={
                <button
                  type='button'
                  className='flex justify-center items-center text-center text-white ml-[7px] w-[120px] h-[40px] bg-primary-2 text-[15px] font-medium p-0 rounded-lg hover:shadow-primary-1 shadow-lg'>
                  FILTER
                </button>
              }
              modal
              nested>
              {(close) => (
                <div className='bg-white rounded-lg shadow-lg p-4 max-w-[300px] w-full'>
                  <div className='flex justify-between items-center mb-4'>
                    <h2 className='font-semibold'>Filter by Tags</h2>
                    <button
                      type='button'
                      className='text-primary-1'
                      onClick={() => {
                        close();
                      }}>
                      <i className='fa-solid fa-times' />
                    </button>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='tags' className='font-semibold'>
                      Tags
                    </label>
                    <select
                      name='tags'
                      id='tags'
                      onChange={(e) => {
                        setFilter(e.target.value);
                      }}
                      value={filter}
                      className='border-2 border-primary-1 rounded-lg py-1 px-2'>
                      <option value='all'>All</option>
                      <option value='test'>Test</option>
                      <option value='sains'>Science</option>
                      <option value='teknologi'>Technology</option>
                      <option value='programming'>Programming</option>
                      <option value='agrikultur'>Agriculture</option>
                      <option value='bisnis'>Business</option>
                      <option value='kesehatan'>Health</option>
                      <option value='debat'>Debate</option>
                      <option value='hiburan'>Entertainment</option>
                      <option value='kuliner'>Food</option>
                      <option value='Olahraga'>Sports</option>
                    </select>
                  </div>
                  <div className='flex justify-end mt-4'>
                    <button
                      type='button'
                      className='text-primary-1'
                      onClick={() => {
                        close();
                      }}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          {loading ? (
            <div className='flex justify-center items-center ml-auto pt-20'>
              <i className='fa-solid fa-circle-notch animate-spin text-3xl text-primary-1' />
            </div>
          ) : (
            searchResults.map((discussionRoom) => (
              <DiscussionRoomCard
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
