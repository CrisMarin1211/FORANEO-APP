import React, { useState, useEffect } from 'react';
import './main.css';
import Menu from '../Planner/components/navBar/navBar';
import RecipesResume from './components/recipesResume/recipesResume';
import RecipesMoney from './components/recipeMoney/recipeMoney';
import MoodResume from './components/moodResume/moodResume';
import { db, auth } from '../../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { calculateRecipeSavings } from '../../services/firebaseUtils';

const Main = () => {
  const [userName, setUserName] = useState("Foraneo");
  const [completedRecipes, setCompletedRecipes] = useState([]);

  const fetchUserDataAndRecipes = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserName(userData.name);
        setCompletedRecipes(userData.completedRecipes || []);
      } else {
        setCompletedRecipes([]);
      }
    }
  };

  useEffect(() => {
    fetchUserDataAndRecipes();
  }, []);

  // Call the function that calculates savings
  const { totalIngredientCost, savings } = calculateRecipeSavings(completedRecipes);

  return (
    <section className='MainContainerPage'>
      <section className='messageWelcome'>
        <h2 className='usernameMessage'>Hi {userName}!✨</h2>
        <h2 className='wrappedMessage'>Let's take a look at your wrapped!</h2>
      </section>

      <section className='WrappedInfo'>
        <RecipesResume completedRecipes={completedRecipes} />
        <RecipesMoney savings={savings} totalIngredientCost={totalIngredientCost} />
        <MoodResume />
      </section>

      <section className='spaceiwii'></section>
      <section className='MenuBarr'>
        <Menu />
      </section>
    </section>
  );
};

export default Main;
