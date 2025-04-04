import React from 'react';
import './listEmotions.css';

const ListEmotions = ({ title, emotions }) => {
	return (
		<>
			<section className='emotion-container'>
				<h2 className='emotion-title'>{title}</h2>
				<div className='emotion-list'>
					{emotions.map((emotion, index) => (
						<div key={index} className='emotion-item'>
							<div className='emotion-icon'>{emotion.icon}</div>
							<span className='emotion-name'>{emotion.name}</span>
						</div>
					))}
				</div>
			</section>
		</>
	);
};

export default ListEmotions;
