import './EditProfileForm.css';
import TextInput from '../../components/Form/TextInput.jsx';
import { useForm } from '../Util/FormFunctions.js';

export default function EditProfileForm() {

  const { formState, onInput } = useForm();

  return (
    <>
    <TextInput />
    <TextInput />
    <TextInput />
    <TextInput />
    <TextInput />
    <TextInput />
    <TextInput />
    <TextInput />
    <TextInput />
    <TextInput />
    <TextInput />
    <TextInput />
    </>
  )
}