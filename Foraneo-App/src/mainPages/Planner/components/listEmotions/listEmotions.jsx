import React, { useEffect, useState } from 'react';
import './listEmotions.css';

const ListEmotions = ({ title, emotions, onSelectionChange }) => {
	const [selected, setSelected] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const stored = JSON.parse(localStorage.getItem(`emotions_${title}`));
		if (stored) setSelected(stored);
	}, [title]);

	useEffect(() => {
		onSelectionChange(title, selected);
	}, [selected]);

	const toggleEmotion = (name) => {
		setSelected((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]));
	};
	return (
		<>
			<section className='emotion-container'>
				<div className='emotion-header' onClick={() => setIsOpen(!isOpen)}>
					<h2 className='emotion-title'>{title}</h2>
				</div>
				<div className='emotion-list'>
					{emotions.map((emotion, index) => (
						<div key={index} className='emotion-item' onClick={() => toggleEmotion(emotion.name)}>
							<div className={`emotion-icon ${selected.includes(emotion.name) ? 'selected' : ''}`}>{emotion.icon}</div>
							<span className='emotion-name'>{emotion.name}</span>
						</div>
					))}
				</div>
			</section>
		</>
	);
};

export default ListEmotions;
