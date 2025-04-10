import React from 'react';

import './iconCircle.css';

const IconCircle2 = ({ icon, onClick }) => {
	return (
		<section className='icon-circle' onClick={onClick}>
			<div className='icon-content'>{icon}</div>
		</section>
	);
};

export default IconCircle2;
