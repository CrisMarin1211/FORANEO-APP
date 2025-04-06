import { useState } from 'react';
import './App.css';
import Welcome from './mainPages/Recipes/Pages/WelcomeRecipes/Welcome';
import PlanCreate from './mainPages/Recipes/Pages/PlanCreate/PlanCreate';
import Congratulation from './mainPages/Recipes/Pages/Congratulation/Congratulation';
import WeeklyPlan from './mainPages/Recipes/Pages/WeeklyPlan/WeeklyPlan';

function App() {
	return (
		<section className='App'>
			{/* <Welcome /> */}
			{/* <PlanCreate /> */}
			{/* <Congratulation /> */}
			<WeeklyPlan />
		</section>
	);
}

export default App;
