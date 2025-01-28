import PropTypes from 'prop-types';

import './ProfileHeader.css'
import Avatar from '../UIElements/Avatar.jsx';
import ColorBlock from '../UIElements/ColorBlock.jsx';
import { useNavigate } from 'react-router-dom';

export default function ProfileHeader(props) {

  const navigateTo = useNavigate();

  const handleHighFive = () => {
    navigateTo('/feed');
  }

  return (
    <div className="profile-header">
      <div className="profile-header__image">
        <Avatar image={`${import.meta.env.VITE_ASSET_URL}/${props.user.picture}`} radius="4px" alt="profile picture"/>
      </div>
      <div className="profile-header__details">
        <h1>{props.user.name}</h1>
        <h2 style={{marginBottom: '10px'}}>{[props.user.dev && "Developer", props.user.des && "Designer", props.user.pm && "Project Manager"].filter(Boolean).join(" - ")}</h2>
        <h2>2027</h2>
        <div className="profile-header__tag-container">
          {props.user.core && <ColorBlock text="core" backgroundColor="#66FF99"/>}
          {props.user.mentor && <ColorBlock text="mentor" backgroundColor="#FF66CC"/>}
        </div>
      </div>
      <div className="profile-header__quote">
        <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35 18.5V34.5H21V18.5C22.0806 10.6127 23.369 6.63253 28 1H35.5V2.39062C31 8 29 12 28.8113 18.5H35Z" fill="black" stroke="black" strokeWidth="0.1"/>
          <path d="M15 18.5V34.5H1V18.5C2.08057 10.6127 3.36899 6.63253 8 1H15.5V2.39062C11 8 9 12 8.81125 18.5H15Z" fill="black" stroke="black" strokeWidth="0.1"/>
        </svg>
        <h2>{props.user.quote}</h2>
      </div>
      <div className="profile-header__actions">
        {props.canEdit && <ColorBlock onClick={props.onModal} text="Edit Profile" backgroundColor="#FFFFFF" border="1px solid black" isButton={true}/>}
        <ColorBlock onClick={handleHighFive}text="High Five" color="#FFFFFF" backgroundColor="#000000" border="1px solid black" isButton={true} />
      </div>
    </div>
  )
}

ProfileHeader.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  onModal: PropTypes.func,
}