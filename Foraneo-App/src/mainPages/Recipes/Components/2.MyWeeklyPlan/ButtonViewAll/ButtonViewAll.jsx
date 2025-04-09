import React from 'react';
import './ButtonViewAll.css';

function ButtonViewAll({ href = '#', text = 'View All', onClick }) {
	return (
		<section className='button-view-All'>
			<button className='view-all' onClick={onClick}>
				{text}
			</button>
		</section>
	);
}

export default ButtonViewAll;
