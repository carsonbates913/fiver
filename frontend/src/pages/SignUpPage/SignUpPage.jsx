import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './SignUpPage.css';
import { useForm } from '../../components/Util/FormFunctions.js';
import EmailInput from '../../components/Form/EmailInput.jsx';
import PasswordInput from '../../components/Form/PasswordInput.jsx';
import TextInput from '../../components/Form/TextInput.jsx';
import LoadingModal from '../../components/UIElements/LoadingModal.jsx';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx'
import { useHttpRequest } from '../../hooks/httpHook.js';
import { lengthValidate } from '../../components/Util/Validators.js';

export default function SignUpPage () {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {isLoading, sendHttpRequest} = useHttpRequest();

  const {formState, onInput} = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false,
  );

  const[hadAttempt, setHadAttempt] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formState.isValid){
      try{
        const data = await sendHttpRequest(
          import.meta.env.VITE_BACKEND_URL + '/users/signup', 
          'POST',
          {
            'Content-Type': 'application/json',
          },
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
        );
        console.log(data);
        login(data.name, data.userId, data.token);
        navigate('/feed');
      } catch (error) {
        console.log(error);
      }
    }else{
      setHadAttempt(true);
      console.log("failure");
      console.log(formState);
    }
  }

  return (
    <main className="sign-up-page">
      {isLoading && <LoadingModal />}
      <h1>Fiver 
        <svg width="71" height="97" viewBox="0 0 71 97" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56.8122 23.3613C56.8122 20.0747 59.5552 17.3358 62.9061 17.3358C66.4666 17.3358 69 20.2801 69 23.3613V73.1397C68.9045 75.5122 68.3067 81.0033 66.6089 83.7064C66.1992 84.3588 65.8503 85.0818 65.8503 85.8522V92.6539C65.8503 94.1665 64.6241 95.3928 63.1115 95.3928H21.755C20.2424 95.3928 19.0161 94.1665 19.0161 92.6539V85.1228C19.0161 84.8052 18.9609 84.4901 18.8529 84.1914L2.1713 38.0638C2.12636 37.9395 2.08916 37.812 2.06753 37.6817C1.63741 35.0895 3.27973 32.7639 6.48595 31.5093C9.63562 30.2768 12.9907 31.7147 13.6754 34.0428L20.3171 51.9822M56.8122 23.3613V12.9537C56.8122 9.87248 54.2787 6.92822 50.7182 6.92822C47.1577 6.92822 44.6928 9.80401 44.6243 12.9537M56.8122 23.3613V44.4504M44.6243 12.9537C44.6243 10.6941 44.6243 10.0325 44.6243 8.1607C44.6243 5.07951 42.0909 2.13525 38.5304 2.13525C34.9699 2.13525 32.4365 5.07951 32.4365 8.1607C32.4365 11.2419 32.4365 11.0365 32.4365 12.9537M44.6243 12.9537V44.4504M32.4365 12.9537C32.4365 10.0094 30.04 6.92822 26.3425 6.92822C22.6451 6.92822 20.2486 10.0779 20.2486 12.9537C20.2486 15.2817 20.3171 51.9822 20.3171 51.9822M32.4365 12.9537V44.4504M20.3171 51.9822L22.4397 57.8707" stroke="white" strokeWidth="2.46496"/>
        </svg>
      </h1>
      <form className="sign-up-page__form" onSubmit={handleSubmit}>
        {hadAttempt &&<p>*The email or password you have entered is incorrect</p>}
        <TextInput id="name" placeholder="Full name" hadAttempt={hadAttempt} onInput={onInput} validator={lengthValidate}/>
        <EmailInput hadAttempt={hadAttempt} onInput={onInput}></EmailInput>
        <PasswordInput hadAttempt={hadAttempt} onInput={onInput}></PasswordInput>
        <button type="submit" className="sign-up-page__sign-in-button">Sign In</button>
        <Link to="/login" >Have an account already? Sign in</Link>
      </form>
    </main>
  )
}