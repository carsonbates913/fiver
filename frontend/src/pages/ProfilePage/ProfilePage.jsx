import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import './ProfilePage.css'
import ProfileHeader from '../../components/Profile/ProfileHeader.jsx';
import InfoList from '../../components/Profile/InfoList.jsx';
import QuotesList from '../../components/Profile/QuotesList.jsx';
import FavoritesList from '../../components/Profile/FavoritesList.jsx';
import { useHttpRequest } from '../../hooks/httpHook.js';
import LoadingModal from '../../components/UIElements/LoadingModal.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import Modal from '../../components/UIElements/Modal.jsx';
import EditProfileForm from '../../components/Profile/EditProfileForm.jsx';

export default function ProfilePage () {

  const { isLoading, sendHttpRequest } = useHttpRequest();
  const [loadedUser, setLoadedUser] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
  }

  const { userId, token } = useContext(AuthContext);

  const { profileId } = useParams();

  useEffect(() => {
    const fetchUser = async() => {
      try {
        const data = await sendHttpRequest(
          `${import.meta.env.VITE_BACKEND_URL}/users/profile/${profileId}`,
          'GET',
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          null,
        )
        
        setLoadedUser(data.user);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [sendHttpRequest, profileId]);

  return (
    <main className="profile-page">
      {isLoading && <LoadingModal />}
      {!isLoading && loadedUser && 
      <>
      <Modal
        show={isModalVisible}
        onCancel={handleCloseModal}
        className="profile-page__modal"
        >
          <EditProfileForm onSubmit={handleCloseModal} userId={userId} user={loadedUser}/>
      </Modal>
      <ProfileHeader 
        canEdit={userId === profileId}
        user={loadedUser}
        onModal={handleOpenModal}
        />
      <div className="profile-page__separator"/>
      <InfoList
        home={loadedUser.home}
        birthday={loadedUser.birthday}
        major={loadedUser.major}
        minor={loadedUser.minor}
      />
      <QuotesList 
        funFact={loadedUser.funFact}
        favoriteDartmouthTradition={loadedUser.favoriteDartmouthTradition}
      />
      <h1 className="profile-page__favorites-header">Favorite Things</h1>
      <FavoritesList 
        favoriteThing1={loadedUser.favoriteThing1}
        favoriteThing2={loadedUser.favoriteThing2}
        favoriteThing3={loadedUser.favoriteThing3}
      />
      </>
      }
    </main>
  )
}