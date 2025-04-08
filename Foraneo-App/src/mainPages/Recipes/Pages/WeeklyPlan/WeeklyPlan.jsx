import React, { useEffect, useState } from 'react';
import Title from '../../Components/TitleWelcome/TitleWelcome';
import TakeLook from '../../Components/2.MyWeeklyPlan/TakeLook/TakeLook';
import ButtonViewAll from '../../Components/2.MyWeeklyPlan/ButtonViewAll/ButtonViewAll';
import CardsPlans from '../../Components/2.MyWeeklyPlan/CardsPlans/CardsPlans';
import ButtonEditPlan from '../../Components/2.MyWeeklyPlan/ButtonEditPlan/ButtonEditPlan';
import TitlePlanToday from '../../Components/2.MyWeeklyPlan/TitlePlanToday/TitlePlanToday';
import DateDay from '../../Components/2.MyWeeklyPlan/DateDay/DateDay';
import CardsRecipe from '../../Components/CardsRecipe/CardsRecipe';
import './WeeklyPlan.css';

function WeeklyPlan() {
	const [plans, setPlans] = useState([]);
	const [todaysPlan, setTodaysPlan] = useState(null);

	// Get current day of the week
	const getCurrentDay = () => {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const today = new Date();
		return days[today.getDay()];
	};

	// Get current date in format "Day, Month DD" (e.g., "Tuesday, March 13")
	const getCurrentDate = () => {
		const options = { weekday: 'long', month: 'long', day: 'numeric' };
		return new Date().toLocaleDateString('en-US', options);
	};

	useEffect(() => {
		// Get plans from localStorage when component mounts
		const storedPlans = localStorage.getItem('weeklyPlan');
		if (storedPlans) {
			const parsedPlans = JSON.parse(storedPlans);
			setPlans(parsedPlans);

			// Find today's plan
			const currentDay = getCurrentDay();
			const todayPlan = parsedPlans.find((plan) => plan.day === currentDay);
			setTodaysPlan(todayPlan);
		}
	}, []);

	return (
		<section className='weekly-plan-container'>
			<Title />
			<section className='plan-header'>
				<TakeLook />
				<ButtonViewAll />
			</section>

			{/* Display horizontal cards for the week */}
			<div className='week-preview-cards'>{plans.length > 0 && <CardsPlans plans={plans} />}</div>

			<ButtonEditPlan />
			<TitlePlanToday />

			{/* Show current date */}
			<DateDay currentDate={getCurrentDate()} />

			{/* Today's meal cards */}
			{todaysPlan ? (
				<div className='today-meals-container'>
					{/* Breakfast Card */}
					{todaysPlan.breakfast && (
						<CardsRecipe
							mealTime='Breakfast'
							recipe={{
								name: todaysPlan.breakfast.name,
								description: todaysPlan.breakfast.description || 'Perfect to start your day!',
								image: todaysPlan.breakfast.image || 'default-breakfast.jpg',
							}}
						/>
					)}

					{/* Lunch Card */}
					{todaysPlan.lunch && (
						<CardsRecipe
							mealTime='Lunch'
							recipe={{
								name: todaysPlan.lunch.name,
								description: todaysPlan.lunch.description || 'Energize your afternoon!',
								image: todaysPlan.lunch.image || 'default-lunch.jpg',
							}}
						/>
					)}

					{/* Dinner Card */}
					{todaysPlan.dinner && (
						<CardsRecipe
							mealTime='Dinner'
							recipe={{
								name: todaysPlan.dinner.name,
								description: todaysPlan.dinner.description || 'End your day deliciously!',
								image: todaysPlan.dinner.image || 'default-dinner.jpg',
							}}
						/>
					)}
				</div>
			) : (
				<p className='no-plan-message'>No meal plan found for today. Create one by clicking "Edit your Plan".</p>
			)}
		</section>
	);
}

export default WeeklyPlan;
