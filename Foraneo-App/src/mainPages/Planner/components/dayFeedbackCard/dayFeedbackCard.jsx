import React, { useEffect, useState } from 'react';
import './dayFeedbackCard.css';
import faces from '../../data/imagesData';

const DayFeedbackCard = ({ date, onSelect }) => {
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		const stored = JSON.parse(localStorage.getItem('day-feedbacks'));
		if (stored[date]) {
			setSelected(stored[date]);
			onSelect(stored[date]);
		}
	}, [date, onSelect]);

	const handlerSelect = (label) => {
		const stored = JSON.parse(localStorage.getItem('day-feedbacks'));
		stored[date] = label;
		localStorage.setItem('day-feedbacks', JSON.stringify(stored));
		setSelected(label);
		onSelect(label);
	};

	return (
		<>
			<div className='day-feedback-container'>
				<h2 className='day-feedback-title'>How was your day?</h2>
				<div className='image-row'>
					{faces.map((face) => (
						<img
							src={face.src}
							key={face.label}
							alt={face.label}
							className={`face-img ${selected === face.label ? 'selected' : ''}`}
							onClick={() => handlerSelect(face.label)}
						></img>
					))}
				</div>
			</div>
		</>
	);
};

export default DayFeedbackCard;
