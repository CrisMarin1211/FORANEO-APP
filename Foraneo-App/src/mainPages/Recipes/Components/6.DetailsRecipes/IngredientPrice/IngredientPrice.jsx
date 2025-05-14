import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IngredientPrice.css";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../../../../../services/firebaseConfig";

function IngredientPriceInput({ ingredients, day, mealTime, recipeName }) {
  const [ingredientPrices, setIngredientPrices] = useState(
    ingredients.reduce((acc, ingredient) => {
      acc[ingredient] = ""; 
      return acc;
    }, {})
  );

  const [newIngredient, setNewIngredient] = useState("");
  const [newIngredientPrice, setNewIngredientPrice] = useState("");
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
      setIngredientPrices((prev) => ({
        ...prev,
        [newIngredient]: newIngredientPrice,
      }));
      setNewIngredient("");
      setNewIngredientPrice("");
    }
  };

  const handleConfirm = async () => {

    localStorage.setItem("ingredientPrices", JSON.stringify(ingredientPrices));


    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);
      try {
        await updateDoc(userRef, {
          ingredientPricesArray: arrayUnion({
            day,
            mealTime,
            recipeName,
            prices: ingredientPrices,
            timestamp: new Date().toISOString(),
          }),
        });
        alert("Ingredient prices saved successfully!");
      } catch (error) {
        alert("Error saving ingredient prices to Firebase");
        console.error(error);
      }
    } else {
      alert("Ingredient prices saved locally!");
    }


    navigate(`/steps/${day}/${mealTime}/${recipeName}`);
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

      <button
        className="buttonAddIngredient"
        onClick={handleAddIngredient}
        disabled={!newIngredient || !newIngredientPrice}
      >
        Add Ingredient
      </button>

      <button className="buttonconfirmm" onClick={handleConfirm}>
        Confirm
      </button>
    </section>
  );
}

export default IngredientPriceInput;
