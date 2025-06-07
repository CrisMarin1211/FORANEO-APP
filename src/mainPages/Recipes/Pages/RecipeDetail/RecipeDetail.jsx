import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TitleMealTime from '../../Components/6.DetailsRecipes/TitleMealTime/TitleMealTime';
import CardImageRecipes from '../../Components/6.DetailsRecipes/CardImageRecipes/CardImageRecipes';
import IngredientsRecipes from '../../Components/6.DetailsRecipes/IngredientsRecipes/IngredientsRecipes';
import ButtonLetsCook from '../../Components/ButtonLetsCook/ButtonLetsCook';
import { ChevronLeft } from 'lucide-react';
import Menu from '../../../Planner/components/navBar/navBar';
import IngredientPriceInput from '../../Components/6.DetailsRecipes/IngredientPrice/IngredientPrice';
import './RecipeDetail.css';

function RecipeDetail() {
  const { day, mealTime, recipeName } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [showPriceInput, setShowPriceInput] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPlans = JSON.parse(localStorage.getItem('weeklyPlan')) || [];
    const selectedDayPlan = storedPlans.find((plan) => plan.day === day);

    if (selectedDayPlan) {
      const mealPlan = selectedDayPlan[mealTime.toLowerCase()];
      if (mealPlan && mealPlan.name === recipeName) {
        setRecipe(mealPlan);
      } else {
        console.error('Recipe not found:', recipeName);
      }
    } else {
      console.error('No plan found for the day:', day);
    }
  }, [day, mealTime, recipeName]);

  if (!recipe) return <section>Loading...</section>;

  const handleGoBack = () => {
    navigate('/weeklyplan');
  };

  const handleLetsCookClick = () => {
    setShowPriceInput(true); // Mostrar los inputs cuando se haga clic en "Let's Cook"
  };



return (
  <section>
    <section className='leftside'>
    <ChevronLeft className='button-chevro2' onClick={handleGoBack} />

    <TitleMealTime mealTime={mealTime} />
    <CardImageRecipes name={recipe.name} image={recipe.image} description={recipe.description} />
    <IngredientsRecipes ingredients={recipe.ingredients} />

    
    {!showPriceInput && <ButtonLetsCook onClick={handleLetsCookClick} />}
</section>
    <section className='rightside'>
    {showPriceInput && (
      <section className='ingredient-price-inputSection'>
      <IngredientPriceInput
        ingredients={recipe.ingredients}
        day={day}
        mealTime={mealTime}
        recipeName={recipeName}
      />
      </section>
    )}

    </section>

    <section className='sapaceiwi'></section>
    <section className='menuconnttainer'>
      <Menu />
    </section>
  </section>
);

}

export default RecipeDetail;
