import PropTypes from 'prop-types';

import './Feed.css';

export default function Feed(props) {
  return (
    <div className= "feed">
      <header className="feed__header">
        <p>12/9</p>
      </header>
      <div className="feed__content">
        {props.children}
      </div>
    </div>
  )
}

Feed.propTypes = {
  children: PropTypes.node,
}