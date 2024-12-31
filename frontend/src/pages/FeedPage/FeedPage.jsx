import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import './FeedPage.css'
import NavButton from '../../components/Navigation/NavButton.jsx';
import Feed from '../../components/Feed.jsx';
import Modal from '../../components/UIElements/Modal.jsx';
import FeedForm from '../../components/Form/FeedForm.jsx';
import Five from '../../components/Five.jsx';

export default function FeedPage() {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
  }

  const toggleNav = useOutletContext();

  return (
    <>
      <Modal 
        show={isModalVisible}
        className={"feed-page__modal"}
        headerClass={"feed-page__modal-header"}
        contentClass={"feed-page__modal-content"}
        footerClass={"feed-page__modal-footer"}
        header={""}
        footer={""}
        onCancel={handleCloseModal}
      >
        <div className="feed-form-container">
          <FeedForm onSubmit={handleCloseModal}></FeedForm>
        </div>
      </Modal>
      <main className="feed-page">
        <div className="feed-page__nav-button">
          <NavButton toggleNav={toggleNav}></NavButton>
        </div>
        <h1>
        <svg width="71" height="90" viewBox="0 0 71 97" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56.8122 23.3613C56.8122 20.0747 59.5552 17.3358 62.9061 17.3358C66.4666 17.3358 69 20.2801 69 23.3613V73.1397C68.9045 75.5122 68.3067 81.0033 66.6089 83.7064C66.1992 84.3588 65.8503 85.0818 65.8503 85.8522V92.6539C65.8503 94.1665 64.6241 95.3928 63.1115 95.3928H21.755C20.2424 95.3928 19.0161 94.1665 19.0161 92.6539V85.1228C19.0161 84.8052 18.9609 84.4901 18.8529 84.1914L2.1713 38.0638C2.12636 37.9395 2.08916 37.812 2.06753 37.6817C1.63741 35.0895 3.27973 32.7639 6.48595 31.5093C9.63562 30.2768 12.9907 31.7147 13.6754 34.0428L20.3171 51.9822M56.8122 23.3613V12.9537C56.8122 9.87248 54.2787 6.92822 50.7182 6.92822C47.1577 6.92822 44.6928 9.80401 44.6243 12.9537M56.8122 23.3613V44.4504M44.6243 12.9537C44.6243 10.6941 44.6243 10.0325 44.6243 8.1607C44.6243 5.07951 42.0909 2.13525 38.5304 2.13525C34.9699 2.13525 32.4365 5.07951 32.4365 8.1607C32.4365 11.2419 32.4365 11.0365 32.4365 12.9537M44.6243 12.9537V44.4504M32.4365 12.9537C32.4365 10.0094 30.04 6.92822 26.3425 6.92822C22.6451 6.92822 20.2486 10.0779 20.2486 12.9537C20.2486 15.2817 20.3171 51.9822 20.3171 51.9822M32.4365 12.9537V44.4504M20.3171 51.9822L22.4397 57.8707" stroke="black" strokeWidth="2.46496"/>
        </svg>
        &apos;s of the Week</h1>
        <h2>12/8 - 12/15</h2>
        <button className="feed-page__add-five-button" onClick={handleOpenModal}>Send A Five</button>
        <h3>Shoutout a teammate for their excellent work!</h3>
        <Feed>
          <Five color="blue" to="Carson" from="Kelly" words={["Oustanding", "Wonderful"]} top="200" left="200"/>
          <Five color="pink" to="Parker" from="Carson" words={["Kind", "Responsible"]} top="100" left="700"/>
          <Five color="green" to="Jill" from="Kaitlyn" words={["Confident", "Bright"]} top="500" left="900"/>
        </Feed>
      </main>
    </>
  )
}