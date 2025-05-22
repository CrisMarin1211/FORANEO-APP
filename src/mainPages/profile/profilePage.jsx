import React from 'react';
import ProfileInfo from './components/profileInfo/profileInfo';
import { Button } from 'antd';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import Menu from '../Planner/components/navBar/navBar';
import './profilePage.css'

const Profile = () => {



  const handleLogout = () => {
    signOut(auth)
    .then(() => {

      console.log('Signed out successfully');
    })
    .catch((error) => {
      console.log('Error signing out:', error);
    });
  };


  return (
    <section className='ProfileContainerPage'>

      <ProfileInfo></ProfileInfo>

      <Button className='logoout' onClick={handleLogout}>LOG OUT</Button>
      <section className='spacesp'></section>
      <Menu></Menu>
    </section>
  );
};

export default Profile;