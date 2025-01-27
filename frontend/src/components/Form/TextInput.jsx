import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './TextInput.css';
import { useInput } from '../Util/InputFunctions.js';

export default function TextInput({onInput, id, validator = () => true, className, hadAttempt, placeholder, type, label, initialValue = ""}) {

  const [errorMessage, setErrorMessage] = useState(`field is required`);
  const [hasTouched, setHasTouched] = useState(false);

  const {inputState, handleChange} = useInput(initialValue, validator(initialValue), validator);

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput( id , value, isValid);
  }, [onInput, id, value, isValid])

  const handleBlur = () => {
    setHasTouched(true);
  }

  return (
    <div className={`text-input ${className}`}>
      {label && <label htmlFor={id} >{label}</label>}
      {!inputState.isValid && (hasTouched || hadAttempt) && <p style={label ? {position: 'relative'} : {position: 'absolute', top: '.75rem'}}>*{errorMessage}</p>}
      <input id={id} type={type} placeholder={placeholder} {...(type === "checkbox" ? { checked: inputState.value } : { value: inputState.value })} noValidate onChange={(e) => handleChange(type === "checkbox" ? e.target.checked : e.target.value)} onBlur={handleBlur}></input>
    </div>
  )
}

TextInput.propTypes = {
  onInput: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  hadAttempt: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  validator: PropTypes.func,
  label: PropTypes.string
}