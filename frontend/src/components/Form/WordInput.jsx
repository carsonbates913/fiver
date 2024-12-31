import { useEffect } from 'react';
import PropTypes from 'prop-types';

import './WordInput.css';
import { useInput } from '../Util/InputFunctions';

export default function WordInput(props) {

  const validate = (value) => {
    return value.every((word) => word.trim().length > 0);
  }

  const {inputState, handleChange} = useInput([""], false, validate);

  const { onInput } = props; 
  const { value, isValid } = inputState;

  const handleChangeHelper = (e, index) => {
    const newWords = inputState.value.map((word, i) => i === index ? e.target.value : word )
    handleChange(newWords);
  }

  const handleAddWord = () => {
    if(inputState.value.length < 3){
      handleChange(inputState.value.concat([""]));
    }
  }

  const handleDeleteWord = (index) => {
    if(inputState.value.length > 1){
      handleChange(inputState.value.filter((word, i) => i !== index));
    }
  }

  useEffect(() => {
    onInput("words", value, isValid);
  }, [value, isValid, onInput])

  return(
    <div className="word-input__container">
    <label>Positive Words</label>
    <ul className="word-input">
      {inputState && inputState.value.map((word, index) =>{
        return (
          <div key={index} className="word-input__box">
            <input className={`${(props.hadAttempt && word.trim().length === 0) ? 'invalid' : '' }`}type="text" value={inputState.value[index]} onChange={(e) => {handleChangeHelper(e, index)}}></input>
            <button type="button" onClick={() => handleDeleteWord(index)}>x</button>
          </div>
        )
      })}
      {inputState.value.length < 3 && <button className="word-input__add-button" type="button" onClick={handleAddWord}>
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="17.5" x2="17.5" y2="35" stroke="black"/>
          <line y1="17.5" x2="35" y2="17.5" stroke="black"/>
        </svg>
      </button>}
    </ul>
    </div>
  )
}

WordInput.propTypes = {
  onInput: PropTypes.func.isRequired,
  hadAttempt: PropTypes.bool.isRequired,
}