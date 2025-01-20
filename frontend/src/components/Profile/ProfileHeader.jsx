import PropTypes from 'prop-types';

import './ProfileHeader.css'
import Avatar from '../UIElements/Avatar.jsx';
import ColorBlock from '../UIElements/ColorBlock.jsx';

export default function ProfileHeader(props) {
  return (
    <div className="profile-header">
      <div className="profile-header__image">
        <Avatar image="/Profile_Photo_Carson.JPG" radius="4px" alt="profile picture"/>
      </div>
      <div className="profile-header__details">
        <h1>{props.name}</h1>
        <h2>{props.dev && "Developer"} {props.des && "Designer"} {props.pm && "Project Manager"} - 2027</h2>
        <div className="profile-header__tag-container">
          {props.core && <ColorBlock text="core" backgroundColor="#66FF99"/>}
          {props.mentor && <ColorBlock text="mentor" backgroundColor="#FF66CC"/>}
        </div>
      </div>
      <div className="profile-header__quote">
        <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35 18.5V34.5H21V18.5C22.0806 10.6127 23.369 6.63253 28 1H35.5V2.39062C31 8 29 12 28.8113 18.5H35Z" fill="black" stroke="black" strokeWidth="0.1"/>
          <path d="M15 18.5V34.5H1V18.5C2.08057 10.6127 3.36899 6.63253 8 1H15.5V2.39062C11 8 9 12 8.81125 18.5H15Z" fill="black" stroke="black" strokeWidth="0.1"/>
        </svg>
        <h2>{props.quote}</h2>
      </div>
      <div className="profile-header__actions">
        {props.canEdit && <ColorBlock onClick={props.onModal} text="Edit Profile" backgroundColor="#FFFFFF" border="1px solid black" isButton={true}/>}
        <ColorBlock text="Message" backgroundColor="#FFFFFF" border="1px solid black" isButton={true} />
        <ColorBlock text="High Five" color="#FFFFFF" backgroundColor="#000000" border="1px solid black" isButton={true} />
      </div>
    </div>
  )
}

ProfileHeader.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  dev: PropTypes.bool.isRequired,
  des: PropTypes.bool.isRequired,
  pm: PropTypes.bool.isRequired,
  core: PropTypes.bool.isRequired,
  mentor: PropTypes.bool.isRequired,
  quote: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  onModal: PropTypes.func,
}