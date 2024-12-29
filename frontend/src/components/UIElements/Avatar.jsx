import PropTypes from 'prop-types'

import './Avatar.css';

export default function Avatar(props) {
  return (
    <div className="avatar" style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{borderRadius: props.radius }}
      />
    </div>
  );
};

Avatar.propTypes = {
  style: PropTypes.object,
  image: PropTypes.string,
  alt: PropTypes.string.isRequired,
  radius: PropTypes.string,
}