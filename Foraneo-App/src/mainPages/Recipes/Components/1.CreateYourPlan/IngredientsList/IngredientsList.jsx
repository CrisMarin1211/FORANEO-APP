import './IngredientsList.css';

const IngredientsList = ({ selectedIngredients, setSelectedIngredients }) => {
	const handleSelectIngredient = (ingredient) => {
		setSelectedIngredients((prevSelected) =>
			prevSelected.includes(ingredient)
				? prevSelected.filter((item) => item !== ingredient)
				: [...prevSelected, ingredient]
		);
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
		<section className='ingredients-container'>
			<h3 className='title'>What do you have in your fridge?</h3>
			<form onSubmit={handleAddIngredient} className='input-container'>
				<section className='input-wrapperr'>
					<input name='ingredient' type='text' placeholder='Write the ingredient' className='input-field' />
					<button type='submit' className='add-button'>
						+
					</button>
				</section>
			</form>
			<section className='suggestions-container'>
				{selectedIngredients.map((ingredient, index) => (
					<button key={index} onClick={() => handleSelectIngredient(ingredient)} className='suggestion-button'>
						{ingredient} <span className='remove-icon'>X</span>
					</button>
				))}
			</section>
		</section>
	);
};

export default IngredientsList;
