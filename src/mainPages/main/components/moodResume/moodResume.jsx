import React from 'react';
import './moodResume.css';

const MoodResume = ({}) => {
	return (
		<section className='MoodResume'>
			<section className='moodResumeContainer'>
				<section className='moodResumeWrapp'>
					<h1 className='moodResumeMessage1'>Most of your days were...</h1>

          <section className='faceSection'>
					<svg xmlns='http://www.w3.org/2000/svg' width='74' height='69' viewBox='0 0 64 59' fill='none'>
						<path
							d='M63.0423 29.1354C63.7587 43.309 50.7335 56.5793 30.8048 58.8324C12.895 60.8572 0 44.1867 0 27.7855C1.43278 9.56259 14.3278 -1.23641 30.8048 0.113285C47.2817 0.113285 63.0423 12.7342 63.0423 29.1354Z'
							fill='#FFD400'
						/>
						<path
							d='M24.3595 23.736C24.3595 24.8542 22.9245 27.1106 20.7778 26.4357C18.328 25.6655 19.3446 23.736 19.3447 23.0611C20.059 21.0363 20.7735 20.3613 22.2081 20.3613C24.3555 20.3613 24.3595 22.6177 24.3595 23.736Z'
							fill='black'
						/>
						<path
							d='M37.9694 23.736C37.9694 24.8542 39.4043 27.1106 41.551 26.4357C44.0009 25.6655 42.9843 23.736 42.9841 23.0611C42.2699 21.0363 41.5553 20.3613 40.1207 20.3613C37.9734 20.3613 37.9694 22.6177 37.9694 23.736Z'
							fill='black'
						/>
						<path
							d='M42.2646 27.7854C32.2338 31.1599 25.7894 29.135 20.7744 28.4602C15.7603 27.7852 16.9527 32.0598 17.9079 33.8596C21.9197 40.879 29.0521 41.9588 32.2351 41.9588C40.1141 41.9587 43.9396 36.1756 45.1302 33.1847C47.2793 27.7853 43.6974 27.1103 42.2646 27.7854Z'
							fill='black'
							stroke='black'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</svg>
					<h1 className='moodResumeMessage2'>HAPPY!</h1>
          </section>

          <h2 className='moodResumeMessage3'>Keep your mood high!🤗</h2>
				</section>
			</section>
		</section>
	);
};

export default MoodResume;
