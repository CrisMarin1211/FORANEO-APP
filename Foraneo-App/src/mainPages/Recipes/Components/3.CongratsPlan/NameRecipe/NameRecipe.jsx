import React from 'react';
import './NameRecipe.css';

function NameRecipe({ recipeName, recipeImage }) {
  return (
    <section className='Name-Recipe'>
      <h2 className='title-NameRecipe'>{recipeName}</h2>
      <img className="recipe-image" src={recipeImage} alt={recipeName} />
    </section>
  );
}

export default NameRecipe;
