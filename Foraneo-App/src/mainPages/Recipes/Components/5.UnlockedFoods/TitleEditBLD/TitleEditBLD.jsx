import React from 'react';
import './TitleEditBLD.css';

function TitleEditBLD({ day, mealTime }) {
	return (
		<section className='title-edit-bld'>
			<h1>
				Edit {day} {mealTime}
			</h1>
		</section>
	);
}

export default TitleEditBLD;
