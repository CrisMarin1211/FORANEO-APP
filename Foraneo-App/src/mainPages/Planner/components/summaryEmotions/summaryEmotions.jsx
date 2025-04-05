import React, { useEffect, useState } from 'react';
import './summaryEmotions.css';
import IconCircle2 from '../../assets/icons/iconCircle2';
import { faces } from '../../data/imagesData';

const EMOTION_ICONS = [
	[
		<IconCircle2 key='1' />,
		<IconCircle2 key='2' />,
		<IconCircle2 key='3' />,
		<IconCircle2 key='4' />,
		<IconCircle2 key='5' />,
	],
	[
		<IconCircle2 key='6' />,
		<IconCircle2 key='7' />,
		<IconCircle2 key='8' />,
		<IconCircle2 key='9' />,
		<IconCircle2 key='10' />,
	],
];

const SummaryEmotions = () => {
	const [currentFace, setCurrentFace] = useState(null);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('day-feedbacks')) || {};
		const dates = Object.keys(data).sort().reverse();
		if (dates.length > 0) {
			const lates = dates[0];
			const mood = data[lates];
			const face = faces.find((f) => f.label === mood);
			setCurrentFace(face);
		}
	}, []);

	const today = new Date().toISOString().split('T')[0];

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
					{EMOTION_ICONS.map((row, rowIndex) => (
						<div className='row' key={rowIndex}>
							{row.map((icon) => icon)}
						</div>
					))}
				</div>
			</section>
		</>
	);
};

export default SummaryEmotions;
