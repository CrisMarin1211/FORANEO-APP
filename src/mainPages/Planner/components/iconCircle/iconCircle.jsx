import React from 'react';

import './iconCircle.css';

const IconCircle2 = ({ icon, onClick }) => {
	return (
		<section className='icon-circle' onClick={onClick}>
			<section className='icon-content'>{icon}</section>
		</section>
	);
};

export default IconCircle2;
