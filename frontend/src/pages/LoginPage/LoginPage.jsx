import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './LoginPage.css';
import { useForm } from '../../components/Util/FormFunctions.js';
import TextInput from '../../components/Form/TextInput.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

export default function LoginPage () {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {formState, onInput} = useForm(
    {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formState.isValid){
      login();
      navigate('/feed');
    }else{
      setHadAttempt(true);
      console.log("failure");
      console.log(formState);
    }
  }

  return (
    <main className="login-page">
      <div className="login-page__background">
        <svg width="1512" height="982" viewBox="0 0 1512 982" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.4" filter="url(#filter0_f_447_37)">
          <path d="M570.747 111.923C570.747 182.34 215.891 455.923 124.247 455.923C32.6019 455.923 62.7466 198.84 62.7466 128.423C62.7466 58.0072 211.539 74.9235 303.184 74.9235C394.829 74.9235 570.747 41.5072 570.747 111.923Z" fill="#03D4FD"/>
          </g>
          <g opacity="0.4" filter="url(#filter1_f_447_37)">
          <path d="M712 -11.201C445.5 186.799 707.145 312.799 615.5 312.799C523.855 312.799 375 309.715 375 239.299C375 168.883 401.316 -28.1244 486 20.2991C577.645 20.2991 712 -81.6173 712 -11.201Z" fill="#FF66CC"/>
          </g>
          <g opacity="0.2" filter="url(#filter2_f_447_37)">
          <path d="M1407.5 892C1330.5 918.5 1323.64 944.299 1232 944.299C1140.36 944.299 1041 962.416 1041 892C1041 821.584 1175.5 768.841 1232 615C1274 82.3414 1628 762.8 1407.5 892Z" fill="#66FF99"/>
          </g>
          <defs>
          <filter id="filter0_f_447_37" x="-242" y="-233" width="1112.75" height="988.923" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_447_37"/>
          </filter>
          <filter id="filter1_f_447_37" x="75" y="-336" width="937" height="948.799" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_447_37"/>
          </filter>
          <filter id="filter2_f_447_37" x="741" y="114.088" width="1038.28" height="1132.3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_447_37"/>
          </filter>
          </defs>
        </svg>
      </div>

      <h1>Fiver 
        <svg width="71" height="97" viewBox="0 0 71 97" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56.8122 23.3613C56.8122 20.0747 59.5552 17.3358 62.9061 17.3358C66.4666 17.3358 69 20.2801 69 23.3613V73.1397C68.9045 75.5122 68.3067 81.0033 66.6089 83.7064C66.1992 84.3588 65.8503 85.0818 65.8503 85.8522V92.6539C65.8503 94.1665 64.6241 95.3928 63.1115 95.3928H21.755C20.2424 95.3928 19.0161 94.1665 19.0161 92.6539V85.1228C19.0161 84.8052 18.9609 84.4901 18.8529 84.1914L2.1713 38.0638C2.12636 37.9395 2.08916 37.812 2.06753 37.6817C1.63741 35.0895 3.27973 32.7639 6.48595 31.5093C9.63562 30.2768 12.9907 31.7147 13.6754 34.0428L20.3171 51.9822M56.8122 23.3613V12.9537C56.8122 9.87248 54.2787 6.92822 50.7182 6.92822C47.1577 6.92822 44.6928 9.80401 44.6243 12.9537M56.8122 23.3613V44.4504M44.6243 12.9537C44.6243 10.6941 44.6243 10.0325 44.6243 8.1607C44.6243 5.07951 42.0909 2.13525 38.5304 2.13525C34.9699 2.13525 32.4365 5.07951 32.4365 8.1607C32.4365 11.2419 32.4365 11.0365 32.4365 12.9537M44.6243 12.9537V44.4504M32.4365 12.9537C32.4365 10.0094 30.04 6.92822 26.3425 6.92822C22.6451 6.92822 20.2486 10.0779 20.2486 12.9537C20.2486 15.2817 20.3171 51.9822 20.3171 51.9822M32.4365 12.9537V44.4504M20.3171 51.9822L22.4397 57.8707" stroke="white" strokeWidth="2.46496"/>
        </svg>
      </h1>
      <form className="login-page__form" onSubmit={handleSubmit}>
        <p>{hadAttempt && "*The email or password you have entered is incorrect"}</p>
        <TextInput id="email" placeholder="Email Address" hadAttempt={hadAttempt} onInput={onInput}/>
        <TextInput type="password" id="password" placeholder="Password" hadAttempt={hadAttempt} onInput={onInput}/>
        <button type="submit" className="login-page__sign-in-button">Sign In</button>
        <h2>Don&apos;t have an account yet? <Link to="/sign-up">Sign Up</Link></h2>
      </form>
    </main>
  )
}