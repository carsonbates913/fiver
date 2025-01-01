import { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext({});

export default function AuthProvider(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  })

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, [])

  return (
    <AuthContext.Provider value={{isLoggedIn, logout, login}}>
      {props.children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}