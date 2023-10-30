/* eslint-disable comma-dangle */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccessibilityPopup from "../components/AccessibilityPopup";
import Navbar from "../layouts/Navbar";
import Background from "../components/Background";
import BackgroundAccessible from "../components/BackgroundAccessible";
import avatar from "../assets/img/avatar.png";
import QuestionResponseCard from "../components/QuestionResponseCard";

import api from "../config/api";

export default function QuestionDetailPage() {
  const [accessibility, setAccessibility] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    document.body.style.setProperty("--color-primary", "#00adb5");
    document.body.style.setProperty("--color-secondary", "#636499");
    document.body.style.setProperty("--color-tertiary", "#121225");
  }, []);

  const renderAccesibility = () => {
    if (accessibility) {
      return <BackgroundAccessible noBig />;
    }
    return <Background noBig />;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/user/data", {
        headers: {
          "auth-token": token, // the token is a variable which holds the token
        },
      })
      .then((response) => {
        setDataUser(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(`/posts/comments/${param.id}`, {
        headers: {
          "auth-token": token, // the token is a variable which holds the token
        },
      })
      .then((response) => {
        setData(response.data.data);
        // eslint-disable-next-line no-console
        // console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  const renderTime = () => {
    const date = new Date(data.post[0].createdAt);
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

  const renderReply = () => {
    if (data.post[0].replies.length === 0) {
      return (
        <span className='text-sm font-medium text-primary-1'>
          Belum ada Pembahasan
        </span>
      );
    }
    if (data.post[0].replies.length === 1) {
      return (
        <span className='text-sm font-medium text-primary-1'>
          {` ${data.post[0].replies.length}`}
          Pembahasan
        </span>
      );
    }
    return (
      <span className='text-sm font-medium text-primary-1'>
        {` ${data.post[0].replies.length}`}
        Pembahasan
      </span>
    );
  };

  const renderTags = () => {
    if (data.post[0].tags.length === 0) {
      return (
        <span className='px-2 py-1 text-sm text-white rounded-md bg-primary-1'>
          Belum ada Tag
        </span>
      );
    }
    const tags = data.post[0].tags.map((tag) => (
      <span className='px-2 py-1 text-sm text-white rounded-md bg-primary-1'>
        {tag}
      </span>
    ));
    return tags;
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    api
      .post(
        `/posts/comments/create/${param.id}`,
        {
          content_form: commentForm,
        },
        {
          headers: {
            "auth-token": token, // the token is a variable which holds the token
          },
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

  const handleComment = (e) => {
    setCommentForm(e.target.value);
  };

  return (
    <>
      <AccessibilityPopup
        accessibility={accessibility}
        setAccess={setAccessibility}
      />
      <Navbar />
      {renderAccesibility()}
      {loading ? (
        <div className='flex items-center justify-center pt-20 ml-auto'>
          <i className='text-3xl fa-solid fa-circle-notch animate-spin text-primary-1' />
        </div>
      ) : (
        <div className='container px-2 mx-auto mt-4 mb-10'>
          <button type='button' onClick={() => navigate(-1)} className='py-3'>
            {"< Kembali"}
          </button>
          <div className='flex flex-col items-center justify-between w-full gap-3 mt-3 lg:flex-row lg:items-start '>
            <div className='flex items-center justify-center w-24'>
              <img src={avatar} alt='' />
            </div>
            <div className='flex flex-col items-center justify-center flex-grow lg:items-start lg:block'>
              <h3 className='mb-2 text-xl font-semibold'>
                {data.post[0].username_author}
              </h3>
              <div className='flex items-center mb-1'>
                <i className='flex items-center justify-center w-5 h-5 mr-3 text-xl fa-solid fa-clock text-primary-1' />
                <span className='font-medium text-gray-500 '>
                  {renderTime()}
                </span>
              </div>
              <div className='flex items-center mb-1'>
                <i className='flex items-center justify-center w-5 h-5 mr-3 text-xl fa-solid fa-message text-primary-1' />
                {renderReply()}
              </div>
            </div>
            <div>
              <button
                type='button'
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.REACT_APP_MAIN_URL}/question/detail/${param.id}`
                  );

                  // eslint-disable-next-line no-alert
                  alert("Link Copied");
                }}
                className='flex-grow px-6 py-3 mb-2 ml-2 mr-2 font-semibold text-white rounded-lg shadow-lg bg-primary-1 shadow-primary-1'>
                Share
              </button>
            </div>
          </div>
          <div className='flex flex-col items-center justify-between gap-3 pb-3 mt-3 border-b border-primary-1 lg:items-start '>
            <div className='mt-3 text-center  lg:mt-0 lg:text-start'>
              <h3 className='mb-3 text-xl font-semibold'>
                {data.post[0].title}
              </h3>
              <p>{data.post[0].description}</p>
            </div>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-3'>
                <i className='flex items-center justify-center text-xl fa-solid fa-tag text-primary-1' />
                {renderTags()}
              </div>
            </div>
          </div>
          <div className='mt-3'>
            <div className='flex items-center gap-3'>
              <img src={avatar} alt='' className='w-10 h-10' />
              <span className='font-semibold'>{dataUser.data.username}</span>
            </div>
            <div className='pb-3 border-b border-primary-1'>
              <textarea
                name=''
                id=''
                cols='20'
                rows='10'
                className='w-full h-40 p-3 mt-3 border rounded-lg resize-none border-primary-1'
                placeholder='Tulis komentar kamu disini'
                onChange={handleComment}
              />
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
          </div>
          <div className='flex flex-col items-center justify-center mt-3'>
            {data.comments.length === 0 ? (
              <span className='text-lg font-medium text-primary-1'>
                No Discussion
              </span>
            ) : (
              <div className='flex flex-col w-full'>
                {data.comments.map((comment) => (
                  <QuestionResponseCard key={comment.id} data={comment} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
