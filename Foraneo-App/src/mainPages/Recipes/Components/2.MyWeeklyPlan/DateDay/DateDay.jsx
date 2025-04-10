import React from 'react';
import './DateDay.css';

function DateDay() {
	const date = new Date();

	const options = {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	};

	const formattedDate = date.toLocaleDateString('en-US', options);

	return <p className='date-day'>{formattedDate}</p>;
}

export default DateDay;
