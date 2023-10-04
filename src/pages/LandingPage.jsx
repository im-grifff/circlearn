/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable*/

import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/Background';
import BackgroundAccessible from '../components/BackgroundAccessible';
import Illustration from '../assets/img/Illustration.png';
import AccessibilityPopup from '../components/AccessibilityPopup';
import RandomFacts from '../components/RandomFacts';

import logoImg from '../assets/img/logoImg.svg';
import logoName from '../assets/img/logoName.svg';
import logoNameWhite from '../assets/img/logoNameWhite.svg';
import contactUsImg from '../assets/img/undraw_Messaging_fun_re_vic9 1.svg';
import bgMask from '../assets/img/BG-Mask.svg';
import ctaVector from '../assets/img/ctaVector.svg';
import infoImg1 from '../assets/img/infoImg1.svg';
import infoImg2 from '../assets/img/infoImg2.svg';
import infoImg3 from '../assets/img/infoImg3.svg';
import featureImg1 from '../assets/img/featureImg1.svg';
import featureImg2 from '../assets/img/featureImg2.svg';
import featureImg3 from '../assets/img/featureImg3.svg';
import featureCardIcon from '../assets/img/featureCardIcon.png';

export default function LandingPage() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [accessibility, setAccessibility] = useState(false);

  useEffect(() => {
    document.body.style.setProperty('--color-primary', '#00adb5');
    document.body.style.setProperty('--color-secondary', '#636499');
    document.body.style.setProperty('--color-tertiary', '#121225');
  }, []);

  // merender background aksesibilitas
  const renderAccesibility = () => {
    if (accessibility) {
      return <BackgroundAccessible />;
    }
    return <Background />;
  };

  const ctaBackground = {
    backgroundImage: `url(${bgMask})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };

  const infoData = [
    {
      imgSrc: infoImg1,
      title: 'User Friendly',
      description:
        'With Simple Style and Easy to use, make the learning experience more comfortable'
    },
    {
      imgSrc: infoImg2,
      title: 'Interactive Design',
      description:
        'Equipped with interactive designs and animations that make the learning process more interesting.'
    },
    {
      imgSrc: infoImg3,
      title: 'Interesting Features',
      description:
        'Many interesting features are provided to maximize the user experience and convenience in using Circlearn.'
    }
  ];

  const data1 = [
    {
      icon: featureCardIcon,
      title: 'Title Goes Here',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.'
    },

    {
      icon: featureCardIcon,
      title: 'Title Goes Here',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.'
    }
  ];

  return (
    <>
      <AccessibilityPopup
        accesibility={accessibility}
        setAccess={setAccessibility}
      />
      <nav className='relative flex flex-wrap items-center justify-between bg-white lg:bg-transparent shadow-lg lg:shadow-none border-b-2 lg:border-none mb-3 '>
        <div className='container mx-auto p-2'>
          <div className='flex flex-wrap items-center justify-between'>
            <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
              <Link className='flex font-bold font-logo text-[36px] ' to='/'>
                <img src={logoImg} alt='R' className='mr-2' />
              </Link>
              <button
                className='text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
                type='button'
                onClick={() => setNavbarOpen(!navbarOpen)}>
                <i className='fas fa-bars' />
              </button>
            </div>
            <div
              className={
                // eslint-disable-next-line prefer-template, operator-linebreak
                'lg:flex flex-grow items-start' +
                (navbarOpen ? ' flex' : ' hidden')
              }>
              <ul className='flex flex-col items-start justify-center lg:flex-row list-none lg:ml-auto mt-2'>
                <li className='nav-item'>
                  <Link
                    className='px-3 py-2 text-md font-medium leading-snug text-primary-3 hover:opacity-75'
                    to='/'>
                    Beranda
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className='px-3 py-2 text-md font-medium leading-snug text-primary-3 hover:opacity-75'
                    to='/ruang'>
                    Ruang Diskusi
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className='px-3 py-2 text-md font-medium leading-snug text-primary-3 hover:opacity-75'
                    to='/about'>
                    Tentang Kami
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {renderAccesibility()}
      <div className='container mx-auto mb-10 h-[1050px]'>
        <div className='relative flex flex-col-reverse lg:flex-row text-center lg:text-start items-center justify-center lg:justify-between'>
          <div>
            <img src={logoName} alt='R' className='mb-10' />
            <p className='font-regular mt-2 text-[18px] text-black'>
              Join The
              <span className='px-1 font-bold italic'>Circle</span>
              And Learn Together
              <br />
              according to the subjects you are interested in
              <br />
              With Productive Community of Students
            </p>
            <div className='mt-12'>
              <Link
                to='/login'
                className='bg-[#00ADB5] text-white font-medium text-[18px] px-10 py-3 rounded-md shadow-2xl shadow-primary-1'>
                GET STARTED
              </Link>
            </div>
          </div>
          <img src={Illustration} alt='' className='xl:h-[45rem] md:w-auto' />
        </div>
      </div>

      <div className='bg-[#00ADB5]'>
        <div className='container mx-auto h-auto md:h-[440px] flex flex-col md:flex-row items-center justify-center text-center text-white p-4 md:p-0'>
          {infoData.map((data, index) => (
            <div
              key={index}
              className='mx-4 md:mx-20 w-[255px] flex flex-col items-center mt-4 md:mt-0 py-6 md:py-0'>
              <img src={data.imgSrc} alt={data.title} />
              <h1 className='font-medium text-xl md:text-2xl mt-2 mb-3 md:mb-5'>
                {data.title}
              </h1>
              <p className='font-light text-sm md:text-base'>
                {data.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='container mx-auto flex flex-col-reverse my-10 lg:flex-row px-5 md:px-0'>
        <div className='lg:w-[666px] px-4 lg:px-10'>
          <div>
            <h1 className='font-semibold text-2xl lg:text-4xl mb-3 lg:mb-5'>
              Light, Fast & Powerful
            </h1>
            <p className='text-[#6F7CB2] text-sm lg:text-base'>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim.
            </p>
          </div>

          <div>
            {data1.map((item, index) => (
              <div key={index} className='my-6 lg:my-10 w-full lg:w-64'>
                <img src={item.icon} alt={item.title} />
                <h1 className='font-semibold my-3 lg:my-5 text-xl'>
                  {item.title}
                </h1>
                <p className='text-xs lg:text-sm'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='lg:w-[900px] mx-auto mt-10 lg:mt-0 py-10 md:py-0'>
          <img src={featureImg1} alt='' />
        </div>
      </div>

      <div className='container mx-auto flex flex-col-reverse items-center justify-center my-10 lg:flex-row px-5 md:px-0'>
        <div className='w-full lg:w-[850px] px-4 lg:px-10 py-10 md:py-0'>
          <img src={featureImg2} alt='' />
        </div>
        <div className='w-full lg:w-[500px] mt-10 lg:mt-0 ml-0 lg:ml-20'>
          <h1 className='font-bold text-2xl lg:text-4xl mb-3 lg:mb-5'>
            Organized Subjects
          </h1>
          <p className='text-sm lg:text-base py-3'>
            circlearn provides facilities to study together in a virtual room
            that is arranged based on various subjects that can be easily chosen
            according to your interests
          </p>
          <Link
            to='/login'
            className='text-primary-1 font-medium text-sm lg:text-lg py-2 lg:py-3'>
            Get Started
            <i className='fas fa-arrow-right ml-2 lg:ml-5'></i>
          </Link>
        </div>
      </div>

      <div className='container mx-auto flex flex-col-reverse items-center justify-center px-5 md:px-0 py-10 lg:py-20 my-10 lg:my-52 lg:flex-row'>
        <div className='w-full lg:w-[500px] ml-0 lg:ml-20'>
          <h1 className='font-bold text-2xl lg:text-4xl mb-3 lg:mb-5'>
            Amazing Community
          </h1>
          <p className='text-sm lg:text-base py-3'>
            circlearn helps you to be able to study together with people from
            different backgrounds who have interests in the same subject area as
            you, who can discuss with you according to the subject you choose
          </p>
          <Link
            to='/login'
            className='text-primary-1 font-medium text-sm lg:text-lg py-2 lg:py-3'>
            Get Started
            <i className='fas fa-arrow-right ml-2 lg:ml-5'></i>
          </Link>
        </div>
        <div className='w-full lg:w-[800px] mt-5 lg:mt-0'>
          <img src={featureImg3} alt='' />
        </div>
      </div>

      <div
        className='container mx-auto md:h-[360px] h-[200px] my-10 flex justify-center rounded-3xl'
        style={ctaBackground}>
        <div className='flex items-end px-2 md:px-0 w-52 md:w-96'>
          <img src={ctaVector} alt='' />
        </div>
        <div className=' flex flex-col items-baseline justify-center'>
          <h1 className='text-white text-[18px] font-bold mb-5 md:text-[26px] lg:text-[40px]'>
            Help us Make the Best <br /> Study Platform Ever
          </h1>
          <button className='bg-[#393E46] text-white font-medium text-sm px-4 py-2 md:px-10 md:py-3 rounded-md shadow-2xl shadow-primary-1'>
            JOIN US
          </button>
        </div>
      </div>

      <div className='container mx-auto flex flex-col-reverse lg:flex-row items-center justify-center p-4 lg:p-20'>
        <div className='px-4 lg:px-10 mb-5 lg:mb-0 py-16 md:py-0'>
          <img src={contactUsImg} alt='' />
        </div>
        <div className='px-4 lg:px-10 text-center lg:text-left'>
          <h1 className='font-bold text-2xl lg:text-4xl text-[#393E46] mb-3 lg:mb-5'>
            Contact Us
          </h1>
          <form action=''>
            <div className='flex flex-col space-y-5 text-[#393E46]'>
              <div className='flex flex-col space-y-2'>
                <input
                  type='text'
                  className='rounded-md px-4 py-2 lg:px-5 lg:py-2 bg-[#BCBCBC] placeholder-text-[#393E46] focus:outline-none'
                  placeholder='Username'
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <input
                  type='text'
                  className='rounded-md px-4 py-2 lg:px-5 lg:py-2 bg-[#BCBCBC] placeholder-text-[#393E46] focus:outline-none'
                  placeholder='Email'
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <textarea
                  name=''
                  id=''
                  cols='30'
                  rows='10'
                  className='rounded-md px-4 py-2 lg:px-5 lg:py-2 bg-[#BCBCBC] placeholder-text-[#393E46] focus:outline-none'
                  placeholder='Message'></textarea>
              </div>
              <button className='bg-[#00ADB5] text-white font-medium text-sm lg:text-lg px-6 lg:px-10 py-2 lg:py-3 rounded-md shadow-2xl shadow-primary-1'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className='bg-[#001C1E]'>
        <div className='container mx-auto py-10'>
          <div className='flex flex-col md:flex-row justify-center items-center'>
            <img src={logoNameWhite} alt='' />

            <div className='text-white space-y-4 md:space-y-0 md:ml-10 md:flex space-x-4 py-5'>
              <a href='#'>Home</a>
              <a href='#'>About</a>
              <a href='#'>Feature</a>
              <a href='#'>Contact Us</a>
            </div>
          </div>
          <hr className='border-white mt-5' />
          <div className='copyright text-white flex flex-col md:flex-row items-center justify-between py-5'>
            <p>
              © 2020 <span className='font-bold'>Circlearn</span>. All rights
              reserved.
            </p>
            <div className='flex space-x-4 mt-3 md:mt-0'>
              <a
                href=''
                className='text-2xl bg-[#413e3e] rounded-full w-10 h-10 flex items-center justify-center'>
                <i className='fab fa-instagram text-white'></i>
              </a>
              <a
                href=''
                className='text-2xl bg-[#413e3e] rounded-full w-10 h-10 flex items-center justify-center'>
                <i className='fab fa-twitter text-white'></i>
              </a>
              <a
                href=''
                className='text-2xl bg-[#413e3e] rounded-full w-10 h-10 flex items-center justify-center'>
                <i className='fab fa-youtube text-white'></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
