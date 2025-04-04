import React from 'react';
import './dayFeedbackCard.css';
import IconCircle from '../../assets/icons/iconsCircle';

const DayFeedbackCard = () => {
	return (
		<>
			<div className='day-feedback-container'>
				<h2 className='day-feedback-title'>How was your day?</h2>
				<div className='image-row'>
					<img src='/images/happyface.png'></img>
					<img src='/images/contentface.png'></img>
					<img src='/images/seriousface.png'></img>
					<img src='/images/depressedface.png'></img>
					<img src='/images/sadface.png'></img>
				</div>
			</div>
		</>
	);
};

export default DayFeedbackCard;
