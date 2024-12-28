import { useOutletContext } from 'react-router-dom';

import './TeamPage.css'
import UsersList from '../../components/UsersList.jsx'
import NavButton from '../../components/Navigation/NavButton.jsx';

export default function TeamPage () {

  const toggleNav = useOutletContext();

  const USERS = [{id: "1", name: "Daisy Thompson", image: "/TanjiroWood.jpeg", role: "designer"}, {id: "2", name: "carson", image: "/TanjiroWood.jpeg", role: "developer"}, {id: "3", name: "Daisy Thompson", image: "/TanjiroWood.jpeg", role: "designer"}, {id: "4", name: "Daisy Thompson", image: "/TanjiroWood.jpeg", role: "designer"},{id: "5", name: "Daisy Thompson", image: "/TanjiroWood.jpeg", role: "designer"},]

  return (
    <>
      <main className="teampage">
        <h1>DALI Members</h1>
        <div className="teampage__nav-button">
          <NavButton toggleNav={toggleNav}></NavButton>
        </div>
        <UsersList users={USERS} />
      </main>
    </>
  )
}