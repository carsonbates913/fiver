import PropTypes from 'prop-types';

import Avatar from './UIElements/Avatar.jsx';
import { Link } from 'react-router-dom';
import './UserItem.css';

export default function UserItem(props) {
  return (
    <li className="user-item">
      <Link className="user-item__content" to={`/${props.id}/profile`}>
        <div className="user-item__image">
          <Avatar image={`${import.meta.env.VITE_ASSET_URL}/${props.picture}`} radius="6px" alt="image"></Avatar>
        </div>
        <div className="user-item__info">
          <h1>{props.name}</h1>
          <h2>{[props.dev && "Developer", props.des && "Designer", props.pm && "Project Manager"].filter(Boolean).join(" - ")}</h2>
        </div>
      </Link>
    </li>
  )
}

UserItem.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dev: PropTypes.bool.isRequired,
  des: PropTypes.bool.isRequired,
  pm: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
}