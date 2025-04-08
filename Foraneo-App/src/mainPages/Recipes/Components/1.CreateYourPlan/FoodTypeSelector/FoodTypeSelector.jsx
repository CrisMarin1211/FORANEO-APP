import './FoodTypeSelector.css';

const foodTypes = ['Quick & Easy', 'Seafood', 'Italian', 'Vegetarian', 'Meat & Grill', 'Vegan', 'Gluten-Free'];

const FoodTypeSelector = ({ selectedFoodTypes, setSelectedFoodTypes }) => {
	const handleSelect = (type) => {
		setSelectedFoodTypes((prevSelected) =>
			prevSelected.includes(type) ? prevSelected.filter((item) => item !== type) : [...prevSelected, type]
		);
	};

	return (
		<div className='food-title'>
			<h2 className='food-selector-title'>What type of food do you want to cook?</h2>
			<div className='food-selector-container'>
				<div className='food-options-container'>
					{foodTypes.map((type) => (
						<div
							key={type}
							className={`food-option ${selectedFoodTypes.includes(type) ? 'selected' : ''}`}
							onClick={() => handleSelect(type)}
						>
							{type}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FoodTypeSelector;
