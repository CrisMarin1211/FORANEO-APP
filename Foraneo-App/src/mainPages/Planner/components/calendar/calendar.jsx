import React, { useEffect, useState } from 'react';
import './calendar.css';
import { faces } from '../../data/imagesData';

const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const Calendar = () => {
	const [year, setYear] = useState(2025);
	const [month, setMonth] = useState(new Date().getMonth());
	const [moodData, setMoodData] = useState({});

	useEffect(() => {
		const stored = JSON.parse(localStorage.getItem('day-feedbacks')) || {};
		setMoodData(stored);
	}, []);

	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const calendarDays = [];
	for (let i = 0; i < firstDay; i++) {
		calendarDays.push(null);
	}

	for (let i = 1; i <= daysInMonth; i++) {
		calendarDays.push(i);
	}

	const prevMonth = () => setMonth((prev) => (prev === 0 ? 11 : prev - 1));
	const nextMonth = () => setMonth((prev) => (prev === 11 ? 0 : prev + 1));
	const prevYear = () => setYear((prev) => prev - 1);
	const nextYear = () => setYear((prev) => prev - 1);

	return (
		<>
			<section className='calendar-container'>
				<h2 className='calendar-title'>Mood Tracker</h2>
				<div className='calendar-controls'>
					<button onClick={prevYear}>⏮ Año</button>
					<button onClick={prevMonth}>◀</button>
					<span>
						{new Date(year, month).toLocaleString('es-ES', { month: 'long' })}
						{year}
					</span>
					<button onClick={nextMonth}>▶</button>
					<button onClick={nextYear}>Año ⏭</button>
				</div>
				<div className='calendar-grid'>
					{daysOfWeek.map((day) => (
						<div key={day} className='calendar-day-header'>
							{day}
						</div>
					))}
					{calendarDays.map((day, index) => {
						if (!day) return <div key={index} className='calendar-day'></div>;

						const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
						const moodLabel = moodData[dateKey];
						const face = faces.find((f) => f.label === moodLabel);

						return (
							<div key={index} className='calendar-day'>
								<div className='calendar-item'>
									<svg className='calendar-svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 43 43'>
										<path d='M41.7308 21.2343V21.2638L41.7322 21.2933C42.1818 30.8026 33.9683 40.0517 20.852 41.6369C15.2399 42.3151 10.3793 39.8815 6.87135 35.7868C3.35762 31.6854 1.26126 25.9705 1.25005 20.2962C1.72753 13.9325 4.06198 8.97369 7.51137 5.72751C10.9605 2.48154 15.6092 0.865123 20.893 1.3278L20.9474 1.33256H21.002C31.6356 1.33256 41.7308 10.0582 41.7308 21.2343Z' />
									</svg>
									{face && <img src={face.src} alt={moodLabel} className='calendar-mood-img' />}
									<span className='calendar-day-number'>{day}</span>
								</div>
							</div>
						);
					})}
				</div>
			</section>
		</>
	);
};

export default Calendar;
