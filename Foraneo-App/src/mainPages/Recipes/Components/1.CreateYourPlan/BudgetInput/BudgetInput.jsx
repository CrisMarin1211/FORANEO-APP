import './BudgetInput.css';

const BudgetInput = ({ budget, setBudget }) => {
	const formatCOP = (value) => {
		const numericValue = value.replace(/\D/g, '');
		return numericValue ? parseInt(numericValue, 10).toLocaleString('es-CO') : '';
	};

	const handleChange = (event) => {
		const rawValue = event.target.value;
		const formattedValue = formatCOP(rawValue);
		setBudget(formattedValue);
	};

	return (
		<section className='budget-container'>
			<section className='input-wrapper'>
				<span className='currency-symbol'>$</span>
				<input
					id='budget-input'
					type='text'
					value={budget}
					onChange={handleChange}
					placeholder='What is your budget? '
				/>
			</section>
		</section>
	);
};

export default BudgetInput;
