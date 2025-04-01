import React from 'react';
import TitleBuild from '../../Components/1.CreateYourPlan/TitleBuild/TitleBuild';
import BudgetInput from '../../Components/1.CreateYourPlan/BudgetInput/BudgetInput';
import FoodTypeSelector from '../../Components/1.CreateYourPlan/FoodTypeSelector/FoodTypeSelector';
import IngredientsList from '../../Components/1.CreateYourPlan/IngredientsList/IngredientsList';
import DaySelectorCook from '../../Components/1.CreateYourPlan/DaySelectorCook/DaySelectorCook';
import ButtonCreatePlan from '../../Components/ButtonCreatePlan/ButtonCreatePlan';
import './PlanCreate.css';

function PlanCreate() {
	return (
		<div className='plan-container'>
			<TitleBuild />
			<BudgetInput />
			<FoodTypeSelector />
			<IngredientsList />
			<DaySelectorCook />
			<ButtonCreatePlan />
		</div>
	);
}

export default PlanCreate;
