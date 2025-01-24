import { createBrowserRouter, RouterProvider, Outlet, useLocation, matchPath } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import FeedPage from './pages/FeedPage/FeedPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import TeamPage from './pages/TeamPage/TeamPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import MainNavigation from './components/Navigation/MainNavigation.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import { AuthContext } from './context/AuthContext.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

function RootLayout() {

  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible((prev) => !prev);
  }

  const location = useLocation();

  useEffect(() => {
    if(isNavVisible){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = 'auto';
    }
  }, [isNavVisible]);

  const isStatic = matchPath("/:profileId/profile", location.pathname);

  return (
    <div className="layout-container" style={{display: "flex"}}>
      <MainNavigation isNavVisible={isNavVisible} toggleNav={toggleNav} isStatic={isStatic}/>
      <Outlet context={toggleNav} style={{flex: "1"}}/>
    </div>)
}

function App() {

  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [name, setName] = useState();
  const [loading, setLoading] = useState(true);

  const login = useCallback((name, userId, token, expirationDate) => {
    setToken(token);
    setUserId(userId);
    setName(name);
    const tokenExpiration = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem("fiverUserData", JSON.stringify({name: name, userId: userId, token: token, expiration: tokenExpiration.toISOString()}));
  }, [])

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setName(null);
    localStorage.removeItem('fiverUserData');
  }, [])

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('fiverUserData'));
    if(userData && userData.token && new Date(userData.expiration) > new Date()){
      login(userData.name, userData.userId, userData.token, new Date(userData.expiration));
      console.log("logged in already");
    }
    setLoading(false);
  }, [login])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/sign-up',
      element: <SignUpPage />,
    },
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [{
        path: '/',
        element: <RootLayout/>,
        children:  [
          { path: '/feed', element: <FeedPage /> },
          { path: '/team', element: <TeamPage /> },
          { path: '/:profileId/profile', element: <ProfilePage /> },
        ],
      }]
    },
  ]);

  if(loading){
    return <>loading</>
  }
 
  return (
    <>
      <AuthContext.Provider value={{isLoggedIn: !!token, token, logout, login, name, userId}}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </>
  )
}

export default App
