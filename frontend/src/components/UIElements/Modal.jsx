import { useRef, forwardRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types';

import './Modal.css';
import Backdrop from './Backdrop.jsx';

const ModalContent = forwardRef((props, ref) => {
  const content = (
    <div className={`modal ${props.className}`} ref={ref}>
      <header className={`modal__header ${props.headerClass}`}>
        {props.header}
      </header>
      <div>
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </div>
    </div>
); 

  return ReactDOM.createPortal(content, document.getElementById('modal-portal-root'));
});

ModalContent.displayName = 'ModalContent'

export default function Modal(props) {

  const nodeRef = useRef(null);

  return (
    <>
        <CSSTransition in={props.show} nodeRef={nodeRef} timeout={200} classNames="modal" mountOnEnter unmountOnExit>
          <ModalContent {...props} ref={nodeRef}/>
        </CSSTransition>
        <Backdrop show={props.show} onClick={props.onCancel}/>
    </>
  )
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
}

ModalContent.propTypes = {
  className: PropTypes.string,
  headerClass: PropTypes.string,
  header: PropTypes.node,
  contentClass: PropTypes.string,
  children: PropTypes.node,
  footerClass: PropTypes.string,
  footer: PropTypes.node,
}