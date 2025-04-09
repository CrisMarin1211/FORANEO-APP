  import React, { useEffect, useState } from 'react';
  import './finances.css';
  import ShowMoney from '../../components/showMoney/showMoney';
  import ProgressBar from '../../components/progressBar/progressBar';
  import BigInfoSection from '../../components/bigInfoSection/bigInfoSection';
  import FloatingButton from '../../components/buttonMonth/buttonMonth';
  import Timeline from '../../components/timeline/timeline';

  const Finances = () => {
    const [savedData, setSavedData] = useState([]);

    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('savedData')) || [];
      setSavedData(storedData);  // Establecer los datos en el estado
    }, []);  // Solo se ejecuta una vez cuando el componente se monta

    // Filtramos los datos por tipo de gasto y tipo de ingreso
    const expenses = savedData.filter(item => item.type === 'Expense');
    const incomes = savedData.filter(item => item.type === 'Income');

    // Calculamos el total de ingresos y gastos
    const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.value), 0);
    const totalIncomes = incomes.reduce((sum, item) => sum + Number(item.value), 0);
    const balance = totalIncomes - totalExpenses;

    return (
      <section className='Financescontainer'>
        <section className='financesHeader'>
          <section className='WelcomeMessage'>
            <h2 className={`youCanTittle `}>You can do it Cris!</h2>
            <h4 className='keepTrackTittle' >💰 Keep track </h4>
            <h4 className='keepTrackTittle' > of your finances! </h4>
          </section>
          <FloatingButton />
        </section>

        <section className='showMoneySection'>
          <ShowMoney
            totalExpenses={totalExpenses}
            totalIncomes={totalIncomes}
            balance={balance}
          />
        </section>

        <section className='progressBarSection'>
          <h2 className={`goalTittle`} > Barra de progreso - Pc gamer RTX</h2>
          <ProgressBar />
        </section>

        <section>
          <BigInfoSection />
        </section>
      </section>
    );
  };

  export default Finances;
