import React from 'react';
import './IngredientsRecipes.css';

function IngredientsRecipes({ ingredients }) {
	return (
		<section>
			<h3 className='ingr-details'>Ingredient's</h3>

			<ul className='contet-ingre'>
				{ingredients.map((ingredient, index) => (
					<li className='key-ing' key={index}>
						{ingredient}
					</li>
				))}
			</ul>
		</section>
	);
}

export default IngredientsRecipes;
