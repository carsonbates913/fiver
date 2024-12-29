import PropTypes from 'prop-types';

import Avatar from './UIElements/Avatar.jsx';
import { Link } from 'react-router-dom';
import './UserItem.css';

export default function UserItem(props) {
  return (
    <li className="user-item">
      <Link className="user-item__content" to={`/${props.id}/profile`}>
        <div className="user-item__image">
          <Avatar image={props.image} radius="6px" alt="image"></Avatar>
        </div>
        <div className="user-item__info">
          <h1>{props.name}</h1>
          <h2>{props.role}</h2>
        </div>
      </Link>
    </li>
  )
}

UserItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}