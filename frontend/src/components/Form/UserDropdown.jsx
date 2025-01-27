import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './UserDropdown.css';
import Avatar from '../UIElements/Avatar.jsx';
import { useInput } from '../Util/InputFunctions.js';

export default function UserDropdown(props) {

  const validate = (value) => {
    if(value){
      return true;
    }else{
      return false;
    }
  }

  const {inputState, handleChange} = useInput(null, false, validate);
  const { onInput } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput("user", value, isValid);
  }, [onInput, value, isValid])
 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if(isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)){
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  })

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  }

  return(
    <div className="user-dropdown__container">
      <label>
        User
        {!inputState.isValid && props.hadAttempt && <p className="error-message">Please select a user</p>}
      </label>
      <div className="user-dropdown" onClick={toggleDropdown} ref={dropdownRef} tabIndex="0">
        <svg width="26" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0.377845" y1="0.672535" x2="13.3778" y2="15.6725" stroke="black"/>
          <line y1="-0.5" x2="19.8494" y2="-0.5" transform="matrix(-0.654931 0.755689 0.755689 0.654931 26 1)" stroke="black"/>
        </svg>
        <div className="user-dropdown__selected-user">
          <div className="user-dropdown__image">
            {inputState.value ? (<Avatar image={'/Profile_Photo_Carson.JPG'} alt={"picture"}></Avatar>) : ""}
          </div>
          <h1>{inputState.value ? inputState.value.name : ""}</h1>
        </div>
        {isOpen && <ul className="user-dropdown__list">
          {props.users.map((user) => {
            return <li key={user.id}className="user-dropdown__item" onClick={() => handleChange(user)}>
              <div className="user-dropdown__image">
                <Avatar image={'/Profile_Photo_Carson.JPG'} alt={"picture"}></Avatar>
              </div>
              <h1>{user.name}</h1>
            </li>
          })}
        </ul>}
      </div>
    </div>
  )
}

UserDropdown.propTypes = {
  users: PropTypes.array.isRequired,
  onInput: PropTypes.func.isRequired,
  hadAttempt: PropTypes.bool.isRequired,
}