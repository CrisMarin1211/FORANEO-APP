import React from 'react';
import './dayFeedbackCard.css';
import IconCircle from '../../assets/icons/iconsCircle';

const DayFeedbackCard = () => {
	return (
		<>
			<div className='day-feedback-container'>
				<h2 className='day-feedback-title'>How was your day?</h2>
				<div className='image-row'>
					<IconCircle width={60} height={60} color='#FF4D4D' />
					<IconCircle width={60} height={60} color='#FF4D4D' />
					<IconCircle width={60} height={60} color='#FF4D4D' />
					<IconCircle width={60} height={60} color='#FF4D4D' />
					<IconCircle width={60} height={60} color='#FF4D4D' />
				</div>
			</div>
		</>
	);
};

export default DayFeedbackCard;
