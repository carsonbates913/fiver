import PropTypes from 'prop-types';

import './QuotesList.css'
import QuoteItem from './QuoteItem.jsx';

export default function QuotesList(props) {
  return (
    <>
      <ul className="quotes-list">
        <QuoteItem prompt={"Fun Fact?"} quote={props.funFact}/>
        <QuoteItem prompt={"Favorite Dartmouth Tradition?"} quote={props.favoriteDartmouthTradition}/>
      </ul>
    </>
  )
}

QuotesList.propTypes = {
  funFact: PropTypes.string.isRequired,
  favoriteDartmouthTradition: PropTypes.string.isRequired,
}