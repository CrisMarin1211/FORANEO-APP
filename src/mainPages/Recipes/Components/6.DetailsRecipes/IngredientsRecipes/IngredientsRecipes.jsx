import React from "react";
import "./IngredientsRecipes.css";

function IngredientsRecipes({ ingredients }) {
  const safeIngredients = Array.isArray(ingredients) ? ingredients : [];
  return (
    <section>
      <h3 className="ingr-details">Ingredient's</h3>
      <ul className="contet-ingre">
        {safeIngredients.map((ingredient, index) => (
          <li className="key-ing" key={index}>
            {ingredient}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default IngredientsRecipes;
