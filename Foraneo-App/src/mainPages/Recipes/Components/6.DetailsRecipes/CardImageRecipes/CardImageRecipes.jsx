import React from 'react';
import './CardImageRecipes.css';

function CardImageRecipes({ name, image, description }) {
	return (
		<section>
			<h2 className='recipe-boxtitle'>{name}</h2>
			<section className='image-wrap'>
				<img src={image} alt={name} className='image-display' />
			</section>
			<p className='description-paragraph'>{description}</p>
		</section>
	);
}

export default CardImageRecipes;
