import React, { useState, useEffect } from 'react';
import './addSection.css';
import Categories from '../categories/categories';
import ValueInput from '../valueInput/valueInput';
import AddInputs from '../addInputs/addInputs';
import CalendarInput from '../calendarInput/calendarInput';
import { useNavigate, useLocation } from 'react-router-dom';

const AddSection = () => {
  const [savedData, setSavedData] = useState([]);
  const [activeTab, setActiveTab] = useState('Expenses');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [value, setValue] = useState(10000);
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Definimos si es Ingreso o Gasto basado en la pestaña activa
  const isIncome = activeTab === 'Incomes';

  // Función para mostrar los datos guardados en la consola
  const logSavedData = (data) => {
    console.log('Current saved data:', data);

    const expenses = data.filter(item => item.type === 'Expense');
    const incomes = data.filter(item => item.type === 'Income');

    console.log(`Total entries: ${data.length} (${expenses.length} expenses, ${incomes.length} incomes)`);

    const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.value), 0);
    const totalIncomes = incomes.reduce((sum, item) => sum + Number(item.value), 0);

    console.log(`Total expenses: $${totalExpenses.toLocaleString()}`);
    console.log(`Total incomes: $${totalIncomes.toLocaleString()}`);
    console.log(`Balance: $${(totalIncomes - totalExpenses).toLocaleString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && (tab === 'Expenses' || tab === 'Incomes')) {
      setActiveTab(tab);
    }
  }, [location]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('savedData')) || [];
    setSavedData(storedData);
    logSavedData(storedData);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSave = () => {
    // Validar que todos los campos estén completos
    if (!selectedCategory || !value || !name || !details || !date) {
      alert('Please fill in all fields!');
      return;
    }

    const data = {
      category: selectedCategory,
      value,
      name,
      details,
      date,
      type: isIncome ? 'Income' : 'Expense',
      timestamp: new Date().toISOString()
    };

    // Guardamos el dato en el array de datos
    const updatedData = [...savedData, data];
    setSavedData(updatedData);

    // Guardamos los datos en localStorage
    localStorage.setItem('savedData', JSON.stringify(updatedData));

    console.log('New entry added:', data);
    logSavedData(updatedData);

    // Extraer el año y mes del registro para pasarlo como parámetro
    const entryDate = new Date(date);
    const entryYear = entryDate.getFullYear();
    const entryMonth = (entryDate.getMonth() + 1).toString().padStart(2, '0'); // +1 porque getMonth() devuelve 0-11
    const monthParam = `${entryYear}-${entryMonth}`;

    // Limpiar los inputs
    setSelectedCategory('');
    setValue(10000);
    setName('');
    setDetails('');
    setDate('');

    // Redirigir a la página de Finances con el parámetro del mes
    navigate(`/finances?month=${monthParam}`);
  };

  const renderContent = () => {
    const categoryTitle = isIncome ? 'Income Categories' : 'Expense Categories';
    const valueTitle = isIncome ? '2. How much did you earn?' : '2. How much did you spend?';
    const detailTitle = isIncome ? '3. Income Details' : '3. Expense Details';

    return (
      <section>
        <h2>{categoryTitle}</h2>
        <Categories
          isIncome={isIncome}
          setSelectedCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        <h2>{valueTitle}</h2>
        <ValueInput
          setValue={setValue}
          value={value}
        />
        <h2>{detailTitle}</h2>
        <AddInputs
          setName={setName}
          setDetails={setDetails}
          name={name}
          details={details}
        />
        <CalendarInput
          setDate={setDate}
          date={date}
        />
        <button className="add-btn2" onClick={handleSave}>
          Save
        </button>
      </section>
    );
  };

  return (
    <section className="Add-container">
      <section className="Addtabs">
        <section
          className={`Addtab ${activeTab === 'Expenses' ? 'active Expenses-tab' : ''}`}
          onClick={() => setActiveTab('Expenses')}
        >
          📃 Expenses
        </section>
        <section
          className={`Addtab ${activeTab === 'Incomes' ? 'active Incomes-tab' : ''}`}
          onClick={() => setActiveTab('Incomes')}
        >
          📊 Incomes
        </section>
      </section>

      <section className="Addtab-content">
        {renderContent()}
      </section>
    </section>
  );
};

export default AddSection;