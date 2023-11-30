import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../config/api";

import AccessibilityPopup from "../components/AccessibilityPopup";
import Navbar from "../layouts/Navbar";
import Background from "../components/Background";
import BackgroundAccessible from "../components/BackgroundAccessible";

import avatarBig from "../assets/img/avatarBig.png";

/* dalam create ruang diskusi baru, jika user tidak mengupload image, maka akan mengambil
   random image dari unsplash stock image website sebagai image group */
export default function CreateGroup() {
  const [accessibility, setAccessibility] = useState(false);
  const [file, setFile] = useState(null);
  const [filesrc, setFileSrc] = useState(null);
  const [subjectform, setSubject] = useState("");
  const [deskripsiform, setDeskripsi] = useState("");
  const [jenisform, setJenis] = useState([]);
  const [topics, setTopics] = useState([]);
  const [requesttopic, setRequestTopic] = useState("");

  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.setProperty("--color-primary", "#00adb5");
    document.body.style.setProperty("--color-secondary", "#636499");
    document.body.style.setProperty("--color-tertiary", "#121225");
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
    ref.current.value = "";
  };

  const CreateHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();

    if (subjectform === "" || deskripsiform === "" || jenisform.length === 0) {
      // eslint-disable-next-line no-console
      console.log("Maaf, data kurang lengkap untuk membuat ruang diskusi baru");
      return;
    }

    if (file == null) {
      await fetch("https://source.unsplash.com/random/500x300?landscape")
        .then((res) => res.blob())
        .then((blob) => {
          const nowDate = Date.now().toString();
          const filerandom = new File([blob], `random-${nowDate}.png`, {
            type: "image/png",
          });
          formData.append("logo_form", filerandom);
        });
    } else {
      formData.append("logo_form", file);
    }

    formData.append("subject_form", subjectform);

    formData.append("deskripsi_form", deskripsiform);

    formData.append("jenis_form", jenisform);

    await api
      .post("/runding/create", formData, {
        headers: {
          "auth-token": token, // the token is a variable which holds the token
        },
      })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        navigate("/ruang");
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

  useEffect(() => {
    // fetch topic from API
    api
      .get("/topics")
      .then((res) => {
        setTopics(res.data.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);

  const handleRequestTopic = (e) => {
    setRequestTopic(e.target.value);
  };

  const handleSubmitRequestTopic = (e) => {
    api
      .post("/topics/request", {
        topicName: requesttopic,
      })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        alert("Request topic berhasil dikirim");
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
      <div className='container px-2 mx-auto mt-4 mb-10'>
        <Link to='/ruang' className='py-3'>
          {"< Back"}
        </Link>
        <form action='#' onSubmit={CreateHandler}>
          <div className='flex flex-col items-center justify-center w-full gap-3 mt-3'>
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
                className='px-10 py-2 mt-3 rounded-lg shadow-lg bg-primary-1 text-neutral-200 shadow-primary-1 sm:mt-0 sm:ml-3'>
                X
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-3 mt-3'>
            <label htmlFor='name' className='text-lg font-semibold'>
              Room Name
              <span className='ml-1 text-sm font-normal text-red-500'>
                *Make sure you write the group subject correctly, for example:
                Python Group Community
              </span>
            </label>
            <input
              type='text'
              name='name'
              id='name'
              onChange={(e) => setSubject(e.target.value)}
              className='px-3 py-2 bg-transparent border rounded-md border-primary-1 filter backdrop-blur-md'
              required
            />
          </div>
          <div className='flex flex-col gap-3 mt-3'>
            <label htmlFor='name' className='text-lg font-semibold'>
              Room Description
              <span className='ml-1 text-sm font-normal text-red-500'>
                *write clearly the purpose of the group you will create
              </span>
            </label>
            <textarea
              name='deskripsi'
              id='deskripsi'
              onChange={(e) => setDeskripsi(e.target.value)}
              cols='20'
              rows='10'
              className='w-full h-40 p-3 bg-transparent border rounded-lg resize-none border-primary-1 filter backdrop-blur-md'
              required
            />
          </div>
          <div className='flex flex-col gap-3 mt-3'>
            <label className='text-lg font-semibold'>
              Subject
              <span className='ml-1 text-sm font-normal text-red-500'>
                *Select discussion topics listed below
              </span>
            </label>
            <div className='flex flex-wrap gap-3'>
              {topics.map((topic) => (
                <div
                  key={topic.topicId}
                  className='flex items-center gap-2 text-sm font-semibold'>
                  <input
                    type='checkbox'
                    name={topic.topicName}
                    id={topic.topicName}
                    value={topic.topicName}
                    onChange={handleCheckboxChange}
                    className='w-4 h-4'
                  />
                  <label htmlFor={topic.topicName}>{topic.topicName}</label>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-3 mt-3'>
            <label htmlFor='requesttopic' className='text-lg font-semibold'>
              Request subject to admin
            </label>
            <div className='flex gap-4'>
              <input
                type='text'
                name='requesttopic'
                id='requesttopic'
                placeholder='Science'
                className='px-3 py-2 bg-transparent border rounded-md w-80 border-primary-1 filter backdrop-blur-md'
                onChange={handleRequestTopic}
              />
              <button
                type='button'
                onClick={handleSubmitRequestTopic}
                className='px-10 py-2 text-white rounded-lg shadow-lg bg-primary-1 shadow-primary-1'>
                Request
              </button>
            </div>
          </div>

          <div className='flex justify-end gap-3 mt-3'>
            <button
              type='submit'
              className='px-10 py-2 text-white rounded-lg shadow-lg bg-primary-1 shadow-primary-1'>
              CREATE NEW
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
