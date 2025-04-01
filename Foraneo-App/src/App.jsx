import { useState } from 'react';
import './App.css';
// import Welcome from './Recipes/Pages/WelcomeRecipes/Welcome';
import PlanCreate from './Recipes/Pages/PlanCreate/PlanCreate';

function App() {
	return (
		<div className='App'>
			{/* <Welcome /> */}
			<PlanCreate />
		</div>
	);
}

export default App;
