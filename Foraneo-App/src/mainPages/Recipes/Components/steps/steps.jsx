import React from 'react';

function Steps({ steps }) {
  return (
    <section>
      <h4>Steps</h4>
      <ul>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </section>
  );
}

export default Steps;
