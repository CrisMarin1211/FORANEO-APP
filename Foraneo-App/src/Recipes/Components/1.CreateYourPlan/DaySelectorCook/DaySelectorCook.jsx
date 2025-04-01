import { useState } from 'react';
import './DaySelectorCook.css';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const DaySelectorCook = () => {
	const [selectedDays, setSelectedDays] = useState([]);

	const toggleDay = (day) => {
		setSelectedDays((prevSelected) =>
			prevSelected.includes(day) ? prevSelected.filter((d) => d !== day) : [...prevSelected, day]
		);
	};

	return (
		<div className='title-days'>
			<h4 className='day-title'>Which days do you want to cook?</h4>
			<div className='day-container'>
				<div className='day-grid'>
					{daysOfWeek.map((day) => (
						<label key={day} className='day-label'>
							<input
								type='checkbox'
								checked={selectedDays.includes(day)}
								onChange={() => toggleDay(day)}
								className='day-checkbox'
							/>
							<span>{day}</span>
						</label>
					))}
				</div>
			</div>
		</div>
	);
};

export default DaySelectorCook;
