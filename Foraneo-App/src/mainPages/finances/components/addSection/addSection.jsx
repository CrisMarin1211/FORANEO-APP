import React, { useState, useEffect } from 'react';
import './addSection.css';
import Categories from '../categories/categories';
import ValueInput from '../valueInput/valueInput';
import AddInputs from '../addInputs/addInputs';
import CalendarInput from '../calendarInput/calendarInput';
import { useNavigate, useLocation } from 'react-router-dom';

const AddSection = () => {
  const [savedData, setSavedData] = useState([]); // Aquí guardamos los datos
  const [activeTab, setActiveTab] = useState('Expenses'); // Para controlar la pestaña activa
  const [selectedCategory, setSelectedCategory] = useState(''); // Para la categoría específica seleccionada
  const [value, setValue] = useState(10000); // Inicializamos con un valor
  const [name, setName] = useState(''); // Para el nombre
  const [details, setDetails] = useState(''); // Para la descripción
  const [date, setDate] = useState(''); // Aquí guardamos la fecha

  const navigate = useNavigate();
  const location = useLocation();

  // Definimos si es Ingreso o Gasto basado en la pestaña activa, no en la categoría
  const isIncome = activeTab === 'Incomes';

  // Función para mostrar los datos guardados en la consola
  const logSavedData = (data) => {
    console.log('Current saved data:', data);

    // También podemos mostrar un resumen por tipo (income/expense)
    const expenses = data.filter(item => item.type === 'Expense');
    const incomes = data.filter(item => item.type === 'Income');

    console.log(`Total entries: ${data.length} (${expenses.length} expenses, ${incomes.length} incomes)`);

    // Calcular totales
    const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.value), 0);
    const totalIncomes = incomes.reduce((sum, item) => sum + Number(item.value), 0);

    console.log(`Total expenses: $${totalExpenses.toLocaleString()}`);
    console.log(`Total incomes: $${totalIncomes.toLocaleString()}`);
    console.log(`Balance: $${(totalIncomes - totalExpenses).toLocaleString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab'); // Obtenemos el parámetro 'tab' de la URL
    if (tab && (tab === 'Expenses' || tab === 'Incomes')) {
      setActiveTab(tab); // Establecemos la pestaña activa
    }
  }, [location]);

  useEffect(() => {
    // Recuperar los datos guardados desde localStorage
    const storedData = JSON.parse(localStorage.getItem('savedData')) || [];
    setSavedData(storedData);

    // Mostrar los datos actuales en la consola al cargar el componente
    logSavedData(storedData);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // No cambiamos activeTab aquí, para mantener la pestaña actual
  };

  const handleSave = () => {
    // Validar que todos los campos estén completos
    if (!selectedCategory || !value || !name || !details || !date) {
      alert('Please fill in all fields!');
      return; // No guardar si algún campo está vacío
    }

    const data = {
      category: selectedCategory,
      value,
      name, // Guardamos el nombre
      details, // Guardamos los detalles
      date, // Guardamos la fecha
      type: isIncome ? 'Income' : 'Expense',
      timestamp: new Date().toISOString() // Agregar timestamp para ordenar cronológicamente
    };

    // Guardamos el dato en el array de datos
    const updatedData = [...savedData, data];
    setSavedData(updatedData);

    // Guardamos los datos en localStorage
    localStorage.setItem('savedData', JSON.stringify(updatedData));

    // Mostrar los datos actualizados en la consola
    console.log('New entry added:', data);
    logSavedData(updatedData);

    // Limpiar los inputs después de guardar
    setSelectedCategory('');
    setValue(10000); // Reiniciar el valor
    setName(''); // Limpiar el nombre
    setDetails(''); // Limpiar los detalles
    setDate(''); // Limpiar la fecha

    // Redirigir a la página de Finances
    navigate('/finances');
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
          setSelectedCategory={handleCategorySelect} // Usamos nuestra nueva función
          selectedCategory={selectedCategory} // Pasamos la categoría seleccionada
        />
        <h2>{valueTitle}</h2>
        <ValueInput
          setValue={setValue} // Pasamos setValue para actualizar el valor
          value={value} // Pasamos el valor para que se mantenga sincronizado
        />
        <h2>{detailTitle}</h2>
        <AddInputs
          setName={setName} // Pasamos setName para actualizar el nombre
          setDetails={setDetails} // Pasamos setDetails para actualizar los detalles
          name={name} // Pasamos el nombre actual
          details={details} // Pasamos los detalles actuales
        />
        <CalendarInput
          setDate={setDate} // Pasamos setDate para actualizar la fecha
          date={date} // Pasamos la fecha actual
        />
        <button className="add-btn" onClick={handleSave}>
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