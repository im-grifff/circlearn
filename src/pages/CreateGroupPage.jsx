import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import api from '../config/api';

import AccessibilityPopup from '../components/AccessibilityPopup';
import Navbar from '../layouts/Navbar';
import Background from '../components/Background';
import BackgroundAccessible from '../components/BackgroundAccessible';

import avatarBig from '../assets/img/avatarBig.png';

/* dalam create ruang diskusi baru, jika user tidak mengupload image, maka akan mengambil
   random image dari unsplash stock image website sebagai image group */
export default function CreateGroup() {
  const [accessibility, setAccessibility] = useState(false);
  const [file, setFile] = useState(null);
  const [filesrc, setFileSrc] = useState(null);
  const [subjectform, setSubject] = useState('');
  const [deskripsiform, setDeskripsi] = useState('');
  const [jenisform, setJenis] = useState([]);

  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.setProperty('--color-primary', '#00adb5');
    document.body.style.setProperty('--color-secondary', '#636499');
    document.body.style.setProperty('--color-tertiary', '#121225');
    setFileSrc(avatarBig);
  }, []);

  const renderAccesibility = () => {
    if (accessibility) {
      return <BackgroundAccessible noBig />;
    }
    return <Background noBig />;
  };

  const handleChangeImage = (e) => {
    // eslint-disable-next-line no-console
    console.log(e.target.files);
    setFileSrc(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const reset = () => {
    ref.current.value = '';
  };

  const CreateHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();

    if (subjectform === '' || deskripsiform === '' || jenisform === '') {
      // eslint-disable-next-line no-console
      console.log('Maaf, data kurang lengkap untuk membuat ruang diskusi baru');
      return;
    }

    if (file == null) {
      await fetch('https://source.unsplash.com/random/500x300?landscape')
        .then((res) => res.blob())
        .then((blob) => {
          const nowDate = Date.now().toString();
          const filerandom = new File([blob], `random-${nowDate}.png`, {
            type: 'image/png'
          });
          formData.append('logo_form', filerandom);
        });
    } else {
      formData.append('logo_form', file);
    }

    formData.append('subject_form', subjectform);

    formData.append('deskripsi_form', deskripsiform);

    formData.append('jenis_form', jenisform);

    await api
      .post('/runding/create', formData, {
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

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setJenis([...jenisform, e.target.value]);
    } else {
      const newJenis = jenisform.filter((jenis) => jenis !== e.target.value);
      setJenis(newJenis);
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
      <div className='container mx-auto px-2 mt-4 mb-10'>
        <Link to='/ruang' className='py-3'>
          {'< Back'}
        </Link>
        <form action='#' onSubmit={CreateHandler}>
          <div className='flex flex-col justify-center items-center gap-3 w-full mt-3'>
            <img src={filesrc} alt='' className='h-40 ' />
            <span>Select Image (Optional)</span>
            <div className='flex flex-col lg:flex-row'>
              <input
                type='file'
                accept='image/png, image/gif, image/jpeg'
                id='files'
                ref={ref}
                onChange={handleChangeImage}
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary-1 hover:file:bg-blue-100'
              />
              <button
                onClick={() => {
                  reset();
                  setFile(null);
                  setFileSrc(avatarBig);
                }}
                type='button'
                className='bg-primary-1 text-neutral-200 py-2 px-10 rounded-lg shadow-lg shadow-primary-1 mt-3 sm:mt-0 sm:ml-3'>
                X
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-3 mt-3'>
            <label htmlFor='name' className='font-semibold text-lg'>
              Room Name
              <span className='font-normal text-sm text-red-500 ml-1'>
                *Make sure you write the group subject correctly, for example:
                Python Group Community
              </span>
            </label>
            <input
              type='text'
              name='name'
              id='name'
              onChange={(e) => setSubject(e.target.value)}
              className='border border-primary-1 rounded-md py-2 px-3 filter backdrop-blur-md bg-transparent'
            />
          </div>
          <div className='flex flex-col gap-3 mt-3'>
            <label htmlFor='name' className='font-semibold text-lg'>
              Room Description
              <span className='font-normal text-sm text-red-500 ml-1'>
                *write clearly the purpose of the group you will create
              </span>
            </label>
            <textarea
              name='deskripsi'
              id='deskripsi'
              onChange={(e) => setDeskripsi(e.target.value)}
              cols='20'
              rows='10'
              className='border-primary-1 border rounded-lg w-full p-3 h-40 resize-none filter backdrop-blur-md bg-transparent'
            />
          </div>
          <div className='flex flex-col gap-3 mt-3'>
            <label className='font-semibold text-lg'>
              Subject
              <span className='font-normal text-sm text-red-500 ml-1'>
                *Select discussion topics including: Science, Technology,
                Programming, Agriculture, Business, Health, Debate,
                Entertainment, Food, Sports, and Other
              </span>
            </label>
            <div className='flex flex-wrap gap-3'>
              <label htmlFor='sains' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='sains'
                  name='jenis'
                  value='Sains'
                  onChange={handleCheckboxChange}
                />
                Science
              </label>
              <label htmlFor='teknologi' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='teknologi'
                  name='jenis'
                  value='Teknologi'
                  onChange={handleCheckboxChange}
                />
                Technology
              </label>
              <label htmlFor='programming' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='programming'
                  name='jenis'
                  value='Programming'
                  onChange={handleCheckboxChange}
                />
                Programming
              </label>
              <label htmlFor='agrikultur' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='agrikultur'
                  name='jenis'
                  value='Agrikultur'
                  onChange={handleCheckboxChange}
                />
                Agriculture
              </label>
              <label htmlFor='bisnis' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='bisnis'
                  name='jenis'
                  value='Bisnis'
                  onChange={handleCheckboxChange}
                />
                Business
              </label>
              <label htmlFor='kesehatan' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='kesehatan'
                  name='jenis'
                  value='Kesehatan'
                  onChange={handleCheckboxChange}
                />
                Health
              </label>
              <label htmlFor='debat' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='debat'
                  name='jenis'
                  value='Debat'
                  onChange={handleCheckboxChange}
                />
                Debate
              </label>
              <label htmlFor='hiburan' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='hiburan'
                  name='jenis'
                  value='Hiburan'
                  onChange={handleCheckboxChange}
                />
                Entertainment
              </label>
              <label htmlFor='kuliner' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='kuliner'
                  name='jenis'
                  value='Kuliner'
                  onChange={handleCheckboxChange}
                />
                Food
              </label>
              <label htmlFor='olahraga' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='olahraga'
                  name='jenis'
                  value='Olahraga'
                  onChange={handleCheckboxChange}
                />
                Sports
              </label>
              <label htmlFor='other' className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='other'
                  name='jenis'
                  value='Other'
                  onChange={handleCheckboxChange}
                />
                Other
              </label>
            </div>
          </div>

          <div className='flex justify-end gap-3 mt-3'>
            <button
              type='submit'
              className='bg-primary-1 text-white py-2 px-10 rounded-lg shadow-lg shadow-primary-1'>
              CREATE NEW
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
