import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './EmailInput.css';
import { useInput } from '../Util/InputFunctions.js';

export default function EmailInput(props) {

  const [errorMessage, setErrorMessage] = useState("Enter email address");
  const [hasTouched, setHasTouched] = useState(false);

  const validate = (value) => {
    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)){
      setErrorMessage("Must follow correct email format");
      return false;
    }else{
      return true;
    }
  }

  const {inputState, handleChange} = useInput("", false, validate);

  const { onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput("email", value, isValid);
  }, [onInput, value, isValid])

  const handleBlur = () => {
    setHasTouched(true);
  }

  return (
    <div className="email-input">
      {!inputState.isValid && (hasTouched || props.hadAttempt) && <p>*{errorMessage}</p>}
      <input placeholder="Email Address" id="email" value={inputState.value} noValidate onChange={(e) => handleChange(e.target.value)} onBlur={handleBlur}></input>
    </div>
  )
}

EmailInput.propTypes = {
  onInput: PropTypes.func.isRequired,
}