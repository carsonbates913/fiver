import { useState, useEffect, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';

import './TeamPage.css'
import UsersList from '../../components/UsersList.jsx'
import NavButton from '../../components/Navigation/NavButton.jsx';
import LoadingModal from '../../components/UIElements/LoadingModal.jsx';
import { useHttpRequest } from '../../hooks/httpHook.js';
import { AuthContext } from '../../context/AuthContext.jsx';

export default function TeamPage () {

  const toggleNav = useOutletContext();
  const [loadedUsers, setLoadedUsers] = useState();
  
  const { isLoading, sendHttpRequest } = useHttpRequest();
  const { token } = useContext(AuthContext);

  useEffect(()=> {
    const fetchUsers = async () => {
      try {
        const data = await sendHttpRequest(
          import.meta.env.VITE_BACKEND_URL + '/users',
          'GET',
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          null,
        );
        setLoadedUsers(data.users);
      } catch(error) {
        console.log(error);
      }
    }

    fetchUsers();
  }, [sendHttpRequest])

  return (
    <>
      <main className="teampage">
        {isLoading && <LoadingModal />}
        <h1>DALI Members</h1>
        <div className="teampage__nav-button">
          <NavButton toggleNav={toggleNav}></NavButton>
        </div>
        {!isLoading && loadedUsers && <UsersList users={loadedUsers} />}
      </main>
    </>
  )
}