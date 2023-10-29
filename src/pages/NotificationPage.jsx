import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import AccessibilityPopup from '../components/AccessibilityPopup';
import Navbar from '../layouts/Navbar';
import Background from '../components/Background';
import BackgroundAccessible from '../components/BackgroundAccessible';

const token = localStorage.getItem('token');
const socket = io(process.env.REACT_APP_API_URL, {
  extraHeaders: {
    auth: token
  }
});

export default function NotificationPage() {
  const [accessibility, setAccessibility] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    document.body.style.setProperty('--color-primary', '#00adb5');
    document.body.style.setProperty('--color-secondary', '#636499');
    document.body.style.setProperty('--color-tertiary', '#121225');

    // eslint-disable-next-line no-console
    console.log(socket);

    socket.on('connect', () => {
      setIsConnected(true);
      // eslint-disable-next-line no-console
      console.log(socket);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    const listener = (data) => {
      setMessages((oldMessagesData) => [...oldMessagesData, data]);
      // eslint-disable-next-line no-console
      console.log(messages);
    };
    socket.on('new_group', listener);

    return () => {
      socket.removeListener('new_group', listener);
      socket.off('connect');
      socket.off('disconnect');
    };
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
      <div className='container px-2 mx-auto mt-20'>
        <div className='mb-5 lg:w-1/1'>
          <Link
            className='px-3 py-2 font-medium leading-snug text-md text-primary-1 lg:text-black hover:opacity-75'
            to='/'>
            {'< Kembali ke Beranda'}
          </Link>
          <div>
            {(() => {
              if (!isConnected) {
                return (
                  <div className='flex items-center justify-center pt-2'>
                    <i className='text-3xl fa-solid fa-circle-notch animate-spin text-primary-1' />
                  </div>
                );
              }

              return <div />;
            })()}
          </div>
          <div className='mt-4 ml-2'>
            {messages.map((data, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className='mt-1' key={i}>
                <p>{`${data}`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
