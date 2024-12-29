import { createBrowserRouter, RouterProvider, Outlet, useLocation, matchPath} from 'react-router-dom';
import { useState, useEffect } from 'react';

import FeedPage from './pages/FeedPage/FeedPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import TeamPage from './pages/TeamPage/TeamPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import MainNavigation from './components/Navigation/MainNavigation.jsx';

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

  const isStatic = matchPath("/:userId/profile", location.pathname);
  console.log(isStatic);

  return (
    <div className="layout-container" style={{display: "flex"}}>
      <MainNavigation isNavVisible={isNavVisible} toggleNav={toggleNav} isStatic={isStatic}/>
      <Outlet context={toggleNav} style={{flex: "1"}}/>
    </div>
  );
}

function App() {

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
      path: '/',
      element: <RootLayout />,
      children: [
        { path: '/:userId/profile', element: <ProfilePage /> },
        { path: '/feed', element: <FeedPage /> },
        { path: '/team', element: <TeamPage /> },
      ],
    },
  ]);
 
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
