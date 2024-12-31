import { useState } from 'react';
import { useParams } from 'react-router-dom';

import './ProfilePage.css'
import ProfileHeader from '../../components/Profile/ProfileHeader.jsx';
import InfoList from '../../components/Profile/InfoList.jsx';
import QuotesList from '../../components/Profile/QuotesList.jsx';
import FavoritesList from '../../components/Profile/FavoritesList.jsx';

export default function ProfilePage () {

  const profiles =     [{
    id: "1",
    name: "Carson Bates",
    year: "2025",
    dev: false,
    des: false,
    pm: true,
    core: true,
    mentor: true,
    major: "Computer Science",
    minor: "Economics",
    birthday: "09-04",
    home: "CT, USA",
    quote: "Live and Learn",
    favoriteThing1: "Cooking with friends (and HOTPOT!)",
    favoriteThing2: "Photosynthesizing at the campus Penthouse",
    favoriteThing3: "My dog, Buddy (PLEASE ask me to see a photo)",
    favoriteDartmouthTradition: "Green Key",
    funFact: "Trees can talk to each other!",
    picture: "https://api.typeform.com/responses/files/3a44bfffc1fa32fc06e81ff82e0a1478acff9964d0816be47181a3da70b8c96e/Photo_on_8_22_22_at_1.53_PM__2.jpg"
  }]

  const {userId} = useParams();
  const profile = profiles.find(profile => profile.id === userId);

  return (
    <main className="profile-page">
      <ProfileHeader 
        name={profile.name}
        year={profile.year}
        dev={profile.dev}
        des={profile.des}
        pm={profile.pm}
        core={profile.core}
        mentor={profile.mentor}
        quote={profile.quote}
        picture={profile.picture}
        />
      <div className="profile-page__separator"/>
      <InfoList
        home={profile.home}
        birthday={profile.birthday}
        major={profile.major}
        minor={profile.minor}
      />
      <QuotesList 
        funFact={profile.funFact}
        favoriteDartmouthTradition={profile.favoriteDartmouthTradition}
      />
      <h1 className="profile-page__favorites-header">Favorite Things</h1>
      <FavoritesList 
        favoriteThing1={profile.favoriteThing1}
        favoriteThing2={profile.favoriteThing2}
        favoriteThing3={profile.favoriteThing3}
      />
    </main>
  )
}