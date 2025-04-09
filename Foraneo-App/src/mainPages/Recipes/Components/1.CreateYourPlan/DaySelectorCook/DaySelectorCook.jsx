import './DaySelectorCook.css';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DaySelectorCook = ({ selectedDays, setSelectedDays }) => {
	const toggleDay = (day) => {
		setSelectedDays((prevSelected) =>
			prevSelected.includes(day) ? prevSelected.filter((d) => d !== day) : [...prevSelected, day]
		);
	};

	return (
		<section className='title-days'>
			<h4 className='day-title'>Which days do you want to cook?</h4>
			<section className='day-container'>
				<section className='day-grid'>
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
				</section>
			</section>
		</section>
	);
};

export default DaySelectorCook;
