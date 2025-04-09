import React, { useEffect, useState } from 'react';
import './finances.css';
import ShowMoney from '../../components/showMoney/showMoney';
import ProgressBar from '../../components/progressBar/progressBar';
import BigInfoSection from '../../components/bigInfoSection/bigInfoSection';
import FloatingButton from '../../components/buttonMonth/buttonMonth';
import { useLocation } from 'react-router-dom';

const Finances = () => {
  const [savedData, setSavedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [displayMonth, setDisplayMonth] = useState('');

  const location = useLocation();

  useEffect(() => {
    // Cargar datos guardados
    const storedData = JSON.parse(localStorage.getItem('savedData')) || [];
    setSavedData(storedData);

    // Obtener el parámetro del mes de la URL (si existe)
    const params = new URLSearchParams(location.search);
    const monthParam = params.get('month');

    // Si se proporciona un mes en la URL, usarlo; de lo contrario, usar el mes actual
    let targetMonth;
    if (monthParam) {
      targetMonth = monthParam;
    } else {
      // Establecer el mes actual como seleccionado
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0');
      targetMonth = `${currentYear}-${currentMonth}`;
    }

    // Actualizar el mes seleccionado
    setSelectedMonth(targetMonth);

    // Formatear el nombre del mes para mostrar
    const [year, monthIndex] = targetMonth.split('-');
    const date = new Date(parseInt(year), parseInt(monthIndex) - 1);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    setDisplayMonth(`${monthNames[date.getMonth()]}, ${date.getFullYear()}`);

    // Filtrar datos con el mes objetivo
    filterDataByMonth(storedData, targetMonth);
  }, [location.search]); // Reaccionar a cambios en la URL

  // Función para filtrar los datos por mes
  const filterDataByMonth = (data, month) => {
    if (!month || !data.length) {
      setFilteredData([]);
      return;
    }

    const [selectedYear, selectedMonthIndex] = month.split('-'); // Formato 'YYYY-MM'

    const filtered = data.filter(item => {
      const itemDate = new Date(item.date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth(); // 0-11

      return itemYear === parseInt(selectedYear) && itemMonth === parseInt(selectedMonthIndex) - 1;
    });

    setFilteredData(filtered);
  };

  // Manejador para cuando se selecciona un mes
  const handleMonthSelection = (month) => {
    setSelectedMonth(month);

    if (month) {
      // Actualizar el nombre del mes para mostrar en el botón
      const [year, monthIndex] = month.split('-');
      const date = new Date(parseInt(year), parseInt(monthIndex) - 1);
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                         'July', 'August', 'September', 'October', 'November', 'December'];
      setDisplayMonth(`${monthNames[date.getMonth()]}, ${date.getFullYear()}`);

      // Filtrar los datos
      filterDataByMonth(savedData, month);
    }
  };

  // Filtramos los datos de gastos e ingresos
  const expenses = filteredData.filter(item => item.type === 'Expense');
  const incomes = filteredData.filter(item => item.type === 'Income');

  // Calculamos el total de ingresos y gastos
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.value), 0);
  const totalIncomes = incomes.reduce((sum, item) => sum + Number(item.value), 0);
  const balance = totalIncomes - totalExpenses;

  return (
    <section className='Financescontainer'>
      <section className='financesHeader'>
        <section className='WelcomeMessage'>
          <h2 className={`youCanTittle `}>You can do it Cris!</h2>
          <h4 className='keepTrackTittle' >💰 Keep track of your finances!</h4>
        </section>
        <FloatingButton
          onClick={handleMonthSelection}
          displayMonth={displayMonth}
        />
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
        <BigInfoSection
          selectedMonth={selectedMonth}
          hasNoData={filteredData.length === 0}
        />
      </section>
    </section>
  );
};

export default Finances;