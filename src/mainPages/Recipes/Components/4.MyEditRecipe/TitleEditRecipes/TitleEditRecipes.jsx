import React from 'react';
import './TitleEditRecipes.css';

function TitleEditRecipes({ day }) {
	return (
		<section>
			<h1 className='title-edit-recipes'>{day} Recipes</h1>
		</section>
	);
}

export default TitleEditRecipes;
