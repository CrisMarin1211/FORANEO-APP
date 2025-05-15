import React from 'react';
import './recipesResume.css';

const RecipesResume = ({ completedRecipes }) => {
  const recipes = completedRecipes || [];
  const completedCount = recipes.length;

  return (
    <section className='RECIPESRESUME'>
      <section className='recipessResumeContainer'>
        <section className='recipeWrapp'>
          {completedCount > 0 ? (
            <>
              <h1 className='RecipeNumber'>{completedCount}</h1>
              <h1 className='recipeWrappMessage'>Recipes unlocked this year!🥗</h1>
            </>
          ) : (
            <h1 className='recipeWrappMessagee'>There are no recipes unlocked...</h1>
          )}
        </section>
      </section>
    </section>
  );
};

export default RecipesResume;
