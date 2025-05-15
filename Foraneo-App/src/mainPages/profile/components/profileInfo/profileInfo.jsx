import React, { useEffect, useState } from 'react';
import { getUserDataFromFirestore } from '../../../../services/firebaseUtils';
import './profileInfo.css';

const ProfileInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [completedRecipes, setCompletedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserDataFromFirestore();

      if (data) {
        setUserInfo(data);
        // Aquí extraemos completedRecipes si vienen en el doc:
        setCompletedRecipes(data.completedRecipes || []);
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

<h3>Finished Recipes</h3>
<section className="finished-recipes">
  {completedRecipes.length > 0 ? (
    <div className="cards-container">
      {completedRecipes.map((recipe, index) => (
        <div key={index} className="recipe-card">
        
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.name}
              className="recipe-image"
              loading="lazy"
            />
          )}


          <h4>{recipe.name}</h4>


          {recipe.description && <p className="recipe-description">{recipe.description}</p>}
        </div>
      ))}
    </div>
  ) : (
    <p>No finished recipes yet.</p>
  )}
</section>


    </section>
  );
};

export default ProfileInfo;
