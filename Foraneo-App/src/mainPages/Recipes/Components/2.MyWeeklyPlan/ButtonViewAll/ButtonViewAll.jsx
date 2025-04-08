import React from 'react';
import './ButtonViewAll.css';

function ButtonViewAll({ href = '#', text = 'View All', onClick }) {
	return (
		<section className='Button-View-All'>
			<a className='View-All' href={href} onClick={onClick}>
				{text}
			</a>
		</section>
	);
}

export default ButtonViewAll;
