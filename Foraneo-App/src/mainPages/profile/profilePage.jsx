import React from 'react';
import ProfileInfo from './components/profileInfo/profileInfo';
import { Button } from 'antd';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import Menu from '../Planner/components/navBar/navBar';

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
      <h1>Profile</h1>
      <ProfileInfo></ProfileInfo>

      <Button onClick={handleLogout}>CERRAR SESION</Button>

      <Menu></Menu>
    </section>
  );
};

export default Profile;