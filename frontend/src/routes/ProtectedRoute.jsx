import { useContext } from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute() {
  const context = useOutletContext();
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Outlet context={context}/> : <Navigate to="/login" replace/>
}