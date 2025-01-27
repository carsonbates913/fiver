import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import './FeedForm.css'
import UserDropdown from './UserDropdown.jsx';
import WordInput from './WordInput.jsx';
import MessageInput from './MessageInput.jsx';
import ColorBlock from '../UIElements/ColorBlock.jsx';
import { useForm } from '../Util/FormFunctions.js';
import { useHttpRequest } from '../../hooks/httpHook.js';
import LoadingModal from '../UIElements/LoadingModal.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

export default function FeedForm(props) {

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [loadedUsers, setLoadedUsers] = useState([]);

  const { isLoading, sendHttpRequest } = useHttpRequest();

  const { name, userId, token } = useContext(AuthContext);

  const navigateTo = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formState.isValid){
      setAttemptedSubmit(true);
      console.log(formState);
    }else {
      try{
        const data = await sendHttpRequest(
          'http://localhost:3000/api/fives/',
          'POST',
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          JSON.stringify({
            to: formState.inputs.user.value.name,
            toId: formState.inputs.user.value.id,
            words: formState.inputs.words.value,
            message: formState.inputs.message.value,
            from: name,
            sender: userId,
          })
        );
        console.log(data);
        props.onSubmit();
        navigateTo(0);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(()=> {
    const fetchUsers = async () => {
      try {
        const data = await sendHttpRequest(
          'http://localhost:3000/api/users',
          'GET',
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          null,
        );
        console.log(data);
        setLoadedUsers(data.users);
      } catch(error) {
        console.log(error);
      }
    }

    fetchUsers();
  }, [sendHttpRequest])

  return (
    <>
      <form className="feed-form" onSubmit={handleSubmit} >
        {isLoading && <LoadingModal overlay />}
          <>
            <UserDropdown hadAttempt={attemptedSubmit} onInput={onInput} users={loadedUsers}/>
            <WordInput hadAttempt={attemptedSubmit} onInput={onInput}></WordInput>
            <MessageInput hadAttempt={attemptedSubmit} onInput={onInput}/>
            <footer>
            <ColorBlock text="Submit" isButton={true} border="none" backgroundColor="#66FF99" type="submit"></ColorBlock>
            </footer>
          </>
      </form>
    </>
  )
}


FeedForm.propTypes = {
  onSubmit: PropTypes.func,
}