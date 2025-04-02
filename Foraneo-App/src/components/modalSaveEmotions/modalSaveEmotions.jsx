import React from 'react';
import './modalSaveEmotions.css';

const ModalSaveEmotions = () => {
	return (
		<>
			<div className='modal-overlay'>
				<div className='modal-content'>
					<button className='close-button'>X</button>
					<h2 className='modal-title'>Congratulations!</h2>
					<p className='modal-description'>Congrats, you have registered your first day!</p>
					<img src='/images/emotionsIcons.png' alt='emotions icons' className='modal-image'></img>
					<button className='modal-button'>Continue</button>
				</div>
			</div>
		</>
	);
};

export default ModalSaveEmotions;
