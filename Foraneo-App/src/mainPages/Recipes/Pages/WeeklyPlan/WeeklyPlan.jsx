import React, { useEffect, useState } from 'react';
import Title from '../../Components/TitleWelcome/TitleWelcome';
import TakeLook from '../../Components/2.MyWeeklyPlan/TakeLook/TakeLook';
import CardsPlans from '../../Components/2.MyWeeklyPlan/CardsPlans/CardsPlans';
import TitlePlanToday from '../../Components/2.MyWeeklyPlan/TitlePlanToday/TitlePlanToday';
import DateDay from '../../Components/2.MyWeeklyPlan/DateDay/DateDay';
import CardsRecipe from '../../Components/CardsRecipe/CardsRecipe';
import ContainerAdjustPlan from '../../Components/2.MyWeeklyPlan/ContainerAdjustPlan/ContainerAdjustPlan';
import './WeeklyPlan.css';
import Menu from '../../../Planner/components/navBar/navBar';

function WeeklyPlan() {
	const [plans, setPlans] = useState([]);
	const [todaysPlan, setTodaysPlan] = useState(null);

	const getCurrentDay = () => {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const today = new Date();
		return days[today.getDay()];
	};

	const getCurrentDate = () => {
		const options = { weekday: 'long', month: 'long', day: 'numeric' };
		return new Date().toLocaleDateString('en-US', options);
	};

	useEffect(() => {
		const storedPlans = localStorage.getItem('weeklyPlan');
		if (storedPlans) {
			const parsedPlans = JSON.parse(storedPlans);
			setPlans(parsedPlans);

			const currentDay = getCurrentDay();
			const todayPlan = parsedPlans.find((plan) => plan.day === currentDay);
			if (todayPlan) {
				setTodaysPlan(todayPlan);
			} else {
				setTodaysPlan(null);
			}
		} else {
			console.error('No plans found in localStorage.');
		}
	}, []);

	return (
		<section className='weekly-plan-container'>
			<Title />
			<section className='plan-header'>
				<TakeLook />
			</section>

			<section className='week-preview-cards'>{plans.length > 0 && <CardsPlans plans={plans} />}</section>

			<ContainerAdjustPlan />
			<TitlePlanToday />

			<DateDay currentDate={getCurrentDate()} />


{todaysPlan ? (
	<section className='today-meals-container'>
		{todaysPlan.breakfast && (
			<CardsRecipe
				mealTime='Breakfast'
				recipe={{
					name: todaysPlan.breakfast.name,
					description: todaysPlan.breakfast.description || 'Perfect to start your day!',
					image: todaysPlan.breakfast.image || 'default-breakfast.jpg',
				}}
				day={getCurrentDay()}  // Pasamos el día aquí
			/>
		)}

		{todaysPlan.lunch && (
			<CardsRecipe
				mealTime='Lunch'
				recipe={{
					name: todaysPlan.lunch.name,
					description: todaysPlan.lunch.description || 'Energize your afternoon!',
					image: todaysPlan.lunch.image || 'default-lunch.jpg',
				}}
				day={getCurrentDay()}  // Pasamos el día aquí
			/>
		)}

		{todaysPlan.dinner && (
			<CardsRecipe
				mealTime='Dinner'
				recipe={{
					name: todaysPlan.dinner.name,
					description: todaysPlan.dinner.description || 'End your day deliciously!',
					image: todaysPlan.dinner.image || 'default-dinner.jpg',
				}}
				day={getCurrentDay()}  // Pasamos el día aquí
			/>
		)}
	</section>
) : (
	<p className='no-plan-message'>No meal plan found for today. Create one by clicking "Edit your Plan".</p>
)}


			<section className='spaceiwi'></section>

			<Menu style={{marginleft: "200px"}} className='menucontainerr'></Menu>

		</section>
	);
}

export default WeeklyPlan;
