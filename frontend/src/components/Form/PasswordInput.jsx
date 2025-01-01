import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './PasswordInput.css';
import { useInput } from '../Util/InputFunctions.js';

export default function PasswordInput(props) {

  const [errorMessage, setErrorMessage] = useState("Enter Email Address");
  const [hasTouched, setHasTouched] = useState(false);

  const validate = (value) => {
    if(value.trim().length < 8){
      setErrorMessage("Password must have at least 8 characters");
      return false; 
    }else if(value.trim().length > 20){
      setErrorMessage("Password must have at max 20 characters");
      return false;
    }else if(!(/(?=.*[A-Z])/.test(value))){
      setErrorMessage("Password must have at least one uppercase letter");
      return false;
    }else if(!/(?=.*[a-z])/.test(value)){
      setErrorMessage("Password must have at least one lowercase letter");
      return false;
    }else if(!/(?=.*\d)/.test(value)){
      setErrorMessage("Password must have at least one digit");
      return false;
    }else {
      return true;
    }
  }

  const {inputState, handleChange} = useInput("", false, validate);

  const { onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput("password", value, isValid);
  }, [onInput, value, isValid])

  const handleBlur = () => {
    setHasTouched(true);
  }

  return (
    <div className="password-input">
      {!inputState.isValid && (hasTouched || props.hadAttempt) && <p>*{errorMessage}</p>}
      <input type="password" id="password" placeholder="Password" value={inputState.value} noValidate onChange={(e) => handleChange(e.target.value)} onBlur={handleBlur}></input>
    </div>
  )
}

PasswordInput.propTypes = {
  onInput: PropTypes.func.isRequired,
  hadAttempt: PropTypes.bool,
}