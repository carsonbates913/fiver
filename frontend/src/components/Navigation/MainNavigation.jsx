import { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';
import SideDrawer from './SideDrawer.jsx';
import NavLinks from './NavLinks.jsx';
import Backdrop from '../UIElements/Backdrop.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

export default function MainNavigation(props) {

  const { userId, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  }

  return (
    <>
      {!props.isStatic && (
        <Backdrop show={props.isNavVisible} onClick={props.toggleNav} />
      )}
      <SideDrawer show={props.isNavVisible} isStatic={props.isStatic}>
        <div className="main-navigation__logo">
          <NavLink>
            <img></img>
          </NavLink>
        </div>
        <nav className="main-navigation__drawer-nav">
          <NavLinks userId={userId} onClick={props.toggleNav}/>
          <button className="main-navigation__logout-button" onClick={handleLogout}>Log Out</button>
        </nav>
      </SideDrawer>
    </>
  )
}

MainNavigation.propTypes = {
  isNavVisible: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func,
  isStatic: PropTypes.object,
}