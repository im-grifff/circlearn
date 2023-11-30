/* eslint-disable comma-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useParams, Link } from 'react-router-dom';
import AccessibilityPopup from '../components/AccessibilityPopup';
import Navbar from '../layouts/Navbar';
import Background from '../components/Background';
import QuestionCard from '../components/QuestionCard';
import BackgroundAccessible from '../components/BackgroundAccessible';

import api from '../config/api';

export default function QuestionPage() {
  const [accessibility, setAccessibility] = useState(false);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [createQuestionForm, setCreateQuestionForm] = useState({
    title: '',
    description: '',
    keyword: []
  });

  const param = useParams();

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
      .get(`/runding/posts/${param.id}`, {
        headers: {
          'auth-token': token // the token is a variable which holds the token
        }
      })
      .then((response) => {
        setData(response.data.data);
        setSearchData(response.data.data);
        // eslint-disable-next-line no-console
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    api
      .post(
        `/runding/posts/create/${param.id}`,
        {
          title_form: createQuestionForm.title,
          description_form: createQuestionForm.description,
          tags_form: createQuestionForm.keyword
        },
        {
          headers: {
            'auth-token': token // the token is a variable which holds the token
          }
        }
      )
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const handleCreateQuestionForm = (e) => {
    if (e.target.name === 'keyword') {
      const keyword = e.target.value.split(',');
      setCreateQuestionForm({
        ...createQuestionForm,
        [e.target.name]: keyword
      });
      return;
    }
    setCreateQuestionForm({
      ...createQuestionForm,
      [e.target.name]: e.target.value
    });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchData(data);
      // eslint-disable-next-line array-callback-return, max-len
      const newResults = data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchData(newResults);

      setSearchTerm('');
    }
  };

  // sort latest first
  searchData.sort((a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);
    return dateB - dateA;
  });

  return (
    <>
      <AccessibilityPopup
        accessibility={accessibility}
        setAccess={setAccessibility}
      />
      <Navbar />
      {renderAccesibility()}
      <div className='container px-2 m-4 mx-auto'>
        <Link to={`/ruang/${param.id}`} className='py-3'>
          {'< Back'}
        </Link>
        <div className='flex flex-col lg:flex-row'>
          <input
            type='text'
            placeholder='Cari pertanyaan'
            className='flex-grow px-2 py-1 border-2 rounded-lg border-primary-1'
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleSubmit}
          />
        </div>
        <div>
          <h2 className='mt-2 mb-3 font-semibold'>All Question</h2>
          <Popup
            trigger={
              <button
                type='button'
                className='px-6 py-1 mt-1 text-white rounded-md sm:px-10 bg-primary-1 lg:mt-0 lg:ml-1'>
                NEW
              </button>
            }
            modal
            nested>
            {(close) => (
              <form className='max-h-screen p-4 pb-24 m-4 overflow-scroll bg-white rounded-lg shadow-lg lg:overflow-auto'>
                <h2 className='mb-4 text-xl font-semibold'>Ask a question</h2>
                <div>
                  <p>Cara mengajukan pertanyaan:</p>
                  <ol className='list-decimal list-inside'>
                    <li>
                      Pastikan pertanyaan Anda belum pernah di bahas pada forum
                      ini, Anda bisa melakukan searching terlebih dahulu dengan
                      memasukkan kata kunci.
                    </li>
                    <li>
                      Mulailah dengan menuliskan judul pertanyaan Anda secara
                      singkat dan jelas
                    </li>
                    <li>
                      Sampaikan kendala permasalahan Anda dengan tidak
                      berbelit-belit
                    </li>
                    <li>
                      Tambahkan tag yang membantu memunculkan pertanyaan Anda
                      kepada anggota komunitas yang lain.
                    </li>
                  </ol>
                </div>
                <div className='mt-3'>
                  <label
                    htmlFor='title'
                    className='text-lg font-semibold text-primary-1'>
                    Title
                  </label>
                  <input
                    type='text'
                    id='title'
                    name='title'
                    className='flex-grow w-full px-2 py-1 border rounded-lg border-primary-1'
                    onChange={(e) => handleCreateQuestionForm(e)}
                  />
                </div>
                <div className='mt-3'>
                  <label
                    htmlFor='description'
                    className='text-lg font-semibold text-primary-1'>
                    Write your question
                  </label>

                  <textarea
                    id='description'
                    name='description'
                    className='flex-grow w-full h-40 px-2 py-1 border rounded-lg border-primary-1'
                    onChange={(e) => handleCreateQuestionForm(e)}
                  />
                </div>
                <div className='mt-3'>
                  <label
                    htmlFor='tags'
                    className='text-lg font-semibold text-primary-1'>
                    Add Keywords
                  </label>
                  <span> *minimal 3 keywords. use ‘,’ to seprate</span>
                  <input
                    type='text'
                    id='tags'
                    name='keyword'
                    className='flex-grow w-full px-2 py-1 border rounded-lg border-primary-1'
                    onChange={(e) => handleCreateQuestionForm(e)}
                  />
                </div>
                <div className='mt-3 text-end'>
                  <button
                    type='button'
                    className='px-6 py-2 mt-2 mr-3 font-semibold border-2 rounded-md sm:px-10 border-primary-1 lg:mt-0 lg:ml-2 text-primary-1'
                    onClick={() => {
                      close();
                    }}>
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='px-6 py-2 mt-2 text-white rounded-md shadow-lg sm:px-10 bg-primary-1 shadow-primary-1 lg:mt-0 lg:ml-2'
                    onClick={handleCreateQuestion}>
                    Create
                  </button>
                </div>
              </form>
            )}
          </Popup>
          {loading ?? (
            <div className='flex items-center justify-center pt-20 ml-auto'>
              <i className='text-3xl fa-solid fa-circle-notch animate-spin text-primary-1' />
            </div>
          )}
          {data.length > 0 ? (
            <div className='flex flex-col gap-4'>
              {searchData.map((item) => (
                <QuestionCard
                  key={item._id}
                  item={item}
                  setAccess={setAccessibility}
                />
              ))}
            </div>
          ) : (
            data.length === 0 ?? (
              <div className='flex items-center justify-center pt-20'>
                <p className='text-center text-primary-1'>No question yet</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
