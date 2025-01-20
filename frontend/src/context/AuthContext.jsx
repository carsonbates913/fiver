import { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext({});

export default function AuthProvider(props) {

  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [name, setName] = useState();

  const login = useCallback((name, user, token) => {
    setToken(token);
    setUserId(user);
    setName(name);
  }, [])

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setName(null);
  }, [])

  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token, logout, login, name, userId}}>
      {props.children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}