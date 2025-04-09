import React from 'react';
import './TitleEditBLD.css';

function TitleEditBLD({ day, mealTime }) {
	return (
		<div className='title-edit-bld'>
			<h1>
				Edit {day} {mealTime}
			</h1>
		</div>
	);
}

export default TitleEditBLD;
