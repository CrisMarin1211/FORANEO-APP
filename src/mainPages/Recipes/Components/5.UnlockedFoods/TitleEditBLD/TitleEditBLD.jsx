import React from 'react';
import './TitleEditBLD.css';

function TitleEditBLD({ day, mealTime }) {
	return (
		<section>
			<h1 className='title-edit-bld'>
				Edit {day} {mealTime}
			</h1>
		</section>
	);
}

export default TitleEditBLD;
