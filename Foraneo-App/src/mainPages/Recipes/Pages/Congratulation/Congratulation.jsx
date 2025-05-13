import React, { useEffect, useState } from 'react';
import TitleCongrats from '../../Components/3.CongratsPlan/TitleCongrats/TitleCongrats';
import ImageEmotions from '../../Components/3.CongratsPlan/ImageEmotions/ImageEmotions';
import UnlockedMessage from '../../Components/3.CongratsPlan/UnlockedMessage/UnlockedMessage';
import MealPlanPhrase from '../../Components/3.CongratsPlan/MealPlanPhrase/MealPlanPhrase';
import NameRecipe from '../../Components/3.CongratsPlan/NameRecipe/NameRecipe';

function Congratulation() {
  const [completedRecipe, setCompletedRecipe] = useState(null);

  useEffect(() => {
    // Recuperar los datos de la receta completada desde localStorage
    const savedRecipe = JSON.parse(localStorage.getItem('completedRecipe'));
    if (savedRecipe) {
      setCompletedRecipe(savedRecipe);
    }
  }, []);

  if (!completedRecipe) return <div>Loading...</div>; // Mientras se carga la receta

  return (
    <section>
      <TitleCongrats />
      <ImageEmotions />
      {/* Mostrar el mensaje de receta desbloqueada */}
      <UnlockedMessage recipeName={completedRecipe.name} />
      <MealPlanPhrase />
      {/* Mostrar el nombre de la receta y la imagen */}
      <NameRecipe recipeName={completedRecipe.name} recipeImage={completedRecipe.image} />
    </section>
  );
}

export default Congratulation;
