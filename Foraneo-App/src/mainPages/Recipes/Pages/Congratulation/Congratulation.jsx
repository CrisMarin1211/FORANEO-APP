import React, { useEffect, useState } from 'react';
import TitleCongrats from '../../Components/3.CongratsPlan/TitleCongrats/TitleCongrats';
import ImageEmotions from '../../Components/3.CongratsPlan/ImageEmotions/ImageEmotions';
import UnlockedMessage from '../../Components/3.CongratsPlan/UnlockedMessage/UnlockedMessage';
import MealPlanPhrase from '../../Components/3.CongratsPlan/MealPlanPhrase/MealPlanPhrase';
import NameRecipe from '../../Components/3.CongratsPlan/NameRecipe/NameRecipe';

function Congratulation() {
  const [completedRecipes, setCompletedRecipes] = useState(null);

  useEffect(() => {
    // Recuperar todas las recetas completadas desde localStorage
    const savedRecipes = JSON.parse(localStorage.getItem('completedRecipes')) || [];
    if (savedRecipes.length > 0) {
      setCompletedRecipes(savedRecipes); // Establecer todas las recetas completadas
    }
  }, []);

  if (!completedRecipes || completedRecipes.length === 0) {
    return <div>Loading...</div>; // Mientras se carga o no hay recetas completadas
  }

  // Mostrar la receta más reciente completada
  const recentRecipe = completedRecipes[completedRecipes.length - 1];

  return (
    <section>
      <TitleCongrats />
      <ImageEmotions />
      {/* Mostrar el mensaje de receta desbloqueada */}
      <UnlockedMessage recipeName={recentRecipe.name} />
      <MealPlanPhrase />
      {/* Mostrar el nombre de la receta y la imagen */}
      <NameRecipe recipeName={recentRecipe.name} recipeImage={recentRecipe.image} />
    </section>
  );
}

export default Congratulation;
