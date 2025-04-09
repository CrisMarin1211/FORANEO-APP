import React from 'react';
import './TitleEditRecipes.css';

function TitleEditRecipes({ day }) {
	return (
		<div className='TitleEditRecipes'>
			<h1>{day} Recipes</h1>
		</div>
	);
}

export default TitleEditRecipes;
