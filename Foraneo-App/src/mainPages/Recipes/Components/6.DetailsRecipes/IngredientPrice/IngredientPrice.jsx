import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IngredientPrice.css';

function IngredientPriceInput({ ingredients, day, mealTime, recipeName }) {
  const [ingredientPrices, setIngredientPrices] = useState(
    ingredients.reduce((acc, ingredient) => {
      acc[ingredient] = ''; // Inicializa el precio como vacío
      return acc;
    }, {})
  );

  const [newIngredient, setNewIngredient] = useState('');
  const [newIngredientPrice, setNewIngredientPrice] = useState('');
  const [allIngredients, setAllIngredients] = useState(ingredients);
  const navigate = useNavigate();

  const handlePriceChange = (ingredient, price) => {
    setIngredientPrices((prev) => ({
      ...prev,
      [ingredient]: price,
    }));
  };

  const handleAddIngredient = () => {
    if (newIngredient && newIngredientPrice) {
      setAllIngredients((prev) => [...prev, newIngredient]);
      setIngredientPrices((prev) => ({ ...prev, [newIngredient]: newIngredientPrice }));
      setNewIngredient('');
      setNewIngredientPrice('');
    }
  };

  const handleConfirm = () => {
    // Guardar el estado de ingredientPrices en localStorage
    localStorage.setItem('ingredientPrices', JSON.stringify(ingredientPrices));

    // Redirigir a la página de pasos
    navigate(`/steps/${day}/${mealTime}/${recipeName}`);
    alert("Ingredient prices saved successfully!");
  };

  return (
    <section className="ingredient-price-input">
      <h4>Enter the Product Price</h4>
      <section className="ingredients-list">
        {allIngredients.map((ingredient) => (
          <section key={ingredient} className="ingredient-item">
            <label>{ingredient}</label>
            <input
              type="number"
              value={ingredientPrices[ingredient]}
              onChange={(e) => handlePriceChange(ingredient, e.target.value)}
              placeholder="0"
            />
          </section>
        ))}
      </section>

      <section className="ingredient-item">
        <label>Other +</label>
        <input
          type="text"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          placeholder="Ingredient name"
        />
        <input
          type="number"
          value={newIngredientPrice}
          onChange={(e) => setNewIngredientPrice(e.target.value)}
          placeholder="Price"
        />
      </section>

      <button className="buttonAddIngredient" onClick={handleAddIngredient} disabled={!newIngredient || !newIngredientPrice}>
        Add Ingredient
      </button>

      <button className="buttonconfirmm" onClick={handleConfirm}>
        Confirm
      </button>
    </section>
  );
}

export default IngredientPriceInput;
