import { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import './EditProfileForm.css';
import TextInput from '../../components/Form/TextInput.jsx';
import ColorBlock from '../UIElements/ColorBlock.jsx';
import { useForm } from '../Util/FormFunctions.js';
import { lengthValidate } from '../Util/Validators.js';
import { useHttpRequest } from '../../hooks/httpHook.js';
import { AuthContext } from '../../context/AuthContext.jsx';
import ImageUpload from '../Form/ImageUpload.jsx';

export default function EditProfileForm(props) {

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const { isLoading, sendHttpRequest } = useHttpRequest();

  const navigateTo = useNavigate();

  const { token } = useContext(AuthContext);

  const { formState, onInput } = useForm(
    {
      year: {
        value: "",
        isValid: true,
      },
      dev: {
        value: false,
        isValid: true,
      },
      des: {
        value: false,
        isValid: true,
      },
      pm: {
        value: false,
        isValid: true,
      },
      core: {
        value: false,
        isValid: true,
      },
      major: {
        value: "",
        isValid: true,
      },
      minor: {
        value: "",
        isValid: true,
      },
      mentor: {
        value: false,
        isValid: true,
      },
      quote: {
        value: "",
        isValid: true,
      },
      home: {
        value: "",
        isValid: true,
      },
      birthday: {
        value: "",
        isValid: true,
      },
      funFact: {
        value: "",
        isValid: true,
      },
      favoriteDartmouthTradition: {
        value: "",
        isValid: true,
      },
      favoriteThing1: {
        value: "",
        isValid: true,
      },
      favoriteThing2: {
        value: "",
        isValid: true,
      },
      favoriteThing3: {
        value: "",
        isValid: true,
      },
      picture: {
        value: null,
        isValid: false,
      }
    },
    true
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formState.isValid){
      setAttemptedSubmit(true);
      console.log(formState);
    }else {
      try{
        console.log(formState);
        const formData = new FormData();
        formData.append('year', formState.inputs.year.value);
        formData.append('dev', formState.inputs.dev.value);
        formData.append('des', formState.inputs.des.value);
        formData.append('pm', formState.inputs.pm.value);
        formData.append('core', formState.inputs.core.value);
        formData.append('major', formState.inputs.major.value);
        formData.append('minor', formState.inputs.minor.value);
        formData.append('mentor', formState.inputs.mentor.value);
        formData.append('quote', formState.inputs.quote.value);
        formData.append('home', formState.inputs.home.value);
        formData.append('birthday', formState.inputs.birthday.value);
        formData.append('funFact', formState.inputs.funFact.value);
        formData.append('favoriteDartmouthTradition', formState.inputs.favoriteDartmouthTradition.value);
        formData.append('favoriteThing1', formState.inputs.favoriteThing1.value);
        formData.append('favoriteThing2', formState.inputs.favoriteThing2.value);
        formData.append('favoriteThing3', formState.inputs.favoriteThing3.value);
        formData.append('picture', formState.inputs.picture.value);
        const data = await sendHttpRequest(
          `${import.meta.env.VITE_BACKEND_URL}/users/profile/${props.userId}`,
          'PATCH',
          {
            'Authorization': 'Bearer ' + token,
          },
          formData,
        );
        console.log(data);
        props.onSubmit();
        navigateTo(0);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
    <ImageUpload className="edit-profile-form__image-upload" id="picture" onInput={onInput}></ImageUpload>
    <TextInput initialValue={props.user.year}label="Year" className="edit-profile-form__input" id="year" onInput={onInput} validator={lengthValidate}/>
    <div className="edit-profile-form__row">
    <TextInput label="Developer" type="checkbox" className="edit-profile-form__input" id="dev" onInput={onInput} initialValue={props.user.dev}/>
    <TextInput label="Designer"type="checkbox" className="edit-profile-form__input" id="des" onInput={onInput} initialValue={props.user.des}/>
    <TextInput label="Project Manager" type="checkbox" className="edit-profile-form__input" id="pm" onInput={onInput} initialValue={props.user.pm}/>
    </div>
    <div className="edit-profile-form__row">
    <TextInput label="Core" type="checkbox" className="edit-profile-form__input" id="core" onInput={onInput} initialValue={props.user.core}/>
    <TextInput label="Mentor" type="checkbox" className="edit-profile-form__input" id="mentor" onInput={onInput} initialValue={props.user.mentor}/>
    </div>
    <TextInput label="Major" className="edit-profile-form__input" id="major" onInput={onInput} initialValue={props.user.major} validator={lengthValidate}/>
    <TextInput label="Minor" className="edit-profile-form__input" id="minor" onInput={onInput} initialValue={props.user.minor} validator={lengthValidate}/>
    <TextInput label="Birthday" className="edit-profile-form__input" id="birthday" onInput={onInput} initialValue={props.user.birthday} validator={lengthValidate}/>
    <TextInput label="Home" className="edit-profile-form__input" id="home" onInput={onInput} initialValue={props.user.home} validator={lengthValidate}/>
    <TextInput label="Quote" className="edit-profile-form__input" id="quote" onInput={onInput} initialValue={props.user.quote} validator={lengthValidate}/>
    <TextInput label="Fun Fact" className="edit-profile-form__input" id="funFact" onInput={onInput} initialValue={props.user.funFact} validator={lengthValidate}/>
    <TextInput label="favoriteDartmouthTradition" className="edit-profile-form__input" id="favoriteDartmouthTradition" onInput={onInput} initialValue={props.user.favoriteDartmouthTradition} validator={lengthValidate}/>
    <TextInput label="Favorite Thing 1" className="edit-profile-form__input" id="favoriteThing1" onInput={onInput} initialValue={props.user.favoriteThing1} validator={lengthValidate}/>
    <TextInput label="Favorite Thing 2" className="edit-profile-form__input" id="favoriteThing2" onInput={onInput} initialValue={props.user.favoriteThing2} validator={lengthValidate}/>
    <TextInput label="Favorite Thing 3" className="edit-profile-form__input" id="favoriteThing3" onInput={onInput} initialValue={props.user.favoriteThing3} validator={lengthValidate}/>
    <ColorBlock text="Submit" isButton={true} border="none" backgroundColor="#66FF99" type="submit"></ColorBlock>
    </form>
  )
}