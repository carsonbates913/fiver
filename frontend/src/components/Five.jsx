import { useContext } from 'react';
import PropTypes from 'prop-types';

import './Five.css'
import { useHttpRequest } from '../hooks/httpHook.js';
import LoadingModal from '../components/UIElements/LoadingModal.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Five(props) {

  const { isLoading, sendHttpRequest } = useHttpRequest();
  const { token } = useContext(AuthContext);

  const handleDeleteFive = async () => {
    try {
      const data = await sendHttpRequest(
        `${import.meta.env.VITE_BACKEND_URL}/fives/${props.id}`,
        'DELETE',
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        null
      )
      props.onDelete(props.id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`five five--${props.color}`} style={{top: `${props.top}px`, left: `${props.left}px`}}>
      {isLoading && <LoadingModal />}
      {!isLoading && <>
      <header className="five__header">
        <p>{props.to}</p>
      </header>
      <div className="five__content">
        <svg width="36" height="35" viewBox="0 0 36 35" xmlns="http://www.w3.org/2000/svg">
          <path d="M35 18.5V34.5H21V18.5C22.0806 10.6127 23.369 6.63253 28 1H35.5V2.39062C31 8 29 12 28.8113 18.5H35Z" stroke="black" strokeWidth="0.1"/>
          <path d="M15 18.5V34.5H1V18.5C2.08057 10.6127 3.36899 6.63253 8 1H15.5V2.39062C11 8 9 12 8.81125 18.5H15Z" stroke="black" strokeWidth="0.1"/>
        </svg>
        <p>
          {props.words.join(', ')}
        </p>
      </div>
      <footer className="five__footer">
        <div className="logo-container">
          <svg width="71" height="97" viewBox="0 0 71 97" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M56.8122 23.3613C56.8122 20.0747 59.5552 17.3358 62.9061 17.3358C66.4666 17.3358 69 20.2801 69 23.3613V73.1397C68.9045 75.5122 68.3067 81.0033 66.6089 83.7064C66.1992 84.3588 65.8503 85.0818 65.8503 85.8522V92.6539C65.8503 94.1665 64.6241 95.3928 63.1115 95.3928H21.755C20.2424 95.3928 19.0161 94.1665 19.0161 92.6539V85.1228C19.0161 84.8052 18.9609 84.4901 18.8529 84.1914L2.1713 38.0638C2.12636 37.9395 2.08916 37.812 2.06753 37.6817C1.63741 35.0895 3.27973 32.7639 6.48595 31.5093C9.63562 30.2768 12.9907 31.7147 13.6754 34.0428L20.3171 51.9822M56.8122 23.3613V12.9537C56.8122 9.87248 54.2787 6.92822 50.7182 6.92822C47.1577 6.92822 44.6928 9.80401 44.6243 12.9537M56.8122 23.3613V44.4504M44.6243 12.9537C44.6243 10.6941 44.6243 10.0325 44.6243 8.1607C44.6243 5.07951 42.0909 2.13525 38.5304 2.13525C34.9699 2.13525 32.4365 5.07951 32.4365 8.1607C32.4365 11.2419 32.4365 11.0365 32.4365 12.9537M44.6243 12.9537V44.4504M32.4365 12.9537C32.4365 10.0094 30.04 6.92822 26.3425 6.92822C22.6451 6.92822 20.2486 10.0779 20.2486 12.9537C20.2486 15.2817 20.3171 51.9822 20.3171 51.9822M32.4365 12.9537V44.4504M20.3171 51.9822L22.4397 57.8707" strokeWidth="2.46496"/>
          </svg>
        </div>
        <p>— {props.from}</p>
        {props.canDelete && <button onClick={handleDeleteFive}className="five__delete-button">X</button>}
      </footer>
      </>
    }
    </div>
  )
}

Five.propTypes = {
  canDelete: PropTypes.bool,
  color: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  words: PropTypes.array.isRequired,
  to: PropTypes.string.isRequired,
  top: PropTypes.string,
  left: PropTypes.string,
}