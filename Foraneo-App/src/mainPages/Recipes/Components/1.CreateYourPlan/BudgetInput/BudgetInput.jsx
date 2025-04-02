import { useState } from 'react';
import './BudgetInput.css';

const BudgetInput = () => {
	const [budget, setBudget] = useState('');
	const [error, setError] = useState('');

	const formatCOP = (value) => {
		const numericValue = value.replace(/\D/g, '');

		return numericValue ? parseInt(numericValue, 10).toLocaleString('es-CO') : '';
	};

	const handleChange = (event) => {
		const rawValue = event.target.value;
		const formattedValue = formatCOP(rawValue);
		setBudget(formattedValue);

		if (rawValue && !/^\d+$/.test(rawValue.replace(/\./g, ''))) {
			setError('Por favor, ingrese solo números');
		} else {
			setError('');
		}
	};

	return (
		<>
			<div className='budget-container'>
				<div className='input-wrapper'>
					<span className='currency-symbol'>$</span>
					<input
						id='budget-input'
						type='text'
						value={budget}
						onChange={handleChange}
						placeholder='What is your budget? '
						className={error ? 'error' : ''}
					/>
				</div>
				{error && <p className='error-message'>{error}</p>}
			</div>
		</>
	);
};

export default BudgetInput;
