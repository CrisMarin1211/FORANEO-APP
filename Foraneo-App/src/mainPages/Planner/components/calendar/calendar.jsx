import React, { useEffect, useState } from 'react';
import './calendar.css';
import { faces } from '../../data/imagesData';
import { useNavigate } from 'react-router-dom';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
	const [daysInMonth, setDaysInMonth] = useState([]);
	const [dayFeedbacks, setDayFeedbacks] = useState({});
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const navigate = useNavigate();

	useEffect(() => {
		const date = new Date(currentYear, currentMonth + 1, 0);
		const totalDays = date.getDate();

		const firstDay = new Date(currentYear, currentMonth, 1).getDay();
		const daysArray = [];

		for (let i = 0; i < firstDay; i++) {
			daysArray.push(null);
		}

		for (let i = 1; i <= totalDays; i++) {
			daysArray.push(i);
		}

		setDaysInMonth(daysArray);

		const storedFeedbacks = JSON.parse(localStorage.getItem('day-feedbacks')) || {};
		setDayFeedbacks(storedFeedbacks);
	}, [currentMonth, currentYear]);

	const getDateKey = (day) => {
		const dayStr = day < 10 ? `0${day}` : `${day}`;
		const monthStr = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
		return `${currentYear}-${monthStr}-${dayStr}`;
	};

	const getFaceByLabel = (label) => {
		return faces.find((face) => face.label === label)?.src || null;
	};

	const handleDayClick = (day) => {
		if (!day) return;
		const selectedDate = getDateKey(day);
		navigate('/', { state: { selectedDate } });
	};

	const goToPrevMonth = () => {
		if (currentMonth === 0) {
			setCurrentMonth(11);
			setCurrentYear((prev) => prev - 1);
		} else {
			setCurrentMonth((prev) => prev - 1);
		}
	};

	const goToNextMonth = () => {
		if (currentMonth === 11) {
			setCurrentMonth(0);
			setCurrentYear((prev) => prev + 1);
		} else {
			setCurrentMonth((prev) => prev + 1);
		}
	};

	return (
		<>
			<section className='calendar-container'>
				<h2 className='calendar-title'>Mood Tracker</h2>
				<div className='calendar-controls'>
					<button onClick={goToPrevMonth}>←</button>
					<span>
						{new Date(currentYear, currentMonth).toLocaleString('default', {
							month: 'long',
							year: 'numeric',
						})}
					</span>
					<button onClick={goToNextMonth}>→</button>
				</div>
				<div className='calendar-grid'>
				{daysOfWeek.map((d) => (
          <div key={d} className="calendar-day-header">
            {d}
          </div>
        ))}

        {daysInMonth.map((day, index) => {
          const dateKey = day ? getDateKey(day) : null;
          const mood = dayFeedbacks[dateKey];
          const faceSrc = getFaceByLabel(mood);

          return (
            <div
              key={index}
              className={calendar-day ${day ? "clickable" : "empty"}}
              onClick={() => handleDayClick(day)}
            >
              {day && (
                <div className="calendar-item">
                  <svg
                    className="calendar-svg"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#79CFD9"
                      strokeWidth="5"
                      fill="white"
                    />
                    {faceSrc && (
                      <image
                        href={faceSrc}
                        x="32"
                        y="32"
                        width="36"
                        height="36"
                        className="image-face-src"
                      />
                    )}
                  </svg>
                  <div className="calendar-day-number">{day}</div>
                </div>
              )}
            </div>
          );
        })}
				</div>
			</section>
		</>
	);
};

export default Calendar;
