import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import { auth } from '../config/firebase';

export const Header = () => {
  // State to manage user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check user authentication status
  const checkAuthStatus = () => {
    const user = auth.currentUser;
    setIsLoggedIn(!!user); // Set isLoggedIn based on whether user exists or not
  };

  // Effect to run once on component mount to check authentication status
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <header>
      <div className='header-center'>
        <h1 className='header-title'>
          Optimize Your Online Experience with Our Advanced
          <span className='primary-blue-400 header-bold'>
            {' '}
            URL Shortening
            <span className='header-bold-underline'>
              <img src='./images/underline.svg' alt='' />
            </span>
          </span>{' '}
          Solution
        </h1>
        <p className='header-text'>
          Personalize your shortened URLs to align with your brand identity.
          Utilize custom slugs, branded links, and domain customization options
          to reinforce your brand presence and enhance user engagement.
        </p>
        <div className='header-btns'>
          {/* Conditionally render the Sign Up button */}
          {isLoggedIn ? (
              <a href="#form" className='header-btn btn-blue btn w-[500px]'>
                Shortener
              </a>
            
          ) : (
            <button>
              <Link to='/register' className='header-btn btn-blue btn'>
                Sign Up
              </Link>
            </button>
          )}
          <button className='header-btn bg-none primary-blue-300 btn'>
            Learn more
          </button>
        </div>
        <div className='chain-container'>
          <div className='chain'>
            <img src='./images/chain.svg' alt='chain' />
            <p className='chain-text'>
              Seamlessly transform your long URLs into concise and shareable
              links with just few clicks.
            </p>
          </div>
          <div className='chain-bg'>
            <img
              src='./images/background-chain.svg'
              className='chain-img'
              alt=''
            />
          </div>
        </div>
      </div>
      <div className='circle-layer'>
        <img
          src='./images/circle-layer.svg'
          alt=''
          className='circle-layer-img'
        />
      </div>
    </header>
  );
};
