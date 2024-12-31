import PropTypes from 'prop-types';

import './FavoriteItem.css'

export default function FavoriteItem(props) {
  return (
    <>
    <li className="favorite-item">
      <div className="favorite-item__number-card">{props.order}</div>
      <h3>{props.thing}</h3>
    </li>
    </>
  )
}

FavoriteItem.propTypes = {
  thing: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
}