import React, { useEffect, useState } from "react";

import AccessibilityPopup from "../components/AccessibilityPopup";
import Navbar from "../layouts/Navbar";
import Background from "../components/Background";
import profile from "../assets/img/profile.jpg";
import profile1 from "../assets/img/profile1.jpg";
import profile2 from "../assets/img/profile2.jpg";
import profile3 from "../assets/img/profile3.jpg";
import BackgroundAccessible from "../components/BackgroundAccessible";

export default function AboutPage() {
  const [accessibility, setAccessibility] = useState(false);

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

  return (
    <>
      <AccessibilityPopup
        accessibility={accessibility}
        setAccess={setAccessibility}
      />
      <Navbar />
      {renderAccesibility()}
      <div className='container mx-auto px-2'>
        <div className='mb-5 lg:w-1/2'>
          <h1 className='text-3xl font-semibold mb-3'>What is Circlearn ? </h1>
          <p>
            Circlearn itself is an online learning discussion forum built on a
            website platform using the MERN stack as its architecture. Circlearn
            provides a virtual space for every user to engage in online
            discussions on topics provided by the admin, aligned with the
            subjects taught at Klaba University.
          </p>
        </div>
        <div>
          <h1 className='text-3xl font-semibold mb-3'>Developer</h1>
          <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 lg:gap-10 '>
            <div className='flex flex-col justify-center items-center border-2 rounded-lg py-4 px-10 shadow-lg filter backdrop-blur-xl'>
              <img
                src={profile}
                alt='avatar'
                className='w-40 h-40 object-cover rounded-full'
              />
              <span className='font-medium mt-3'>Griffin Mumu</span>
              <p>Developer</p>
              <div className='flex gap-3'>
                <a
                  href='https://www.linkedin.com/in/owen-hermawan-0b1b1b1b9/'
                  target='_blank'
                  rel='noreferrer'>
                  <i className='fab fa-linkedin-in text-3xl text-primary-1' />
                </a>
                <a
                  href='https://www.instagram.com/sitouxz/'
                  target='_blank'
                  rel='noreferrer'>
                  <i className='fab fa-instagram text-3xl text-primary-1' />
                </a>
                <a
                  href='https://github.com/im-grifff'
                  target='_blank'
                  rel='noreferrer'>
                  <i className='fab fa-github text-3xl text-primary-1' />
                </a>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center border-2 rounded-lg py-4 px-10 shadow-lg filter backdrop-blur-xl'>
              <img
                src={profile2}
                alt='avatar'
                className='w-40 h-40 object-cover rounded-full'
              />
              <span className='font-medium mt-3'>Steny Pungus</span>
              <p>Advisor</p>
              <div className='flex gap-3'>
                <a
                  href='https://www.linkedin.com/'
                  target='_blank'
                  rel='noreferrer'>
                  <i className='fab fa-linkedin-in text-3xl text-primary-1' />
                </a>
                <a
                  href='https://www.instagram.com/'
                  target='_blank'
                  rel='noreferrer'>
                  <i className='fab fa-instagram text-3xl text-primary-1' />
                </a>
                <a
                  href='https://github.com/laraedyanputri'
                  target='_blank'
                  rel='noreferrer'>
                  <i className='fab fa-github text-3xl text-primary-1' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
