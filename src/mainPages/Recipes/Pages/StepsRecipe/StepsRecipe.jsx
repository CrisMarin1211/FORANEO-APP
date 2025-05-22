import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TitleMealTime from "../../Components/6.DetailsRecipes/TitleMealTime/TitleMealTime";
import CardImageRecipes from "../../Components/6.DetailsRecipes/CardImageRecipes/CardImageRecipes";
import IngredientsRecipes from "../../Components/6.DetailsRecipes/IngredientsRecipes/IngredientsRecipes";
import Steps from "../../Components/steps/steps";
import { ChevronLeft } from "lucide-react";
import Menu from "../../../Planner/components/navBar/navBar";
import "./StepsRecipe.css";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../../../../services/firebaseConfig";

function StepsRecipe() {
  const { day, mealTime, recipeName } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredientPrices, setIngredientPrices] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedPlans = JSON.parse(localStorage.getItem("weeklyPlan")) || [];
    const selectedDayPlan = storedPlans.find((plan) => plan.day === day);

    if (selectedDayPlan) {
      const mealPlan = selectedDayPlan[mealTime.toLowerCase()];
      if (mealPlan && mealPlan.name === recipeName) {
        setRecipe(mealPlan);
      } else {
        console.error("Recipe not found:", recipeName);
      }
    } else {
      console.error("No plan found for the day:", day);
    }

    const storedPrices =
      JSON.parse(localStorage.getItem("ingredientPrices")) || {};
    setIngredientPrices(storedPrices);
  }, [day, mealTime, recipeName]);

  if (!recipe) return <section>Loading...</section>;

  const handleGoBack = () => {
    navigate("/weeklyplan");
  };

  const handleFinish = async () => {
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
      image: recipe.image,
    };

    const completedRecipes =
      JSON.parse(localStorage.getItem("completedRecipes")) || [];
    completedRecipes.push(completedRecipe);
    localStorage.setItem("completedRecipes", JSON.stringify(completedRecipes));


    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);
      try {
        await updateDoc(userRef, {
          completedRecipes: arrayUnion(completedRecipe),
        });
      } catch (error) {
        console.error("Error saving completed recipe to Firebase:", error);
      }
    }


    navigate("/congratulation");
  };

  return (
    <section>
      <ChevronLeft className="button-chevro2" onClick={handleGoBack} />

      <TitleMealTime mealTime={mealTime} />
      <CardImageRecipes
        name={recipe.name}
        image={recipe.image}
        description={recipe.description}
      />
      <IngredientsRecipes ingredients={recipe.ingredients} />

      <section className="stepscont">
      <Steps steps={recipe.steps} />
      </section>


      <button className="finish-button" onClick={handleFinish}>
        Finish
      </button>

      <section className="sspaceiwi"></section>
      <section className="menuconnttainer">
        <Menu />
      </section>
    </section>
  );
}

export default StepsRecipe;
