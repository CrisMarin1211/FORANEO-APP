import './IngredientsList.css';

const IngredientsList = ({ selectedIngredients, setSelectedIngredients }) => {
	const handleSelectIngredient = (ingredient) => {
		if (!selectedIngredients.includes(ingredient)) {
			setSelectedIngredients([...selectedIngredients, ingredient]);
		}
	};

	const handleAddIngredient = (e) => {
		e.preventDefault();
		const newIngredient = e.target.ingredient.value.trim();
		if (newIngredient !== '' && !selectedIngredients.includes(newIngredient)) {
			setSelectedIngredients([...selectedIngredients, newIngredient]);
			e.target.reset();
		}
	};

	return (
		<div className='ingredients-container'>
			<h3 className='title'>What do you have in your fridge?</h3>
			<form onSubmit={handleAddIngredient} className='input-container'>
				<div className='input-wrapperr'>
					<input name='ingredient' type='text' placeholder='Write the ingredient' className='input-field' />
					<button type='submit' className='add-button'>
						+
					</button>
				</div>
			</form>
			<div className='suggestions-container'>
				{selectedIngredients.map((ingredient, index) => (
					<button key={index} onClick={() => handleSelectIngredient(ingredient)} className='suggestion-button'>
						{ingredient}
					</button>
				))}
			</div>
		</div>
	);
};

export default IngredientsList;
