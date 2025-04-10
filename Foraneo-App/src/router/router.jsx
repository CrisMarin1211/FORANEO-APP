import { Routes, Route } from 'react-router-dom';
import { WelcomeView } from '../mainPages/export';
import { PlanCreateView } from '../mainPages/export';
import { WeeklyPlanView } from '../mainPages/export';
import { EditRecipeView } from '../mainPages/export';
import { UnlockedRecipesView } from '../mainPages/export';
import { RecipeDetailView } from '../mainPages/export';
import { CongratulationView } from '../mainPages/export';

import {
	SignInView,
	LogInView,
	MainView,
	FinancesView,
	AddView,
	EmotionTrackerView,
	CalendarPageView,
	ToDoPageView,
} from '../mainPages/export';

function Router() {
	return (
		<Routes>
			<Route path='/plancreate' element={<PlanCreateView />} />
			<Route path='/weeklyplan' element={<WeeklyPlanView />} />
			<Route path='/editrecipe/:day' element={<EditRecipeView />} />
			<Route path='/unlockedrecipes/:day/:mealTime' element={<UnlockedRecipesView />} />
			<Route path='/recipedetail/:day/:mealTime/:recipeName' element={<RecipeDetailView />} />
			<Route path='/congratulation' element={<CongratulationView />} />
			<Route path='/' element={<SignInView />} />
			<Route path='/login' element={<LogInView />} />
			<Route path='/main' element={<MainView />} />
			<Route path='/finances' element={<FinancesView />} />
			<Route path='/add' element={<AddView />} />
			<Route path='/emotions' element={<EmotionTrackerView />} />
			<Route path='/calendar' element={<CalendarPageView />} />
			<Route path='/to-do' element={<ToDoPageView />} />
		</Routes>
	);
}

export default Router;
