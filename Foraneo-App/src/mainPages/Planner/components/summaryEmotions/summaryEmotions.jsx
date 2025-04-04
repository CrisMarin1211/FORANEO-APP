import React from 'react';
import './summaryEmotions.css';
import IconCircle2 from '../../assets/icons/iconCircle2';

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
	return (
		<>
			<section className='summary-card'>
				<div className='icon-column'>
					<div className='icon-wrapper'>
						<img src='/images/happyface.png' alt='happy face'></img>
						<span className='icon-text'>Texto 1</span>
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
