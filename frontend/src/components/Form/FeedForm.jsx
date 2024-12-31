import { useReducer, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import './FeedForm.css'
import UserDropdown from './UserDropdown.jsx';
import WordInput from './WordInput.jsx';
import MessageInput from './MessageInput.jsx';
import ColorBlock from '../UIElements/ColorBlock.jsx';

const formReducer = (state, action) => {
  switch(action.type) {
    case "INPUT_CHANGE": {
      let isValid = true;
      for(const id in state.inputs){
        if(id === action.id){
          isValid = isValid && action.isValid;
        }else {
          isValid = isValid && state.inputs[id].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: {value: action.value, isValid: action.isValid},
        },
        isValid: isValid,
      }
    }
  }
}

export default function FeedForm(props) {

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
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
    isValid: false
  })

  const onInput = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      id: id,
      value: value,
      isValid: isValid,
    });
  }, []);

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