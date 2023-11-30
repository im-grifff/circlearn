import React, { useState } from 'react';
import parse from 'html-react-parser';
import avatar from '../assets/img/avatar.png';
import RichTextEditor from '../components/RichTextEditor';
import api from '../config/api';

// card untuk tiap jawaban/balasan dalam page detail pertanyaan
export default function QuestionResponseCard(props) {
  const { data, userData } = props;
  const [commentForm, setCommentForm] = useState(data.content);
  const [isEdit, setIsEdit] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderTime = () => {
    const date = new Date(data.createdAt);
    const now = new Date();
    const diff = now - date;
    const diffInMinutes = Math.floor(diff / 1000 / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} menit yang lalu`;
    }
    if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    }
    if (diffInDays < 30) {
      return `${diffInDays} hari yang lalu`;
    }
    if (diffInMonths < 12) {
      return `${diffInMonths} bulan yang lalu`;
    }
    return `${diffInYears} tahun yang lalu`;
  };

  console.log('data', data);
  console.log('userData', userData);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    api
      .put(
        `/comments/${data._id}`,
        {
          content_form: commentForm
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

  const handleDeleteComment = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    api
      .delete(`/comments/${data._id}`, {
        headers: {
          'auth-token': token // the token is a variable which holds the token
        }
      })
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

  return (
    <div className='flex flex-col items-center justify-between gap-3 p-3 mt-3 bg-white border-2 rounded-lg shadow-lg lg:items-start'>
      <div className='flex flex-col items-center justify-between w-full gap-3 lg:flex-row lg:items-start '>
        <div className='flex items-center justify-center'>
          <img src={avatar} alt='' className='w-14 h-14' />
        </div>
        <div className='flex flex-col items-center justify-center flex-grow lg:items-start lg:block'>
          <h3 className='text-xl font-semibold'>{data.author_username}</h3>
          <div className='flex items-center'>
            <i className='flex items-center justify-center w-5 h-5 mr-3 text-xl fa-solid fa-clock text-primary-1' />
            <span className='font-medium text-gray-500 '>{renderTime()}</span>
          </div>
        </div>
        <div>
          {userData._id === data.author_id[0] && (
            <button
              type='button'
              className='flex-grow px-6 py-3 mb-2 ml-2 mr-2 font-semibold text-white bg-gray-500 rounded-lg shadow-lg shadow-gray-500'
              onClick={() => setIsEdit(!isEdit)}>
              Edit Answer
            </button>
          )}
          {userData._id === data.author_id[0] && (
            <button
              type='button'
              className='flex-grow px-6 py-3 mb-2 ml-2 mr-2 font-semibold text-white bg-red-500 rounded-lg shadow-lg shadow-red-500'
              onClick={handleDeleteComment}>
              Delete Answer
            </button>
          )}
        </div>
      </div>
      {isEdit && (
        <div className='w-full mt-3 text-black'>
          <RichTextEditor content={commentForm} setContent={setCommentForm} />
          {
            // eslint-disable-next-line react/jsx-wrap-multilines
            isSubmitting ? (
              <button
                type='button'
                className='w-40 py-2 mt-3 text-white rounded-lg shadow-lg bg-primary-1 shadow-primary-1'
                disabled>
                <i className='text-white fa-solid fa-circle-notch animate-spin' />
              </button>
            ) : (
              <button
                type='button'
                className='w-40 py-2 mt-3 text-white rounded-lg shadow-lg bg-primary-1 shadow-primary-1'
                onClick={handleCommentSubmit}>
                Send
              </button>
            )
          }
        </div>
      )}
      <div className='mt-3' data-remove-styles>
        {parse(data.content)}
      </div>
    </div>
  );
}
