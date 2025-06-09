import React, { useState, useEffect } from 'react';
import './main.css';
import Menu from '../Planner/components/navBar/navBar';
import RecipesResume from './components/recipesResume/recipesResume';
import RecipesMoney from './components/recipeMoney/recipeMoney';
import MoodResume from './components/moodResume/moodResume';
import { db, auth } from '../../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { calculateRecipeSavings } from '../../services/firebaseUtils';
import { getCalendarEventsFromFirestore } from '../../services/calendarFirebase';
import { faces } from '../Planner/data/imagesData';
const Main = () => {
  const [userName, setUserName] = useState("Foraneo");
  const [completedRecipes, setCompletedRecipes] = useState([]);
  const [mostFeltEmotion, setMostFeltEmotion] = useState(null);

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

    // Obtener eventos del calendario
    const events = await getCalendarEventsFromFirestore();
    const emotionCounts = {};

    events.forEach(event => {
      const emotion = event.mood?.toLowerCase(); // ← cambio clave
      if (emotion) {
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
      }
    });

    // Determinar emoción más frecuente
    let mostCommonEmotion = null;
    let maxCount = 0;
    for (const [emotion, count] of Object.entries(emotionCounts)) {
      if (count > maxCount) {
        mostCommonEmotion = emotion;
        maxCount = count;
      }
    }

    // Asignar la emoción más común si existe, o null si no hay eventos
    let emotionData = null;
    if (mostCommonEmotion) {
      emotionData = faces.find(face => face.label.toLowerCase() === mostCommonEmotion);
    }

    // Si no hay emociones registradas, no asignamos emoción aleatoria
    if (!emotionData && events.length > 0) {
      const randomIndex = Math.floor(Math.random() * faces.length);
      emotionData = faces[randomIndex];
    }

    setMostFeltEmotion(emotionData || null);
  };

  useEffect(() => {
    fetchUserDataAndRecipes();
  }, []);

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
        <MoodResume emotionData={mostFeltEmotion} />
      </section>

      <section className='spaceiwii'></section>
      <section className='MenuBarr'>
        <Menu />
      </section>
    </section>
  );
};


export default Main;
