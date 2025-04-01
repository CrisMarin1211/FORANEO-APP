import { useState } from 'react';
import './IngredientsList.css';

const IngredientsList = () => {
	const [input, setInput] = useState('');
	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const suggestedIngredients = ['Tomato', 'Meat', 'Pasta'];

	const handleSelectIngredient = (ingredient) => {
		if (!selectedIngredients.includes(ingredient)) {
			setSelectedIngredients([...selectedIngredients, ingredient]);
		}
	};

	const handleAddIngredient = (e) => {
		e.preventDefault();
		if (input.trim() !== '' && !selectedIngredients.includes(input)) {
			setSelectedIngredients([...selectedIngredients, input]);
			setInput('');
		}
	};

	return (
		<div className='ingredients-container'>
			<h3 className='title'>What do you have in your fridge?</h3>
			<form onSubmit={handleAddIngredient} className='input-container'>
				<input
					type='text'
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder='Write the ingredient'
					className='input-field'
				/>
			</form>
			<div className='suggestions-container'>
				{[...suggestedIngredients, ...selectedIngredients].map((ingredient, index) => (
					<button key={index} onClick={() => handleSelectIngredient(ingredient)} className='suggestion-button'>
						{ingredient}
					</button>
				))}
			</div>
		</div>
	);
};

export default IngredientsList;
