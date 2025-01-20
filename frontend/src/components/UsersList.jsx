import PropTypes from 'prop-types';

import UserItem from './UserItem.jsx';
import './UsersList.css';

export default function UsersList(props) {

  if(props.users.length == 0){
    return (
      <div>No Users Found</div>
    )
  }
  
  return (
    <ul className="users-list">
      {props.users.map(user => (
        <UserItem 
          key={user.id}
          id={user.id}
          dev={user.dev}
          des={user.des}
          pm={user.pm}
          role={user.role}
          picture={user.picture}
          name={user.name}
        />
      ))}
    </ul>
  )
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
};

