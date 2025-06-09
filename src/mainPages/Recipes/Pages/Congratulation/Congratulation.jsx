import React, { useEffect, useState } from 'react';
import TitleCongrats from '../../Components/3.CongratsPlan/TitleCongrats/TitleCongrats';
import ImageEmotions from '../../Components/3.CongratsPlan/ImageEmotions/ImageEmotions';
import UnlockedMessage from '../../Components/3.CongratsPlan/UnlockedMessage/UnlockedMessage';
import MealPlanPhrase from '../../Components/3.CongratsPlan/MealPlanPhrase/MealPlanPhrase';
import NameRecipe from '../../Components/3.CongratsPlan/NameRecipe/NameRecipe';
import './Congratulation.css'
import Menu from '../../../Planner/components/navBar/navBar';
import { Button } from 'antd';

function Congratulation() {
  const [completedRecipes, setCompletedRecipes] = useState(null);

  useEffect(() => {
  
    const savedRecipes = JSON.parse(localStorage.getItem('completedRecipes')) || [];
    if (savedRecipes.length > 0) {
      setCompletedRecipes(savedRecipes);
    }
  }, []);

  if (!completedRecipes || completedRecipes.length === 0) {
    return <section>Loading...</section>;
  }


  const recentRecipe = completedRecipes[completedRecipes.length - 1];

  return (
    <section className='CongratsContainerPage '>
      <section className='leftCongrats'>
      <TitleCongrats />
      <ImageEmotions />

      <section className='unlockedmessageee'>
      <UnlockedMessage recipeName={recentRecipe.name} />
      <MealPlanPhrase />
      </section>
      </section>

    <section className='rightCongrats'>
      <NameRecipe recipeName={recentRecipe.name} recipeImage={recentRecipe.image} />
      <section className='spaceesp'></section>
     </section>

      <Menu></Menu>

    </section>
  );
}

export default Congratulation;
