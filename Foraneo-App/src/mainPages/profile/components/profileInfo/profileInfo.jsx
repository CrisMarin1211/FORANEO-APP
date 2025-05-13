// ProfileInfo.jsx
import React, { useEffect, useState } from 'react';
import { getUserDataFromFirestore } from '../../../../services/firebaseUtils';  // Importa la nueva función
import './profileInfo.css';

const ProfileInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserDataFromFirestore();  // Llamamos a la función de Firestore

      if (data) {
        setUserInfo(data);  // Guardamos los datos del usuario en el estado
      }

      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <section>Loading...</section>;
  }

  if (!userInfo) {
    return <section>No user data found</section>;
  }

  return (
    <section className="profile-container">
      <h2>Profile Information</h2>
      <section className="profile-info">
        <p><strong>Name:</strong> {userInfo.name || 'N/A'}</p>
        <p><strong>Email:</strong> {userInfo.email || 'N/A'}</p>
        <p><strong>Preferred Currency:</strong> {userInfo.currency || 'N/A'}</p>
      </section>

      <h3>Finished Goals</h3>
      <section className="finished-goals">
        {userInfo.finishedGoals && userInfo.finishedGoals.length > 0 ? (
          <ul>
            {userInfo.finishedGoals.map((goal, index) => (
              <li key={index}>
                <p><strong>{goal.name}</strong></p>
                <p>Amount: ${goal.value}</p>
                <p>Completed on: {new Date(goal.completedAt.seconds * 1000).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No finished goals yet.</p>
        )}
      </section>
    </section>
  );
};

export default ProfileInfo;
