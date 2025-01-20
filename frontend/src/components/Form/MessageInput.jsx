import { useEffect } from 'react';
import PropTypes from 'prop-types';

import './MessageInput.css';
import { useInput } from '../Util/InputFunctions.js';

export default function MessageInput(props) {

  const validate = (value) => {
    const result = value.length < 250 || value==='' ? true : false;
    return result;
  }

  const {inputState, handleChange} = useInput("", true, validate);

  const { onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput("message", value, isValid);
  }, [onInput, value, isValid]);

  return (
    <div className="message-input__container">
      <label>Message</label>
      <textarea className="message-input" placeholder="write a thoughtful message" value={inputState.value} onChange={(e) => handleChange(e.target.value)}></textarea>
    </div>
  )
}

MessageInput.propTypes = {
  onInput: PropTypes.func.isRequired,
  hadAttempt: PropTypes.bool.isRequired,
}