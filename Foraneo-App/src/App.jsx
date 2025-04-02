import { useState } from 'react';
import './App.css';
import Welcome from './Recipes/Pages/WelcomeRecipes/Welcome';
import PlanCreate from './Recipes/Pages/PlanCreate/PlanCreate';
import Congratulations from './Recipes/Pages/Congratulation/Congratulation';

function App() {
	return (
		<div className='App'>
			{/* <Welcome /> */}
			{/* <PlanCreate /> */}
			<Congratulations />
		</div>
	);
}

export default App;
