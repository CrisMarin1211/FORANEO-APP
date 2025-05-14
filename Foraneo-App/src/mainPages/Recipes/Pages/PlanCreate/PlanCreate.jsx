import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWeeklyPlan } from "../../../../redux/recipes/recipesSlice";
import { saveWeeklyPlanToFirestore } from "../../../../services/firebaseUtils";
import TitleBuild from "../../Components/1.CreateYourPlan/TitleBuild/TitleBuild";
import BudgetInput from "../../Components/1.CreateYourPlan/BudgetInput/BudgetInput";
import FoodTypeSelector from "../../Components/1.CreateYourPlan/FoodTypeSelector/FoodTypeSelector";
import IngredientsList from "../../Components/1.CreateYourPlan/IngredientsList/IngredientsList";
import DaySelectorCook from "../../Components/1.CreateYourPlan/DaySelectorCook/DaySelectorCook";
import ButtonCreatePlan from "../../Components/ButtonCreatePlan/ButtonCreatePlan";
import { getAllRecipes } from "../../../../services/recipesFirebase";
import "./PlanCreate.css";
import Menu from "../../../Planner/components/navBar/navBar";

function PlanCreate() {
  const [budget, setBudget] = useState("");
  const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [plans, setPlans] = useState([]);


  const [breakfastBowls, setBreakfastBowls] = useState([]);
  const [lunchBowls, setLunchBowls] = useState([]);
  const [dinnerBowls, setDinnerBowls] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoadingRecipes(true);
      const { breakfast, lunch, dinner } = await getAllRecipes();
      setBreakfastBowls(breakfast);
      setLunchBowls(lunch);
      setDinnerBowls(dinner);
      setLoadingRecipes(false);
    };
    fetchRecipes();
  }, []);

  const filterRecipesByTags = (recipes, selectedFoodTypes) => {
    return recipes.filter((recipe) => {
      const tags = recipe.tags || [];
      return selectedFoodTypes.every((type) => tags.includes(type));
    });
  };

  const getRandomRecipe = (recipes) => {
    if (recipes.length > 0) {
      return recipes[Math.floor(Math.random() * recipes.length)];
    } else {
      return {
        name: "No recipe available",
        price: 0,
        image: "",
        description: "",
        tags: [],
      };
    }
  };

  const checkIncompatibleFilters = (selectedFoodTypes) => {
    const incompatibleCombos = [
      ["Seafood", "Vegetarian"],
      ["Meat & Grill", "Vegetarian"],
      ["Meat & Grill", "Vegan"],
      ["Seafood", "Vegan"],
    ];
    for (const combo of incompatibleCombos) {
      if (combo.every((type) => selectedFoodTypes.includes(type))) {
        return true;
      }
    }
    return false;
  };

  const handleCreatePlan = async () => {
    if (
      !budget ||
      selectedFoodTypes.length === 0 ||
      selectedDays.length === 0 ||
      selectedIngredients.length === 0
    ) {
      alert("Please complete all fields before creating the plan.");
      return;
    }
    if (checkIncompatibleFilters(selectedFoodTypes)) {
      alert(
        "The selected food types are incompatible. Please choose different options."
      );
      return;
    }
    if (loadingRecipes) {
      alert("Las recetas aún se están cargando. Por favor espera.");
      return;
    }
    const numericBudget = parseInt(budget.replace(/\D/g, ""), 10);
    const newPlan = selectedDays.map((day) => {
      let filteredBreakfast = filterRecipesByTags(
        breakfastBowls,
        selectedFoodTypes
      );
      let breakfastRecipe =
        filteredBreakfast.length > 0
          ? getRandomRecipe(filteredBreakfast)
          : getRandomRecipe(breakfastBowls);
      const filteredLunch = filterRecipesByTags(lunchBowls, selectedFoodTypes);
      const filteredDinner = filterRecipesByTags(
        dinnerBowls,
        selectedFoodTypes
      );
      const lunchRecipe =
        filteredLunch.length > 0
          ? getRandomRecipe(filteredLunch)
          : getRandomRecipe(lunchBowls);
      const dinnerRecipe =
        filteredDinner.length > 0
          ? getRandomRecipe(filteredDinner)
          : getRandomRecipe(dinnerBowls);
      return {
        day,
        breakfast: breakfastRecipe,
        lunch: lunchRecipe,
        dinner: dinnerRecipe,
      };
    });
    let totalCost = 0;
    newPlan.forEach((dayPlan) => {
      const dayCost =
        dayPlan.breakfast.price + dayPlan.lunch.price + dayPlan.dinner.price;
      totalCost += dayCost;
    });
    setPlans(newPlan);
    dispatch(setWeeklyPlan(newPlan));
    await saveWeeklyPlanToFirestore(newPlan);
    localStorage.setItem("weeklyPlan", JSON.stringify(newPlan));
    navigate("/weeklyplan");
  };

  if (loadingRecipes) {
    return <div>Cargando recetas...</div>;
  }

  return (
    <section className="plan-container">
      <TitleBuild />
      <BudgetInput budget={budget} setBudget={setBudget} />
      <FoodTypeSelector
        selectedFoodTypes={selectedFoodTypes}
        setSelectedFoodTypes={setSelectedFoodTypes}
      />
      <IngredientsList
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
      <DaySelectorCook
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
      <ButtonCreatePlan onClick={handleCreatePlan} />
      <section className="menusectionplan">
        <Menu />
      </section>
    </section>
  );
}

export default PlanCreate;
