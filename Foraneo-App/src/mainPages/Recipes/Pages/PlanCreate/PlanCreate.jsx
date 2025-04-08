import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import TitleBuild from '../../Components/1.CreateYourPlan/TitleBuild/TitleBuild';
import BudgetInput from '../../Components/1.CreateYourPlan/BudgetInput/BudgetInput';
import FoodTypeSelector from '../../Components/1.CreateYourPlan/FoodTypeSelector/FoodTypeSelector';
import IngredientsList from '../../Components/1.CreateYourPlan/IngredientsList/IngredientsList';
import DaySelectorCook from '../../Components/1.CreateYourPlan/DaySelectorCook/DaySelectorCook';
import ButtonCreatePlan from '../../Components/ButtonCreatePlan/ButtonCreatePlan';
import BreakfastBowls from '../../Data/BreakfastBowls';
import LunchBowls from '../../Data/LunchBowls';
import DinnerBowls from '../../Data/DinnerBowls';
import './PlanCreate.css';

function PlanCreate() {
	const [budget, setBudget] = useState('');
	const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);
	const [selectedDays, setSelectedDays] = useState([]);
	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const [plans, setPlans] = useState([]);

	const navigate = useNavigate();

	const getRandomRecipe = (recipes) => recipes[Math.floor(Math.random() * recipes.length)];

	const handleCreatePlan = () => {
		if (!budget || selectedFoodTypes.length === 0 || selectedDays.length === 0 || selectedIngredients.length === 0) {
			alert('Please complete all fields before creating the plan.');
			return;
		}

		const newPlan = selectedDays.map((day) => ({
			day,
			breakfast: getRandomRecipe(BreakfastBowls),
			lunch: getRandomRecipe(LunchBowls),
			dinner: getRandomRecipe(DinnerBowls),
		}));

		setPlans(newPlan);
		alert('Plan created successfully!');
		console.log('Weekly plan:', newPlan);

		localStorage.setItem('weeklyPlan', JSON.stringify(newPlan));

		navigate('/weeklyplan');
	};

	return (
		<div className='plan-container'>
			<TitleBuild />
			<BudgetInput budget={budget} setBudget={setBudget} />
			<FoodTypeSelector selectedFoodTypes={selectedFoodTypes} setSelectedFoodTypes={setSelectedFoodTypes} />
			<IngredientsList selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} />
			<DaySelectorCook selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
			<ButtonCreatePlan onClick={handleCreatePlan} />
		</div>
	);
}

export default PlanCreate;
