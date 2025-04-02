import { useState } from 'react';
import './App.css';
import Welcome from './mainPages/Recipes/Pages/WelcomeRecipes/Welcome';
import PlanCreate from './mainPages/Recipes/Pages/PlanCreate/PlanCreate';
import Congratulation from './mainPages/Recipes/Pages/Congratulation/Congratulation';

function App() {
	return (
		<div className='App'>
			{/* <Welcome /> */}
			{/* <PlanCreate /> */}
			<Congratulation />
		</div>
	);
}

export default App;
