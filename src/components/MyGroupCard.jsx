/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import avatar from '../assets/img/avatar.png';
import api from '../config/api';
import Popup from 'reactjs-popup';

/* card untuk menampilkan setiap group yang user merupakan admin sehingga user dapat
  mengakses admin settings dan halaman pertanyaan */
export default function MyGroupCard({ discussionRoom }) {
  const [file, setFile] = useState(null);
  const [filesrc, setFileSrc] = useState(null);
  const [subjectform, setSubject] = useState('');
  const [deskripsiform, setDeskripsi] = useState('');
  const [jenisform, setJenis] = useState([]);
  const [meetinglinkform, setMeetingLink] = useState('');
  const [topics, setTopics] = useState([]);

  const navigate = useNavigate();

  const {
    _id,
    logo_grup,
    subject,
    peserta,
    admin_username,
    createdAt,
    deskripsi,
    jenisRunding,
    meetLink
  } = discussionRoom;

  const deleteRunding = (id) => {
    const token = localStorage.getItem('token');
    api
      .delete(`/runding/${id}`, {
        headers: {
          'auth-token': token // the token is a variable which holds the token
        }
      })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        navigate('/ruang');
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  useEffect(() => {
    setFileSrc(logo_grup);
    setSubject(subject);
    setDeskripsi(deskripsi);
    setJenis(jenisRunding[0].split(','));
    setMeetingLink(meetLink);
  }, []);

  const handleEdit = (e) => {
    // put to api
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();

    if (subjectform === '' || deskripsiform === '' || jenisform === '') {
      // eslint-disable-next-line no-console
      console.log('Maaf, data kurang lengkap untuk membuat ruang diskusi baru');
      return;
    }

    if (file == null) {
      formData.append('logo_form', logo_grup);
    }

    if (file != null) {
      formData.append('logo_form', file);
    }

    formData.append('subject_form', subjectform);

    formData.append('deskripsi_form', deskripsiform);

    formData.append('jenis_form', jenisform);

    console.log('jenisform', jenisform);

    api
      .put(`/runding/${_id}`, formData, {
        headers: {
          'auth-token': token // the token is a variable which holds the token
        }
      })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        // navigate('/ruang');

        // put newmeeting
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });

    api
      .put(
        `/runding/newmeeting/${_id}`,
        {
          meeting_form: meetinglinkform
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
        // navigate(`/ruang/${params.id}`);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });

    // reload
    window.location.reload();
  };

  useEffect(() => {
    // fetch topic from API
    api
      .get('/topics')
      .then((res) => {
        setTopics(res.data.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setJenis([...jenisform, e.target.value]);
    } else {
      const newJenis = jenisform.filter((jenis) => jenis !== e.target.value);
      setJenis(newJenis);
    }
  };

  return (
    <div id={`${_id}`} className='container px-2 mx-auto mt-4'>
      <div className='p-3 mt-3 bg-white border-2 rounded-lg shadow-lg'>
        <div className='flex flex-col items-center justify-between w-full gap-3 lg:flex-row lg:items-start '>
          <div className='flex items-center justify-center w-24'>
            <img src={logo_grup || avatar} alt='group logo' />
          </div>
          <div className='flex flex-col items-center justify-center flex-grow lg:items-start lg:block'>
            <h3 className='mb-2 font-semibold'>{subject}</h3>
            <div className='flex items-center mb-1'>
              <i className='flex items-center justify-center w-5 h-5 mr-3 text-xl fa-solid fa-user' />
              <span className='font-medium text-primary-1'>
                {peserta.length <= 0 ? '0 ' : `${peserta.length} `} Member
              </span>
            </div>
            <div className='flex items-center'>
              <i className='flex items-center justify-center w-5 h-5 mr-3 text-xl fa-solid fa-users' />
              <span className='font-medium'>
                Made by
                <span className='text-primary-1'>{` ${admin_username[0]}`}</span>
              </span>
            </div>
          </div>
          <div className='flex justify-center w-full lg:block lg:w-auto'>
            <span>
              <i className='mr-2 fa-solid fa-calendar' />
              {createdAt.slice(0, 10)}
            </span>
          </div>
        </div>
        <div className='mt-5'>
          <p>{deskripsi}</p>
        </div>
        <div className='flex flex-col mt-5 lg:block text-start'>
          <button
            type='button'
            onClick={() => navigate(`/ruang/administrator/${_id}`)}
            className='flex-grow px-6 py-3 mb-3 font-semibold text-white rounded-lg shadow-lg bg-primary-1 lg:mr-3'>
            Admin Settings
          </button>
          <button
            type='button'
            onClick={() => deleteRunding(_id)}
            className='flex-grow px-6 py-3 mb-3 font-semibold text-white bg-red-500 rounded-lg shadow-lg lg:mr-3'>
            Delete Group
          </button>
          {/* edit popup */}
          <Popup
            trigger={
              <button
                type='button'
                className='flex-grow px-6 py-3 font-semibold text-white rounded-lg shadow-lg bg-primary-1 lg:mr-3'>
                Edit Group
              </button>
            }
            modal
            nested>
            {(close) => (
              // edit logoGrup, Subject, Deskripsi, topics, and meeting link
              <div className='bg-white rounded-lg shadow-lg p-4 max-w-[500px] w-full'>
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='font-semibold'>Edit Group</h2>
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
                  <form onSubmit={handleEdit} className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                      <div className='flex justify-center'>
                        <img
                          src={logo_grup || avatar}
                          alt='group logo'
                          className='w-24 h-24 text-center rounded-full'
                        />
                      </div>
                      <label htmlFor='logo_grup' className='font-semibold'>
                        Logo Group
                      </label>
                      <input
                        type='file'
                        id='logo_grup'
                        name='logo_grup'
                        className='px-2 py-1 border-2 rounded-lg border-primary-1'
                        placeholder='Logo Group'
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                          setFileSrc(URL.createObjectURL(e.target.files[0]));
                        }}
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='subject' className='font-semibold'>
                        Subject
                      </label>
                      <input
                        type='text'
                        id='subject'
                        name='subject'
                        className='px-2 py-1 border-2 rounded-lg border-primary-1'
                        placeholder='Subject'
                        onChange={(e) => {
                          setSubject(e.target.value);
                        }}
                        value={subjectform}
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='deskripsi' className='font-semibold'>
                        Deskripsi
                      </label>
                      <input
                        type='text'
                        id='deskripsi'
                        name='deskripsi'
                        className='px-2 py-1 border-2 rounded-lg border-primary-1'
                        placeholder='Deskripsi'
                        onChange={(e) => {
                          setDeskripsi(e.target.value);
                        }}
                        value={deskripsiform}
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='topics' className='font-semibold'>
                        Topics
                      </label>
                      {topics.map((topic) => (
                        <div
                          key={topic.topicId}
                          className='flex items-center gap-2 text-sm'>
                          <input
                            type='checkbox'
                            name={topic.topicName}
                            id={topic.topicName}
                            value={topic.topicName}
                            onChange={handleCheckboxChange}
                            className='w-4 h-4'
                            checked={jenisform.includes(topic.topicName)}
                          />
                          <label htmlFor={topic.topicName}>
                            {topic.topicName}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='meeting_link' className='font-semibold'>
                        Meeting Link
                      </label>
                      <input
                        type='text'
                        id='meeting_link'
                        name='meeting_link'
                        className='px-2 py-1 border-2 rounded-lg border-primary-1'
                        placeholder='Meeting Link'
                        onChange={(e) => {
                          setMeetingLink(e.target.value);
                        }}
                        value={meetinglinkform}
                      />
                    </div>
                  </form>
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
                  <button
                    type='button'
                    className='px-4 py-2 ml-2 font-semibold text-white rounded-lg shadow-lg bg-primary-1'
                    onClick={(e) => {
                      handleEdit(e);
                      close();
                    }}>
                    Save
                  </button>
                </div>
              </div>
            )}
          </Popup>
          <button
            type='button'
            onClick={() => navigate(`/ruang/question/${_id}`)}
            className='flex-grow px-6 py-3 font-semibold text-white rounded-lg shadow-lg bg-primary-1 '>
            See Question
          </button>
        </div>
      </div>
    </div>
  );
}
