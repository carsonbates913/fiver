import { useState } from 'react';
import PropTypes from 'prop-types';

import './FeedForm.css'
import UserDropdown from './UserDropdown.jsx';
import WordInput from './WordInput.jsx';
import MessageInput from './MessageInput.jsx';
import ColorBlock from '../UIElements/ColorBlock.jsx';
import { useForm } from '../Util/FormFunctions.js';

export default function FeedForm(props) {

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const {formState, onInput} = useForm(
    {
      user: {
        value: '',
        isValid: false,
      },
      words: {
        value: [""],
        isValid: false,
      },
      message: {
        value: '',
        isValid: true,
      }
    },
    false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formState.isValid){
      setAttemptedSubmit(true);
      console.log("not valid");
      console.log(formState);
    }else {
      console.log("submit");
      props.onSubmit();
    }
  }

  return (
    <form className="feed-form" onSubmit={handleSubmit} >
      <UserDropdown hadAttempt={attemptedSubmit} onInput={onInput}/>
      <WordInput hadAttempt={attemptedSubmit} onInput={onInput}></WordInput>
      <MessageInput hadAttempt={attemptedSubmit} onInput={onInput}/>
      <footer>
      <ColorBlock text="Submit" isButton={true} border="none" backgroundColor="#66FF99" type="submit"></ColorBlock>
      </footer>
    </form>
  )
}


FeedForm.propTypes = {
  onSubmit: PropTypes.func,
}