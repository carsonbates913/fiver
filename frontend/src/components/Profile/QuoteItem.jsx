import PropTypes from 'prop-types';

import './QuoteItem.css';

export default function QuoteItem(props) {
  return (
    <li className="quote-item">
      <p>{props.prompt}</p>
      <div className="quote-item__container">
        <p>
        <svg viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35 18.5V34.5H21V18.5C22.0806 10.6127 23.369 6.63253 28 1H35.5V2.39062C31 8 29 12 28.8113 18.5H35Z" fill="black" stroke="black" strokeWidth="0.1"/>
          <path d="M15 18.5V34.5H1V18.5C2.08057 10.6127 3.36899 6.63253 8 1H15.5V2.39062C11 8 9 12 8.81125 18.5H15Z" fill="black" stroke="black" strokeWidth="0.1"/>
        </svg>
        &nbsp;&nbsp;{props.quote}</p>
      </div>
    </li>
  )
}

QuoteItem.propTypes = {
  prompt: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
}