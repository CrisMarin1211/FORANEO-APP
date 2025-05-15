import React from 'react';
import './recipeMoney.css';

const RecipesMoney = ({ savings, totalIngredientCost }) => {
  // If no savings or recipes, show the 'no recipes' message
  if (savings <= 0) {
    return (
      <section className='RecipeMoney'>
        <section className='recipeMoneyContainer'>
          <section className='recipeMoneyWrapp'>
            <h1 className='recipeWrappMessagge'>There are no recipes unlocked...</h1>
          </section>
        </section>
      </section>
    );
  }

  return (
    <section className='RecipeMoney'>
      <section className='recipeMoneyContainer'>
        <section className='recipeMoneyWrapp'>
          <h1 className='recipeWrappMessage1'>This year you saved</h1>
          <h1 className='RecipeMoneyNumber'>${savings.toFixed(0)}</h1>
          <h1 className='recipeWrappMessage2'>by cooking at home and not ordering delivery🎉</h1>
        </section>
      </section>
    </section>
  );
};

export default RecipesMoney;
