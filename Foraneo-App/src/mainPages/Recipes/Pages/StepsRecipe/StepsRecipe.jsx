import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TitleMealTime from '../../Components/6.DetailsRecipes/TitleMealTime/TitleMealTime';
import CardImageRecipes from '../../Components/6.DetailsRecipes/CardImageRecipes/CardImageRecipes';
import IngredientsRecipes from '../../Components/6.DetailsRecipes/IngredientsRecipes/IngredientsRecipes';
import Steps from '../../Components/steps/steps';
import { ChevronLeft } from 'lucide-react';
import Menu from '../../../Planner/components/navBar/navBar';
import './StepsRecipe.css';

function StepsRecipe() {
  const { day, mealTime, recipeName } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredientPrices, setIngredientPrices] = useState({});
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

    // Obtener los precios de los ingredientes desde el localStorage
    const storedPrices = JSON.parse(localStorage.getItem('ingredientPrices')) || {};
    setIngredientPrices(storedPrices);
  }, [day, mealTime, recipeName]);

  if (!recipe) return <div>Loading...</div>;

  const handleGoBack = () => {
    navigate('/weeklyplan');
  };

const handleFinish = () => {
  // Crear un objeto con toda la información de la receta y los precios
  const completedRecipe = {
    name: recipe.name,
    description: recipe.description,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    ingredientPrices: ingredientPrices,
    totalCost: recipe.ingredients.reduce((total, ingredient) => {
      const price = parseFloat(ingredientPrices[ingredient]) || 0;
      return total + price;
    }, 0),
    image: recipe.image, // Asegúrate de incluir la imagen aquí
  };

  // Guardar el objeto con la receta completa en el localStorage
  localStorage.setItem('completedRecipe', JSON.stringify(completedRecipe));

  // Redirigir a la página de congratulaciones
  navigate('/congratulation');
};


  return (
    <section>
      <ChevronLeft className='button-chevro2' onClick={handleGoBack} />

      <TitleMealTime mealTime={mealTime} />
      <CardImageRecipes name={recipe.name} image={recipe.image} description={recipe.description} />
      <IngredientsRecipes ingredients={recipe.ingredients} />

      {/* Agregar el componente Steps para mostrar los pasos de la receta */}
      <Steps steps={recipe.steps} />

      {/* Botón de Finish para guardar y redirigir */}
      <button className="finish-button" onClick={handleFinish}>
        Finish
      </button>

      <section className='spaceiwi'></section>
      <section className='menuconnttainer'>
        <Menu />
      </section>
    </section>
  );
}

export default StepsRecipe;
