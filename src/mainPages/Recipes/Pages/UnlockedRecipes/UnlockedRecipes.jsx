import React, { useState, useEffect } from "react";
import TitleEditBLD from "../../Components/5.UnlockedFoods/TitleEditBLD/TitleEditBLD";
import "./UnlockedRecipes.css";
import { useParams, useNavigate } from "react-router-dom";
import CardsEditRecipes from "../../Components/4.MyEditRecipe/CardsEditRecipes/CardsEditRecipes";
import TitleUnlockedFoods from "../../Components/5.UnlockedFoods/TitleUnlockedFoods/TitleUnlockedFoods";
import { ChevronLeft } from "lucide-react";
import Menu from "../../../Planner/components/navBar/navBar";
import CardsUnlocked from "../../Components/5.UnlockedFoods/CardsUnlocked/CardsUnlocked";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../../services/firebaseConfig";
import { useDispatch } from "react-redux";
import { setWeeklyPlan } from "../../../../redux/recipes/recipesSlice";
import { saveWeeklyPlanToFirestore } from "../../../../services/firebaseUtils";

function UnlockedRecipes() {
  const { day, mealTime } = useParams();
  const [recipes, setRecipes] = useState(null);
  const [completedRecipes, setCompletedRecipes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    const storedPlans = JSON.parse(localStorage.getItem("weeklyPlan"));
    if (storedPlans) {
      const selectedDayPlan = storedPlans.find((plan) => plan.day === day);
      if (selectedDayPlan) {
        setRecipes(selectedDayPlan);
      }
    }


    const fetchCompletedRecipes = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const userRef = doc(db, "users", userId);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setCompletedRecipes(userData.completedRecipes || []);
        } else {
          setCompletedRecipes([]);
        }
      } else {

        const completedRecipes =
          JSON.parse(localStorage.getItem("completedRecipes")) || [];
        setCompletedRecipes(completedRecipes);
      }
    };
    fetchCompletedRecipes();
  }, [day]);

  if (!recipes) return <section>Loading...</section>;

  const getIngredients = (recipe) => {
    if (recipe.ingredients) return recipe.ingredients;
    return [];
  };

  const handleGoBack = () => {
    navigate(`/editrecipe/${day}`);
  };

  const handleAddRecipe = (newRecipe) => {

    const storedPlans = JSON.parse(localStorage.getItem("weeklyPlan")) || [];
    const selectedDayPlan = storedPlans.find((plan) => plan.day === day);

    if (selectedDayPlan) {
      if (mealTime === "Breakfast") {
        selectedDayPlan.breakfast = newRecipe;
      } else if (mealTime === "Lunch") {
        selectedDayPlan.lunch = newRecipe;
      } else if (mealTime === "Dinner") {
        selectedDayPlan.dinner = newRecipe;
      }
      localStorage.setItem("weeklyPlan", JSON.stringify(storedPlans));
    }


    dispatch(setWeeklyPlan(storedPlans));


    saveWeeklyPlanToFirestore(storedPlans);

    navigate(`/editrecipe/${day}`);
  };

  return (
    <section>
      <button className="button-chevro1" onClick={handleGoBack}>
        <ChevronLeft />
      </button>

      <TitleEditBLD day={day} mealTime={mealTime} />


      {mealTime === "Breakfast" && recipes.breakfast && (
        <CardsEditRecipes
          mealTime="Breakfast"
          recipe={{
            name: recipes.breakfast.name,
            description:
              recipes.breakfast.description || "Perfect to start your day!",
            image: recipes.breakfast.image || "default-breakfast.jpg",
            ingredients: getIngredients(recipes.breakfast),
          }}
          day={day}
          showPencil={false}
        />
      )}

      {mealTime === "Lunch" && recipes.lunch && (
        <CardsEditRecipes
          mealTime="Lunch"
          recipe={{
            name: recipes.lunch.name,
            description:
              recipes.lunch.description || "Energize your afternoon!",
            image: recipes.lunch.image || "default-lunch.jpg",
            ingredients: getIngredients(recipes.lunch),
          }}
          day={day}
          showPencil={false}
        />
      )}

      {mealTime === "Dinner" && recipes.dinner && (
        <CardsEditRecipes
          mealTime="Dinner"
          recipe={{
            name: recipes.dinner.name,
            description:
              recipes.dinner.description || "End your day deliciously!",
            image: recipes.dinner.image || "default-dinner.jpg",
            ingredients: getIngredients(recipes.dinner),
          }}
          day={day}
          showPencil={false}
        />
      )}

      <TitleUnlockedFoods />


      <section>
        {completedRecipes.map((recipe, index) => (
          <CardsUnlocked
            key={index}
            recipe={recipe}
            onAddRecipe={handleAddRecipe}
          />
        ))}
      </section>

      <section className="spaceiwi"></section>
      <section className="menuconttainer">
        <Menu />
      </section>
    </section>
  );
}

export default UnlockedRecipes;
