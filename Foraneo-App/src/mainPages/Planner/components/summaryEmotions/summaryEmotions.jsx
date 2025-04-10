import React, { useEffect, useState } from 'react';
import './summaryEmotions.css';
import { faces } from '../../data/imagesData';
import IconCircle2 from '../iconCircle/iconCircle';
import { emotionsData, hobbiesData, eventsData, peopleData, weatherData, healthData } from '../../data/iconsData';
import { useNavigate } from 'react-router-dom';

const SummaryEmotions = () => {
	const [currentFace, setCurrentFace] = useState(null);
	const [selectedIcons, setSelectedIcons] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('day-feedbacks')) || {};
		const dates = Object.keys(data).sort().reverse();
		if (dates.length > 0) {
			const lates = dates[0];
			const mood = data[lates];
			const face = faces.find((f) => f.label === mood);
			setCurrentFace(face);
			const categories = [
				'emotions_Emotions',
				'emotions_People',
				'emotions_Weather',
				'emotions_Hobbies',
				'emotions_Events',
				'emotions_Health',
			];
			const allData = [...emotionsData, ...eventsData, ...hobbiesData, ...peopleData, ...healthData, ...weatherData];
			const icons = [];
			categories.forEach((key) => {
				const items = JSON.parse(localStorage.getItem(key)) || [];
				items.forEach((itemName) => {
					const match = allData.find((i) => i.name === itemName);
					if (match) icons.push(match.icon);
				});
			});

			const paddedIcons = [...icons.slice(0, 10)];
			while (paddedIcons.length < 10) {
				paddedIcons.push(null);
			}

			setSelectedIcons(paddedIcons);
		}
	}, []);

	const today = new Date().toISOString().split('T')[0];

	const handlerIconClick = () => {
		navigate('/emotions');
	};

	return (
		<>
			<section className='summary-card'>
				<div className='icon-column'>
					<div className='icon-wrapper'>
						{currentFace && <img src={currentFace.src} alt={currentFace.label}></img>}
						<span className='icon-text'>{today}</span>
					</div>
				</div>
				<div className='food-column'>
					<div className='row'>
						{selectedIcons.slice(0, 5).map((icon, idx) => (
							<IconCircle2 icon={icon} key={idx} onClick={() => handlerIconClick} />
						))}
					</div>
					<div className='row'>
						{selectedIcons.slice(5, 10).map((icon, idx) => (
							<IconCircle2 icon={icon} key={idx + 5} onClick={() => handlerIconClick} />
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default SummaryEmotions;
