import PropTypes from 'prop-types';
import { format } from 'date-fns';

import './Feed.css';

export default function Feed(props) {
  return (
    <div className= "feed">
      <header className="feed__header">
        <p>{format(props.currentDate, 'MM/dd')}</p>
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