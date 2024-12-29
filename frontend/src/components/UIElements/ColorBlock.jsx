import PropTypes from 'prop-types';

import './ColorBlock.css'

export default function ColorBlock(props) {

  if(props.isButton) {
    return(
      <button className="color-block" onClick={props.onClick} style={{color: props.color, backgroundColor: props.backgroundColor, border: props.border}}>
        {props.text}
      </button>
    )
  }else{
    return (
      <div className="color-block" style={{color: props.color, backgroundColor: props.backgroundColor, border: props.border}}>
        {props.text}
      </div>
    )
  }
}

ColorBlock.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isButton: PropTypes.bool,
  onClick: PropTypes.func,
  border: PropTypes.string,
}
