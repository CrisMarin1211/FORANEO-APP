import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Accedemos al estado global de Redux
import { WelcomeView, PlanCreateView, WeeklyPlanView, EditRecipeView, UnlockedRecipesView, RecipeDetailView, CongratulationView } from '../mainPages/export';
import { SignInView, LogInView, MainView, FinancesView, AddView, EmotionTrackerView, CalendarPageView, ToDoPageView } from '../mainPages/export';
import ProtectedRoute from '../mainPages/ProtectedRoute.jsX';

function Router() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<SignInView />} />
      <Route path="/login" element={<LogInView />} />

      {/* Rutas protegidas */}
      <Route path="/main" element={
        <ProtectedRoute>
          <MainView />
        </ProtectedRoute>
      } />
      <Route path="/welcome" element={
        <ProtectedRoute>
          <WelcomeView />
        </ProtectedRoute>
      } />
      <Route path="/plancreate" element={
        <ProtectedRoute>
          <PlanCreateView />
        </ProtectedRoute>
      } />
      <Route path="/weeklyplan" element={
        <ProtectedRoute>
          <WeeklyPlanView />
        </ProtectedRoute>
      } />
      <Route path="/editrecipe/:day" element={
        <ProtectedRoute>
          <EditRecipeView />
        </ProtectedRoute>
      } />
      <Route path="/unlockedrecipes/:day/:mealTime" element={
        <ProtectedRoute>
          <UnlockedRecipesView />
        </ProtectedRoute>
      } />
      <Route path="/recipedetail/:day/:mealTime/:recipeName" element={
        <ProtectedRoute>
          <RecipeDetailView />
        </ProtectedRoute>
      } />
      <Route path="/congratulation" element={
        <ProtectedRoute>
          <CongratulationView />
        </ProtectedRoute>
      } />
      <Route path="/finances" element={
        <ProtectedRoute>
          <FinancesView />
        </ProtectedRoute>
      } />
      <Route path="/add" element={
        <ProtectedRoute>
          <AddView />
        </ProtectedRoute>
      } />
      <Route path="/emotions" element={
        <ProtectedRoute>
          <EmotionTrackerView />
        </ProtectedRoute>
      } />
      <Route path="/calendar" element={
        <ProtectedRoute>
          <CalendarPageView />
        </ProtectedRoute>
      } />
      <Route path="/to-do" element={
        <ProtectedRoute>
          <ToDoPageView />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default Router;
