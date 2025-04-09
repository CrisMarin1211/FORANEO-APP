import React from 'react';
import './TitleEditRecipes.css';

function TitleEditRecipes({ day }) {
	return (
		<section className='TitleEditRecipes'>
			<h1>{day} Recipes</h1>
		</section>
	);
}

export default TitleEditRecipes;
