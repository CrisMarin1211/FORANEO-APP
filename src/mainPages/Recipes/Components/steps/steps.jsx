import React from 'react';
import './Stepss.css'

function Steps({ steps }) {
  return (
    <section>
      <h4 className='tittlesteps'>Steps</h4>
      <ul className='S'>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </section>
  );
}

export default Steps;
