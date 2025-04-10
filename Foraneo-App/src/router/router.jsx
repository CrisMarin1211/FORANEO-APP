import { Routes, Route } from 'react-router-dom';
import { WelcomeView } from '../mainPages/export';
import { PlanCreateView } from '../mainPages/export';
import { WeeklyPlanView } from '../mainPages/export';
import { EditRecipeView } from '../mainPages/export';
import { UnlockedRecipesView } from '../mainPages/export';
import { RecipeDetailView } from '../mainPages/export';
import { CongratulationView } from '../mainPages/export';

function Router() {
	return (
		<Routes>
			<Route path='/' element={<WelcomeView />} />
			<Route path='/plancreate' element={<PlanCreateView />} />
			<Route path='/weeklyplan' element={<WeeklyPlanView />} />
			<Route path='/editrecipe/:day' element={<EditRecipeView />} />
			<Route path='/unlockedrecipes/:day/:mealTime' element={<UnlockedRecipesView />} />
			<Route path='/recipedetail/:day/:mealTime/:recipeName' element={<RecipeDetailView />} />
			<Route path='/congratulation' element={<CongratulationView />} />
		</Routes>
	);
}

export default Router;
