import React from 'react';
import './finances.css';
import ShowMoney from '../../components/showMoney/showMoney';
import ProgressBar from '../../components/progressBar/progressBar';
import BigInfoSection from '../../components/bigInfoSection/bigInfoSection';

const Finances = () => {

  return (
    <section className='container'>

      <section className='header'>
      <section className='Welcome Message'>
      <h2>You can do it Cris!</h2>
      <h4>Keep track of your finances! </h4>
      </section>

      <button>
        Boton mensual
      </button>

      </section>

      <section>
      <ShowMoney></ShowMoney>
      </section>

      <section>
      <h2> Barra de progreso </h2>
      <ProgressBar></ProgressBar>
      </section>

      <section>
      <BigInfoSection/>
      </section>


    </section>
  );
};

export default Finances;
