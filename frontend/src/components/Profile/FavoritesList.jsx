import PropTypes from 'prop-types';

import './FavoritesList.css'
import FavoriteItem from './FavoriteItem.jsx';

export default function FavoritesList(props) {
  return (
    <>
      <ul className="favorites-list">
        <FavoriteItem thing={props.favoriteThing1}/>
        <FavoriteItem thing={props.favoriteThing2}/>
        <FavoriteItem thing={props.favoriteThing3}/>
      </ul>
    </>
  )
}

FavoritesList.propTypes = {
  favoriteThing1: PropTypes.string.isRequired,
  favoriteThing2: PropTypes.string.isRequired,
  favoriteThing3: PropTypes.string.isRequired,
}