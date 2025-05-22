import React from 'react';
import './UnlockedMessage.css';

function UnlockedMessage({ recipeName }) {
  return (
    <section className='Unlocked-Message'>
      <p className='message'>🔓 You have unlocked the {recipeName}</p>
    </section>
  );
}

export default UnlockedMessage;
