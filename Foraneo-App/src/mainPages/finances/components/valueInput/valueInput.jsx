import React from 'react';
import './valueInput.css';

const ValueInput = ({ setValue, value }) => {
  const increment = () => setValue(value + 1000);
  const decrement = () => setValue(value - 1000);

  return (
    <section className='valueInputAll'>
      <h2 className='valueInputTittle' ></h2>
      <section className='valueInputGeneralContainer'>
        <section className='valueInputContainer'>
          <button className='valueInputButton' onClick={decrement}>-</button>

          <section className='valueInputWrapper'>
            <span className='valueInputCurrencySymbol'>$</span>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value))} 
              className='valueInputInput'
            />
          </section>

          <button className='valueInputButton' onClick={increment}>+</button>
        </section>
      </section>
    </section>
  );
};

export default ValueInput;
