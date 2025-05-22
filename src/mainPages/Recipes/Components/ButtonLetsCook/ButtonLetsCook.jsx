import React from 'react';
import './ButtonLetsCook.css';

function ButtonLetsCook({ onClick, text = "Let's Cook" }) {
	return (
		<section className='Button-LetsCook'>
			<button className='Lets-Cook' onClick={onClick}>
				{text}
			</button>
		</section>
	);
}

export default ButtonLetsCook;
